"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

const FALLBACK = "/assets/placeholder.svg";

type Props = Omit<ImageProps, "onError"> & {
  fallback?: string;
};

export function ImageWithFallback({
  src,
  fallback = FALLBACK,
  alt,
  ...props
}: Props) {
  const [hasError, setHasError] = useState(false);

  if (!src) {
    return (
      <Image
        {...props}
        src={fallback}
        alt={alt}
        unoptimized
      />
    );
  }

  if (hasError) {
    return (
      <Image
        {...props}
        src={fallback}
        alt={alt}
        unoptimized
      />
    );
  }

  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
    />
  );
}
