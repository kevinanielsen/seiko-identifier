import PlausibleProvider from "next-plausible";
import AuthContext from "./context/AuthContext";
import ToasterContext from "./context/ToasterContext";
import "./globals.css";

export const metadata = {
  title: "Seiko Identifier",
  description: "A website that helps you identify your seiko watch",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PlausibleProvider
      customDomain="https://plausible.kevinan.xyz"
      domain="seiko-identifier.vercel.app"
    >
      <html lang="en">
        <body className="no-scrollbar">
          <AuthContext>
            <ToasterContext />
            {children}
          </AuthContext>
        </body>
      </html>
    </PlausibleProvider>
  );
}
