import { type Years, type JobIds, type JobGroupId, type JobSort } from './user-enums.js';

export interface UserInput {
  /**
   * 결과 정렬 기준
   * @default JobSort.recommend
   */
  jobSortKey?: JobSort;
  /**
   * 채용 직무 카테고리
   * @default JobGroupId.development
   */
  jobGroupId?: JobGroupId;
  /** 채용 직무 카테고리 */
  jobIds: JobIds[];
  /** 채용 경력 */
  years: Years[];
  /** 국가 코드 */
  countryKey?: string;
  /** 지역 코드 */
  locationKey: string;
  /** 결과 개수 제한 */
  limit?: number;
}
