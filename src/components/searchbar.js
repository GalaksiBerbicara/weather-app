import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchBar = ({ onSearch, onCurrentLocation }) => {
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fungsi untuk mendapatkan saran lokasi
  const fetchSuggestions = async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=5`
      );

      const uniqueSuggestions = response.data.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.display_name === item.display_name)
      );

      setSuggestions(uniqueSuggestions);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  // Debounce untuk mengurangi jumlah request
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (location) {
        fetchSuggestions(location);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [location]);

  // Fungsi pencarian
  const handleSearch = (selectedLocation = null) => {
    const searchTerm = selectedLocation || location;

    if (searchTerm.trim()) {
      onSearch(searchTerm);
      setLocation("");
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Pilih saran lokasi
  const handleSuggestionClick = (suggestion) => {
    setLocation(suggestion.display_name);
    handleSearch(suggestion.display_name);
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center space-x-2 mb-2">
        <div className="flex-grow relative">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Masukkan nama kota"
            className="w-full text-black px-4 py-2 border-2 border-black rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 dark:border-white dark:text-white dark:bg-transparent"
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            onFocus={() => location && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />

          {/* Daftar Saran */}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-lg mt-1 max-h-60 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <li
                  key={suggestion.place_id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={() => handleSearch()}
          className="bg-blue-500 bg-opacity-0 border-2 border-blue-500 text-blue-500 font-mono font-semibold px-4 py-2 rounded-full shadow-md hover:bg-opacity-90 hover:text-blue-100 hover:border-blue-700 transition-all duration-300"
        >
          Cari
        </button>

        <button
          onClick={onCurrentLocation}
          className="bg-green-500 bg-opacity-0 border-2 border-green-500 text-green-500 font-semibold font-mono p-2 px-3.5 rounded-full shadow-md hover:bg-opacity-90 hover:text-green-100 transition-all"
          title="Lokasi Saat Ini"
        >
          📍 Lokasi
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
