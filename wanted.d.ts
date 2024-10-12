export interface WantedResponse {
  data: JobData[];
}

export interface JobData {
  id: number;
  is_bookmark: boolean;
  company: Company;
  title_img: TitleImg;
  address: Address;
  position: string;
  category_tag: CategoryTag;
  attraction_tags: number[];
  skill_tags: number[];
  user_oriented_tags: number[];
  annual_from: number;
  annual_to: number;
  is_newbie: boolean;
}

export interface Address {
  country: AddressCountry;
  location: Location;
  district: string;
}

export enum AddressCountry {
  한국 = '한국',
}

export enum Location {
  서울 = '서울',
}

export interface CategoryTag {
  parent_id: number;
  id: number;
}

export interface Company {
  id: number;
  name: string;
  application_response_stats: ApplicationResponseStats;
}

export interface ApplicationResponseStats {
  avg_rate: number;
}

export interface TitleImg {
  origin: string;
  thumb: string;
  video: null;
}
