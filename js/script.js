var characterList = document.getElementById("character-list");
var prevPageBtn = document.getElementById("prev-page");
var nextPageBtn = document.getElementById("next-page");

var currentPage = 1;

function fetchCharacters(page) {
  var url = "https://rickandmortyapi.com/api/character/?page=" + page;

  fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      return response.json();
    })
    .then(function (data) {
      renderCharacters(data.results);
      updatePaginationButtons(data.info);
    })
    .catch(function (error) {
      characterList.innerHTML = "<p>Error al cargar personajes. Inténtalo de nuevo.</p>";
      console.error(error);
    });
}


function renderCharacters(characters) {

  characterList.innerHTML = "";


  characters.forEach(function (character) {
    var listItem = document.createElement("li");
    listItem.className = "character-card";

    listItem.innerHTML =
      '<img src="' + character.image + '" alt="' + character.name + '">' +
      "<h3>" + character.name + "</h3>" +
      "<p>Especie: " + character.species + "</p>";

    characterList.appendChild(listItem);
  });
}

function updatePaginationButtons(info) {
  prevPageBtn.disabled = info.prev === null;
  nextPageBtn.disabled = info.next === null;
}

prevPageBtn.addEventListener("click", function () {
  if (currentPage > 1) {
    currentPage--;
    fetchCharacters(currentPage);
  }
});

nextPageBtn.addEventListener("click", function () {
  currentPage++;
  fetchCharacters(currentPage);
});

fetchCharacters(currentPage);