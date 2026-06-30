export default function Image({
  src,
  alt = "",
  width,
  height,
  fill = false,
  className = "",
  style = {},
  priority,
  quality,
  sizes,
  placeholder,
  blurDataURL,
  unoptimized,
  loader,
  ...rest
}) {
  const resolvedSrc =
    typeof src === "string" ? src : src?.src || "";

  const fillStyle = fill
    ? {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }
    : {};

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={className}
      style={{ ...fillStyle, ...style }}
      {...rest}
    />
  );
}