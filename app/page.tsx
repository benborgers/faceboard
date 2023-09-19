/* eslint-disable @next/next/no-img-element */

"use client";

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
      <div className="pt-2">
        <div className="h-5 w-5 border-2 border-gray-300 border-t-blue-600 animate-spin rounded-full mx-auto" />
        <p className="mt-2 text-center font-semibold text-gray-800 text-lg">
          The experience will begin soon...
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 items-center">
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
  );
}
