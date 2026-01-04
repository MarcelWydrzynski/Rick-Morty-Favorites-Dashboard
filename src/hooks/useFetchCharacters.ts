import { useEffect, useState } from "react";
import type { Character } from "../types/character";

type UseFetchCharactersProps = {
  page?: number;
};

type EdgeResponse = {
  info?: {
    pages?: number;
    count?: number;
  };
  results?: Character[];
  error?: string;
};

const FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/rick-morty-characters`;

const useFetchCharacters = (props: UseFetchCharactersProps) => {
  const page = props.page ? props.page : 1;

  const [characters, setCharacters] = useState<Character[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      try {
        const url = FUNCTION_URL + "?page=" + String(page);
        const response = await fetch(url);

        const json = (await response.json()) as EdgeResponse;

        if (!response.ok) {
          if (json && json.error) {
            throw new Error(json.error);
          }
          throw new Error("Failed to fetch characters");
        }

        
        if (json && json.results) {
          setCharacters(json.results);
        } else {
          setCharacters([]);
        }

       
        if (json && json.info && typeof json.info.pages === "number") {
          setTotalPages(json.info.pages);
        } else {
          setTotalPages(1);
        }
      } catch (e: any) {
        if (e && e.message) {
          setError(e.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [page]);

  return { characters, totalPages, loading, error };
}

export default useFetchCharacters