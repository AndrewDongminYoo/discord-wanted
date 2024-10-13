import { attractionTagsMap } from './attraction-tags.js';
import { type JobData, type Reward } from './wanted-response.js';

export class JobInfoDisplay {
  constructor(private jobData: JobData) {}

  // 유용한 정보를 반환하는 메서드
  public getUsefulInfo() {
    const { id, company, position, address, annual_from, annual_to, is_newbie, reward } =
      this.jobData;

    return {
      company: company.name,
      position,
      jobInfoLink: `https://www.wanted.co.kr/wd/${id}`,
      comanyInfoLink: `https://www.wanted.co.kr/company/${company.id}`,
      address: `${address.location} ${address.district ?? '전체'}`,
      experienceRange: `${annual_from} - ${annual_to}년`,
      isNewbie: is_newbie ? '신입 가능' : '경력직',
      reward: this.formatReward(reward),
      avgResponseRate: company.application_response_stats.avg_rate,
    };
  }

  // 덜 유용한 추가 정보를 반환하는 메서드
  public getAdditionalInfo() {
    const { is_bookmark, title_img, skill_tags, attraction_tags } = this.jobData;

    return {
      bookmark: is_bookmark ? '북마크 O' : '북마크 X',
      titleImage: title_img.thumb,
      skillTags: skill_tags.length ? skill_tags : '기술 태그 없음',
      attractionTags: attraction_tags.length
        ? this.getAttractionTags(attraction_tags)
        : '장점 태그 없음',
    };
  }

  // Attraction tags를 태그 ID에서 태그 이름으로 변환하는 메서드
  private getAttractionTags(tagIds: number[]): string[] {
    return tagIds.map((id) => attractionTagsMap[id] || `알 수 없는 태그(${id})`);
  }

  // 리워드 포맷팅 함수
  private formatReward(reward: Reward | undefined) {
    if (reward) {
      return `추천인: ${reward.reward_recommender} ${reward.reward_recommender_unit}, 지원자: ${reward.reward_recommendee} ${reward.reward_recommendee_unit}`;
    }
    return '리워드 정보 없음';
  }
}
