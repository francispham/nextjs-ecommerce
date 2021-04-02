import Document, { Html, Head, Main, NextScript } from 'next/document'; // https://nextjs.org/docs/advanced-features/custom-document
import { ServerStyleSheet } from 'styled-components'; // https://styled-components.com/docs/advanced

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <Html lang="en-CA">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
