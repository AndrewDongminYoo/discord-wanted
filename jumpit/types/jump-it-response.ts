export interface JumpItResponse {
  message: string;
  status: number;
  code: string;
  result: Result;
}

export interface Result {
  totalCount: number;
  page: number;
  keyword: string;
  keywordType: string;
  positions: Position[];
  emptyPosition: boolean;
}

export interface Position {
  id: number;
  jobCategory: string;
  logo: string;
  imagePath: string;
  title: string;
  companyName: string;
  techStacks: string[];
  scrapCount: number;
  viewCount: number;
  newcomer: boolean;
  minCareer: number;
  maxCareer: number;
  locations: string[];
  alwaysOpen: boolean;
  closedAt: Date;
  serialNumber: string;
  encodedSerialNumber: string;
  celebration: number;
  applied: boolean;
  scraped: boolean;
  hiddenPosition: boolean;
}
