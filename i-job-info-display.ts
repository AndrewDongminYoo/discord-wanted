export interface UsefulInfo {
  company: string;
  position: string;
  jobInfoLink: string;
  companyInfoLink?: string;
  address: string;
  experienceRange: string;
  isNewbie: string;
  reward: string;
  avgResponseRate?: number;
}

export interface AdditionalInfo {
  bookmark: string;
  titleImage?: string;
  skillTags: string;
  attractionTags?: string;
}

export abstract class IJobInfoDisplay {
  constructor(protected data: object) {}

  // 통화 포맷팅 함수
  protected formatCurrency(amount: number, currencyCode: string): string {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: 0, // 소수점 이하 자릿수 조절
    }).format(amount);
  }

  // 유용한 정보를 반환하는 메서드
  public abstract usefulInfo(): UsefulInfo;

  // 덜 유용한 추가 정보를 반환하는 메서드
  public abstract additionalInfo(): AdditionalInfo;
}
