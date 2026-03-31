import type { StackName } from './tech-stacks.js';

export interface TechStack {
  name: StackName;
  imagePath: string;
}

export interface JobCategory {
  id: number;
  name: string;
  recommendTechStacks: TechStack[];
}

export const jobCategory: JobCategory[] = [
  {
    id: 1,
    name: '서버/백엔드 개발자',
    recommendTechStacks: [
      {
        name: 'Java',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/java.png',
      },
      {
        name: 'Spring Boot',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/springboot.png',
      },
      {
        name: 'Node.js',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/node.js.png',
      },
      {
        name: 'Python',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/python.png',
      },
      {
        name: 'Django',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/django.png',
      },
      {
        name: 'PHP',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/php.png',
      },
      {
        name: 'C++',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/CPlusPlus.png',
      },
      {
        name: 'C#',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/CSharp.png',
      },
      {
        name: 'AWS',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/aws.png',
      },
      {
        name: 'MySQL',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/mysql.png',
      },
      {
        name: 'Oracle',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/oracle.png',
      },
    ],
  },
  {
    id: 2,
    name: '프론트엔드 개발자',
    recommendTechStacks: [
      {
        name: 'React',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/react.png',
      },
      {
        name: 'Vue.js',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/vue.js.png',
      },
      {
        name: 'JavaScript',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/javascript.png',
      },
      {
        name: 'TypeScript',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/typescript.png',
      },
      {
        name: 'Node.js',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/node.js.png',
      },
      {
        name: 'Svelte',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/svelte.png',
      },
      {
        name: 'HTML5',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/html5.png',
      },
      {
        name: 'CSS 3',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/css3.png',
      },
      {
        name: 'AngularJS',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/angularjs.png',
      },
      {
        name: 'jQuery',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/jquery.png',
      },
    ],
  },
  {
    id: 3,
    name: '웹 풀스택 개발자',
    recommendTechStacks: [
      {
        name: 'JavaScript',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/javascript.png',
      },
      {
        name: 'React',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/react.png',
      },
      {
        name: 'Vue.js',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/vue.js.png',
      },
      {
        name: 'jQuery',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/jquery.png',
      },
      {
        name: 'Node.js',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/node.js.png',
      },
      {
        name: 'HTML5',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/html5.png',
      },
      {
        name: 'CSS 3',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/css3.png',
      },
      {
        name: 'Java',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/java.png',
      },
      {
        name: 'PHP',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/php.png',
      },
    ],
  },
  {
    id: 4,
    name: '안드로이드 개발자',
    recommendTechStacks: [
      {
        name: 'Kotlin',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/kotlin.png',
      },
      {
        name: 'Java',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/java.png',
      },
      {
        name: 'C++',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/CPlusPlus.png',
      },
      {
        name: 'RxJava',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/noStack.png',
      },
    ],
  },
  {
    id: 16,
    name: 'iOS 개발자',
    recommendTechStacks: [
      {
        name: 'Swift',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/swift.png',
      },
      {
        name: 'Objective-C',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/objective-c.png',
      },
      {
        name: 'Rxswift',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/noStack.png',
      },
      {
        name: 'SwiftUI',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/swiftui.png',
      },
      {
        name: 'Xcode',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/xcode.png',
      },
      {
        name: 'C++',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/CPlusPlus.png',
      },
    ],
  },
  {
    id: 18,
    name: '크로스플랫폼 앱개발자',
    recommendTechStacks: [
      {
        name: 'Flutter',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/flutter.png',
      },
      {
        name: 'React Native',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/reactnative.png',
      },
      {
        name: 'JavaScript',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/javascript.png',
      },
    ],
  },
  {
    id: 5,
    name: '게임 클라이언트 개발자',
    recommendTechStacks: [],
  },
  {
    id: 6,
    name: '게임 서버 개발자',
    recommendTechStacks: [],
  },
  {
    id: 7,
    name: 'DBA',
    recommendTechStacks: [
      {
        name: 'MySQL',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/mysql.png',
      },
      {
        name: 'Oracle',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/oracle.png',
      },
      {
        name: 'MSSQL',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/mssql.png',
      },
      {
        name: 'PostgreSQL',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/postgresql.png',
      },
      {
        name: 'NoSql',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/noStack.png',
      },
      {
        name: 'MariaDB',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/mariadb.png',
      },
      {
        name: 'MongoDB',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/mongodb.png',
      },
    ],
  },
  {
    id: 19,
    name: '빅데이터 엔지니어',
    recommendTechStacks: [
      {
        name: 'Python',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/python.png',
      },
      {
        name: 'SQL',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/sql.png',
      },
      {
        name: 'R',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/noStack.png',
      },
      {
        name: 'Hadoop',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/hadoop.png',
      },
      {
        name: 'Spark',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/noStack.png',
      },
      {
        name: 'Java',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/java.png',
      },
      {
        name: 'Kafka',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/kafka.png',
      },
      {
        name: 'TensorFlow',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/tensorflow.png',
      },
      {
        name: 'PyTorch',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/pytorch.png',
      },
      {
        name: 'Elasticsearch',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/elasticsearch.png',
      },
    ],
  },
  {
    id: 8,
    name: '인공지능/머신러닝',
    recommendTechStacks: [
      {
        name: 'Python',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/python.png',
      },
      {
        name: 'TensorFlow',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/tensorflow.png',
      },
      {
        name: 'PyTorch',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/pytorch.png',
      },
      {
        name: 'C++',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/CPlusPlus.png',
      },
      {
        name: 'C',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/noStack.png',
      },
      {
        name: 'OpenCV',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/OpenCV.png',
      },
      {
        name: 'Java',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/java.png',
      },
    ],
  },
  {
    id: 9,
    name: 'devops/시스템 엔지니어',
    recommendTechStacks: [
      {
        name: 'AWS',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/aws.png',
      },
      {
        name: 'Linux',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/linux.png',
      },
      {
        name: 'Python',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/python.png',
      },
      {
        name: 'Kubernetes',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/kubernetes.png',
      },
      {
        name: 'Docker',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/docker.png',
      },
      {
        name: 'Network',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/noStack.png',
      },
      {
        name: 'GCP',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/googlecloudplatform.png',
      },
      {
        name: 'Windows',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/windows.png',
      },
      {
        name: 'AZURE',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/azure.png',
      },
      {
        name: 'Terraform',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/terraform.png',
      },
    ],
  },
  {
    id: 10,
    name: '정보보안 담당자',
    recommendTechStacks: [
      {
        name: 'Network',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/noStack.png',
      },
      {
        name: 'ISMS',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/noStack.png',
      },
      {
        name: 'AWS',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/aws.png',
      },
      {
        name: 'CISA',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/noStack.png',
      },
      {
        name: 'CISSP',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/noStack.png',
      },
      {
        name: 'Firewall',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/noStack.png',
      },
      {
        name: 'VPN',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/noStack.png',
      },
      {
        name: 'IPS',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/noStack.png',
      },
      {
        name: 'CPPG',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/noStack.png',
      },
    ],
  },
  {
    id: 11,
    name: 'QA 엔지니어',
    recommendTechStacks: [],
  },
  {
    id: 12,
    name: '개발 PM',
    recommendTechStacks: [],
  },
  {
    id: 13,
    name: 'HW/임베디드',
    recommendTechStacks: [
      {
        name: 'C',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/noStack.png',
      },
      {
        name: 'FW',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/noStack.png',
      },
      {
        name: 'Embedded',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/embedded.png',
      },
      {
        name: 'C++',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/CPlusPlus.png',
      },
      {
        name: 'Linux',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/linux.png',
      },
      {
        name: 'Pads',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/noStack.png',
      },
      {
        name: 'FPGA',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/noStack.png',
      },
      {
        name: 'PCB',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/noStack.png',
      },
      {
        name: 'Python',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/python.png',
      },
      {
        name: 'RF',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/noStack.png',
      },
    ],
  },
  {
    id: 15,
    name: 'SW/솔루션',
    recommendTechStacks: [
      {
        name: 'C++',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/CPlusPlus.png',
      },
      {
        name: 'C',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/noStack.png',
      },
      {
        name: 'C#',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/CSharp.png',
      },
      {
        name: 'Java',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/java.png',
      },
      {
        name: 'Linux',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/linux.png',
      },
      {
        name: 'Python',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/python.png',
      },
      {
        name: 'Embedded',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/embedded.png',
      },
      {
        name: 'JavaScript',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/javascript.png',
      },
      {
        name: 'Oracle',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/oracle.png',
      },
      {
        name: '.NET',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/ASP_NET.png',
      },
      {
        name: 'MSSQL',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/mssql.png',
      },
    ],
  },
  {
    id: 17,
    name: '웹퍼블리셔',
    recommendTechStacks: [],
  },
  {
    id: 20,
    name: 'VR/AR/3D',
    recommendTechStacks: [],
  },
  {
    id: 22,
    name: '블록체인',
    recommendTechStacks: [
      {
        name: 'Blockchain',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/Blockchain.png',
      },
      {
        name: 'Solidity',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/noStack.png',
      },
      {
        name: 'Java',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/java.png',
      },
      {
        name: 'Nft',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/noStack.png',
      },
      {
        name: 'Node.js',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/node.js.png',
      },
      {
        name: 'Golang',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/Golang.png',
      },
      {
        name: 'Python',
        imagePath: 'https://cdn.jumpit.co.kr/images/stacks/python.png',
      },
    ],
  },
  {
    id: 21,
    name: '기술지원',
    recommendTechStacks: [],
  },
] as const;

