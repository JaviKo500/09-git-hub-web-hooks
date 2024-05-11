import express from 'express';
import { envs } from './config';
(() => {
   main();
})();

function main() {
   const app = express();

   app. post('/api/github', (req, res) => {
      res.status(200).json({
        msg: 'github',
      });
   });
   app.listen( envs.PORT, () => {
      console.log('<--------------- JK App --------------->');
      console.log(`App running port: ${envs.PORT}`);
   });
}