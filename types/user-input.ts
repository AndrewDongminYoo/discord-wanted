export interface UserInput {
  jobSortKey?: string; // 예시: 'job.recommend_order', 'job.latest_order'
  jobGroupId?: number; // 예시: 518 '개발'
  jobIds: number[]; // 예시: [10110(소프트웨어 엔지니어), 873(웹 개발자), 872(서버 개발자), 669(프론트엔드 개발자), 660(자바 개발자)]
  years: string[]; // 사용자 경력 기준 (-1(전체), 0(신입), 1(1년차)...)
  countryKey?: string; // 예시: 한국의 경우 'kr'
  locationKey: string; // 예시: 'seoul.all'
  limit?: number; // 결과 수
}
