import { type CommandInteraction, SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Provides information about the user.'),
  execute(interaction: CommandInteraction) {
    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild
    if (!interaction.member || !interaction.guild) {
      return interaction.reply('Error: Unable to fetch member or guild information.');
    }
    const member = interaction.member;
    if ('joinedAt' in member) {
      return interaction.reply(
        `This command was run by ${interaction.user.username}, who joined on ${member.joinedAt}.`,
      );
    }
    return interaction.reply(
      `This command was run by ${interaction.user.username}, but joined date is unavailable.`,
    );
  },
};
