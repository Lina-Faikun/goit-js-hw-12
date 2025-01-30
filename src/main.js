import { fetchImages } from "./JS/pixabay-api.js";
import { renderImages, clearGallery } from "./JS/render-functions.js";
import iziToast from 'izitoast';

const searchForm = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");
const loader = document.querySelector("#loader");

let currentPage = 1;
let searchQuery = "";
const PER_PAGE = 15;
const MAX_PAGES = 2; 


function toggleLoadMore(totalHits) {
  
  const totalPages = Math.min(Math.ceil(totalHits / PER_PAGE), MAX_PAGES);
  
  
  if (currentPage >= totalPages) {
    loadMoreBtn.style.display = "none";
    iziToast.info({
      title: "End of Results",
      message: "You've reached the end of search results.",
      position: "topRight",
    });
  } else {
    loadMoreBtn.style.display = "block";
  }
}


searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  searchQuery = event.target.elements.searchQuery.value.trim();
  if (!searchQuery) return;

  currentPage = 1;
  clearGallery();
  loadMoreBtn.style.display = "none";
  loader.style.display = "block";

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
    loader.style.display = "none";
    toggleLoadMore(data.totalHits);
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
  currentPage += 1;
  loader.style.display = "block";

  try {
    const data = await fetchImages(searchQuery, currentPage);
    renderImages(data.hits, false); 

    
    const cardHeight = document.querySelector(".gallery a").getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });

    loader.style.display = "none";
    toggleLoadMore(data.totalHits);
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
