import 'dotenv/config';

import {
  ButtonStyleTypes,
  InteractionResponseType,
  InteractionType,
  MessageComponentTypes,
  verifyKeyMiddleware,
} from 'discord-interactions';
import express, { type Request, type Response } from 'express';

import { getRandomEmoji } from './utils.js';

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT ?? 3000;

const PUBLIC_KEY = process.env.PUBLIC_KEY ?? '';

console.debug(PUBLIC_KEY);

// Store for in-progress games. In production, you'd want to use a DB
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const activeGames: Record<any, any> = {};

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 * Parse request body and verifies incoming requests using discord-interactions package
 */
app.post('/interactions', verifyKeyMiddleware(PUBLIC_KEY), (req: Request, res: Response) => {
  // Interaction type and data
  const type: InteractionType = req.body.type;
  const id: number = req.body.id;
  const data: {
    id: string;
    name: string;
    type: number;
    options: Array<{
      name: string;
      type: number;
      value: string;
    }>;
  } = req.body.data;

  console.debug('🚀 - type: InteractionType', type);
  console.debug('🚀 - id: number', id);
  console.debug('🚀 - data:', data);

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    // "test" command
    if (name === 'test') {
      // Send a message into the channel where command was triggered from
      res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: `hello world ${getRandomEmoji()}`,
        },
      });
    }

    // "challenge" command
    if (name === 'challenge' && id) {
      // Interaction context
      const context = req.body.context;
      // User ID is in user field for (G)DMs, and member for servers
      const userId = context === 0 ? req.body.member.user.id : req.body.user.id;
      // User's object choice
      const objectName = req.body.data.options[0].value;

      // Create active game using message ID as the game ID
      activeGames[id] = {
        id: userId,
        objectName,
      };

      console.debug('🚀 - activeGames:', activeGames);

      res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `Rock papers scissors challenge from <@${userId}>`,
          components: [
            {
              type: MessageComponentTypes.ACTION_ROW,
              components: [
                {
                  type: MessageComponentTypes.BUTTON,
                  // Append the game ID to use later on
                  custom_id: `accept_button_${req.body.id}`,
                  label: 'Accept',
                  style: ButtonStyleTypes.PRIMARY,
                },
              ],
            },
          ],
        },
      });
    }

    console.error(`unknown command: ${name}`);
    res.status(400).json({ error: 'unknown command' });
  }

  console.error('unknown interaction type', type);
  res.status(400).json({ error: 'unknown interaction type' });
});

app.listen(PORT, () => {
  console.debug('Listening on port', PORT);
});
