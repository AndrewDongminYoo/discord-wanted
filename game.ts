import { capitalize } from './utils.js';

// 각 선택지와 관련된 설명 및 승리 조건을 정의하는 인터페이스
interface RPSChoice {
  [key: string]: string;
  description: string;
}

// RPS 선택지의 타입 선언
const RPSChoices: Record<string, RPSChoice> = {
  rock: {
    description: 'sedimentary, igneous, or perhaps even metamorphic',
    virus: 'outwaits',
    computer: 'smashes',
    scissors: 'crushes',
  },
  cowboy: {
    description: 'yeehaw~',
    scissors: 'puts away',
    wumpus: 'lassos',
    rock: 'steel-toe kicks',
  },
  scissors: {
    description: 'careful ! sharp ! edges !!',
    paper: 'cuts',
    computer: 'cuts cord of',
    virus: 'cuts DNA of',
  },
  virus: {
    description: 'genetic mutation, malware, or something inbetween',
    cowboy: 'infects',
    computer: 'corrupts',
    wumpus: 'infects',
  },
  computer: {
    description: 'beep boop beep bzzrrhggggg',
    cowboy: 'overwhelms',
    paper: 'uninstalls firmware for',
    wumpus: 'deletes assets for',
  },
  wumpus: {
    description: 'the purple Discord fella',
    paper: 'draws picture on',
    rock: 'paints cute face on',
    scissors: 'admires own reflection in',
  },
  paper: {
    description: 'versatile and iconic',
    virus: 'ignores',
    cowboy: 'gives papercut to',
    rock: 'covers',
  },
};

// RPS 선택지를 반환하는 함수
export function getRPSChoices(): string[] {
  return Object.keys(RPSChoices);
}

// 선택 메뉴에 사용할 옵션의 타입 선언
interface SelectOption {
  label: string;
  value: string;
  description: string;
}

// 선택 메뉴를 위한 셔플된 옵션을 반환하는 함수
export function getShuffledOptions(): SelectOption[] {
  const allChoices = getRPSChoices();
  const options: SelectOption[] = [];

  for (const c of allChoices) {
    options.push({
      label: capitalize(c),
      value: c.toLowerCase(),
      description: RPSChoices[c].description,
    });
  }

  return options.sort(() => Math.random() - 0.5);
}

// 게임 결과 객체의 타입 선언
interface Player {
  id: string;
  objectName: string;
}

interface GameResult {
  win: Player;
  lose: Player;
  verb: string;
}

// 게임 결과를 형식화하는 함수
function formatResult(result: GameResult): string {
  const { win, lose, verb } = result;
  return verb === 'tie'
    ? `<@${win.id}> and <@${lose.id}> draw with **${win.objectName}**`
    : `<@${win.id}>'s **${win.objectName}** ${verb} <@${lose.id}>'s **${lose.objectName}**`;
}

// 두 플레이어의 선택에 따른 게임 결과를 반환하는 함수
export function getResult(p1: Player, p2: Player): string {
  let gameResult: GameResult;

  if (RPSChoices[p1.objectName] && RPSChoices[p1.objectName][p2.objectName]) {
    // p1이 승리한 경우
    gameResult = {
      win: p1,
      lose: p2,
      verb: RPSChoices[p1.objectName][p2.objectName],
    };
  } else if (RPSChoices[p2.objectName] && RPSChoices[p2.objectName][p1.objectName]) {
    // p2가 승리한 경우
    gameResult = {
      win: p2,
      lose: p1,
      verb: RPSChoices[p2.objectName][p1.objectName],
    };
  } else {
    // 비긴 경우
    gameResult = { win: p1, lose: p2, verb: 'tie' };
  }

  return formatResult(gameResult);
}
