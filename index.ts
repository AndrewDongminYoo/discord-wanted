import { Client, Events, GatewayIntentBits } from "discord.js";
import { configDotenv } from "dotenv";

// .env 파일 내용을 process.env로 로드합니다.
configDotenv();

// 새 클라이언트 인스턴스를 만듭니다.
const discordClient = new Client({ intents: [GatewayIntentBits.Guilds] });

/**
 * Discord 클라이언트가 준비되고 로그인하면 메시지를 기록합니다.
 * 이 이벤트는 클라이언트가 로그인 및 설정을 완료하면 발생합니다.
 * @param client - 이제 Discord 클라이언트 인스턴스가 준비되었습니다.
 */
discordClient.once(Events.ClientReady, (client: Client<true>) => {
  console.debug(`Ready! Logged in as ${client.user.tag}`);
});

// 클라이언트의 토큰으로 Discord에 로그인합니다.
discordClient.login(process.env.DISCORD_TOKEN);
