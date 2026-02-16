import { useParams, useNavigate } from "react-router-dom";
import { useMovieDetails } from "../hooks";
import LazyImage from "@/components/LazyImage";
import {
  tmdbImageUrl,
  POSTER_DIMENSIONS,
  BACKDROP_DIMENSIONS,
} from "@/services/tmdb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorBlock from "@/components/ErrorBlock";

function MovieDetailsSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-64 w-full rounded-xl sm:h-80" />
      <div className="flex gap-6">
        <Skeleton className="hidden aspect-[2/3] w-48 shrink-0 rounded-xl sm:block" />
        <div className="flex-1 space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-20 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useMovieDetails(id);

  if (!id) return <ErrorBlock message="Movie ID not found." />;
  if (isLoading) return <MovieDetailsSkeleton />;
  if (error) return <ErrorBlock message="Failed to load movie details." onRetry={() => window.location.reload()} />;
  if (!data) return <ErrorBlock message="Movie not found." />;

  const year = data.release_date ? new Date(data.release_date).getFullYear() : null;
  const hours = data.runtime ? Math.floor(data.runtime / 60) : null;
  const mins = data.runtime ? data.runtime % 60 : null;

  return (
    <div className="space-y-8">
      {/* Back button */}
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        Back
      </Button>

      {/* Backdrop hero */}
      {data.backdrop_path && (
        <div className="relative -mx-4 overflow-hidden rounded-xl sm:-mx-6">
          <LazyImage
            src={tmdbImageUrl(data.backdrop_path, "w1280")}
            alt={`${data.title} backdrop`}
            width={BACKDROP_DIMENSIONS.w1280.width}
            height={BACKDROP_DIMENSIONS.w1280.height}
            className="w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col gap-6 sm:flex-row">
        {/* Poster (desktop) */}
        {data.poster_path && (
          <div className="hidden shrink-0 sm:block">
            <LazyImage
              src={tmdbImageUrl(data.poster_path, "w342")}
              alt={`${data.title} poster`}
              width={POSTER_DIMENSIONS.w342.width}
              height={POSTER_DIMENSIONS.w342.height}
              className="w-48 rounded-xl shadow-lg"
            />
          </div>
        )}

        {/* Details */}
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {data.title}
            </h1>
            {data.tagline && (
              <p className="mt-1 text-sm italic text-muted-foreground">
                "{data.tagline}"
              </p>
            )}
          </div>

          {/* Meta chips */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            {year && <span>{year}</span>}
            {hours !== null && mins !== null && (
              <>
                <span className="text-border">|</span>
                <span>{hours}h {mins}m</span>
              </>
            )}
            {data.vote_average > 0 && (
              <>
                <span className="text-border">|</span>
                <span className="font-medium text-foreground">
                  {data.vote_average.toFixed(1)}
                </span>
                <span>/ 10</span>
              </>
            )}
            {data.status && (
              <>
                <span className="text-border">|</span>
                <Badge variant="outline" className="text-xs">{data.status}</Badge>
              </>
            )}
          </div>

          {/* Genres */}
          {data.genres.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {data.genres.map((genre) => (
                <Badge key={genre.id} variant="secondary" className="text-xs">
                  {genre.name}
                </Badge>
              ))}
            </div>
          )}

          <Separator />

          {/* Overview */}
          {data.overview && (
            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Overview
              </h2>
              <p className="text-sm leading-relaxed text-foreground">
                {data.overview}
              </p>
            </div>
          )}

          <Separator />

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <Detail label="Original Title" value={data.original_title} />
            <Detail label="Language" value={data.original_language?.toUpperCase()} />
            <Detail label="Budget" value={data.budget ? `$${data.budget.toLocaleString()}` : "N/A"} />
            <Detail label="Revenue" value={data.revenue ? `$${data.revenue.toLocaleString()}` : "N/A"} />
            <Detail label="Vote Count" value={data.vote_count.toLocaleString()} />
            {data.homepage && (
              <div>
                <span className="text-muted-foreground">Homepage</span>
                <a
                  href={data.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 block truncate text-primary hover:underline"
                >
                  Visit site
                </a>
              </div>
            )}
          </div>

          {/* Production companies */}
          {data.production_companies.length > 0 && (
            <>
              <Separator />
              <div>
                <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Production
                </h2>
                <p className="text-sm text-foreground">
                  {data.production_companies.map((c) => c.name).join(", ")}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string | number | undefined }) {
  if (!value) return null;
  return (
    <div>
      <span className="text-muted-foreground">{label}</span>
      <p className="mt-0.5 font-medium text-foreground">{value}</p>
    </div>
  );
}

export default MovieDetails;
