import axios from "axios";

const API_KEY = "48489244-88d9f9c306d25e531480e36e9";
const BASE_URL = "https://pixabay.com/api/";
const PER_PAGE = 15;

export async function fetchImages(query, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: PER_PAGE,
        page,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Помилка запиту:", error);
    throw new Error("Не вдалося отримати зображення.");
  }
}
