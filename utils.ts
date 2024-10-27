import 'dotenv/config';

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
console.debug('🚀 - DISCORD_TOKEN:', DISCORD_TOKEN);

if (!DISCORD_TOKEN) {
  throw new Error(`DISCORD_TOKEN is not defined in environment variables. ${DISCORD_TOKEN}`);
}

/**
 * Helper function to make requests to Discord API
 * @param endpoint - API endpoint to request
 * @param options - Fetch options for the request
 * @returns Promise<Response>
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function DiscordRequest(endpoint: string, options?: any): Promise<Response> {
  // append endpoint to root API URL
  const url = 'https://discord.com/api/v10/' + endpoint;

  // Stringify payloads
  if (options?.body) {
    options.body = JSON.stringify(options.body);
  }

  // Use fetch to make requests
  /* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${DISCORD_TOKEN}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent': 'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)',
    },
    ...options,
  });

  // throw API errors
  if (!res.ok) {
    const data = await res.json();
    console.debug(`Not OK; ${res.status}`);
    throw new Error(JSON.stringify(data));
  }

  // return original response
  return res;
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
 * Install global commands to Discord API
 * @param appId - Discord Application ID
 * @param commands - Commands to be installed
 */
export async function InstallGlobalCommands(appId: string, commands: Commands[]) {
  // API endpoint to overwrite global commands
  const endpoint = `applications/${appId}/commands`;

  try {
    // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
    await DiscordRequest(endpoint, { method: 'PUT', body: commands });
  } catch (err) {
    console.error(err);
  }
}

/**
 * Simple method that returns a random emoji from list
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
 * Capitalize the first letter of a string
 * @param str - Input string
 * @returns string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
