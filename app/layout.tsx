import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header/>
        {children}
        <Footer />
         <div id="modal-root"></div>
  <div id="__next"></div>
      </body>
    </html>
  );
}