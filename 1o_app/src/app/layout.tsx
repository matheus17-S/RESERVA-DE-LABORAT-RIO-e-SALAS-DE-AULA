import "./globals.css";
import { Header } from "../component/header";
import { Footer } from "../component/footer";

export default function RootLayout
(
    { children }
    : LayoutProps<"/">
) 
{
  return (
    <html>
      <body>
        <Header/>
        
        { children }

        <Footer/>
      </body>
    </html>
  );
}
