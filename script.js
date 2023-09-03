// https://newsapi.org/

const API_KEY = "8c6c58e3fa0e4f4592ea8998a453d237";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

const loading = document.querySelector(".loading");
async function fetchNews(query) {
  loading.classList.add("show");
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  loading.classList.remove("show");
  console.log("data");
  console.log(data);
  bindData(data.articles);
}

function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");

  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name} . ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

let curSelectedNav = null;
function onNavItemClick(id) {
  console.log("id=" + id);
  const idspacetrimmed = id.replace(/ /g, "");
  console.log("idspacetrimmed=" + idspacetrimmed);
  fetchNews(id);
  const navItem = document.getElementById(idspacetrimmed);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
  // alert("search click");
  search();
});

searchText.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    // alert("search enter");
    search();
  }
});

function search() {
  const query = searchText.value;
  if (!query) {
    alert("Please enter any text to search");
  } else {
    // alert("else");
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
  }
}
