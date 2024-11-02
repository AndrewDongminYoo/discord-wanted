export const jobSortMap = {
  추천순: 'job.recommend_order',
  최신순: 'job.latest_order',
  인기순: 'job.popularity_order',
} as const;

type JobSortKey = keyof typeof jobSortMap;
export type JobSort = (typeof jobSortMap)[JobSortKey];

export const jobGroupIdMap = {
  HR: 517,
  개발: 518,
  교육: 10101,
  금융: 508,
  디자인: 511,
  미디어: 524,
  영업: 530,
  '건설·시설': 509,
  '게임 제작': 959,
  '경영·비즈니스': 507,
  '고객서비스·리테일': 510,
  '공공·복지': 514,
  '마케팅·광고': 523,
  '물류·무역': 532,
  '법률·법집행기관': 521,
  '식·음료': 10057,
  '엔지니어링·설계': 513,
  '의료·제약·바이오': 515,
  '제조·생산': 522,
} as const;

type JobGroupIdKey = keyof typeof jobGroupIdMap;
export type JobGroupId = (typeof jobGroupIdMap)[JobGroupIdKey];

/** `개발` 직무 카테고리 ID */
export const jobIdsMap = {
  '소프트웨어 엔지니어': 10110,
  '웹 개발자': 873,
  '서버 개발자': 872,
  '프론트엔드 개발자': 669,
  '자바 개발자': 660,
  'C, C++ 개발자': 900,
  '파이썬 개발자': 899,
  '머신러닝 엔지니어': 1634,
  'DevOps / 시스템 관리자': 674,
  '데이터 엔지니어': 655,
  'Node.js 개발자': 895,
  '시스템, 네트워크 관리자': 665,
  '안드로이드 개발자': 677,
  'iOS 개발자': 678,
  '임베디드 개발자': 658,
  'QA, 테스트 엔지니어': 676,
  '개발 매니저': 877,
  '데이터 사이언티스트': 1024,
  '보안 엔지니어': 671,
  '빅데이터 엔지니어': 1025,
  '하드웨어 엔지니어': 672,
  '프로덕트 매니저': 876,
  '블록체인 플랫폼 엔지니어': 1027,
  '크로스플랫폼 앱 개발자': 10111,
  'PHP 개발자': 893,
  '.NET 개발자': 661,
  '영상, 음성 엔지니어': 896,
  '웹 퍼블리셔': 939,
  'ERP 전문가': 10230,
  '그래픽스 엔지니어': 898,
  'VR 엔지니어': 10112,
  'CTO, Chief Technology Officer': 795,
  'BI 엔지니어': 1022,
  '루비온레일즈 개발자': 894,
  'CIO, Chief Information Officer': 793,
} as const;

type JobIdKey = keyof typeof jobIdsMap;
export type JobIds = (typeof jobIdsMap)[JobIdKey];

// Years Enum
export const yearsMap = {
  전체: '-1',
  신입: '0',
  '1년': '1',
  '2년': '2',
  '3년': '3',
  '4년': '4',
  '5년': '5',
  '6년': '6',
  '7년': '7',
  '8년': '8',
  '9년': '9',
  '10년 이상': '10',
} as const;

type YearsKey = keyof typeof yearsMap;
export type Years = (typeof yearsMap)[YearsKey];
