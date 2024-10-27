import 'dotenv/config';

import { getRPSChoices } from './game.js';
import { capitalize, InstallGlobalCommands } from './utils.js';

const APPLICATION_ID = process.env.APPLICATION_ID;
console.debug('🚀 - APPLICATION_ID:', APPLICATION_ID);

if (!APPLICATION_ID) {
  throw new Error('APPLICATION_ID is not defined in environment variables.');
}

// game.js에서 게임 선택 사항 가져오기
function createCommandChoices() {
  const choices = getRPSChoices();
  const commandChoices = [];

  for (const choice of choices) {
    commandChoices.push({
      name: capitalize(choice),
      value: choice.toLowerCase(),
    });
  }

  return commandChoices;
}

// 간단한 테스트 명령
const TEST_COMMAND = {
  name: 'test',
  description: 'Basic command',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

// 옵션이 포함된 명령
const CHALLENGE_COMMAND = {
  name: 'challenge',
  description: 'Challenge to a match of rock paper scissors',
  options: [
    {
      type: 3,
      name: 'object',
      description: 'Pick your object',
      required: true,
      choices: createCommandChoices(),
    },
  ],
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 2],
};

const ALL_COMMANDS = [TEST_COMMAND, CHALLENGE_COMMAND];

InstallGlobalCommands(APPLICATION_ID, ALL_COMMANDS);
