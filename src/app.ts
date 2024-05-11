import express from 'express';
import { envs } from './config';
import { GitHubController } from './presentation/github/controller';
import { GitHubService } from './presentation/services/git-hub.service';
(() => {
   main();
})();

function main() {
   const app = express();
   const gitHubService = new GitHubService();
   const controller = new GitHubController( gitHubService );

   app.use( express.json() );

   app. post('/api/github', controller.webhookHandler);


   app.listen( envs.PORT, () => {
      console.log('<--------------- JK App --------------->');
      console.log(`App running port: ${envs.PORT}`);
   });
}