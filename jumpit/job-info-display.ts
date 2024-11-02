import { type AdditionalInfo, IJobInfoDisplay, type UsefulInfo } from '../i-job-info-display.js';
import { type Position } from './types/jump-it-response.js';

export class JobInfoDisplay extends IJobInfoDisplay {
  constructor(protected position: Position) {
    super(position);
  }

  // 유용한 정보를 반환하는 메서드
  public usefulInfo(): UsefulInfo {
    const { id, companyName, title, locations, minCareer, maxCareer, celebration } = this.position;

    return {
      company: companyName,
      position: title,
      jobInfoLink: `https://jumpit.saramin.co.kr/position/${id}`,
      address: locations.filter(Boolean).join(' ') || '주소 정보 없음',
      experienceRange: `${minCareer} - ${maxCareer}년차`,
      isNewbie: minCareer === 0 ? '신입 가능' : '경력',
      reward: this.formatReward(celebration),
    };
  }

  // 덜 유용한 추가 정보를 반환하는 메서드
  public additionalInfo(): AdditionalInfo {
    const { scraped, imagePath, techStacks } = this.position;

    return {
      bookmark: scraped ? '북마크 O' : '북마크 X',
      titleImage: imagePath,
      skillTags: techStacks.length ? techStacks.join(' ') : '기술 태그 없음',
    };
  }

  // 리워드 포맷팅 함수
  private formatReward(reward: number | undefined): string {
    if (reward) {
      const recommenderAmount = this.formatCurrency(reward, 'KRW');
      const recommendeeAmount = this.formatCurrency(reward, 'KRW');

      return `추천인: ${recommenderAmount}, 지원자: ${recommendeeAmount}`;
    }
    return '리워드 정보 없음';
  }
}
