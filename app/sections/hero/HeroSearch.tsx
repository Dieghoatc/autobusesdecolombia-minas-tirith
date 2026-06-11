"use client";

import { useRouter } from "next/navigation";
import { Search as SearchIcon } from "lucide-react";
import { useState } from "react";

export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?busqueda=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative max-w-2xl mx-auto flex items-center"
    >
      <div className="absolute left-4 text-[#88889a]">
        <SearchIcon className="w-5 h-5" />
      </div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Busca marcas, empresas, modelos, chasís..."
        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-full py-4 pl-12 pr-4 text-white placeholder-[#88889a] focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all backdrop-blur-md text-base md:text-lg"
      />
      <button
        type="submit"
        className="absolute right-2 bg-white text-black font-semibold rounded-full px-6 py-2 hover:bg-gray-100 transition-colors"
      >
        Buscar
      </button>
    </form>
  );
}
