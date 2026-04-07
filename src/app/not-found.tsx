import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="not-found-page">
      <h1>Page not found</h1>
      <p>
        The page you&apos;re looking for doesn&apos;t exist or has been
        moved.
      </p>
      <a href="/">Return to Omega7 Capital</a>
    </div>
  );
}
