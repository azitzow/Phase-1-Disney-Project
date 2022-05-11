const list = document.getElementById("charactersList");
const searchFrame = document.getElementById("searchFrame");
const searchInput = document.getElementById("search");
const submitBtn = document.getElementById("submitBtn");
const frame = document.createElement("div");
let fullList = [];
let allDisneyCharacters = [];

const styleElements = (frame, image) => {
  frame.style.display = "inline-block";
  frame.style.flexDirection = "row";
  frame.style.textAlign = "center";
  image.style.width = "180px";
  image.style.height = "180px";
  image.style.borderRadius = "2%";
  image.style.marginLeft = "0.6%";
  image.style.marginRight = "0.6%";
  image.style.marginTop = "0.6%";
};

const eventListeners = (image, character) => {
  image.addEventListener("mouseenter", () => {
    image.style.height = "220px";
    image.style.width = "220px";
  });
  image.addEventListener("mouseleave", () => {
    image.style.height = "180px";
    image.style.width = "180px";
  });
  image.addEventListener('click', () => renderBlowup(image, character))
};

const renderChar = (character) => {
  const image = document.createElement("img");
  image.src = character.imageUrl;
  styleElements(frame, image);
  eventListeners(image, character);
  frame.append(image);
  list.append(frame);
};

const filterCharacters = (allChars, search = '') => {
    allChars.filter(char => {
        return search.length === 0 ? true : char.name.toLowerCase().includes(search.toLowerCase())
    }).forEach(character => {
        renderChar(character)
    })
}

searchInput.addEventListener("change", () => {
  while (frame.hasChildNodes()) {
    frame.removeChild(frame.lastElementChild);
  }
  filterCharacters(fullList, searchInput.value);
});

submitBtn.addEventListener("click", () => {
  while (frame.hasChildNodes()) {
    frame.removeChild(frame.lastElementChild);
  }
  filterCharacters(fullList, searchInput.value);
});

const initialStyles = () => {
  searchFrame.style.height = "50px";
  searchFrame.style.width = "500px";
  searchFrame.style.position = "absolute";
  searchFrame.style.flex = 1;
  searchFrame.style.borderRadius = "20%";
  searchFrame.style.borderColor = "black";
  searchFrame.style.left = "50%";
  searchFrame.style.top = "2%";
  searchFrame.style.textAlign = "right";
  searchInput.style.width = "100%";
  searchInput.style.height = "100%";
  searchInput.style.fontSize = "25px";
  searchInput.style.paddingLeft = "10px";
  submitBtn.style.position = "absolute";
  submitBtn.style.top = "6%";
  submitBtn.style.right = "-2.6%";
  submitBtn.style.height = "50px";
  submitBtn.style.width = "100px";
  list.style.width = "75%";
  list.style.height = "100%";
  list.style.position = "absolute";
  list.style.right = "0%";
  list.style.top = "18%";
};

window.addEventListener("DOMContentLoaded", async () => {
  initialStyles();
  await fetch("https://api.disneyapi.dev/characters")
    .then((res) => {
      return res.json();
    })
    .then((disneyChars) => {
      fullList = disneyChars.data;
      filterCharacters(disneyChars.data);
    })
    .catch((err) => console.log("Error: ", err));
});
