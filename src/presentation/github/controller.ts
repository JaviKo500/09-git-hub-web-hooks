import { Request, Response } from "express";
import { GitHubService } from '../services/git-hub.service';

export class GitHubController {
   constructor(
      private readonly gitHubService:GitHubService
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
      res.status(202).json({
        msg: 'accepted',
      });
   }
}