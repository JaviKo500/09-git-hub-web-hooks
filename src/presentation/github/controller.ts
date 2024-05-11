import { Request, Response } from "express";

export class GitHubController {
   constructor() {
      
   }

   webhookHandler = ( req: Request, res: Response ) => {
      const githubEvent = req.header('x-github-event') ?? 'unknown';
      const signature = req.header('x-hub-signature-256') ?? 'unknown';
      const payload = req.body;
      console.log('<--------------- JK Controller --------------->');
      console.log(payload);
      console.log(githubEvent);
      console.log(signature);
      res.status(202).json({
        msg: 'accepted',
      });
   }
}