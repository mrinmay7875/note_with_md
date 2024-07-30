import { Document, Page } from '@react-pdf/renderer';
import Html from 'react-pdf-html';

export const PDFExport = ({ content }: { content: string }) => {
  console.log('content from Props', content);
  const wrappedHtml = `
            <html>
            <body>
                ${content}
            </body>
            </html>
            `;

  return (
    <Document>
      <Page>
        <Html>{wrappedHtml}</Html>
      </Page>
    </Document>
  );
};
