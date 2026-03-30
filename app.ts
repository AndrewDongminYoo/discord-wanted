import {
  InteractionResponseType,
  InteractionType,
  verifyKeyMiddleware,
} from 'discord-interactions';
import { config } from 'dotenv';
import express, { type Request, type Response } from 'express';
import serverless from 'serverless-http';

import { type IJobInfoDisplay } from './i-job-info-display.js';
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

interface DiscordEmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

interface DiscordEmbed {
  title: string;
  url: string;
  color: number;
  description: string;
  thumbnail?: { url: string };
  fields: DiscordEmbedField[];
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

function formatTags(tags: string): string {
  if (!tags.startsWith('#')) {
    return tags;
  }
  return tags
    .split(' #')
    .map((tag, i) => `\`${i === 0 ? tag : `#${tag}`}\``)
    .join(' ');
}

function buildJobEmbed(job: IJobInfoDisplay, color: number): DiscordEmbed {
  const info = job.usefulInfo();
  const detail = job.additionalInfo();

  const fields: DiscordEmbedField[] = [
    { name: '📍 주소', value: info.address, inline: true },
    { name: '🧑‍💻 경력', value: `${info.experienceRange} (${info.isNewbie})`, inline: true },
  ];

  if (detail.skillTags !== '기술스택 없음') {
    fields.push({ name: '🛠️ 기술스택', value: formatTags(detail.skillTags) });
  }

  if (detail.attractionTags) {
    fields.push({ name: '✨ 태그', value: formatTags(detail.attractionTags) });
  }

  const embed: DiscordEmbed = {
    title: info.position,
    url: info.jobInfoLink,
    color,
    description: info.companyInfoLink ? `[${info.company}](${info.companyInfoLink})` : info.company,
    fields,
  };

  if (detail.titleImage) {
    embed.thumbnail = { url: detail.titleImage };
  }

  return embed;
}

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
        const embeds = jobs.map((job) => buildJobEmbed(job, 0xe84255));

        res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: { content: '**원티드 채용 정보:**', embeds },
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
      let sort: Sort['id'] = 'popular';

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
        const embeds = jobs.map((job) => buildJobEmbed(job, 0x0075ff));

        res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: { content: '**사람인 채용 정보:**', embeds },
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
