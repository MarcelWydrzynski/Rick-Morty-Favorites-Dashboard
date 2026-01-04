type FavoriteCharacterCardProps = {
  character: {
    id: string;
    character_id: number;
    character_name: string;
    character_image: string;
  };
  onRemove: () => void;
};

const FavoriteCharacterCard = ({ character, onRemove }: FavoriteCharacterCardProps) => {
  return (
    <div className="bg-zinc-800 h-fit p-4 rounded-xl border border-zinc-700 flex flex-col items-center w-1/6 max-[1200px]:w-1/4 max-[850px]:w-1/3 max-[650px]:w-full">
      <img src={character.character_image} loading="lazy" alt={character.character_name} className="w-3/5 h-auto rounded-full mb-2" />

      <div className="flex gap-1 text-white text-center">
        <h3>Name:</h3>
        <p className="font-medium">{character.character_name}</p>
      </div>

      <button onClick={onRemove} className="cursor-pointer mt-2 px-3 py-1 rounded-lg text-white font-medium bg-red-600 hover:bg-red-500">
        Remove from favorites
      </button>
    </div>
  );
}

export default FavoriteCharacterCard