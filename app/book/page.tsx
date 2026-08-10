"use client";

import { useState } from "react";
import Header from "@/components/Header";
import BookView from "@/components/views/BookView";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

export default function BookPage() {
  const [activeView] = useState("book");

  const handleNav = (view: string) => {
    if (view === "book") return;
    if (view === "home") {
      window.location.href = "/";
    } else {
      window.location.href = `/#${view}`;
    }
  };

  return (
    <>
      <Header activeView={activeView} setActiveView={handleNav} />
      <main>
        <BookView />
      </main>
      <Footer setActiveView={handleNav} />
      <CookieBanner />
    </>
  );
}
