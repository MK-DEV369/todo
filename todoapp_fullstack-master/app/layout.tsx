
import { ClerkProvider, auth } from "@clerk/nextjs";
import "./globals.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import GlobalStyleProvider from "./providers/GlobalStyleProvider";
import ContextProvider from "./providers/ContextProvider";
import NextTopLoader from "nextjs-toploader";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  return (    
    <ClerkProvider>      
      <html lang="en">
        <body >
          <NextTopLoader
            height={2}
            color="#27AE60"
            easing="cubic-bezier(0.53,0.21,0,1)"
          />
          <ContextProvider>
            <GlobalStyleProvider>
              {userId && <Sidebar />}
              <div>{children}</div>
            </GlobalStyleProvider>
          </ContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
