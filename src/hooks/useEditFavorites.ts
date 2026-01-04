import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase-client";
import useAuth from "./useAuth";
import type { CharacterLite } from "../types/character";

type UseEditFavoritesArgs =
  | undefined
  | {
      page: number;
      pageSize: number;
    };

export type FavoriteRow = {
  id: string;
  character_id: number;
  character_name: string;
  character_image: string;
};

export default function useEditFavorites(args?: UseEditFavoritesArgs) {
  const { user } = useAuth();

  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [favoriteCharacters, setFavoriteCharacters] = useState<FavoriteRow[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFavoriteIds = async () => {
    if (!user) return;

    const response = await supabase.from("favorite_characters").select("character_id").eq("user_id", user.id);

    if (response.error) {
      throw response.error;
    }

    const rows = response.data ? response.data : [];
    const ids = rows.map((row) => row.character_id);
    setFavoriteIds(ids);
  };

  const loadFavoritesPage = async (page: number, pageSize: number) => {
    if (!user) return;

    const from = (page - 1) * pageSize;
    const to = from + pageSize; 

    const response = await supabase
      .from("favorite_characters")
      .select("id, character_id, character_name, character_image")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (response.error) {
      throw response.error;
    }

    const list = response.data ? response.data : [];

    if (list.length > pageSize) {
      setHasNextPage(true);
    } else {
      setHasNextPage(false);
    }

    setFavoriteCharacters(list.slice(0, pageSize));
  };

  const refresh = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      await loadFavoriteIds();

      if (args) {
        await loadFavoritesPage(args.page, args.pageSize);
      } else {
        setFavoriteCharacters([]);
        setHasNextPage(false);
      }
    } catch (e: any) {
      if (e && e.message) {
        setError(e.message);
      } else {
        setError("Failed to load favorites");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    refresh();
  }, [user, args?.page, args?.pageSize]);

  const toggleFavorite = async (character: CharacterLite) => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const isFavorite = favoriteIds.includes(character.id);

      if (isFavorite) {
        const delRes = await supabase.from("favorite_characters").delete().eq("user_id", user.id).eq("character_id", character.id);

        if (delRes.error) {
          throw delRes.error;
        }
      } else {
        const insRes = await supabase.from("favorite_characters").insert({
          user_id: user.id,
          character_id: character.id,
          character_name: character.name,
          character_image: character.image,
        });

        if (insRes.error) {
          throw insRes.error;
        }
      }

      await refresh();
    } catch (e: any) {
      if (e && e.message) {
        setError(e.message);
      } else {
        setError("Failed to update favorite");
      }
      setLoading(false);
    }
  };

  return {
    favoriteIds,
    favoriteCharacters,
    hasNextPage,
    loading,
    error,
    toggleFavorite,
    refresh,
  };
}
