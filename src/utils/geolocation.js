import axios from "axios";

export const getCurrentLocation = async () => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Reverse geocoding untuk mendapatkan nama kota
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );

            const city =
              response.data.address.city ||
              response.data.address.town ||
              response.data.address.county;

            resolve({
              latitude,
              longitude,
              city,
            });
          } catch (err) {
            reject(new Error("Gagal mendapatkan nama lokasi"));
          }
        },
        (error) => {
          reject(new Error("Gagal mendapatkan lokasi"));
        }
      );
    } else {
      reject(new Error("Geolokasi tidak didukung"));
    }
  });
};
