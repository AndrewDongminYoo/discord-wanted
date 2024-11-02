import { type JobGroupId, type JobIds } from './user-enums.js';

export interface WantedResponse {
  /** 채용정보 리스트 */
  data: JobData[];
  /** 페이지네이션 정보 */
  links: Links;
}

export interface Links {
  /** 이전 페이지 */
  prev: string | null;
  /** 다음 페이지 */
  next: string | null;
}

export interface JobData {
  /** 채용정보 ID, 채용 페이지 이동 시 https://www.wanted.co.kr/wd/${id} */
  id: number;
  /** 북마크 여부 */
  is_bookmark: boolean;
  /** 채용 회사 */
  company: Company;
  /** 채용 정보 이미지 */
  title_img: TitleImage;
  /** 채용 회사 주소 */
  address: Address;
  /** 포지션 이름 */
  position: string;
  /** 직무 카테고리 태그 */
  category_tag: CategoryTag;
  /** 포지션 관련 태그 (연봉 상위 11~20%, 식대지원 등) */
  attraction_tags: number[];
  /** 기술 스택 태그 */
  skill_tags: number[];
  /** 면접 리뷰 등 지원자 태그 */
  user_oriented_tags: number[];
  /** 최소 연차 */
  annual_from: number;
  /** 최대 연차 */
  annual_to: number;
  /** 신입 채용 여부 */
  is_newbie: boolean;
  /** 합격보상 */
  reward?: Reward;
}

export interface Address {
  /** 국가 */
  country: Country;
  /** 지역 (서울, 경기 등) */
  location: Location;
  /** 상세 지역 (강남구, 구로구 등) */
  district: null | string;
}

export const countryCodes = {
  전세계: 'all',
  대만: 'tw',
  싱가폴: 'sg',
  일본: 'jp',
  한국: 'kr',
} as const;

export type Country = keyof typeof countryCodes;
export type CountryCode = (typeof countryCodes)[Country];

export type Location =
  | '전국'
  | '서울'
  | '부산'
  | '대구'
  | '인천'
  | '광주'
  | '대전'
  | '울산'
  | '세종'
  | '경기'
  | '강원'
  | '충북'
  | '충남'
  | '전북'
  | '전남'
  | '경북'
  | '경남'
  | '제주';

export interface CategoryTag {
  /** 직무 그룹 ID */
  parent_id: JobGroupId;
  /** 직무 카테고리 ID */
  id: JobIds;
}

export interface Company {
  /** 회사 ID https://www.wanted.co.kr/company/${id} */
  id: number;
  /** 회사 이름 */
  name: string;
  /** 회사 지원 응답률 상태 */
  application_response_stats: ApplicationResponseStats;
}

export interface ApplicationResponseStats {
  /** 평균 응답률 */
  avg_rate: number;
}

export interface TitleImage {
  /** 원본 이미지 */
  origin: string;
  /** 썸네일용 이미지 */
  thumb: string;
  /** 비디오 주소 */
  video: string | null;
}

export interface Reward {
  /** 국가코드 */
  country: CountryCode;
  /** 추천인 합격보상 */
  reward_recommender: number;
  /** 지원자 합격보상 */
  reward_recommendee: number;
  /** 추천인 합격보상 단위 */
  reward_recommender_unit: Currency;
  /** 지원자 합격보상 단위 */
  reward_recommendee_unit: Currency;
}

export type Currency = 'KRW' | 'JPY' | 'TWD' | 'USD' | 'SGD';
