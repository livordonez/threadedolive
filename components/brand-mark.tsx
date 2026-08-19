import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

export function BrandMark({
  className,
  loading = "lazy",
  fetchPriority,
  sizes = "192px",
}: {
  className?: string;
  loading?: ImageProps["loading"];
  fetchPriority?: ImageProps["fetchPriority"];
  sizes?: string;
}) {
  return (
    <Image
      src="/images/threaded-olive-logo-v4.webp"
      alt=""
      width={1536}
      height={1024}
      className={cn("object-contain", className ?? "h-14 w-auto")}
      loading={loading}
      fetchPriority={fetchPriority}
      sizes={sizes}
    />
  );
}
