import {
  InteractionResponseType,
  InteractionType,
  verifyKeyMiddleware,
} from 'discord-interactions';
import { config } from 'dotenv';
import express, { type Request, type Response } from 'express';
import serverless from 'serverless-http';

import { fetchSaraminJobs } from './jumpit/index.js';
import { type Sort } from './jumpit/types/job-codes.js';
import { type StackName } from './jumpit/types/tech-stacks.js';
import { getRandomEmoji } from './src/utils.js';
import { fetchJobs } from './wanted/index.js';
import { type JobIds, type Years } from './wanted/types/user-enums.js';

config();

// 익스프레스 앱 생성
const app = express();
// 포트 가져오기 또는 기본값 3000
const PORT = process.env.PORT ?? 3000;

const PUBLIC_KEY = process.env.PUBLIC_KEY;

if (!PUBLIC_KEY) {
  throw new Error('PUBLIC_KEY is not defined in environment variables.');
}

const APPLICATION_ID = process.env.APPLICATION_ID;

if (!APPLICATION_ID) {
  throw new Error('APPLICATION_ID is not defined in environment variables.');
}

interface InteractionData {
  id: string;
  name: string;
  type: number;
  values: string[];
  custom_id: string;
  options: Array<{
    name: string;
    type: number;
    value: string;
  }>;
}

/**
 * 디스코드 메세지 API 길이 제한
 * @see https://github.com/discordjs/discord.js/pull/641
 */
const MESSAGE_CHAR_LIMIT = 2000;

/**
 * Discord가 HTTP 요청을 보낼 상호작용 엔드포인트 URL
 * 요청 본문을 구문 분석하고 Discord-인터랙션 패키지를 사용하여 수신 요청을 확인합니다.
 */
app.post('/interactions', verifyKeyMiddleware(PUBLIC_KEY), async (req: Request, res: Response) => {
  // 인터랙션 유형 및 데이터
  const type: InteractionType = Number(req.body.type) as InteractionType;
  const data: InteractionData = req.body.data;

  console.debug(`🚀 - type: InteractionType.${InteractionType[type]}`);
  console.debug('🚀 - data:', data);

  /**
   * 확인 요청 처리
   */
  if (type === InteractionType.PING) {
    res.send({ type: InteractionResponseType.PONG });
    return;
  }

  /**
   * 슬래시 명령 요청 처리
   * https://discord.com/developers/docs/interactions/application-commands#slash-commands 참조
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    // "test" 명령
    if (name === 'test') {
      // 명령이 트리거된 채널로 메시지를 보냅니다.
      res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        // 도우미 함수에서 보낼 임의의 이모티콘을 가져옵니다.
        data: { content: `hello world ${getRandomEmoji()}` },
      });
      return;
    }

    // "wanted" 명령
    if (name === 'wanted') {
      const options = data.options;
      let location = 'all';
      let years = '-1';
      let jobId = 10110;

      options.forEach((option) => {
        if (option.name === 'location') {
          location = option.value;
        } else if (option.name === 'years') {
          years = option.value;
        } else if (option.name === 'job-id') {
          jobId = Number(option.value);
        }
      });

      const jobIds = [jobId] as JobIds[];
      const yearsArray = [years] as Years[];
      const locationKey = location;

      try {
        const jobs = await fetchJobs(jobIds, yearsArray, locationKey);
        let content = '**원티드 채용 정보:**\n';

        for (const job of jobs) {
          const info = job.usefulInfo();
          content += `회사: ${info.company}\n`;
          content += `포지션: [${info.position}](${info.jobInfoLink})\n`;
          content += `주소: ${info.address}\n`;
          content += `경력: ${info.experienceRange} (${info.isNewbie})\n`;
          const detail = job.additionalInfo();
          content += `포인트: ${detail.attractionTags}\n`;
          content += `기술스택: ${detail.skillTags}\n`;
          content += '--------------------\n';
        }

        // 콘텐츠 길이를 확인하고 필요한 경우 잘라내기
        if (content.length > MESSAGE_CHAR_LIMIT) {
          content = content.substring(0, MESSAGE_CHAR_LIMIT - 3) + '...';
        }

        res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: { content },
        });
      } catch (error) {
        console.error('Error fetching jobs:', error);
        res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: { content: '채용 정보를 가져오는 중 오류가 발생했습니다.' },
        });
      }
      return;
    }

    // "saramin" 명령
    if (name === 'saramin') {
      const options = data.options;
      let location = 1;
      let career;
      let techStack: StackName = 'Java';
      let sort: Sort['id'] = 'reg_dt';

      options.forEach((option) => {
        if (option.name === 'location') {
          location = Number.parseInt(option.value, 10);
        } else if (option.name === 'career') {
          const temp = Number.parseInt(option.value, 10);
          if (!Number.isNaN(temp) && temp <= 10 && temp >= 0) {
            career = `${temp}` as '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';
          }
        } else if (option.name === 'job-id') {
          techStack = option.value as StackName;
        } else if (option.name === 'sort') {
          sort = option.value as Sort['id'];
        }
      });

      try {
        const jobs = await fetchSaraminJobs({
          career,
          techStack: [techStack],
          sort,
          location,
        });
        let content = '**사람인 채용 정보:**\n';

        for (const job of jobs) {
          const info = job.usefulInfo();
          content += `회사: ${info.company}\n`;
          content += `포지션: [${info.position}](${info.jobInfoLink})\n`;
          content += `경력: ${info.experienceRange} (${info.isNewbie})\n`;
          const detail = job.additionalInfo();
          content += `기술스택: ${detail.skillTags}\n`;
          content += '--------------------\n';
        }

        if (content.length > MESSAGE_CHAR_LIMIT) {
          content = content.substring(0, MESSAGE_CHAR_LIMIT - 3) + '...';
        }

        res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: { content },
        });
      } catch (error) {
        console.error('Error fetching Saramin jobs:', error);
        res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: { content: '사람인 채용 정보를 가져오는 중 오류가 발생했습니다.' },
        });
      }
      return;
    }

    console.error(`unknown command: ${name}`);
    res.status(400).json({ error: 'unknown command' });
  }

  console.error('unknown interaction type', type);
  res.status(400).json({ error: 'unknown interaction type' });
});

// serverless.yaml > functions > app > handler
export const handler = serverless(app);

// 로컬 서버용 설정
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.debug(`Server running at http://localhost:${PORT}`);
  });
}
