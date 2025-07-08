"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FALLBACK_IMAGE } from "@/registry/constant";
import { useRouter } from "next/navigation";

interface I_ImageWithFallbackProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  href?: string
}

const ImageWithFallback = (props: I_ImageWithFallbackProps) => {
  const router = useRouter()
  const [displayImage, setDisplayImage] = useState<string>(props.src || "/");
  const fallbackImage = props.fallbackSrc ?? FALLBACK_IMAGE;

  const onCLickFn = () => {
    if (!props.href) return
    router.push(props.href)
  }

  return (
    <Image
      src={displayImage || fallbackImage}
      alt={props.alt || "image"}
      width={props.width}
      height={props.height}
      className={props?.className}
      onError={() => {
        setDisplayImage(fallbackImage);
      }}
      onClick={() => onCLickFn()}
    />
  );
};

export default ImageWithFallback;
