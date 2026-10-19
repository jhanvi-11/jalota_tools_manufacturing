import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industrial Tools Catalog | Jalota Tools",
  description:
    "Explore Jalota Tools' comprehensive catalog of high-performance screwdrivers, striking tools, wrecking bars, and precision industrial instruments.",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
