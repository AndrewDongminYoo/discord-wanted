export enum JobSort {
  /** 추천순 */
  recommend = 'job.recommend_order',
  /** 최신순 */
  latest = 'job.latest_order',
  /** 인기순 */
  popularity = 'job.popularity_order',
}

export enum JobGroupId {
  /** "개발" */
  development = 518,
  /** "경영·비즈니스" */
  managementBusiness = 507,
  /** "마케팅·광고" */
  marketingAdvertising = 523,
  /** "디자인" */
  design = 511,
  /** "영업" */
  sales = 530,
  /** "고객서비스·리테일" */
  customerServiceRetail = 510,
  /** "미디어" */
  media = 524,
  /** "엔지니어링·설계" */
  engineeringDesign = 513,
  /** "HR" */
  hr = 517,
  /** "게임 제작" */
  gameProduction = 959,
  /** "금융" */
  finance = 508,
  /** "제조·생산" */
  manufacturingProduction = 522,
  /** "교육" */
  education = 10101,
  /** "의료·제약·바이오" */
  healthcarePharmaBio = 515,
  /** "물류·무역" */
  logisticsTrade = 532,
  /** "법률·법집행기관" */
  legalLawEnforcement = 521,
  /** "식·음료" */
  foodAndBeverage = 10057,
  /** "건설·시설" */
  constructionFacilities = 509,
  /** "공공·복지" */
  publicWelfare = 514,
}

/** `개발` 직무 카테고리 ID */
export enum JobIds {
  /** 소프트웨어 엔지니어 */
  SoftwareEngineer = 10110,
  /** 웹 개발자 */
  WebDeveloper = 873,
  /** 서버 개발자 */
  ServerDeveloper = 872,
  /** 프론트엔드 개발자 */
  FrontendDeveloper = 669,
  /** 자바 개발자 */
  JavaDeveloper = 660,
  /** C, C++ 개발자 */
  CDeveloper = 900,
  /** 파이썬 개발자 */
  PythonDeveloper = 899,
  /** 머신러닝 엔지니어 */
  MLEngineer = 1634,
  /** DevOps / 시스템 관리자 */
  DevOpsEngineer = 674,
  /** 데이터 엔지니어 */
  DataEngineer = 655,
  /** Node.js 개발자 */
  NodejsDeveloper = 895,
  /** 시스템, 네트워크 관리자 */
  SysAdmin = 665,
  /** 안드로이드 개발자 */
  AndroidDeveloper = 677,
  /** iOS 개발자 */
  iOSDeveloper = 678,
  /** 임베디드 개발자 */
  EmbeddedDeveloper = 658,
  /** 기술지원 */
  TechSupport = 1026,
  /** QA, 테스트 엔지니어 */
  QAEngineer = 676,
  /** 개발 매니저 */
  DevManager = 877,
  /** 데이터 사이언티스트 */
  DataScientist = 1024,
  /** 보안 엔지니어 */
  SecurityEngineer = 671,
  /** 빅데이터 엔지니어 */
  BigDataEngineer = 1025,
  /** 하드웨어 엔지니어 */
  HardwareEngineer = 672,
  /** 프로덕트 매니저 */
  ProductManager = 876,
  /** 블록체인 플랫폼 엔지니어 */
  BlockchainEngineer = 1027,
  /** 크로스플랫폼 앱 개발자 */
  CrossPlatformDeveloper = 10111,
  /** DBA */
  DBA = 10231,
  /** PHP 개발자 */
  PHPDeveloper = 893,
  /** .NET 개발자 */
  DotNetDeveloper = 661,
  /** 영상, 음성 엔지니어 */
  VideoAudioEngineer = 896,
  /** 웹 퍼블리셔 */
  WebPublisher = 939,
  /** ERP 전문가 */
  ERPExpert = 10230,
  /** 그래픽스 엔지니어 */
  GraphicsEngineer = 898,
  /** VR 엔지니어 */
  VREngineer = 10112,
  /** CTO, Chief Technology Officer */
  CTO = 795,
  /** BI 엔지니어 */
  BIEngineer = 1022,
  /** 루비온레일즈 개발자 */
  RubyOnRailsDeveloper = 894,
  /** CIO, Chief Information Officer */
  CIO = 793,
}

// Years Enum
export enum Years {
  /** 전체 */
  All = '-1',
  /** 신입 */
  Fresh = '0',
  /** 1년 */
  OneYear = '1',
  /** 2년 */
  TwoYears = '2',
  /** 3년 */
  ThreeYears = '3',
  /** 4년 */
  FourYears = '4',
  /** 5년 */
  FiveYears = '5',
  /** 6년 */
  SixYears = '6',
  /** 7년 */
  SevenYears = '7',
  /** 8년 */
  EightYears = '8',
  /** 9년 */
  NineYears = '9',
  /** 10년 이상 */
  TenYearsOrMore = '10',
}
