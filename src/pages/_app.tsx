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
