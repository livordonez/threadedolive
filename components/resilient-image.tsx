"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ResilientImage({
  src,
  fallbackSrc,
  alt,
  sizes,
  className,
  fallbackClassName,
}: {
  src: string;
  fallbackSrc?: string;
  alt: string;
  sizes: string;
  className?: string;
  fallbackClassName?: string;
}) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [failed, setFailed] = useState(false);
  const isFallback = currentSrc !== src;

  if (failed) return null;

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill
      sizes={sizes}
      className={cn(className, isFallback && fallbackClassName)}
      onError={() => {
        if (fallbackSrc && currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
        else setFailed(true);
      }}
    />
  );
}
