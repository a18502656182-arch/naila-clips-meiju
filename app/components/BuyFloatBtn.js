"use client";
// app/components/BuyFloatBtn.js
import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

export default function BuyFloatBtn() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function check() {
      try {
        const token = localStorage.getItem("sb_access_token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await fetch(`${API_BASE}/api/me`, { cache: "no-store", headers });
        const data = await res.json();
        // 未登录或登录但不是会员时显示
        if (!data?.is_member) setShow(true);
      } catch {
        setShow(true); // 请求失败默认显示
      }
    }
    check();
  }, []);

  if (!show) return null;

  return (
    <a
      href="/buy"
      style={{
        position: "fixed",
        right: 20,
        bottom: 24,
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        padding: "14px 24px",
        borderRadius: 22,
        background: "linear-gradient(135deg, #7c3aed, #6366f1)",
        color: "#fff",
        textDecoration: "none",
        boxShadow: "0 8px 28px rgba(99,102,241,0.45)",
        cursor: "pointer",
        transition: "all 0.2s ease",
        minWidth: 148,
        textAlign: "center",
        animation: "floatIn 0.3s ease",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(99,102,241,0.55)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(99,102,241,0.45)"; }}
    >
      <style>{`
        @keyframes floatIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div style={{ fontSize: 15, fontWeight: 900, letterSpacing: "0.02em" }}>
        加入会员
      </div>
      <div style={{ fontSize: 12, opacity: 0.88, fontWeight: 700 }}>
        解锁全部影视片段
      </div>
      <div style={{
        marginTop: 5,
        fontSize: 11,
        background: "rgba(255,255,255,0.18)",
        borderRadius: 999,
        padding: "3px 10px",
        fontWeight: 700,
        letterSpacing: "0.03em",
      }}>
        支持支付宝
      </div>
    </a>
  );
}
