import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        {/*This Head element affects all pages.*/}
        <Head>
          <meta name="description" content="自由设计并运行你的自动机" />
          <link rel="icon" href="/Automata-Playground/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css2?family=Libre+Baskerville&family=Raleway:wght@700&family=Roboto+Mono:wght@500&display=swap"
            rel="stylesheet"></link>
        </Head>
        <body style={{ margin: 0, padding: 0 }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
