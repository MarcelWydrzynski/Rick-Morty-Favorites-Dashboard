import type { Character } from "../types/character";

type Props = {
  character: Character;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

const CharacterCard = ({ character, isFavorite, onToggleFavorite }: Props) => {
  return (
    <div className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 flex flex-col items-center w-1/6 max-[1200px]:w-1/4 max-[850px]:w-1/3 max-[650px]:w-full">
      <img
        src={character.image}
        alt={character.name}
        loading="lazy"
        className="w-3/5 h-auto rounded-full mb-2"
      />

      <div className="flex gap-1 text-white text-center">
        <h3>Name: </h3>
        <p className="font-medium">{character.name}</p>
      </div>

      <div className="flex gap-1 text-white text-center">
        <p>Species:</p>
        <p className="font-medium">{character.species}</p>
      </div>

      <div className="flex gap-1 text-white text-center">
        <p>Status:</p>
        <p className="font-medium">{character.status}</p>
      </div>

      <button
        onClick={onToggleFavorite}
        className={`cursor-pointer mt-2 px-3 py-1 rounded-lg text-white font-medium ${
          isFavorite ? "bg-red-600" : "bg-indigo-600"
        }`}
      >
        {isFavorite ? "Remove from favorites" : "Add to favorites"}
      </button>
    </div>
  );
}

export default CharacterCard
