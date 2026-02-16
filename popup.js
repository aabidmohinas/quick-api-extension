const apis = [
  {
    name: "Dog CEO",
    desc: "Random dog images",
    url: "https://dog.ceo/api/breeds/image/random",
    example: "fetch('https://dog.ceo/api/breeds/image/random').then(r=>r.json()).then(console.log)"
  },
  {
    name: "Cat Facts",
    desc: "Random cat facts",
    url: "https://catfact.ninja/fact",
    example: "fetch('https://catfact.ninja/fact').then(r=>r.json()).then(console.log)"
  },
  {
    name: "Advice Slip",
    desc: "Random advice",
    url: "https://api.adviceslip.com/advice",
    example: "fetch('https://api.adviceslip.com/advice').then(r=>r.json()).then(console.log)"
  }
];

const list = document.getElementById("api-list");
const search = document.getElementById("search");
const details = document.getElementById("details");
const apiName = document.getElementById("api-name");
const apiDesc = document.getElementById("api-desc");
const apiResponse = document.getElementById("api-response");
const copyBtn = document.getElementById("copy");
const backBtn = document.getElementById("back");

function render() {
  list.innerHTML = "";
  apis
    .filter(a => a.name.toLowerCase().includes(search.value.toLowerCase()))
    .forEach(api => {
      const li = document.createElement("li");
      li.textContent = api.name;
      li.onclick = () => openAPI(api);
      list.appendChild(li);
    });
}

function openAPI(api) {
  list.classList.add("hidden");
  details.classList.remove("hidden");

  apiName.textContent = api.name;
  apiDesc.textContent = api.desc;
  apiResponse.textContent = "Loading...";

  fetch(api.url)
    .then(r => r.json())
    .then(data => apiResponse.textContent = JSON.stringify(data, null, 2))
    .catch(() => apiResponse.textContent = "Error fetching API");

  copyBtn.onclick = () => navigator.clipboard.writeText(api.example);
}

backBtn.onclick = () => {
  details.classList.add("hidden");
  list.classList.remove("hidden");
};

search.addEventListener("input", render);
render();

