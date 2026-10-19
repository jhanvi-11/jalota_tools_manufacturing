import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Request a Quote | Jalota Tools",
  description:
    "Get in touch with Jalota Tools Manufacturing for B2B industrial machinery inquiries, custom quotes, and technical specifications.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
