
"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

import {
  Heart,
  Share2,
  X,
  MapPin,
  ShieldCheck,
  GitCompareArrows,
  ArrowLeft,
  Eye,
} from "lucide-react";

import { useApp } from "./State";
import { inr, lakhs } from "../lib/data";

const VentureMap = dynamic(
  () => import("./Map").then((m) => m.VentureMap),
  { ssr: false }
);

export default function Details({ v }) {
  const {
    user,
    setLogin,
    favorites,
    toggleFav,
    compare,
    toggleCompare,
    setNotice,
  } = useApp();

  const [mode, setMode] = useState("layout");
  const [plot, setPlot] = useState(null);
  const [more, setMore] = useState(false);
  const [contact, setContact] = useState(false);

  const minPrice = v.min * v.price;
  const maxPrice = v.max * v.price;

  const availablePercent = v.plots
    ? Math.round((v.open / v.plots) * 100)
    : 0;

  // Property-specific background image
  const propertyImage =
    v.image ||
    v.images?.[0] ||
    "/images/property-default.jpg";

  return (
    <main className="flex h-[100dvh] flex-col overflow-hidden md:flex-row">

      {/* LEFT SIDE - PROPERTY MAP */}
      <div className="relative h-[50dvh] shrink-0 md:h-full md:w-[66%]">

        <VentureMap
          venture={v}
          mode={mode}
          onPlot={(selectedPlot) => setPlot(selectedPlot)}
        />

        {/* Back to map */}
        <Link
          href="/"
          className="absolute left-4 top-4 z-[500] flex items-center gap-2 rounded-full bg-[#f8f6ed] px-4 py-3 text-sm font-bold text-[#0b2118] shadow-lg"
        >
          <ArrowLeft size={17} />
          Map
        </Link>

        {/* Layout Controls */}
        <div className="absolute left-1/2 top-4 z-[500] flex -translate-x-1/2 items-center rounded-full bg-[#13211b] p-1 text-xs font-bold shadow-xl">

          {[
            ["layout", "Layout"],
            ["3d", "3D"],
            ["hide", "Hide"],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setMode(id)}
              className={`rounded-full px-4 py-3 transition-all ${
                mode === id
                  ? "bg-[#f7f6ef] text-[#071812]"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Selected Plot */}
        {plot && (
          <div className="absolute bottom-5 left-5 z-[600] w-[270px] rounded-2xl bg-[#f8f6ed] p-4 text-[#0d2118] shadow-xl">

            <div className="flex items-center justify-between">
              <b>Plot #{plot.id}</b>

              <button onClick={() => setPlot(null)}>
                <X size={17} />
              </button>
            </div>

            <div className="mt-2 text-xs text-gray-500">
              {plot.size} sq yd · {plot.facing} facing
            </div>

            <div className="mt-3 flex items-center justify-between">
              <b>{lakhs(plot.size * v.price)}</b>

              <span
                className={`text-xs font-bold capitalize ${
                  plot.status === "available"
                    ? "text-green-700"
                    : "text-orange-700"
                }`}
              >
                {plot.status}
              </span>
            </div>

            <button
              onClick={() =>
                user ? setContact(true) : setLogin(true)
              }
              className="mt-3 w-full rounded-full bg-[#080b78] py-3 text-sm font-bold text-white"
            >
              Enquire about plot
            </button>
          </div>
        )}
      </div>

      {/* RIGHT SIDE - PROPERTY DETAILS */}
      <section className="relative min-h-0 flex-1 overflow-hidden bg-[#071911] text-white md:w-[34%]">

        {/* PROPERTY IMAGE BACKGROUND */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[350px] overflow-hidden">

          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url("${propertyImage}")`,
            }}
          />

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#06150b]/25 via-[#06150b]/65 to-[#071911]" />
        </div>

        {/* Scrollable Details */}
        <div className="custom-scroll relative z-10 h-full overflow-y-auto px-5 pb-28 pt-5 md:px-6">

          {/* Top Actions */}
          <div className="mb-20 flex items-center justify-between md:mb-28">

            <span className="flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs backdrop-blur-md">
              <Eye size={14} className="text-[#ffdc65]" />
              Premium venture · Vizag
            </span>

            <div className="flex gap-2">

              <button
                onClick={() => toggleFav(v.slug)}
                aria-label="Toggle favourite"
                className="rounded-full border border-white/15 bg-black/40 p-3 backdrop-blur-md"
              >
                <Heart
                  size={19}
                  fill={
                    favorites.includes(v.slug)
                      ? "#ffda61"
                      : "none"
                  }
                />
              </button>

              <button
                onClick={() => {
                  navigator.clipboard
                    ?.writeText(window.location.href)
                    .then(() => setNotice("Property link copied"))
                    .catch(() =>
                      setNotice("Unable to copy property link")
                    );
                }}
                aria-label="Share property"
                className="rounded-full border border-white/15 bg-black/40 p-3 backdrop-blur-md"
              >
                <Share2 size={19} />
              </button>

              <Link
                href="/"
                aria-label="Close details"
                className="rounded-full border border-white/15 bg-black/40 p-3 backdrop-blur-md"
              >
                <X size={19} />
              </Link>
            </div>
          </div>

          {/* PROPERTY TITLE */}
          <div className="mb-6">

            <span className="text-xs font-bold uppercase tracking-[.24em] text-[#f6d66a]">
              {v.tag}
            </span>

            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              {v.name}
            </h1>

            <p className="mt-2 flex items-center gap-2 text-sm text-[#bac7c0]">
              <MapPin size={15} />
              {v.area}, Visakhapatnam
            </p>

            <p className="mt-5 text-sm leading-6 text-[#bec8c2]">
              {v.desc}

              {more &&
                " The demo illustrates premium plotted living with clear roads, landscaped parks, open space, and interactive plot selection. All information is fictional for client presentation."}
            </p>

            <button
              onClick={() => setMore(!more)}
              className="mt-2 text-sm font-bold text-[#ffdc65]"
            >
              {more ? "Read less" : "Read more"}
            </button>

            {/* Approval Badges */}
            <div className="mt-6 flex gap-2">

              <span className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-bold">
                <ShieldCheck
                  size={14}
                  className="text-[#ffdc65]"
                />
                {v.approval}
              </span>

              <span className="rounded-full bg-white/15 px-4 py-2 text-xs font-bold">
                RERA*
              </span>
            </div>
          </div>

          {/* PROPERTY STATS */}
          <div className="mb-3 grid grid-cols-3 rounded-2xl border border-white/10 bg-white/[0.06] py-5 text-center">

            <div>
              <b className="text-xl">{v.acres}</b>
              <p className="mt-1 text-xs text-gray-400">
                acres
              </p>
            </div>

            <div className="border-x border-white/10">
              <b className="text-lg">
                {v.min}–{v.max}
              </b>
              <p className="mt-1 text-xs text-gray-400">
                sq yd plots
              </p>
            </div>

            <div>
              <b className="text-xl">{v.plots}</b>
              <p className="mt-1 text-xs text-gray-400">
                plots
              </p>
            </div>
          </div>

          {/* PRICE DETAILS */}
          <div className="grid grid-cols-2 gap-3">

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
              <p className="text-[11px] font-bold tracking-wider text-gray-400">
                PRICE PER SQ YD
              </p>

              <b className="mt-2 block text-2xl">
                {inr(v.price)}
              </b>

              <p className="mt-1 text-xs text-gray-400">
                ≈ {inr(v.price / 9)} per sq ft
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
              <p className="text-[11px] font-bold tracking-wider text-gray-400">
                PLOT PRICES
              </p>

              <b className="mt-3 block text-lg">
                {lakhs(minPrice)} – {lakhs(maxPrice)}
              </b>

              <p className="mt-1 text-xs text-gray-400">
                {v.min} to {v.max} sq yd
              </p>
            </div>
          </div>

          {/* AVAILABILITY */}
          <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4">

            <p className="text-[11px] font-bold tracking-wider text-gray-400">
              PLOTS STILL OPEN
            </p>

            <b className="mt-2 block text-lg">
              {v.open} of {v.plots}
            </b>

            <p className="text-xs text-gray-400">
              {availablePercent}% available
            </p>

            <div className="mt-3 h-1 overflow-hidden rounded-full bg-[#405048]">
              <div
                className="h-full rounded-full bg-[#ffdb60]"
                style={{
                  width: `${availablePercent}%`,
                }}
              />
            </div>
          </div>

          {/* AMENITIES */}
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
              <b>Wide roads</b>
              <p className="mt-1 text-xs text-gray-400">
                Planned internal access
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
              <b>Green spaces</b>
              <p className="mt-1 text-xs text-gray-400">
                Illustrative park areas
              </p>
            </div>
          </div>

          <p className="mt-5 text-[10px] text-gray-500">
            *All listings, approvals, layouts, availability and
            pricing are fictional demo content, not verified
            property information.
          </p>
        </div>

        {/* FIXED BOTTOM ACTIONS */}
        <div className="absolute bottom-0 left-0 right-0 z-[550] flex gap-2 border-t border-white/10 bg-[#101c19]/95 p-3 backdrop-blur-xl">

          <button
            onClick={() => toggleCompare(v.slug)}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#f8f7f1] py-4 text-sm font-bold text-[#071812]"
          >
            <GitCompareArrows size={17} />

            {compare.includes(v.slug)
              ? "Remove compare"
              : "Compare"}
          </button>

          <button
            onClick={() =>
              user ? setContact(true) : setLogin(true)
            }
            className="flex-1 rounded-full bg-[#ffdb60] py-4 text-sm font-bold text-[#071812]"
          >
            Get in touch
          </button>
        </div>
      </section>

      {/* CONTACT MODAL */}
      {contact && (
        <div className="fixed inset-0 z-[1800] flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-3xl bg-[#f8f6ed] p-7 text-[#071812]">

            <div className="flex justify-between gap-3">
              <h2 className="text-2xl font-bold">
                Enquire about {v.name}
              </h2>

              <button onClick={() => setContact(false)}>
                <X />
              </button>
            </div>

            <p className="mt-3 text-sm text-gray-500">
              Demo enquiry for {v.area}, Visakhapatnam
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setContact(false);
                setNotice("Demo enquiry submitted successfully");
              }}
              className="mt-5 space-y-3"
            >
              <input
                required
                placeholder="Your name"
                className="w-full rounded-xl border p-4"
              />

              <input
                required
                type="email"
                placeholder="Email address"
                className="w-full rounded-xl border p-4"
              />

              <textarea
                placeholder="Message"
                rows={3}
                className="w-full rounded-xl border p-4"
              />

              <button
                type="submit"
                className="w-full rounded-full bg-[#080b78] py-4 font-bold text-white"
              >
                Submit enquiry
              </button>
            </form>

            <p className="mt-3 text-xs text-gray-500">
              Frontend demonstration only. No message is sent.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
