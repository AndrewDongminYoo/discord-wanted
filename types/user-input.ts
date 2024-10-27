import { type JobGroupId, type JobIds, type JobSort, type Years } from './user-enums.js';
import { type CountryCode } from './wanted-response.js';

export interface UserInput {
  /**
   * 결과 정렬 기준
   * @default 'job.recommend_order'
   */
  jobSortKey?: JobSort;
  /**
   * 채용 직무 카테고리
   * @default 518
   */
  jobGroupId?: JobGroupId;
  /** 채용 직무 카테고리 */
  jobIds: JobIds[];
  /** 채용 경력 */
  years: Years[];
  /** 국가 코드 */
  countryKey?: CountryCode;
  /** 지역 코드 */
  locationKey: string;
  /** 결과 개수 제한 */
  limit?: number;
}
