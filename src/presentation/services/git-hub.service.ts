import { GitHubIssuePayload, GitHubStartPayload } from "../../interfaces";

export class GitHubService {
   constructor() {
      
   }

   onStart( payload: GitHubStartPayload ): string {
      let message: string = '';
      const { sender, repository, action } = payload;
      message = `User ${ sender?.login } ${ action } star on ${ repository?.full_name}.`;
      return message;
   }

   onIssues( payload: GitHubIssuePayload ) {
      const { sender, repository, issue, action } = payload;

      if ( action === 'opened' ) {
         return  `An issue has been opened with this title ${ issue?.title} by user ${sender?.login} on ${ repository?.full_name }`;
      }

      if ( action === 'closed' ) {
         return  `An issue was closed by user ${sender?.login} on ${ repository?.full_name }`;
      }

      if ( action === 'reopened' ) {
         return  `An issue was reopened by user ${sender?.login} on ${ repository?.full_name }`;
      }

      return  `Unhandled action ${action} by user ${sender?.login} on ${ repository?.full_name }`;
   }
}