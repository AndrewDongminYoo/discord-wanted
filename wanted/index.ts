import Axios from 'axios';

import { JobInfoDisplay } from './job-info-display.js';
import { isValidLocation } from './locations.js';
import { type JobGroupId, type JobIds, type JobSort, type Years } from './types/user-enums.js';
import { type UserInput } from './types/user-input.js';
import { type CountryCode, type JobData, type WantedResponse } from './types/wanted-response.js';

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

export const axios = Axios.create({
  baseURL,
  headers,
  timeout: 10000,
  withCredentials: true,
});

function buildUrl(params: UserInput): string {
  const queryParams: string[] = [];

  // 기본값 설정
  const jobSortKey: JobSort = params.jobSortKey ?? 'job.recommend_order';
  const jobGroupId: JobGroupId = params.jobGroupId ?? 518;
  const countryKey: CountryCode = params.countryKey ?? 'kr';
  const limit = params.limit ?? 10;

  // 채용 정보 정렬 키 추가
  queryParams.push(`job_sort=${jobSortKey}`);

  // 채용 정보 그룹 ID 추가
  queryParams.push(`job_group_id=${jobGroupId}`);

  // 직무 ID 추가
  if (params.jobIds.length > 0) {
    params.jobIds.forEach((id: JobIds) => queryParams.push(`job_ids=${id}`));
  }

  // 경력 연도 추가
  if (params.years.length > 0) {
    params.years.forEach((year: Years) => queryParams.push(`years=${year}`));
  }

  // 국가 추가
  queryParams.push(`country=${countryKey}`);

  if (isValidLocation(params.locationKey)) {
    // 위치 추가
    queryParams.push(`locations=${params.locationKey}`);
  } else {
    // 모든 지역
    queryParams.push('locations=all');
  }

  // 결과 제한 추가
  queryParams.push(`limit=${limit}`);

  return `/api/chaos/navigation/v1/results?${queryParams.join('&')}`;
}

export async function fetchJobs(jobIds: JobIds[], years: Years[], locationKey: string) {
  const userInput: UserInput = {
    jobIds, // 디스코드에서 입력된 값
    years, // 디스코드에서 입력된 값
    locationKey, // 디스코드에서 입력된 값
  };

  const url = buildUrl(userInput);
  const response = await axios.get<WantedResponse>(url);

  const jobs: WantedResponse = response.data;

  return jobs.data.map((job: JobData) => {
    const jobInfo = new JobInfoDisplay(job);

    // 유용한 정보 출력
    console.debug('유용한 정보:');
    console.debug(jobInfo.usefulInfo());

    // 덜 유용한 추가 정보 출력
    console.debug('추가 정보:');
    console.debug(jobInfo.additionalInfo());

    return jobInfo;
  });
}

// 예시로 함수 호출: 실제로는 디스코드로부터 입력받은 인수로 호출될 것
// await fetchJobs([10111], ['-1'], 'seoul.all');
