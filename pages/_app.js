// https://www.apollographql.com/docs/react/api/react/hooks/#the-apolloprovider-component
import { ApolloProvider } from '@apollo/client';
import NProgress from 'nprogress'; // https://ricostacruz.com/nprogress/
import Router from 'next/router';

import { CartStateProvider } from '../lib/cartState';
import withData from '../lib/withData';
import Page from '../components/Page';
import '../css/tailwind.css';

// * Custom NProgress:
import '../components/styles/nprogress.css';
/* Default: 
import 'nprogress/nprogress.css';
*/

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <CartStateProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </CartStateProvider>
    </ApolloProvider>
  );
};

// *  Docs: https://nextjs.org/docs/api-reference/data-fetching/getInitialProps
MyApp.getInitialProps = async function ({ Component, ctx}) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);