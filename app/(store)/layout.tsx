import React from "react";
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";
import PageWrapper from "@components/layout/PageWrapper";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f0f6ff] via-[#f4f8ff] to-[#f8f9ff]">
      <Header />
      <PageWrapper>
        {children}
      </PageWrapper>
      <Footer />
    </div>
  );
}
