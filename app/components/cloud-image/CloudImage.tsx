"use client";

import { CldImage, type CldImageProps } from "next-cloudinary";

// Photos are already stored as lossy AVIF (quality 50) by the upload pipeline,
// so every Cloudinary delivery is a second lossy encode. `auto:best` keeps that
// second pass close to the original instead of the default `auto:good`.
// Resizing is left to CldImage's default `c_limit`, which never upscales
// (unlike crop="fit", which enlarges small originals up to 3840px).
export function CloudImage(props: CldImageProps) {
  return <CldImage quality="auto:best" format="auto" {...props} />;
}
