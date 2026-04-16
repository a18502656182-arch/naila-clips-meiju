"use client";
import { useEffect } from "react";

export default function DarkModeInit() {
  useEffect(() => {
    try {
      if (localStorage.getItem("dark_mode") === "1") {
        document.body.classList.add("dark-mode");
      }
    } catch {}
  }, []);
  return null;
}
