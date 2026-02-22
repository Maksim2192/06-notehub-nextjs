import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Providers from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
        <Header/>
        {children}
        <Footer />
         <div id="modal-root"></div>
          <div id="__next"></div>
          </Providers>
      </body>
    </html>
  );
}