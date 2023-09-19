/* eslint-disable @next/next/no-img-element */

"use client";

import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";

const ROTATIONS = [-1, 1, -1.5, 0.5, -1.5, 0.5, 1, -1];

export default function Home() {
  const [data, setData] = useState<{
    settings: {
      off: boolean;
    };
    photos: {
      _id: string;
      url: string;
    }[];
  } | null>(null);

  const fetchData = () => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetchData();
      }
    }, 2_000);

    return () => clearInterval(interval);
  }, []);

  if (!data) {
    return null;
  }

  if (data.settings.off) {
    return (
      <Layout>
        <div className="pt-2">
          <div className="h-5 w-5 border-2 border-gray-300 border-t-blue-600 animate-spin rounded-full mx-auto" />
          <p className="mt-2 text-center font-semibold text-gray-800 text-lg">
            The experience will begin soon...
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      slot={
        <Link
          href="/upload"
          className="bg-blue-600 font-semibold text-sm rounded-full px-3 py-1 text-white block text-center"
        >
          Contribute bad photo(s) -&gt;
        </Link>
      }
    >
      <div className="flex justify-end items-center gap-x-2 pr-2">
        <div className="relative h-2.5 w-2.5">
          <div className="animate-ping absolute h-full w-full rounded-full bg-red-600/75" />
          <div className="h-2.5 w-2.5 rounded-full bg-red-600" />
        </div>
        <p className="text-red-600 font-bold text-sm">Live</p>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 items-center">
        {data.photos.map((photo, i) => (
          <a
            key={photo._id}
            href={photo.url}
            target="_blank"
            className="cursor-zoom-in"
          >
            <img
              src={`https://wsrv.nl/?url=${encodeURIComponent(
                photo.url
              )}&output=jpg`}
              alt="A photo uploaded to faceboard"
              className="block rounded-lg shadow"
              style={{
                transform: `rotate(${ROTATIONS[i % ROTATIONS.length]}deg)`,
              }}
            />
          </a>
        ))}
      </div>
    </Layout>
  );
}
