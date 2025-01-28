import{a as L,S as b}from"./assets/vendor-BOc6EdDj.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const v="48489244-88d9f9c306d25e531480e36e9",w="https://pixabay.com/api/",S=15;async function h(t,r=1){try{return(await L.get(w,{params:{key:v,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:S,page:r}})).data}catch(s){throw console.error("Помилка запиту:",s),new Error("Не вдалося отримати зображення.")}}const u=document.querySelector(".gallery");let _=new b(".gallery a");function m(t,r=!0){if(r&&(u.innerHTML=""),t.length===0)return;const s=t.map(({webformatURL:a,largeImageURL:e,tags:o,likes:n,views:p,comments:y,downloads:g})=>`
      <a class="gallery__item" href="${e}">
        <div class="photo-card">
          <img src="${a}" alt="${o}" loading="lazy" />
          <div class="info">
            <p><b>Likes:</b> ${n}</p>
            <p><b>Views:</b> ${p}</p>
            <p><b>Comments:</b> ${y}</p>
            <p><b>Downloads:</b> ${g}</p>
          </div>
        </div>
      </a>
    `).join("");u.insertAdjacentHTML("beforeend",s),_.refresh()}function q(){u.innerHTML=""}const E=document.querySelector("#search-form"),l=document.querySelector("#load-more"),d=document.querySelector("#loader");let c="",i=1,f=0;E.addEventListener("submit",async t=>{if(t.preventDefault(),c=t.target.elements.searchQuery.value.trim(),!!c){i=1,q(),l.classList.add("hidden");try{d.classList.remove("hidden");const r=await h(c,i);f=r.totalHits,m(r.hits),r.hits.length<f&&l.classList.remove("hidden")}catch(r){console.error(r)}finally{d.classList.add("hidden")}}});l.addEventListener("click",async()=>{i+=1;try{d.classList.remove("hidden");const t=await h(c,i);m(t.hits,!1),i*15>=f&&(l.classList.add("hidden"),alert("We're sorry, but you've reached the end of search results.")),P()}catch(t){console.error(t)}finally{d.classList.add("hidden")}});function P(){const t=document.querySelector(".gallery__item").getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
