import 'dotenv/config';

import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
console.debug('🚀 - DISCORD_TOKEN:', DISCORD_TOKEN);

if (!DISCORD_TOKEN) {
  throw new Error('DISCORD_TOKEN is not defined in environment variables.');
}

/**
 * Discord API에 요청하는 헬퍼 기능
 * @param {string} endpoint - 요청할 API 엔드포인트
 * @param {AxiosRequestConfig} options - Axios 요청 옵션
 * @returns Promise<AxiosResponse<any>>
 */
export async function DiscordRequest(
  endpoint: string,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse | undefined> {
  // 루트 API URL에 엔드포인트 추가
  const url = 'https://discord.com/api/v10/' + endpoint;

  try {
    // Axios 요청
    return axios({
      url,
      headers: {
        Authorization: `Bot ${DISCORD_TOKEN}`,
        'Content-Type': 'application/json; charset=UTF-8',
        'User-Agent': 'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)',
      },
      ...options,
    });
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const errorData = error?.response?.data || error?.message;
      console.error('Error sending request:', errorData);
      throw new Error(JSON.stringify(errorData));
    }
    throw error;
  }
}

export interface Commands {
  name: string;
  description: string;
  type: number;
  integration_types: number[];
  contexts: number[];
  options?: Array<{
    type: number;
    name: string;
    description: string;
    required: boolean;
    choices: Array<{
      name: string;
      value: string;
    }>;
  }>;
}

/**
 * Discord API에 전역 명령 설치
 * @param {string} appId - Discord 애플리케이션 ID
 * @param {Array<Commands>} commands - 설치할 명령어
 */
export async function InstallGlobalCommands(appId: string, commands: Commands[]) {
  // 전역 명령 덮어쓰기를 위한 API 엔드포인트
  const endpoint = `applications/${appId}/commands`;

  try {
    // 대량 덮어쓰기 엔드포인트를 호출합니다: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
    await DiscordRequest(endpoint, { method: 'PUT', data: commands });
  } catch (err) {
    console.error(err);
  }
}

/**
 * 목록에서 임의의 이모티콘을 반환하는 간단한 방법
 * @returns string
 */
export function getRandomEmoji(): string {
  const emojiList = [
    '😭',
    '😄',
    '😌',
    '🤓',
    '😎',
    '😤',
    '🤖',
    '😶‍🌫️',
    '🌏',
    '📸',
    '💿',
    '👋',
    '🌊',
    '✨',
  ];
  return emojiList[Math.floor(Math.random() * emojiList.length)];
}

/**
 * 문자열의 첫 글자를 대문자로 합니다.
 * @param {string} str - 입력 문자열
 * @returns string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
