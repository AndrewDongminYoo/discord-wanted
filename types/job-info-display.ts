import { attractionTagsMap } from './attraction-tags.js';
import { skillStackTagsMap } from './skill-tags.js';
import { type Currency, type JobData, type Reward } from './wanted-response.js';

interface UsefulInfo {
  company: string;
  position: string;
  jobInfoLink: string;
  companyInfoLink: string;
  address: string;
  experienceRange: string;
  isNewbie: string;
  reward: string;
  avgResponseRate?: number;
}

interface AdditionalInfo {
  bookmark: string;
  titleImage?: string;
  skillTags: string;
  attractionTags: string;
}

export class JobInfoDisplay {
  constructor(private jobData: JobData) {}

  // 유용한 정보를 반환하는 메서드
  public usefulInfo(): UsefulInfo {
    const { id, company, position, address, annual_from, annual_to, is_newbie, reward } =
      this.jobData;

    return {
      company: company.name,
      position,
      jobInfoLink: `https://www.wanted.co.kr/wd/${id}`,
      companyInfoLink: `https://www.wanted.co.kr/company/${company.id}`,
      address: [address.location, address.district].filter(Boolean).join(' ') || '주소 정보 없음',
      experienceRange: `${annual_from} - ${annual_to}년차`,
      isNewbie: is_newbie ? '신입 가능' : '경력',
      reward: this.formatReward(reward),
      avgResponseRate: company.application_response_stats?.avg_rate,
    };
  }

  // 덜 유용한 추가 정보를 반환하는 메서드
  public additionalInfo(): AdditionalInfo {
    const { is_bookmark, title_img, skill_tags, attraction_tags } = this.jobData;

    return {
      bookmark: is_bookmark ? '북마크 O' : '북마크 X',
      titleImage: title_img?.thumb,
      skillTags: skill_tags.length
        ? this.getTags(skill_tags, skillStackTagsMap).join(' ')
        : '기술 태그 없음',
      attractionTags: attraction_tags.length
        ? this.getTags(attraction_tags, attractionTagsMap).join(' ')
        : '장점 태그 없음',
    };
  }

  // 태그 ID를 태그 이름으로 변환하는 일반화된 메서드
  private getTags(tagIds: number[], tagsMap: Record<number, string>): string[] {
    return tagIds.map((id) => `#${tagsMap[id] || ''}`).filter((text) => text.length > 1);
  }

  // 리워드 포맷팅 함수
  private formatReward(reward: Reward | undefined): string {
    if (reward) {
      const recommenderAmount = this.formatCurrency(
        reward.reward_recommender,
        reward.reward_recommender_unit,
      );
      const recommendeeAmount = this.formatCurrency(
        reward.reward_recommendee,
        reward.reward_recommendee_unit,
      );

      return `추천인: ${recommenderAmount}, 지원자: ${recommendeeAmount}`;
    }
    return '리워드 정보 없음';
  }

  // 통화 포맷팅 함수
  private formatCurrency(amount: number, currencyCode: Currency): string {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: 0, // 소수점 이하 자릿수 조절
    }).format(amount);
  }
}
