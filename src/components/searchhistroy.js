import React from "react";

const SearchHistory = ({ history, onHistoryItemClick, theme }) => {
  if (history.length === 0) return null;

  return (
    <div
      className={`p-4 rounded-xl mt-6 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h3 className="text-xl font-bold mb-4">Riwayat Pencarian</h3>
      <div className="flex flex-wrap gap-2">
        {history.map((item) => (
          <button
            key={item}
            onClick={() => onHistoryItemClick(item)}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              theme === "dark"
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
