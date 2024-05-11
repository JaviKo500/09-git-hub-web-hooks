import { NextFunction, Request, Response } from "express";

import * as crypto from "crypto";
import { envs } from "../../config";

const SECRET_TOKEN: string = envs.SECRET_TOKEN;

const verify_signature = (req: Request) => {
   try {
      const signature = crypto
         .createHmac("sha256", SECRET_TOKEN)
         .update(JSON.stringify(req.body))
         .digest("hex");
   
      let trusted = Buffer.from(`sha256=${signature}`, 'ascii');
   
      const signatureGitHub = req.header('x-hub-signature-256') ?? 'unknown';
   
      let untrusted = Buffer.from(signatureGitHub, 'ascii');
   
      return crypto.timingSafeEqual(trusted, untrusted);
   } catch (error) {
      return false;
   }
};

export class GitHubSha256Middleware {
   static verifySignature = (req: Request, res: Response, next: NextFunction) => {
      if (!verify_signature(req)) {
         res.status(401).send("Unauthorized");
         return;
      }
      next();
   }
}