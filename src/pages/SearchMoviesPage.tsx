import SearchMovies from "../features/search/components/SearchMovies";

function SearchMoviesPage() {
  return (
    <div className="animate-page-enter space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Search Movies
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Find any movie in the TMDB database
        </p>
      </div>
      <SearchMovies />
    </div>
  );
}

export default SearchMoviesPage;
