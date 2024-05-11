import { Request, Response } from "express";
import { GitHubService } from '../services/git-hub.service';
import { DiscordService } from "../services/discord.service";

export class GitHubController {
   constructor(
      private readonly gitHubService:GitHubService,
      private readonly discordService:DiscordService
   ) {
      
   }

   webhookHandler = ( req: Request, res: Response ) => {
      const githubEvent = req.header('x-github-event') ?? 'unknown';
      const signature = req.header('x-hub-signature-256') ?? 'unknown';
      const payload = req.body;

      console.log(signature);
      let message: string = '';
      switch (githubEvent) {
         case 'star':
            message = this.gitHubService.onStart( payload );
            break;
         case 'issues':
            message = this.gitHubService.onIssues( payload );
            break;
         default:
            console.log('<--------------- JK Controller --------------->');
            console.log(`unknown: ${githubEvent}`);
            break;
      }
      console.log('<--------------- JK Controller --------------->');
      console.log({message});
      if ( message ) {
         this.discordService.notify(message)
            .then( () => res.status(202).json({
                  msg: 'accepted',
               })
            )
            .catch( () => res.status(500).json({ err: 'Internal server error' }) );
      }
   }
}