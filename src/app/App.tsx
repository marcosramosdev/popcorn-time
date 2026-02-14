import type { ReactElement } from "react";
import Layout from "../layout/Layout";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Movies from "../pages/Movies";
import Home from "../pages/Home";
import Shows from "../pages/Shows";

const queryClient = new QueryClient();

function App(): ReactElement {
  return (
    <Layout>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/new" element={<h1>movies on theater</h1>} />
            <Route path="/movies/:id" element={<h1>movie data by id</h1>} />
            <Route path="/shows" element={<Shows />} />
            <Route
              path="/favorites"
              element={<h1>Favorites saved movies</h1>}
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Layout>
  );
}

export default App;
