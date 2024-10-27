import 'dotenv/config';

import { Locations } from './types/locations.js';
import { type Commands, InstallGlobalCommands } from './utils.js';

const APPLICATION_ID = process.env.APPLICATION_ID;
console.debug('🚀 - APPLICATION_ID:', APPLICATION_ID);

if (!APPLICATION_ID) {
  throw new Error('APPLICATION_ID is not defined in environment variables.');
}

// 원티드 크롤링 옵션
const WANTED_COMMAND: Commands = {
  name: 'wanted',
  description: '채용 정보를 검색합니다.',
  options: [
    {
      name: 'location',
      description: '채용 지역을 선택하세요',
      type: 3, // STRING
      required: true,
      choices: [
        { name: Locations.all, value: '전국' },
        { name: Locations.Seoul.all, value: '서울' },
        { name: Locations.Busan.all, value: '부산' },
        { name: Locations.Daegu.all, value: '대구' },
        { name: Locations.Incheon.all, value: '인천' },
        { name: Locations.Gwangju.all, value: '광주' },
        { name: Locations.Daejeon.all, value: '대전' },
        { name: Locations.Ulsan.all, value: '울산' },
        { name: Locations.Sejong.all, value: '세종' },
        { name: Locations.Gyeonggi.all, value: '경기' },
        { name: Locations.Gangwon.all, value: '강원' },
        { name: Locations.ChungcheongBuk.all, value: '충북' },
        { name: Locations.ChungcheongNamDo.all, value: '충남' },
        { name: Locations.JeollaBuk.all, value: '전북' },
        { name: Locations.JeollaNamDo.all, value: '전남' },
        { name: Locations.GyeongsangBuk.all, value: '경북' },
        { name: Locations.GyeongsangNamDo.all, value: '경남' },
        { name: Locations.Jeju.all, value: '제주' },
      ],
    },
    {
      name: 'years',
      description: '경력 조건을 입력하세요',
      type: 3, // STRING
      required: true,
      choices: [
        { name: 'all', value: '-1' },
        { name: 'new', value: '0' },
        { name: '1 year', value: '1' },
        { name: '2 years', value: '2' },
        { name: '3 years', value: '3' },
        { name: '4 years', value: '4' },
        { name: '5 years', value: '5' },
        { name: '6 years', value: '6' },
        { name: '7 years', value: '7' },
        { name: '8 years', value: '8' },
        { name: '9 years', value: '9' },
        { name: '10 years', value: '10' },
      ],
    },
    {
      name: 'job-id',
      description: '직무를 입력하세요',
      type: 4, // INTEGER
      required: true,
      choices: [
        { name: 'Software Engineer', value: 10110 },
        { name: 'Web Developer', value: 873 },
        { name: 'Server Developer', value: 872 },
        { name: 'Front-end Developer', value: 669 },
        { name: 'Java Developer', value: 660 },
        { name: 'C Developer', value: 900 },
        { name: 'Python Developer', value: 899 },
        { name: 'ML Engineer', value: 1634 },
        { name: 'DevOps Engineer', value: 674 },
        { name: 'Node.js Developer', value: 895 },
        { name: 'Android Developer', value: 677 },
        { name: 'iOS Developer', value: 678 },
        { name: 'Data Scientist', value: 1024 },
        { name: 'Security Engineer', value: 671 },
        { name: 'Big-Data Engineer', value: 1025 },
        { name: 'Blockchain Engineer', value: 1027 },
        { name: 'Cross-Platform Developer', value: 10111 },
        { name: 'PHP Developer', value: 893 },
        { name: 'Ruby on Rails Developer', value: 894 },
      ],
    },
  ],
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 2],
};

const ALL_COMMANDS = [WANTED_COMMAND];

InstallGlobalCommands(APPLICATION_ID, ALL_COMMANDS);
