import { useState } from "react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import Error from "../components/Error";
import FavoriteCharacterCard from "../components/FavoriteCharacterCard";
import useEditFavorites from "../hooks/useEditFavorites";

export default function UserFavorites() {
  const [page, setPage] = useState(1);

  const { favoriteCharacters, hasNextPage, loading, error, toggleFavorite } =
    useEditFavorites({ page, pageSize: 20 });

  const goPrev = () => {
    setPage((p) => {
      if (p <= 1) return 1;
      return p - 1;
    });
  };

  const goNext = () => {
    setPage((p) => p + 1);
  };

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-6">
      <Navbar />

      {loading && <Loader />}
      {error && <Error errorMessage={error} />}

      {!loading && !error && (
        <>
          <div className="flex flex-wrap gap-4 justify-center">
            {favoriteCharacters.length === 0 && (
              <p className="text-white text-center w-full">No favorites yet.</p>
            )}

            {favoriteCharacters.map((row) => (
              <FavoriteCharacterCard
                key={row.id}
                character={{
                  id: row.id,
                  character_id: row.character_id,
                  character_name: row.character_name,
                  character_image: row.character_image ? row.character_image : "",
                }}
                onRemove={() =>
                  toggleFavorite({
                    id: row.character_id,
                    name: row.character_name,
                    image: row.character_image ? row.character_image : "",
                  })
                }
              />
            ))}
          </div>

          {(page > 1 || hasNextPage) && (
            <div className="flex justify-center gap-x-4 py-6 bg-zinc-950/80">
              <button
                onClick={goPrev}
                disabled={page === 1}
                className="cursor-pointer px-4 py-2 bg-zinc-800 rounded-lg text-white disabled:opacity-50"
              >
                Prev
              </button>

              <p className="text-zinc-400 px-4 py-2">Page {page}</p>

              <button
                onClick={goNext}
                disabled={!hasNextPage}
                className="cursor-pointer px-4 py-2 bg-zinc-800 rounded-lg text-white disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
