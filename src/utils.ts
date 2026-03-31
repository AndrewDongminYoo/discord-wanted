import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { config } from 'dotenv';

config();
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

if (!DISCORD_TOKEN) {
  throw new Error('DISCORD_TOKEN is not defined in environment variables.');
}

/**
 * Discord API에 요청하는 헬퍼 기능
 * @param {string} endpoint - 요청할 API 엔드포인트
 * @param {AxiosRequestConfig} options - Axios 요청 옵션
 * @returns Promise<AxiosResponse<any>>
 */
async function DiscordRequest(
  endpoint: string,
  options?: AxiosRequestConfig
): Promise<AxiosResponse> {
  // 루트 API URL에 엔드포인트 추가
  const url = 'https://discord.com/api/v10/' + endpoint;

  // Axios 요청
  return await axios({
    url,
    headers: {
      'Authorization': `Bot ${DISCORD_TOKEN}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent': 'DiscordBot (https://github.com/AndrewDongminYoo/discord-wanted, 1.0.0)',
    },
    ...options,
  });
}

/**
 * https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type 참조
 */
type CommandOptionType =
  | 1 // SUB_COMMAND
  | 2 // SUB_COMMAND_GROUP
  | 3 // STRING
  | 4 // INTEGER
  | 5 // BOOLEAN
  | 6 // USER
  | 7 // CHANNEL
  | 8 // ROLE
  | 9 // MENTIONABLE
  | 10 // NUMBER
  | 11; // ATTACHMENT

interface CommandChoice<T extends CommandOptionType> {
  name: string;
  value: T extends 3 | 7 | 8 | 9 | 11 ? string : number;
}

export interface CommandOption<T extends CommandOptionType = CommandOptionType> {
  type: T;
  name: string;
  description: string;
  required: boolean;
  choices?: Array<CommandChoice<T>>;
}

export interface Commands {
  name: string;
  description: string;
  type: number;
  integration_types: number[];
  contexts: number[];
  options?: CommandOption[];
}

/** https://discord.com/developers/docs/interactions/application-commands#registering-a-command */
const COMMAND_LIMITS = {
  MAX_COMMANDS: 100,
  MAX_OPTIONS: 25,
  MAX_CHOICES: 25,
  NAME_MAX_LENGTH: 32,
  DESCRIPTION_MAX_LENGTH: 100,
  CHOICE_NAME_MAX_LENGTH: 100,
  CHOICE_VALUE_MAX_LENGTH: 100,
} as const;

export interface CommandValidationError {
  command: string;
  option?: string;
  message: string;
}

/**
 * Discord slash command 스키마의 제한 사항을 검사합니다.
 * @param {Commands[]} commands - 검사할 명령어 배열
 * @returns {CommandValidationError[]} 발견된 오류 목록 (빈 배열이면 유효)
 */
export function validateCommands(commands: Commands[]): CommandValidationError[] {
  const errors: CommandValidationError[] = [];

  if (commands.length > COMMAND_LIMITS.MAX_COMMANDS) {
    errors.push({
      command: '(global)',
      message: `Commands exceed limit: ${commands.length} > ${COMMAND_LIMITS.MAX_COMMANDS}`,
    });
  }

  for (const command of commands) {
    if (command.name.length > COMMAND_LIMITS.NAME_MAX_LENGTH) {
      errors.push({
        command: command.name,
        message: `Command name too long: ${command.name.length} > ${COMMAND_LIMITS.NAME_MAX_LENGTH}`,
      });
    }

    if (command.description.length > COMMAND_LIMITS.DESCRIPTION_MAX_LENGTH) {
      errors.push({
        command: command.name,
        message: `Command description too long: ${command.description.length} > ${COMMAND_LIMITS.DESCRIPTION_MAX_LENGTH}`,
      });
    }

    const options = command.options ?? [];

    if (options.length > COMMAND_LIMITS.MAX_OPTIONS) {
      errors.push({
        command: command.name,
        message: `Options exceed limit: ${options.length} > ${COMMAND_LIMITS.MAX_OPTIONS}`,
      });
    }

    for (const option of options) {
      if (option.name.length > COMMAND_LIMITS.NAME_MAX_LENGTH) {
        errors.push({
          command: command.name,
          option: option.name,
          message: `Option name too long: ${option.name.length} > ${COMMAND_LIMITS.NAME_MAX_LENGTH}`,
        });
      }

      if (option.description.length > COMMAND_LIMITS.DESCRIPTION_MAX_LENGTH) {
        errors.push({
          command: command.name,
          option: option.name,
          message: `Option description too long: ${option.description.length} > ${COMMAND_LIMITS.DESCRIPTION_MAX_LENGTH}`,
        });
      }

      const choices = option.choices ?? [];

      if (choices.length > COMMAND_LIMITS.MAX_CHOICES) {
        errors.push({
          command: command.name,
          option: option.name,
          message: `Choices exceed limit: ${choices.length} > ${COMMAND_LIMITS.MAX_CHOICES}`,
        });
      }

      for (const choice of choices) {
        if (choice.name.length > COMMAND_LIMITS.CHOICE_NAME_MAX_LENGTH) {
          errors.push({
            command: command.name,
            option: option.name,
            message: `Choice name too long: "${choice.name}" (${choice.name.length} > ${COMMAND_LIMITS.CHOICE_NAME_MAX_LENGTH})`,
          });
        }

        if (
          typeof choice.value === 'string' &&
          choice.value.length > COMMAND_LIMITS.CHOICE_VALUE_MAX_LENGTH
        ) {
          errors.push({
            command: command.name,
            option: option.name,
            message: `Choice value too long: "${choice.value}" (${choice.value.length} > ${COMMAND_LIMITS.CHOICE_VALUE_MAX_LENGTH})`,
          });
        }
      }
    }
  }

  return errors;
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
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Error sending request:', error.toJSON());
    }
    throw error;
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
