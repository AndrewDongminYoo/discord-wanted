# Discord 시작하기 앱

이 프로젝트는 [시작 가이드](https://discord.com/developers/docs/getting-started)를 위해 작성된, 가위바위보 스타일의 기본적인 Discord 앱을 JavaScript로 구현한 예제입니다.

![앱 데모](https://github.com/discord/discord-example-app/raw/main/assets/getting-started-demo.gif?raw=true)

## 프로젝트 구조

다음은 프로젝트의 기본적인 구조입니다:

```log
├── examples    -> 짧고 특정 기능에 대한 샘플 앱들
│   ├── app.js  -> 완성된 app.js 코드
│   ├── button.js
│   ├── command.js
│   ├── modal.js
│   ├── selectMenu.js
├── .env.sample -> 샘플 .env 파일
├── app.js      -> 앱의 메인 진입점
├── commands.js -> 슬래시 명령어 페이로드 및 헬퍼
├── game.js     -> RPS 관련 로직
├── utils.js    -> 유틸리티 함수와 열거형(enum)
├── package.json
├── README.md
└── .gitignore
```

## 로컬에서 앱 실행하기

시작하기 전에 [NodeJS](https://nodejs.org/en/download/)를 설치하고, 적절한 권한을 가진 [Discord 앱을 생성](https://discord.com/developers/applications)해야 합니다:

- `applications.commands`
- `bot` (메시지 전송 권한 활성화)

앱 설정에 대한 자세한 내용은 [시작 가이드](https://discord.com/developers/docs/getting-started)에서 확인할 수 있습니다.

### 프로젝트 설정

먼저 프로젝트를 클론합니다:

```sh
git clone https://github.com/discord/discord-example-app.git
```

그런 다음 프로젝트 디렉토리로 이동하여 의존성을 설치합니다:

```sh
cd discord-example-app
npm install
```

### 앱 자격 증명 가져오기

앱 설정에서 자격 증명을 가져와 `.env` 파일에 추가하세요 (`.env.sample` 파일을 참고하세요). 필요한 값은 앱 ID (`APPLICATION_ID`), 봇 토큰 (`DISCORD_TOKEN`), 그리고 공개 키 (`PUBLIC_KEY`)입니다.

자격 증명 가져오는 방법에 대한 자세한 내용은 [시작 가이드](https://discord.com/developers/docs/getting-started)에서 확인할 수 있습니다.

> 🔑 환경 변수는 로컬에서 개발할 때 `.env` 파일에 추가하거나, Replit의 Secrets 탭(왼쪽의 자물쇠 아이콘)에 추가할 수 있습니다.

### 슬래시 명령어 설치

예제 앱의 명령어는 `commands.js`에 설정되어 있습니다. `commands.js`의 `ALL_COMMANDS` 배열에 있는 모든 명령어는 `package.json`에 설정된 `register` 명령을 실행하면 설치됩니다:

```sh
npm run register
```

### 앱 실행

자격 증명을 추가한 후, 앱을 실행하세요:

```sh
node app.js
```

> ⚙️ 로컬 개발 시 변경 사항을 감지하고 앱을 재시작하는 [`nodemon`](https://github.com/remy/nodemon)과 같은 패키지를 사용하는 것이 유용할 수 있습니다.

만약 [시작 가이드](https://discord.com/developers/docs/getting-started)를 따르지 않고 있다면, `examples/app.js`의 내용을 최상위 `app.js` 파일로 이동할 수 있습니다.

### 상호작용 설정

이 프로젝트는 Discord가 요청을 보낼 수 있는 공개 엔드포인트가 필요합니다. 로컬에서 개발하고 테스트하려면 [`ngrok`](https://ngrok.com/)과 같은 도구를 사용하여 HTTP 트래픽을 터널링할 수 있습니다.

ngrok을 아직 설치하지 않았다면 설치한 후, 포트 `3000`에서 청취를 시작하세요:

```sh
ngrok http 3000
```

연결이 열렸는지 확인할 수 있습니다:

```log
Tunnel Status                 online
Version                       2.0/2.0
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://1234-someurl.ngrok.io -> localhost:3000

Connections                  ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

`https`로 시작하는 포워딩 주소를 복사한 후, [앱 설정](https://discord.com/developers/applications)으로 이동하세요.

**General Information** 탭에서 **Interactions Endpoint URL**을 찾고, 여기에 ngrok 주소를 붙여넣은 뒤 `/interactions`를 추가하세요 (예시: `https://1234-someurl.ngrok.io/interactions`).

**Save Changes**를 클릭하면 앱이 실행할 준비가 완료됩니다 🚀

## 기타 리소스

- **[문서](https://discord.com/developers/docs/intro)**를 읽어 API 기능에 대한 심도 있는 정보를 확인하세요.
- 이 프로젝트의 `examples/` 폴더에서 더 작은 기능별 코드 예제를 찾아보세요.
- **[Discord Developers 서버](https://discord.gg/discord-developers)**에 가입해 API에 대한 질문을 하고, Discord API 팀이 주최하는 이벤트에 참석하고, 다른 개발자들과 소통해 보세요.
- 커뮤니티가 관리하는 언어별 도구를 확인하려면 **[커뮤니티 리소스](https://discord.com/developers/docs/topics/community-resources#community-resources)**를 참조하세요.
