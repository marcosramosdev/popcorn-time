import ListPopularShow from "../features/shows/components/ListPopularShow";

function Shows() {
  return (
    <div className="animate-page-enter space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Popular Shows
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Top TV series people are binge-watching
        </p>
      </div>
      <ListPopularShow />
    </div>
  );
}

export default Shows;
