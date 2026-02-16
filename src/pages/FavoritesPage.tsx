import ListFavorites from "../features/favorites/components/ListFavorites";

function FavoritesPage() {
  return (
    <div className="animate-page-enter space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Your Favorites
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Movies you have saved for later
        </p>
      </div>
      <ListFavorites />
    </div>
  );
}

export default FavoritesPage;
