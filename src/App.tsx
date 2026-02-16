import { lazy, Suspense } from "react";
import type { ReactElement } from "react";
import Layout from "./layout/Layout";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PageSkeleton from "./components/PageSkeleton";

// Home fica no bundle inicial (é a landing page)
import Home from "./pages/Home";

// Lazy loading das demais páginas — cada uma gera um chunk separado
const Movies = lazy(() => import("./pages/Movies"));
const Shows = lazy(() => import("./pages/Shows"));
const SearchMoviesPage = lazy(() => import("./pages/SearchMoviesPage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));

const queryClient = new QueryClient();

function App(): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<PageSkeleton />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/movies/new" element={<h1>movies on theater</h1>} />
              <Route path="/movies/:id" element={<MovieDetailsPage />} />
              <Route path="/movies/search" element={<SearchMoviesPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/shows" element={<Shows />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
