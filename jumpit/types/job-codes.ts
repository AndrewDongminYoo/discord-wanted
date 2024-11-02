import { type StackName } from './tech-stacks.js';

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
    name: 'IOS 개발자',
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
  emoticon: string;
}

export const tags: Tag[] = [
  {
    id: 'FOUR_DOT_FIVE_DAYS',
    name: '#4.5일제',
    emoticon: '🍯',
  },
  {
    id: 'WORK_AT_HOME_COMPANY',
    name: '#재택근무',
    emoticon: '🏠',
  },
  {
    id: 'FLEXIBLE_WORK',
    name: '#유연근무제',
    emoticon: '⏰',
  },
  {
    id: 'DIFFERENCE_WORK_TIME',
    name: '#시차출근제',
    emoticon: '🕙',
  },
  {
    id: 'INCENTIVE_COMPANY',
    name: '#인센티브',
    emoticon: '💵',
  },
  {
    id: 'CODE_REVIEW',
    name: '#코드리뷰',
    emoticon: '👾',
  },
  {
    id: 'SHORTS_SLIPPERS',
    name: '#반바지/슬리퍼 OK',
    emoticon: '👖',
  },
  {
    id: 'FREE_DRESS',
    name: '#자유복장',
    emoticon: '👕',
  },
  {
    id: 'SNACK',
    name: '#맛있는간식냠냠',
    emoticon: '☕',
  },
  {
    id: 'MACBOOK',
    name: '#맥북으로개발',
    emoticon: '💻',
  },
  {
    id: 'NICKNAME',
    name: '#닉네임사용',
    emoticon: '👩‍',
  },
  {
    id: 'HORIZONTAL_CULTURE',
    name: '#수평적조직',
    emoticon: '🙌',
  },
  {
    id: 'WITH_ANIMAL',
    name: '#반려동물',
    emoticon: '🐶',
  },
  {
    id: 'INVESTMENT_MORE_100',
    name: '#누적투자금100억이상',
    emoticon: '💰',
  },
  {
    id: 'STOCK_OPTION',
    name: '#스톡옵션제공',
    emoticon: '📈',
  },
  {
    id: 'FREE_BOOK',
    name: '#도서구입비지원',
    emoticon: '📗',
  },
  {
    // cSpell:ignore TEXI
    id: 'TEXI_FARE',
    name: '#택시비지원',
    emoticon: '🚕',
  },
  {
    id: 'MILITARY',
    name: '#병역특례',
    emoticon: '👨',
  },
  {
    id: 'MAJOR',
    name: '#전공우대',
    emoticon: '🎓',
  },
] as const;

export interface Sort {
  id: 'rsp_rate' | 'reg_dt' | 'popular' | 'relation';
  name: string;
  default: boolean;
  searchDefault: boolean;
}

export const sort: Sort[] = [
  {
    id: 'rsp_rate',
    name: '응답률순',
    default: true,
    searchDefault: false,
  },
  {
    id: 'reg_dt',
    name: '최신순',
    default: false,
    searchDefault: false,
  },
  {
    id: 'popular',
    name: '인기순',
    default: false,
    searchDefault: false,
  },
] as const;

export const searchKeywordPositionSort: Sort[] = [
  ...sort,
  {
    id: 'relation',
    name: '관련도순',
    default: false,
    searchDefault: true,
  },
] as const;
