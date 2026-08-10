"use client";

import { useState } from "react";
import Header from "@/components/Header";
import BookView from "@/components/views/BookView";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

export default function BookPage() {
  const [activeView, setActiveView] = useState("book");

  return (
    <>
      <Header activeView={activeView} setActiveView={setActiveView} />
      <main>
        <BookView />
      </main>
      <Footer setActiveView={setActiveView} />
      <CookieBanner />
    </>
  );
}
