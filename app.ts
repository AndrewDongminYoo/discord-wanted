import 'dotenv/config';

import {
  ButtonStyleTypes,
  InteractionResponseFlags,
  InteractionResponseType,
  InteractionType,
  MessageComponentTypes,
  verifyKeyMiddleware,
} from 'discord-interactions';
import express, { type Request, type Response } from 'express';

import { getResult, getShuffledOptions } from './game.js';
import { DiscordRequest, getRandomEmoji } from './utils.js';

// 익스프레스 앱 생성
const app = express();
// 포트 가져오기 또는 기본값 3000
const PORT = process.env.PORT ?? 3000;

const PUBLIC_KEY = process.env.PUBLIC_KEY;
console.debug('🚀 - PUBLIC_KEY:', PUBLIC_KEY);

if (!PUBLIC_KEY) {
  throw new Error('PUBLIC_KEY is not defined in environment variables.');
}

const APPLICATION_ID = process.env.APPLICATION_ID;
console.debug('🚀 - APPLICATION_ID:', APPLICATION_ID);

if (!APPLICATION_ID) {
  throw new Error('APPLICATION_ID is not defined in environment variables.');
}

// 저장소를 사용합니다. 프로덕션 환경에서는 DB를 사용해야 합니다.
const activeGames: Record<string, { id: string; objectName: string }> = {};

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
 * Discord가 HTTP 요청을 보낼 상호작용 엔드포인트 URL
 * 요청 본문을 구문 분석하고 Discord-인터랙션 패키지를 사용하여 수신 요청을 확인합니다.
 */
app.post('/interactions', verifyKeyMiddleware(PUBLIC_KEY), async (req: Request, res: Response) => {
  // 인터랙션 유형 및 데이터
  const type: InteractionType = Number(req.body.type) as InteractionType;
  const id: number = req.body.id;
  const data: InteractionData = req.body.data;

  console.debug(`🚀 - type: InteractionType.${InteractionType[type]}`);
  console.debug('🚀 - id: number', id);
  console.debug('🚀 - data:', data);

  /**
   * 확인 요청 처리
   */
  if (type === InteractionType.PING) {
    res.send({ type: InteractionResponseType.PONG });
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
        data: {
          // 도우미 함수에서 보낼 임의의 이모티콘을 가져옵니다.
          content: `hello world ${getRandomEmoji()}`,
        },
      });
      return;
    }

    // "challenge" 명령
    if (name === 'challenge') {
      // 상호작용 컨텍스트
      const context = req.body.context;
      // 사용자 ID는 (G)DM의 경우 사용자 필드에, 서버의 경우 멤버 필드에 있습니다.
      const userId = context === 0 ? req.body.member.user.id : req.body.user.id;
      // 사용자의 개체 선택
      const objectName = data.options[0].value;

      // 메시지 ID를 게임 ID로 사용하여 활성 게임 생성
      activeGames[id] = { id: userId, objectName };
      console.debug('🚀 - activeGames:', activeGames);

      res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `Rock papers scissors challenge from <@${userId}>`,
          components: [
            {
              type: MessageComponentTypes.ACTION_ROW,
              components: [
                {
                  type: MessageComponentTypes.BUTTON,
                  // 나중에 사용할 게임 ID 추가
                  custom_id: `accept_button_${id}`,
                  label: 'Accept',
                  style: ButtonStyleTypes.PRIMARY,
                },
              ],
            },
          ],
        },
      });
      return;
    }

    console.error(`unknown command: ${name}`);
    res.status(400).json({ error: 'unknown command' });
  }

  if (type === InteractionType.MESSAGE_COMPONENT) {
    const componentId = data.custom_id;

    if (componentId.startsWith('accept_button_')) {
      const gameId = componentId.replace('accept_button_', '');
      const endpoint = `webhooks/${APPLICATION_ID}/${req.body.token}/messages/${req.body.message.id}`;

      try {
        res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: 'What is your object of choice?',
            flags: InteractionResponseFlags.EPHEMERAL,
            components: [
              {
                type: MessageComponentTypes.ACTION_ROW,
                components: [
                  {
                    type: MessageComponentTypes.STRING_SELECT,
                    custom_id: `select_choice_${gameId}`,
                    options: getShuffledOptions(),
                  },
                ],
              },
            ],
          },
        });
        await DiscordRequest(endpoint, { method: 'DELETE' });
      } catch (err) {
        console.error('Error sending message:', err);
      }
    } else if (componentId.startsWith('select_choice_')) {
      const gameId = componentId.replace('select_choice_', '');

      if (activeGames[gameId]) {
        const context = req.body.context;
        const userId = context === 0 ? req.body.member.user.id : req.body.user.id;
        const objectName = data.values[0];
        const resultStr = getResult(activeGames[gameId], { id: userId, objectName });

        delete activeGames[gameId];
        const endpoint = `webhooks/${APPLICATION_ID}/${req.body.token}/messages/${req.body.message.id}`;

        try {
          res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: { content: resultStr },
          });
          await DiscordRequest(endpoint, {
            method: 'PATCH',
            data: {
              content: 'Nice choice ' + getRandomEmoji(),
              components: [],
            },
          });
        } catch (err) {
          console.error('Error sending message:', err);
        }
      }
    }
    return;
  }

  console.error('unknown interaction type', type);
  res.status(400).json({ error: 'unknown interaction type' });
});

app.listen(PORT, () => {
  console.debug('Listening on port', PORT);
});
