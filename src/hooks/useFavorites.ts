import {
  FAVORITES_STORAGE_KEY,
  type FavoriteMovie,
} from "../store/favoritesStore";

function readFavoritesFromStorage(): FavoriteMovie[] {
  const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);

  if (!savedFavorites) {
    return [];
  }

  try {
    const parsedFavorites = JSON.parse(savedFavorites);
    if (!Array.isArray(parsedFavorites)) {
      return [];
    }

    return parsedFavorites as FavoriteMovie[];
  } catch {
    return [];
  }
}

function writeFavoritesToStorage(favorites: FavoriteMovie[]) {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
}

export function useFavorites() {
  function getFavorites() {
    return readFavoritesFromStorage();
  }

  function addToFavorites(movie: FavoriteMovie) {
    const favorites = readFavoritesFromStorage();
    const alreadyFavorited = favorites.some(
      (favorite) => favorite.id === movie.id,
    );

    if (alreadyFavorited) {
      return;
    }

    // adiciona no final da lista de favoritos e escreve a lista atualizada de volta no localStorage
    writeFavoritesToStorage([...favorites, movie]);
    return true;
  }

  function removeFromFavorites(movieId: number) {
    // pega todos
    const favorites = readFavoritesFromStorage();
    // remove o que tem o id igual ao passado
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    // escreve a lista atualizada de volta no localStorage
    writeFavoritesToStorage(updatedFavorites);
  }

  return {
    getFavorites,
    addToFavorites,
    removeFromFavorites,
  };
}
