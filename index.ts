import fs from 'node:fs';
import path from 'node:path';

import { Client, Events, GatewayIntentBits, type SlashCommandBuilder } from 'discord.js';
import { configDotenv } from 'dotenv';

// .env 파일 내용을 process.env로 로드합니다.
configDotenv();

// 새 클라이언트 인스턴스를 만듭니다.
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

/**
 * Discord 클라이언트가 준비되고 로그인하면 메시지를 기록합니다.
 * 이 이벤트는 클라이언트가 로그인 및 설정을 완료하면 발생합니다.
 * @param client - 이제 Discord 클라이언트 인스턴스가 준비되었습니다.
 */
client.once(Events.ClientReady, (onReady: Client<true>) => {
  console.debug(`Ready! Logged in as ${onReady.user.tag}`);
});

client.on(Events.InteractionCreate, (interaction) => {
  if (!interaction.isChatInputCommand()) {
    return;
  }
  console.debug(interaction);
});

// 클라이언트의 토큰으로 Discord에 로그인합니다.
await client.login(process.env.DISCORD_TOKEN);

const commands: object[] = [];
const foldersPath = path.join(import.meta.dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  // Grab all the command files from the commands directory you created earlier
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.ts'));
  // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = import(filePath);
    /* eslint-disable-next-line no-await-in-loop */
    await command.then((content: { default: object }) => {
      const data = content.default;
      console.debug(data);
      if ('data' in data && 'execute' in data) {
        commands.push((data.data as SlashCommandBuilder).toJSON());
      } else {
        console.debug(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
        );
      }
    });
  }
}
