import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { fetchImages } from "./JS/pixabay-api.js"; 
import { renderImages, clearGallery } from "./JS/render-functions.js";

const form = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector("#load-more");

let query = "";
let page = 1;
let totalHits = 0;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  query = event.target.elements.searchQuery.value.trim(); 

  if (!query) {
    iziToast.warning({
      title: "Помилка",
      message: "Поле пошуку не може бути порожнім!",
      position: "topRight",
    });
    return;
  }

  page = 1;
  clearGallery(); 

  try {
    const { hits, totalHits: total } = await fetchImages(query, page);
    totalHits = total;

    if (hits.length === 0) {
      iziToast.info({
        title: "Інформація",
        message: "За вашим запитом нічого не знайдено!",
        position: "topRight",
      });
      return;
    }

    renderImages(hits);
    loadMoreBtn.classList.remove("hidden");

  } catch (error) {
    iziToast.error({
      title: "Помилка",
      message: "Щось пішло не так. Спробуйте ще раз!",
      position: "topRight",
    });
  }
});

loadMoreBtn.addEventListener("click", async () => {
  page += 1;

  try {
    const { hits } = await fetchImages(query, page);
    
    if (hits.length === 0) {
      iziToast.info({
        title: "Все!",
        message: "Це були всі результати за вашим запитом!",
        position: "topRight",
      });
      loadMoreBtn.classList.add("hidden");
      return;
    }

    renderImages(hits);
  } catch (error) {
    iziToast.error({
      title: "Помилка",
      message: "Не вдалося завантажити додаткові зображення.",
      position: "topRight",
    });
  }
});
