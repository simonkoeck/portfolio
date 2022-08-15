import React from "react";
import Footer from "../Footer";
import Header from "../Header";

type Props = {
  children: React.ReactNode;
};

export default function HomeLayout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <div className="relative">
        <main className="flex-1">{children}</main>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
