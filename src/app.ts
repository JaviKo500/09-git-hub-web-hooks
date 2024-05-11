import express from 'express';
import { envs } from './config';
import { GitHubController } from './presentation/github/controller';
import { GitHubService } from './presentation/services/git-hub.service';
import { DiscordService } from './presentation/services/discord.service';
import { GitHubSha256Middleware } from './presentation/middlewares/git-hub-sha256.middleware';
(() => {
   main();
})();

function main() {
   const app = express();
   const gitHubService = new GitHubService();
   const discordService = new DiscordService();
   const controller = new GitHubController( gitHubService, discordService );

   app.use( express.json() );
   app.use( GitHubSha256Middleware.verifySignature );

   app.post('/api/github', controller.webhookHandler);


   app.listen( envs.PORT, () => {
      console.log('<--------------- JK App --------------->');
      console.log(`App running port: ${envs.PORT}`);
   });
}