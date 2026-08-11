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
      src="/images/threaded-olive-logo-v3.webp"
      alt=""
      width={1200}
      height={800}
      className={cn("object-contain", className ?? "h-14 w-auto")}
      loading={loading}
      fetchPriority={fetchPriority}
      sizes={sizes}
    />
  );
}
