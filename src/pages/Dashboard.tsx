import { useState } from "react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import Error from "../components/Error";
import CharacterCard from "../components/CharacterCard";
import useFetchCharacters from "../hooks/useFetchCharacters";
import useEditFavorites from "../hooks/useEditFavorites";

export default function Dashboard() {
  const [page, setPage] = useState(1);

  const { characters, loading, error, totalPages } = useFetchCharacters({ page });
  const { favoriteIds, toggleFavorite } = useEditFavorites();

  const goPrev = () => {
    setPage((p) => {
      if (p <= 1) return 1;
      return p - 1;
    });
  };

  const goNext = () => {
    setPage((p) => {
      if (p >= totalPages) return totalPages;
      return p + 1;
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 px-4 py-6">
      <Navbar />

      {loading && <Loader />}
      {error && <Error errorMessage={error} />}

      {!loading && !error && (
        <>
          <div className="flex flex-wrap justify-center gap-4">
            {characters.map((char) => {
              const characterId = Number(char.id);

              return (
                <CharacterCard
                  key={char.id}
                  character={char}
                  isFavorite={favoriteIds.includes(characterId)}
                  onToggleFavorite={() =>
                    toggleFavorite({
                      id: characterId,
                      name: char.name,
                      image: char.image,
                    })
                  }
                />
              );
            })}
          </div>

          <div className="flex justify-center gap-x-4 py-6 bg-zinc-950/80">
            <button onClick={goPrev} disabled={page === 1} className="cursor-pointer px-4 py-2 bg-zinc-800 rounded-lg text-white disabled:opacity-50">
              Prev
            </button>

            <p className="text-zinc-400 px-4 py-2">
              Page {page} of {totalPages}
            </p>

            <button onClick={goNext} disabled={page >= totalPages} className="cursor-pointer px-4 py-2 bg-zinc-800 rounded-lg text-white disabled:opacity-50">
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
