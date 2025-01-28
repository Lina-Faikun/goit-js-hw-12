import { fetchImages } from "./JS/pixabay-api.js";
import { renderImages, clearGallery } from "./JS/render-functions.js";

const searchForm = document.querySelector("#search-form");
const loadMoreBtn = document.querySelector("#load-more");
const loader = document.querySelector("#loader");

let query = "";
let page = 1;
let totalHits = 0;

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  query = event.target.elements.searchQuery.value.trim();

  if (!query) return;

  page = 1;
  clearGallery();
  loadMoreBtn.classList.add("hidden");

  try {
    loader.classList.remove("hidden");
    const data = await fetchImages(query, page);
    totalHits = data.totalHits;
    renderImages(data.hits);

    if (data.hits.length < totalHits) {
      loadMoreBtn.classList.remove("hidden");
    }
  } catch (error) {
    console.error(error);
  } finally {
    loader.classList.add("hidden");
  }
});

loadMoreBtn.addEventListener("click", async () => {
  page += 1;

  try {
    loader.classList.remove("hidden");
    const data = await fetchImages(query, page);
    renderImages(data.hits, false);

    if (page * 15 >= totalHits) {
      loadMoreBtn.classList.add("hidden");
      alert("We're sorry, but you've reached the end of search results.");
    }

    smoothScroll();
  } catch (error) {
    console.error(error);
  } finally {
    loader.classList.add("hidden");
  }
});

function smoothScroll() {
  const cardHeight = document.querySelector(".gallery__item").getBoundingClientRect().height;
  window.scrollBy({ top: cardHeight * 2, behavior: "smooth" });
}
