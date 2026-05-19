import Image from "next/image";
import { cn } from "@/lib/utils";

type VikingoMarkProps = {
  className?: string;
  variant?: "brand" | "light";
};

/** Triquetra oficial — public/vikingo-mark.png */
export function VikingoMark({ className, variant = "brand" }: VikingoMarkProps) {
  return (
    <Image
      src="/vikingo-mark.png"
      alt=""
      width={80}
      height={80}
      className={cn(
        "h-9 w-9 shrink-0 object-contain",
        variant === "light" && "brightness-0 invert",
        className
      )}
      aria-hidden
      unoptimized
    />
  );
}
