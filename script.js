// Input handlers and API
const poke_input = document.getElementById("search-input");
const search_button = document.getElementById("search-button");
const poke_api = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

// Display variables
const poke_screen = document.querySelector(".screen-container");
const poke_table = document.querySelector(".grid-right");

// Data Array
let data_array = [];
const allCategories = {
  normal: { category: "Normal", className: "normal" },
  fire: { category: "Fire", className: "fire" },
  water: { category: "Water", className: "water" },
  electric: { category: "Electric", className: "electric" },
  grass: { category: "Grass", className: "grass" },
  ice: { category: "Ice", className: "ice" },
  fighting: { category: "Fighting", className: "fighting" },
  poison: { category: "Poison", className: "poison" },
  ground: { category: "Ground", className: "ground" },
  flying: { category: "Flying", className: "flying" },
  psychic: { category: "Psychic", className: "psychic" },
  bug: { category: "Bug", className: "bug" },
  rock: { category: "Rock", className: "rock" },
  ghost: { category: "Ghost", className: "ghost" },
};

const pokeCategory = (types_array) => {
  let categories = {};
  let text = ``;
  for (let i = 0; i < types_array.length; i++) {
    let type = types_array[i].type.name;
    if (allCategories.hasOwnProperty(type)) {
      const { className, category } = allCategories[type];

      categories.className = className;
      categories.category = category;
    }

    text += `<div class="${categories.className} type" target="_blank">
    ${categories.category}
    </div>`;
  }

  return text;
};

const read_input = (value) => {
  const input = String(value).toLowerCase();
  const regex_input = input.replace(/♀/g, "-f").replace(/♂/g, "-m");
  fetchData(regex_input);
};

const fetchData = async (input) => {
  try {
    const result = await fetch(poke_api + input);
    const data = await result.json();
    data_array = data;
    displayDataFcc(data_array);
    console.log(data_array);
  } catch (err) {
    alert("Pokémon not found");
    console.log("There was an ERROR:", err);
  }
};

const displayData = (info) => {
  const { height, weight, id, name } = info;
  const poke_image = info.sprites.front_default;
  const poke_types = info.types; // This is an array

  poke_screen.innerHTML = `
  <div class="nameid-div">
    <h2 id="pokemon-name">${name.toUpperCase()}</h2>
    <h2 id="pokemon-id">#<i>${id}</i></h2>
  </div>
  <div class="weightheight-div">
    <h3 id="weight">Height: <i>${height}</i></h3>
    <h3 id="height">Weight: <i>${weight}</i></h3>
  </div>
  <img src="${poke_image}" alt="${name}'s Image" id="sprite" class="sprite" />
  <div class="types" id="types">${pokeCategory(poke_types)}</div>`;

  const { stats } = info;
  let table_stats = [];
  stats.forEach((obj) => {
    table_stats.push(obj.base_stat);
  });

  poke_table.innerHTML = `
  <div class="grid-child-right bold">Stats:</div>
    <div class="grid-child-right"><i id="hp">${table_stats[0]}</i></div>
    <div class="grid-child-right"><i id="attack">${table_stats[1]}</i></div>
    <div class="grid-child-right"><i id="defense">${table_stats[2]}</i></div>
    <div class="grid-child-right"><i id="special-attack">${table_stats[3]}</i></div>
    <div class="grid-child-right"><i id="special-defense">${table_stats[4]}</i></div>
    <div class="grid-child-right"><i id="speed"></i>${table_stats[5]}</div>
  </div>`;
};

const displayDataFcc = (info) => {
  // Worse Version & implementation needed for FCC standards
  /* Screen */
  const name = document.getElementById("pokemon-name");
  const id = document.getElementById("pokemon-id");
  const weight = document.getElementById("weight");
  const height = document.getElementById("height");
  const types = document.getElementById("types");
  /* Table */
  const hp = document.getElementById("hp");
  const attack = document.getElementById("attack");
  const defense = document.getElementById("defense");
  const special_atk = document.getElementById("special-attack");
  const special_def = document.getElementById("special-defense");
  const speed = document.getElementById("speed");
  /* Usable Data */
  const poke_image = info.sprites.front_default;
  const img_cont = document.querySelector(".img-container");
  const poke_types = info.types; // This is an array
  /* Actual Code */
  name.textContent = info.name.toUpperCase();
  id.textContent = `#${info.id}`;
  weight.textContent = `Weight: ${info.weight}`;
  height.textContent = `Height: ${info.height}`;
  img_cont.innerHTML = `<img src="${poke_image}" alt="${info.name}'s Image" id="sprite" class="sprite" />`;
  types.innerHTML = pokeCategory(poke_types);

  const { stats } = info;
  let table_stats = [];
  stats.forEach((obj) => {
    table_stats.push(obj.base_stat);
  });

  hp.textContent = table_stats[0];
  attack.textContent = table_stats[1];
  defense.textContent = table_stats[2];
  special_atk.textContent = table_stats[3];
  special_def.textContent = table_stats[4];
  speed.textContent = table_stats[5];
};

search_button.addEventListener("click", (e) => {
  e.preventDefault();
  read_input(poke_input.value);
});
