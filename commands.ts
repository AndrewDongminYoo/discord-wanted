import 'dotenv/config';

import { type Commands, InstallGlobalCommands } from './src/utils.js';

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
        { name: 'All', value: 'all' },
        { name: 'Seoul', value: 'seoul.all' },
        { name: 'Seoul gangnam-gu', value: 'seoul.gangnam-gu' },
        { name: 'Seoul guro-gu', value: 'seoul.guro-gu' },
        { name: 'Seoul geumcheon-gu', value: 'seoul.geumcheon-gu' },
        { name: 'Seoul mapo-gu', value: 'seoul.mapo-gu' },
        { name: 'Seoul seongdong-gu', value: 'seoul.seongdong-gu' },
        { name: 'Seoul songpa-gu', value: 'seoul.songpa-gu' },
        { name: 'Busan', value: 'busan.all' },
        { name: 'Daegu', value: 'daegu.all' },
        { name: 'Incheon', value: 'incheon.all' },
        { name: 'Gwangju', value: 'gwangju.all' },
        { name: 'Daejeon', value: 'daejeon.all' },
        { name: 'Ulsan', value: 'ulsan.all' },
        { name: 'Sejong', value: 'sejong.all' },
        { name: 'Gyeonggi', value: 'gyeonggi.all' },
        { name: 'Gyeonggi seongnam-si', value: 'gyeonggi.seongnam-si' },
        { name: 'Gangwon', value: 'gangwon.all' },
        { name: 'Chungcheong buk-do', value: 'n-chungcheong.all' },
        { name: 'Chungcheong nam-do', value: 's-chungcheong.all' },
        { name: 'Jeolla buk-do', value: 'n-jeolla.all' },
        { name: 'Jeolla nam-do', value: 's-jeolla.all' },
        { name: 'Gyeongsang buk-do', value: 'n-gyeongsang.all' },
        { name: 'Gyeongsang nam-do', value: 's-gyeongsang.all' },
        { name: 'Jeju Island', value: 'jeju.all' },
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
        { name: 'C,C++ Developer', value: 900 },
        { name: 'Python Developer', value: 899 },
        { name: 'Machine Learning Engineer', value: 1634 },
        { name: 'DevOps / System Administrator', value: 674 },
        { name: 'Data Engineer', value: 655 },
        { name: 'Node.js Developer', value: 895 },
        { name: 'Android Developer', value: 677 },
        { name: 'iOS Developer', value: 678 },
        { name: 'Embedded Developer', value: 658 },
        { name: 'Technical Support', value: 1026 },
        { name: 'QA,Test Engineer', value: 676 },
        { name: 'Development Manager', value: 877 },
        { name: 'Data Scientist', value: 1024 },
        { name: 'Security Engineer', value: 671 },
        { name: 'Big Data Engineer', value: 1025 },
        { name: 'Blockchain Platform Engineer', value: 1027 },
        { name: 'Cross-Platform App Developer', value: 10111 },
        { name: 'PHP Developer', value: 893 },
        { name: 'Web Publisher', value: 939 },
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
