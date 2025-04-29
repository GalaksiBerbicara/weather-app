import axios from "axios";

const API_BASE_URL = "https://api.open-meteo.com/v1/forecast";
const GEOCODING_URL = "https://nominatim.openstreetmap.org/search";

export const weatherService = {
  async getCoordinates(location) {
    try {
      const response = await axios.get(GEOCODING_URL, {
        params: {
          format: "json",
          q: location,
        },
      });
      return response.data[0];
    } catch (error) {
      throw new Error("Gagal mendapatkan koordinat");
    }
  },

  async getCurrentWeather(lat, lon) {
    try {
      const response = await axios.get(API_BASE_URL, {
        params: {
          latitude: lat,
          longitude: lon,
          current_weather: true,
          hourly: "temperature_2m,relativehumidity_2m,windspeed_10m",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Gagal mendapatkan data cuaca");
    }
  },

  async getForecast(lat, lon) {
    try {
      const response = await axios.get(API_BASE_URL, {
        params: {
          latitude: lat,
          longitude: lon,
          daily: "weathercode,temperature_2m_max,temperature_2m_min",
          timezone: "auto",
          forecast_days: 5,
        },
      });
      return response.data.daily;
    } catch (error) {
      throw new Error("Gagal mendapatkan prakiraan cuaca");
    }
  },
};
