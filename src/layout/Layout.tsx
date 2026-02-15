type Props = {
  children: React.ReactNode;
};
import { useFavorites } from "../hooks/useFavorites";

function Layout({ children }: Props) {
  const { getFavorites } = useFavorites();
  const favorites = getFavorites();
  const numberOfFavorites = favorites?.length || 0;

  return (
    <div>
      <header>
        <h1>Popcorn time</h1>
        {favorites?.length > 0 ? (
          <div>
            <a href="/">Home</a> |{" "}
            <a href="/favorites">
              Favorites number of favorites {numberOfFavorites}
            </a>
          </div>
        ) : (
          ""
        )}
      </header>

      <main>{children}</main>
    </div>
  );
}

export default Layout;
