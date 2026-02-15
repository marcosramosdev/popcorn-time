import { useParams } from "react-router";
import { useMovieDetails } from "../hooks";

function MovieDetails() {
  const { id } = useParams();
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  const { data, isLoading, error } = useMovieDetails(id);

  if (!id) return <p>Movie id not found.</p>;
  if (isLoading) return <p>Loading movie details...</p>;
  if (error) return <p>Error loading movie details.</p>;
  if (!data) return <p>Movie details not found.</p>;

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.tagline}</p>

      <p>
        <strong>Overview:</strong> {data.overview}
      </p>
      <p>
        <strong>Original Title:</strong> {data.original_title}
      </p>
      <p>
        <strong>Original Language:</strong> {data.original_language}
      </p>
      <p>
        <strong>Status:</strong> {data.status}
      </p>
      <p>
        <strong>Release Date:</strong> {data.release_date}
      </p>
      <p>
        <strong>Runtime:</strong> {data.runtime ?? "N/A"} minutes
      </p>
      <p>
        <strong>Adult:</strong> {data.adult ? "Yes" : "No"}
      </p>
      <p>
        <strong>Video:</strong> {data.video ? "Yes" : "No"}
      </p>
      <p>
        <strong>Popularity:</strong> {data.popularity}
      </p>
      <p>
        <strong>Vote Average:</strong> {data.vote_average}
      </p>
      <p>
        <strong>Vote Count:</strong> {data.vote_count}
      </p>
      <p>
        <strong>Budget:</strong> {data.budget}
      </p>
      <p>
        <strong>Revenue:</strong> {data.revenue}
      </p>
      <p>
        <strong>IMDb ID:</strong> {data.imdb_id ?? "N/A"}
      </p>
      <p>
        <strong>Homepage:</strong> {data.homepage || "N/A"}
      </p>
      {data.poster_path ? (
        <div>
          <p>
            <strong>Poster:</strong>
          </p>
          <img
            src={`${imageBaseUrl}${data.poster_path}`}
            alt={`${data.title} poster`}
          />
        </div>
      ) : (
        <p>
          <strong>Poster:</strong> N/A
        </p>
      )}

      {data.backdrop_path ? (
        <div>
          <p>
            <strong>Backdrop:</strong>
          </p>
          <img
            src={`${imageBaseUrl}${data.backdrop_path}`}
            alt={`${data.title} backdrop`}
          />
        </div>
      ) : (
        <p>
          <strong>Backdrop:</strong> N/A
        </p>
      )}

      <p>
        <strong>Genres:</strong>{" "}
        {data.genres.length
          ? data.genres.map((genre) => genre.name).join(", ")
          : "N/A"}
      </p>
      <p>
        <strong>Origin Countries:</strong>{" "}
        {data.origin_country.length ? data.origin_country.join(", ") : "N/A"}
      </p>
      <p>
        <strong>Production Countries:</strong>{" "}
        {data.production_countries.length
          ? data.production_countries.map((country) => country.name).join(", ")
          : "N/A"}
      </p>
      <p>
        <strong>Spoken Languages:</strong>{" "}
        {data.spoken_languages.length
          ? data.spoken_languages
              .map((language) => language.english_name)
              .join(", ")
          : "N/A"}
      </p>
      <p>
        <strong>Production Companies:</strong>{" "}
        {data.production_companies.length
          ? data.production_companies.map((company) => company.name).join(", ")
          : "N/A"}
      </p>
    </div>
  );
}

export default MovieDetails;
