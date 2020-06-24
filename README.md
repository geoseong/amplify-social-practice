# Configure Amplify Auth with Next.js Project

## Create Next.js project
- [Next.js: Getting started](https://nextjs.org/docs/getting-started)

  1. `$ npx create-next-app`
     - fill out project name and etc
  2. go to next.js project and create `_app.tsx` (or **_app.js**) file and input code
      ```tsx
      import { AppProps } from 'next/app';

      function MyApp({ Component, pageProps }: AppProps) {
         return <Component {...pageProps} />;
      }

      MyApp.getInitialProps = async (props) => {
         const { App, ctx } = props || {};

         console.log('process.env.NODE_ENV', process.env.NODE_ENV)

         // solution: https://stackoverflow.com/a/60747333/8026431
         if (process.env.NODE_ENV === 'development') {
            const pathAndQueryDivided = ctx.req.url.split('?');
            console.log('pathAndQueryDivided:', pathAndQueryDivided)
            if (pathAndQueryDivided[0] !== '/' && pathAndQueryDivided[0].endsWith('/')) {
               const urlWithoutEndingSlash = pathAndQueryDivided[0].replace(/\/*$/gim, '');

               ctx.res.writeHead(301, {
               Location:
                  urlWithoutEndingSlash +
                  (pathAndQueryDivided.length > 1 ? `?${pathAndQueryDivided[1]}` : ''),
               });
               ctx.res.end();
               return {};
            }
         }

         return {};
      };

      export default MyApp;

   ```

## Amplify Social Provider Configure: Video Tutorials
- [Nader Dabit: Adding Google Sign In for Web Applications with AWS Amplify](https://www.youtube.com/watch?v=eqDUSY9KHYE&t=319s)
- [Nader Dabit: Adding Facebook Sign In for Web Applications with AWS Amplify](https://www.youtube.com/watch?v=F6ZPTKiEJx4)

## Amplify Social Provider Configure: Documentation
[Amplify Docs: Setup socal provider](https://docs.amplify.aws/lib/auth/social/q/platform/js#setup-social-provider)

## The way how to add Facebook Social Provider when Google Provider is already configured

$ `amplify auth update`

Please note that certain attributes may not be overwritten if you choose to use defaults settings.

Using service: Cognito, provided by: awscloudformation

What do you want to do? `Update OAuth social providers`

Select the identity providers you want to configure for your user pool: `Facebook, Google`


You've opted to allow users to authenticate via Facebook.  If you haven't already, you'll need to go to https://developers.facebook.com and create an App ID. 

Enter your Facebook App ID for your OAuth flow:  `ex) 578442056147080`

Enter your Facebook App Secret for your OAuth flow:  `ex) 241e4236231d0dc3b4bbc6821d95d236`

You've opted to allow users to authenticate via Google.  If you haven't already, you'll need to go to https://developers.google.com/identity and create an App ID. 

Enter your Google Web Client ID for your OAuth flow:  `ex) 745077701371-28ghtl39pdnj58tkge6piupbp08fs15o.apps.googleusercontent.com` <- just enter. it already configured so will be autocompleted

Enter your Google Web Client Secret for your OAuth flow:  `ex) Tp8epWhKKV_KRvztlFfvsOOl` <- just enter. it already configured so will be autocompleted
Successfully updated resource socialpractice20947e57 locally

Some next steps:

"amplify push" will build all your local backend resources and provision it in the cloud

"amplify publish" will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud
 
$ `amplify push`
