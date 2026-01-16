export const API_BASE_URL = "https://localhost:7018/api/cars";
 //добавлять свой порт вручную
 
export const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Error loading data!");
  }
  return response.json();
};