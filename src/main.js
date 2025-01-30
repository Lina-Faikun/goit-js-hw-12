import { fetchImages } from "./JS/pixabay-api";
import { renderImages, clearGallery } from "./JS/render-functions.js";

const searchForm = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");
const loader = document.querySelector("#loader");

let currentPage = 1;
let searchQuery = "";

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  searchQuery = event.target.elements.searchQuery.value.trim();
  if (!searchQuery) return;

  currentPage = 1; // Скидаємо сторінку на 1 при новому пошуку
  clearGallery();
  loadMoreBtn.style.display = "none"; // Ховаємо кнопку перед новим пошуком
  loader.style.display = "block"; // Показуємо індикатор завантаження

  try {
    const data = await fetchImages(searchQuery, currentPage);
    if (data.hits.length === 0) {
      iziToast.warning({
        title: "Warning",
        message: "No images found. Please try a different search.",
        position: "topRight",
      });
      loader.style.display = "none";
      return;
    }

    renderImages(data.hits);
    loader.style.display = "none"; // Ховаємо індикатор завантаження
    if (data.totalHits > currentPage * 15) {
      loadMoreBtn.style.display = "block"; // Показуємо кнопку, якщо є ще зображення
    }
  } catch (error) {
    console.error("Error fetching images:", error);
    iziToast.error({
      title: "Error",
      message: "Something went wrong. Please try again later.",
      position: "topRight",
    });
    loader.style.display = "none";
  }
});

loadMoreBtn.addEventListener("click", async () => {
  currentPage += 1; // Збільшуємо номер сторінки при натисканні
  loader.style.display = "block"; // Показуємо індикатор завантаження

  try {
    const data = await fetchImages(searchQuery, currentPage);
    renderImages(data.hits, false); // Додаємо зображення до існуючих

    const cardHeight = document.querySelector(".gallery a").getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });

    if (data.hits.length < 15 || currentPage * 15 >= data.totalHits) {
      loadMoreBtn.style.display = "none"; // Ховаємо кнопку, якщо більше немає результатів
      iziToast.info({
        title: "End of Results",
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
      });
    }
    loader.style.display = "none"; // Ховаємо індикатор завантаження
  } catch (error) {
    console.error("Error loading more images:", error);
    iziToast.error({
      title: "Error",
      message: "Something went wrong. Please try again later.",
      position: "topRight",
    });
    loader.style.display = "none";
  }
});
