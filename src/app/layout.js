import "./globals.css";

export const metadata = {
  title: {
    default: "Adil Cast | Fearless Journalism & Real Conversations",
    template: "%s | Adil Cast",
  },
  description:
    "Adil Cast is a Pakistani podcast and media platform featuring fearless journalism, real stories, bold interviews, and unfiltered conversations that matter.",
  keywords: [
    "Adil Cast",
    "Pakistani podcast",
    "journalism podcast Pakistan",
    "Urdu podcast",
    "news podcast",
    "interviews Pakistan",
    "independent journalism",
    "real stories podcast",
  ],
  authors: [{ name: "Adil Cast Team" }],
  creator: "Adil Cast",
  publisher: "Adil Cast",

  metadataBase: new URL("https://adilcast.com"), // change to real domain later

  openGraph: {
    title: "Adil Cast | Fearless Journalism & Real Conversations",
    description:
      "Watch and listen to powerful conversations, real stories, and bold journalism on Adil Cast.",
    url: "https://adilcast.com",
    siteName: "Adil Cast",
    images: [
      {
        url: "/assets/Logo.png", // put in /public
        width: 1200,
        height: 630,
        alt: "Adil Cast Podcast",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Adil Cast | Fearless Journalism & Real Conversations",
    description:
      "Independent journalism, bold interviews, and real stories from Pakistan.",
    images: ["/assets/Logo.png"],
    creator: "zahid jamali", // optional
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://adilcast.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background text-text antialiased">{children}</body>
    </html>
  );
}
