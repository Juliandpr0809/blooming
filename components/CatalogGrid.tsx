"use client";

import type { CSSProperties } from "react";

type GridItem = {
  src: string;
  label: string;
};

const MOBILE =
  "col-span-1 aspect-[4/5] overflow-hidden lg:aspect-auto lg:min-h-0";

const BENTO_PRESET: Record<number, string> = {
  0: `${MOBILE} lg:col-span-7 lg:row-span-2 lg:row-start-1 lg:col-start-1 lg:min-h-[400px]`,
  1: `${MOBILE} lg:col-span-5 lg:row-start-1 lg:col-start-8 lg:aspect-[4/3]`,
  2: `${MOBILE} lg:col-span-5 lg:row-start-2 lg:col-start-8 lg:aspect-[4/3]`,
  3: `${MOBILE} lg:col-span-4 lg:row-start-3 lg:col-start-1 lg:aspect-square`,
  4: `${MOBILE} lg:col-span-4 lg:row-start-3 lg:col-start-5 lg:aspect-square`,
  5: `${MOBILE} lg:col-span-4 lg:row-start-3 lg:col-start-9 lg:aspect-[3/4]`,
};

function restGridStyle(index: number): CSSProperties | undefined {
  if (index < 6) return undefined;
  const row = 4 + Math.floor((index - 6) / 2);
  const colStart = (index - 6) % 2 === 0 ? 1 : 7;
  return {
    gridRowStart: row,
    gridColumnStart: colStart,
    gridColumnEnd: "span 6",
  };
}

export default function CatalogGrid({ items }: { items: GridItem[] }) {
  if (items.length === 0) {
    return (
      <p className="mt-12 font-sans text-body text-ink/50">
        Añade imágenes en <code className="text-sm">app/img</code> para ver el
        catálogo.
      </p>
    );
  }

  return (
    <div className="mx-auto mt-16 grid max-w-[1400px] grid-cols-2 gap-3 lg:grid-cols-12 lg:gap-4">
      {items.map((item, index) => (
        <div
          key={item.src}
          className={
            BENTO_PRESET[index] ??
            `${MOBILE} lg:col-span-6 lg:aspect-[4/3]`
          }
          style={restGridStyle(index)}
          data-cursor-hover
        >
          <div className="group relative h-full min-h-0 w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.label}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
