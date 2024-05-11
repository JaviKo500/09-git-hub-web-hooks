import { envs } from "../../config";

export class DiscordService {
   private readonly discordWebHookUrl: string = envs.DISCORD_WEBHOOK_URL;
   constructor() {
      
   }

   async notify( message: string ) {
      const body = {
         content: message,
      };

      const response = await fetch(
         this.discordWebHookUrl,
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
         }
      );

      if ( !response.ok ) {
         console.log('<--------------- JK Discord.service Error --------------->');
         console.log('Error sending message in discord');
         return false;
      }
      return true;
   }

}