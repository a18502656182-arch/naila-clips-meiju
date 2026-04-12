// app/components/home/FeaturedExamples.jsx
"use client";
import Link from "next/link";
import { THEME } from "./theme";

function formatDuration(sec) {
  const s = Number(sec || 0);
  if (!Number.isFinite(s) || s <= 0) return null;
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, "0")}`;
}

export default function FeaturedExamples({ featured }) {
  if (!featured?.id) return null;

  const cover = featured.cover_url || "";
  const duration = formatDuration(featured.duration_sec);
  const title = featured.title || `Clip #${featured.id}`;
  const isVip = featured.access_tier === "vip";

  return (
    <>
      <style>{`
        .featuredHeroCard {
          transform: translateY(0);
          transition: transform 200ms ease, box-shadow 200ms ease;
        }
        .featuredHeroCard:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 48px rgba(15,23,42,0.14);
        }
        @media (max-width: 640px) {
          .featuredHeroCard {
            height: 260px !important;
            border-radius: 20px !important;
          }
        }
      `}</style>

      <Link
        href={`/clips/${featured.id}`}
        className="featuredHeroCard"
        style={{
          position: "relative",
          width: "100%",
          height: 320,
          borderRadius: 24,
          overflow: "hidden",
          display: "block",
          textDecoration: "none",
          border: `1px solid ${THEME.colors.border}`,
          boxShadow: "0 16px 38px rgba(15,23,42,0.10)",
          background: "rgba(11,18,32,0.06)",
        }}
      >
        {/* 封面图 */}
        {cover ? (
          <img
            src={cover}
            alt={title}
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div style={{ position: "absolute", inset: 0, background: "rgba(11,18,32,0.06)" }} />
        )}

        {/* 渐变遮罩 */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(180deg, rgba(8,15,30,0.06) 0%, rgba(8,15,30,0.00) 30%, rgba(8,15,30,0.45) 100%)",
        }} />

        {/* 右上角：免费/会员 + 时长 */}
        <div style={{
          position: "absolute", top: 12, right: 12,
          display: "flex", gap: 6, alignItems: "center", zIndex: 3,
        }}>
          <span style={{
            padding: "5px 10px", borderRadius: 999,
            background: isVip ? "#7c3aed" : "#10b981",
            color: "#fff", fontSize: 12, fontWeight: 800,
          }}>
            {isVip ? "会员" : "免费试看"}
          </span>
          {duration && (
            <span style={{
              padding: "5px 10px", borderRadius: 999,
              background: "rgba(11,18,32,0.70)",
              color: "#fff", fontSize: 12, fontWeight: 800,
            }}>
              {duration}
            </span>
          )}
        </div>

        {/* 底部标题 */}
        <div style={{
          position: "absolute", left: 14, right: 14, bottom: 14, zIndex: 3,
        }}>
          <div style={{
            padding: "10px 14px",
            borderRadius: 14,
            background: "rgba(255,255,255,0.88)",
            border: "1px solid rgba(255,255,255,0.65)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 20px rgba(15,23,42,0.10)",
            fontSize: 16,
            fontWeight: 950,
            letterSpacing: "-0.02em",
            color: THEME.colors.ink,
            lineHeight: 1.25,
          }}>
            {title}
          </div>
        </div>
      </Link>
    </>
  );
}
