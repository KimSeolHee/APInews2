let buttonArea = document.querySelectorAll(".button-area button")
let searchTag = document.getElementById("search-tag")
let searchButton = document.getElementById("search-button")
let news = [];
let url;


buttonArea.forEach((menu) => {menu.addEventListener("click", (event) => keywordSearch(event))})

const getNews = async() => {
  let header = new Headers({"x-api-key": "xDE-JG2y21BtzzcAGc_GP7L0mhmxMt3FI7JkOHCuImk"});
  let response = await fetch(url, {headers:header});
  let data = await response.json();
  news = data.articles;

  render();
}

const getNewsByKeyword = async() => {
  let Tag = searchTag.value;
  url = new URL(`https://api.newscatcherapi.com/v2/search?q=${Tag}&countries=KR&page_size=10`);
  
  getNews();
}



const getLatestNews = async () => {
  url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10`
  );
  getNews();
};

getLatestNews();

const keywordSearch = async (event) => {
  console.log("클릭됨",event.target.textContent)
  let topic = event.target.textContent.toLowerCase();
  url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`);
  getNews();
} 

const render = () => {
  let newsHTML = "";
  newsHTML = news.map((item) => {
      return `<div class="row">
    <div class="col-lg-3">
      <img class="news-img" src="${item.media}">
    </div>
    <div class="col-lg-8">
      <h2 id="title">${item.title}</h2>
      <p>${item.summary}</p>
      <div>${item.rights} * ${item.published_date}</div>
    </div>
  </div>`;
    })
    .join("");


  document.getElementById("news-section").innerHTML = newsHTML;
};


let enterkey = (event) => {
  if(event.keyCode === 13) {
    getNewsByKeyword(event);
  }
}

searchButton.addEventListener("click", getNewsByKeyword)
searchTag.addEventListener("keyup",enterkey)
searchTag.addEventListener("focus", ()=>{searchTag.value=""})