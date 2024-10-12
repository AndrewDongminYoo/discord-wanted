import Axios from 'axios';
import { WantedResponse } from './wanted-response';

const baseURL = 'https://www.wanted.co.kr';

const headers = {
  accept: 'application/json, text/plain, */*',
  'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
  priority: 'u=1, i',
  'sec-ch-ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"macOS"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'wanted-user-agent': 'user-web',
  'wanted-user-country': 'KR',
  'wanted-user-language': 'ko',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

const axios = Axios.create({
  baseURL,
  headers,
  timeout: 10000,
  withCredentials: true,
});

export interface UserInput {
  jobSortKey?: string; // 예시: 'job.recommend_order', 'job.latest_order'
  jobGroupId?: number; // 예시: 518 '개발'
  jobIds?: number[]; // 예시: [10110(소프트웨어 엔지니어), 873(웹 개발자), 872(서버 개발자), 669(프론트엔드 개발자), 660(자바 개발자)]
  years?: string[]; // 사용자 경력 기준 (-1(전체), 0(신입), 1(1년차)...)
  countryKey?: string; // 예시: 한국의 경우 'kr'
  locationKey?: string; // 예시: 'seoul.all'
  limit?: number; // 결과 수
}

function buildUrl(params: UserInput): string {
  const queryParams: string[] = [];

  // 작업 정렬 키 추가
  if (params.jobSortKey) {
    queryParams.push(`job_sort=${params.jobSortKey}`);
  }

  // 작업 그룹 ID 추가
  if (params.jobGroupId) {
    queryParams.push(`job_group_id=${params.jobGroupId}`);
  }

  // 직무 ID 추가
  if (params.jobIds && params.jobIds.length > 0) {
    params.jobIds.forEach((id) => queryParams.push(`job_ids=${id}`));
  }

  // 경력 연도 추가
  if (params.years && params.years.length > 0) {
    params.years.forEach((year) => queryParams.push(`years=${year}`));
  }

  // 국가 추가
  if (params.countryKey) {
    queryParams.push(`country=${params.countryKey}`);
  }

  // 위치 추가
  if (params.locationKey) {
    queryParams.push(`locations=${params.locationKey}`);
  }

  // 결과 제한 추가
  queryParams.push(`limit=${params.limit || 20}`);

  return `/api/chaos/navigation/v1/results?${queryParams.join('&')}`;
}

export async function run() {
  const userInput: UserInput = {
    jobSortKey: 'job.recommend_order', // 스키마 예시
    jobGroupId: 518, // 그룹 ID 예시
    jobIds: [873, 872, 10110, 669, 660], // 스키마의 예시 직무 ID
    years: ['0', '5'], // 예제 경력 연도
    countryKey: 'kr', // 예제 국가(한국)
    locationKey: 'seoul.all', // 예시 위치(서울)
    limit: 20, // 결과 수 제한
  };

  const url = buildUrl(userInput);
  const response = await fetchData(url);

  const jobs: WantedResponse = response.data;
  console.debug(jobs.data);
}

function fetchData(url: string) {
  return axios.get(url);
}

run();
