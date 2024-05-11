import { GitHubStartPayload } from "../../interfaces";

export class GitHubService {
   constructor() {
      
   }

   onStart( payload: GitHubStartPayload ): string {
      let message: string = '';
      const { sender, repository, action } = payload;
      message = `User ${ sender?.login } ${ action } star on ${ repository?.full_name}.`;
      return message;
   }
}