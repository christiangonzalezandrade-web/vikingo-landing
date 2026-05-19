import Image from "next/image";
import { cn } from "@/lib/utils";

type VikingoLogoProps = {
  className?: string;
  variant?: "brand" | "inverse";
  size?: "sm" | "md" | "lg";
};

const sizeClass = {
  sm: "h-7",
  md: "h-9",
  lg: "h-11",
} as const;

/** Logo oficial (triquetra + Vikingo) — public/vikingo-logo.png */
export function VikingoLogo({
  className,
  variant = "brand",
  size = "md",
}: VikingoLogoProps) {
  return (
    <Image
      src="/vikingo-logo.png"
      alt="Vikingo"
      width={320}
      height={80}
      className={cn(
        "w-auto shrink-0",
        sizeClass[size],
        variant === "inverse" && "brightness-0 invert",
        className
      )}
      priority
      unoptimized
    />
  );
}
