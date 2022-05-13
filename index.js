const list = document.getElementById("charactersList");
const searchFrame = document.getElementById("searchFrame");
const searchInput = document.getElementById("search");
const frame = document.createElement("div");
let allDisneyCharacters = [];

// =======================Fetch API and render==========================
window.addEventListener("DOMContentLoaded", async () => {
  initialStyles();
  await fetch("https://api.disneyapi.dev/characters")
    .then((res) => res.json())
    .then((disneyChars) => {
      allDisneyCharacters = disneyChars.data;
      renderCharacters(allDisneyCharacters);
      searchInput.addEventListener("input", filterCharacters);
    })
    .catch((err) => console.log("Error: ", err));
});

//========================== functions==================================
const renderCharacters = (characters) => {
  characters.forEach(renderChar);
};

const renderChar = (character) => {
  const image = document.createElement("img");
  image.src = character.imageUrl;

  image.addEventListener("mouseenter", () => {
    image.style.height = "220px";
    image.style.width = "220px";
  });
  image.addEventListener("mouseleave", () => {
    image.style.height = "180px";
    image.style.width = "180px";
  });

  image.addEventListener("click", () => {
    renderBlowup(image, character);
  });
  
  frame.append(image);
  list.append(frame);
  styleElements(frame, image);
};

const filterCharacters = (e) => {
  const value = e.target.value.toLowerCase();
  const filteredList = allDisneyCharacters.filter((character) => {
    return character.length === 0
      ? true
      : character.name.toLowerCase().includes(value);
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
  list.style.width = "73%";
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

const mainImageStyles = () => {
  return "width: 350px; height: 350px; border-radius: 5%;";
};

window.addEventListener("DOMContentLoaded", async () => {
  initialStyles();
  await fetch("https://api.disneyapi.dev/characters")
    .then((res) => {
      return res.json();
    })
    .then((disneyChars) => {
      renderBlowup({ src: disneyChars.data[0].imageUrl }, disneyChars.data[0]);
      filterCharacters(disneyChars.data);
    })
    .catch((err) => console.log("Error: ", err));
});

  function renderBlowup(image, character) {
  const blowup = document.querySelector("div#blowup");
  // remove current blowup detail
  blowup.innerHTML = "";

  // insert new blowup detail
  blowup.className = "blowup";
  blowup.innerHTML = `
      <img id='mainImage' style='${mainImageStyles()}' src="${image.src}">
      <div class="content">
          ${mkBlowupContent(character)}
      </div>
`;

  styleElements(blowup, image);
}

function mkBlowupContent(character) {
  let contentHtml = `<h1 style="margin-top: 10px;">${character.name}</h1>`;

  // merge contents of the character's films and shortFilms arrays; sort by alpha
  const films = [...character.films, ...character.shortFilms].sort();

  // add html of film info and TV info to the html blob
  contentHtml +=
    mkCreditsBlock(films, contentHtml, "Film Credits:") +
    mkCreditsBlock(character.tvShows, contentHtml, "TV Credits:");
  return contentHtml;
}

// lay out the text credits (where medium is array of film or tv credits)
function mkCreditsBlock(medium, contentHtml, creditHeading) {
  let creditsBlock = "";
  if (medium.length > 0) {
    creditsBlock = `
          <h3 style="margin-top: 0px;">${creditHeading}</h3>
          ${mkCreditsString(medium, "p")}
  `;
  }
  return creditsBlock;
}

// wrap each film/tvShow credit/name with an html tag
// If the API included annotation of "page does not exist" for a show, remove it
function mkCreditsString(credits, tag) {
  const re = / \(page does not exist\)/;
  return credits
    .map(
      (credit) => "<" + tag + ">" + credit.replace(re, "") + "</" + tag + ">"
    )
    .join("");
}