export interface Tag {
  id: string;
  name: string;
}

export const tags: Tag[] = [
  { id: '275', name: '#재택근무' },
  { id: '276', name: '#유연근무제' },
  { id: '277', name: '#워라밸' },
  { id: '278', name: '#성과급/상여금' },
  { id: '281', name: '#급성장중' },
  { id: '283', name: '#자유로운 연차' },
  { id: '284', name: '#패밀리데이' },
  { id: '285', name: '#휴가비 지원' },
  { id: '286', name: '#프리한 복장' },
  { id: '287', name: '#점심지원' },
  { id: '288', name: '#간식 제공' },
  { id: '289', name: '#사내 카페' },
  { id: '290', name: '#주거복지' },
  { id: '291', name: '#육아휴직' },
  { id: '292', name: '#장기근속 포상' },
  { id: 'com_103', name: '#M&A 투자유치' },
  { id: 'com_104', name: '#IPO 투자유치' },
  { id: 'com_105', name: '#Pre IPO 투자유치' },
  { id: 'com_110', name: '#시리즈C 투자유치' },
  { id: 'com_111', name: '#시리즈B 투자유치' },
  { id: 'com_113', name: '#시리즈A 투자유치' },
  { id: 'com_114', name: '#Pre A 투자유치' },
  { id: 'com_116', name: '#Seed 투자유치' },
  { id: 'com_117', name: '#계열사' },
  { id: 'com_124', name: '#스타트업 인기TOP100' },
  { id: 'com_126', name: '#역세권 기업' },
  { id: 'com_129', name: '#매출액 1000억 기업' },
  { id: 'com_130', name: '#대기업' },
  { id: 'com_131', name: '#스타트업' },
  { id: 'com_136', name: '#예비 유니콘' },
  { id: 'com_137', name: '#아기 유니콘' },
  { id: 'com_138', name: '#코스피' },
  { id: 'com_139', name: '#코스닥' },
  { id: 'com_140', name: '#코넥스' },
  { id: 'com_141', name: '#연봉상승률 30% 이상' },
  { id: 'com_142', name: '#연봉상승률 20% 이상' },
  { id: 'com_143', name: '#연봉상승률 15% 이상' },
  { id: 'com_144', name: '#연봉상승률 10% 이상' },
  { id: 'com_145', name: '#평균연봉 상위 10%' },
  { id: 'com_146', name: '#평균연봉 7,000 이상' },
  { id: 'com_147', name: '#평균연봉 6,000 이상' },
  { id: 'com_156', name: '#영업이익 20% 지속성장' },
  { id: 'com_158', name: '#영업이익률 20% 이상' },
] as const;

export interface Sort {
  id: 'reg_dt' | 'popular' | 'relation';
  name: string;
}

export const sort: Sort[] = [
  { id: 'popular', name: '인기순' },
  { id: 'reg_dt', name: '최신순' },
] as const;

export const searchKeywordPositionSort: Sort[] = [
  { id: 'reg_dt', name: '최신순' },
  { id: 'popular', name: '인기순' },
  { id: 'relation', name: '관련도순' },
] as const;
