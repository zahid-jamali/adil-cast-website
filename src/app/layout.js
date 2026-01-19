import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background text-text">{children}</body>
    </html>
  );
}
