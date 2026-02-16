import { useRef, useState, useEffect, useCallback, memo } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type LazyImageProps = {
  /** URL da imagem */
  src: string;
  /** Texto alternativo obrigatório para acessibilidade */
  alt: string;
  /** Largura intrínseca da imagem (px). Usada para reservar espaço e evitar CLS. */
  width: number;
  /** Altura intrínseca da imagem (px). Usada para reservar espaço e evitar CLS. */
  height: number;
  /** Classes CSS extras aplicadas ao wrapper */
  className?: string;
  /**
   * Margem do IntersectionObserver.
   * Valores maiores iniciam o carregamento antes do elemento ficar visível.
   * @default "200px"
   */
  rootMargin?: string;
};

/**
 * Componente de imagem com carregamento lazy via IntersectionObserver.
 *
 * - Skeleton placeholder com aspect-ratio correto (zero CLS)
 * - Fallback visual para imagens que falham ao carregar
 * - Memorizado para evitar re-renders desnecessários
 */
const LazyImage = memo(function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  rootMargin = "200px",
}: LazyImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [status, setStatus] = useState<"idle" | "loaded" | "error">("idle");

  // Observa quando o container entra na viewport
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin]);

  const handleLoad = useCallback(() => setStatus("loaded"), []);
  const handleError = useCallback(() => setStatus("error"), []);

  // aspect-ratio calculado a partir de width/height garante que o container
  // reserva exatamente o espaço correto ANTES da imagem carregar → CLS = 0.
  const aspectRatio = `${width} / ${height}`;

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden rounded-lg bg-muted", className)}
      style={{ aspectRatio, width: "100%", maxWidth: width }}
    >
      {/* Skeleton visível enquanto a imagem não carregou */}
      {status !== "loaded" && status !== "error" && (
        <Skeleton className="absolute inset-0 h-full w-full rounded-lg" />
      )}

      {/* Fallback para erro de carregamento */}
      {status === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-muted text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
          <span className="text-xs">Image unavailable</span>
        </div>
      )}

      {/* Imagem real — só é montada quando o container entra na viewport */}
      {isInView && status !== "error" && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
            status === "loaded" ? "opacity-100" : "opacity-0",
          )}
        />
      )}
    </div>
  );
});

export default LazyImage;
