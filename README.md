# Discord-wanted 🚀

🎯 **당신의 *Wanted!***

파편화된 수많은 공고들을 한 곳에서 깔끔하게 모아보세요, 바로 당신의 Discord에서!

## 💡 앱 개요

`Discord-wanted`는 Discord에서 사용할 수 있는 채용 공고 알림 봇입니다.<br>
[Wanted](https://www.wanted.co.kr/), [사람인](https://www.saramin.co.kr/), [잡코리아](https://www.jobkorea.co.kr/)와 같은 인기 채용 사이트의 공고를 수집하여,<br>
원하는 Discord 채널에 제공합니다.

## 🚀 시작하기

원하는 디스코드 채널에 봇을 추가하고, 당신의 관심사에 맞는 채용 공고를 받아보세요.<br>
더 이상 끝없는 검색은 필요 없습니다!

---

## 🔍 검색 조건

#### ![Location](https://img.shields.io/badge/🌍%20Location-007BFF?style=flat-square&logo=globe&logoColor=white)
**서울 (6개 구)**: 강남구, 구로구, 금천구, 마포구, 성동구, 송파구<br>
**광역시 및 도 (17개)**: 경기 (성남시), 인천, 부산, 대구, 광주, 대전, 울산, 세종, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주<br>

#### ![Years](https://img.shields.io/badge/⏰%20Years-28A745?style=flat-square&logo=clock&logoColor=white)
**전체** (신입 또는 경력 무관 - 키워드: `all`)<br>
**신입** (신입 채용 - 키워드: `new`)<br>
**경력** (연차에 따른 맞춤형 포지션 - 키워드: `N years`)<br>
**참고*: 경력 검색 결과는 해당 연차가 포함된 모든 공고를 보여줍니다.<br>

#### ![Job-id](https://img.shields.io/badge/💼%20JobId-FFC107?style=flat-square&logo=briefcase&logoColor=white)
- 당신의 커리어 목표에 맞는 포지션을 선택하세요.<br>
- **포지션**: `Sofeware Engineer`, `Web Developer`, `Server Developer`, `Front-end Developer`, `Back-end Developer`, `Java Developer`, `C,C++ Developer`, `Python Developer`, `Machine Learning Engineer`, `ETC...`<br>

---

## 🛠️ 기술 스택

### **서버**
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white)

### **언어**
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white)

### **기타 도구**
![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?style=flat-square&logo=Yarn&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=ESLint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=Prettier&logoColor=black)

---

## 📂 프로젝트 구조

프로젝트의 기본적인 구조는 다음과 같습니다:

```
[discord-wanted]
    ├── .cspell
    │   ├── regional.txt
    │   ├── technical.txt
    ├── .github
    │   └── .trunk
    │       ├── configs
    │       ├── .gitignore
    │       ├── trunk.yaml
    ├── .vscode
    │   ├── extensions.json
    │   ├── settings.json
    ├── jumpit
    │   ├── types
    │   │   ├── job-codes.ts
    │   │   ├── jump-it-response.ts
    │   │   ├── location-tags.ts
    │   │   ├── tech-stacks.ts
    │   ├── index.ts
    │   ├── job-info-display.ts
    ├── src
    │   ├── utils.ts
    ├── wanted
    │   ├── types
    │   │   ├── page-props.d.ts
    │   │   ├── user-enums.ts
    │   │   ├── user-input.d.ts
    │   │   ├── wanted-response.ts
    │   │   ├── attraction-tags.ts
    │   ├── index.ts
    │   ├── job-info-display.ts
    │   ├── locations.ts
    │   ├── skill-tags.ts
    ├── .gitignore
    ├── eslint.config.mjs
    ├── .prettierrc
    ├── package.json
    ├── parameters.json
    ├── renovate.json
    ├── tsconfig.json
    ├── README.md
    ├── app.ts
    ├── commands.ts
    ├── i-job-info-display.ts
    ├── yarn.lock
    ├── cspell.config.json
    └── serverless.yml
```

---

## 💡 제작자 정보

**AndrewDongminYoo**가 ❤️를 담아 만들었습니다. ✨
