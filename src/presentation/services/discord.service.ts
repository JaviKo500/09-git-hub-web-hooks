import { envs } from "../../config";

export class DiscordService {
   private readonly discordWebHookUrl: string = envs.DISCORD_WEBHOOK_URL;
   constructor() {
      
   }

   async notify( message: string ) {
      const body = {
         content: message,
         embeds: [
            {
               image: {
                  url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmt1MG1jc3RlbHpsbWM0aTB0eW5sancyNWt0dmhwY243ZTY2dDd1YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/du3J3cXyzhj75IOgvA/giphy.gif',
               },
            }
         ]
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