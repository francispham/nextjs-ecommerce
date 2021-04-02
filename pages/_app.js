import NProgress from 'nprogress'; // https://ricostacruz.com/nprogress/
import Router from 'next/router';
import Page from '../components/Page';

// Custom NProgress:
import '../components/styles/nprogress.css';
/* Default: 
import 'nprogress/nprogress.css';
*/

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}
