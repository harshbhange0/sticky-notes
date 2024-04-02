import { Provider } from "@/Provider";
import "./globals.css";
import { Inter } from "next/font/google";
import { NotesContextProvider } from "./context";
import { Toaster } from "react-hot-toast";
import AppBar from "./components/appbar";
import Sidebar from "./components/sidebar";
import CreateNots from "./components/CreateNots";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth.config";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-left" />
        <Provider>
          <NotesContextProvider>
            <AppBar />
            {session ? (
              <section className="w-full flex flex-col sm:flex-row min-h-[calc(100vh-57px)]">
                <Sidebar className={" hidden sm:flex sm:basis-[30%]"} />
                <main className=" w-full">
                  <CreateNots />
                  {children}
                </main>
              </section>
            ) : (
              <>
                <div className="min-h-[calc(100vh-57px)] grid place-items-center">
                  {status == "unauthenticated" ? (
                    <span>Pleas Sign In</span>
                  ) : (
                    <span className="loading loading-infinity loading-lg text-red-500"></span>
                  )}
                </div>
              </>
            )}
          </NotesContextProvider>
        </Provider>
      </body>
    </html>
  );
}
