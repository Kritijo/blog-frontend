import { useState } from "react";

const UnsplashPicker = ({ onSelect, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_KEY;

  const searchPhotos = async () => {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${ACCESS_KEY}`
    );
    const data = await res.json();
    setResults(data.results);
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded-lg w-[600px] max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="text"
          placeholder="Search Unsplash…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <button
          onClick={searchPhotos}
          className="mt-2 mb-4 px-4 py-1 bg-gradient-to-r from-purple-500 to-purple-400 text-white font-semibold rounded"
        >
          Search
        </button>

        <div className="grid grid-cols-2 gap-4">
          {results.map((photo) => (
            <img
              key={photo.id}
              src={photo.urls.small}
              alt={photo.alt_description}
              className="cursor-pointer rounded hover:opacity-80 transition"
              onClick={() => {
                onSelect(photo.urls.regular);
                onClose();
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnsplashPicker;
