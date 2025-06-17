import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from "next/document";

class AppDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <script src="/api/config"/>
        </Head>
        <body className="bg-white">
        <Main />
        <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
