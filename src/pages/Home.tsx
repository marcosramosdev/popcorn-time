import ListMovies from "../features/movies/components/ListMovies";

function Home() {
  return (
    <div className="animate-page-enter space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Popular Movies
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Trending titles everyone is watching right now
        </p>
      </div>
      <ListMovies />
    </div>
  );
}

export default Home;
