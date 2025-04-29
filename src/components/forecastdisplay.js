import React from "react";
import { getWeatherIcon } from "../utils/weatherIcons";

const ForecastDisplay = ({ forecast, theme }) => {
  if (!forecast) return null;

  return (
    <div
      className={`p-6 rounded-xl mt-6 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h3 className="text-2xl font-bold mb-4">Prakiraan 5 Hari</h3>
      <div className="grid grid-cols-5 gap-4">
        {forecast.time.map((date, index) => (
          <div
            key={date}
            className="text-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg"
          >
            <p className="font-medium">
              {new Date(date).toLocaleDateString("id-ID", { weekday: "short" })}
            </p>
            <div className="text-4xl my-2">
              {getWeatherIcon(forecast.weathercode[index])}
            </div>
            <div className="flex justify-center space-x-2">
              <span className="font-bold">
                {forecast.temperature_2m_max[index].toFixed(0)}°
              </span>
              <span className="text-gray-700 font-medium   dark:text-gray-200">
                {forecast.temperature_2m_min[index].toFixed(0)}°
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastDisplay;
