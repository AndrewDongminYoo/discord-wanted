import Axios from 'axios';

import { JobInfoDisplay } from './job-info-display.js';
import type { Sort } from './types/job-codes.js';
import type { JumpItResponse, JumpItResult, Position } from './types/jump-it-response.js';
import type { StackName } from './types/tech-stacks.js';

const baseURL = 'https://jumpit-api.saramin.co.kr';

const saramin = Axios.create({
  baseURL,
  headers: {
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    'priority': 'u=1, i',
    'sec-ch-ua': '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'Referer': 'https://jumpit.saramin.co.kr/',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  },
  timeout: 10000,
});

interface UrlOption {
  /**
   * '전체'인 경우 입력하지 않음
   */
  career?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';
  techStack: StackName[];
  sort?: Sort['id'];
  location?: number;
  jobCategory?: number;
}

function buildUrl({
  career,
  techStack = [],
  sort = 'popular',
  location,
  jobCategory,
}: UrlOption): string {
  const queryParams: string[] = [];
  if (career) {
    const temp = Number(career);
    if (temp >= 0 && temp <= 10) {
      queryParams.push(`career=${career}`);
    }
  }
  techStack.forEach((tech) => queryParams.push(`techStack=${tech}`));

  if (location) {
    queryParams.push(`locationTag=${location}`);
  }
  if (jobCategory) {
    queryParams.push(`jobCategory=${jobCategory}`);
  }
  queryParams.push(`sort=${sort}`);

  return `/api/positions?${queryParams.join('&')}`;
}

/**
 * Saramin API에서 채용 정보를 가져오는 함수
 * @param options - career, techStack, sort, highlight 옵션 객체
 * @returns Saramin API 응답 데이터
 */
export async function fetchSaraminJobs(options: UrlOption): Promise<JobInfoDisplay[]> {
  const url = buildUrl(options);

  try {
    const response = await saramin.get<JumpItResponse>(url);
    const jobs: JumpItResult = response.data.result;

    return jobs.positions.map((position: Position) => new JobInfoDisplay(position));
  } catch (error) {
    console.error('Error fetching Saramin jobs:', error);
    throw error;
  }
}

// 예시: career가 0, 기술 스택이 Java와 Spring인 경우 호출
// fetchSaraminJobs({ career: '0', techStack: ['Java', 'Spring'] });
