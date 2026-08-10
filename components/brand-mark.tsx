import Image from "next/image";
import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return <Image src="/images/threaded-olive-logo-v3.webp" alt="" width={1200} height={800} className={cn("w-auto object-contain", className ?? "h-14")} priority unoptimized />;
}
