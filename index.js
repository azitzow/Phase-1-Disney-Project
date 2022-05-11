const list = document.getElementById("charactersList");
const searchFrame = document.getElementById("searchFrame");
const searchInput = document.getElementById("search");
const frame = document.createElement("div");
let allDisneyCharacters = [];


// =======================Fetch API and render==========================
window.addEventListener("DOMContentLoaded", async () => {
    initialStyles();
    await fetch("https://api.disneyapi.dev/characters")
      .then(res => res.json())
      .then((disneyChars) => {
        allDisneyCharacters = disneyChars.data;
        renderCharacters(allDisneyCharacters);
        searchInput.addEventListener("input", filterCharacters);
      })
      .catch((err) => console.log("Error: ", err));
  });


//========================== functions==================================
const renderCharacters = (characters) => characters.forEach(renderChar);

const renderChar = (character) => {
  const image = document.createElement("img");
  image.src = character.imageUrl;
  frame.append(image);
  list.append(frame);
  styleElements(frame, image);
};

const filterCharacters = (e) => {
  const value = e.target.value.toLowerCase();
  const filteredList = allDisneyCharacters.filter(character => {
      return character.length === 0 ? true : character.name.toLowerCase().includes(value);
  });

  while (frame.firstChild) {
    frame.removeChild(frame.firstChild);
  }
  renderCharacters(filteredList);
};

// ========================== styling functions=========================
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
    list.style.width = "75%";
    list.style.height = "100%";
    list.style.position = "absolute";
    list.style.right = "0%";
    list.style.top = "18%";
  };

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
