var namePoke = document.getElementById('name')
var imgpoke = document.getElementById('imgpoke')
var pokeNumber = document.getElementById('pokenumber')
var btnForward = document.getElementById('forward')
var btnBackward = document.getElementById('backward')

let pokemonDetails = [];
urlPokeApi = `https://pokeapi.co/api/v2/pokemon/1`;

const api = fetch(urlPokeApi)
            .then((item) => item.json())
            .then((bodyJson) => bodyJson)
            //.then((retorno) => console.log(retorno))

            /*
            .then((results) => results.sprites)
            .then((outros) => outros.other)
            .then((image) => imgpoke.innerHTML = `
                <img src="${image.dream_world.front_default}">
            `)
            */
api.then((pokeinfo) => {
    namePoke.innerHTML = pokeinfo.name;

    function leftPad(value, totalWidth, paddingChar) {
        var length = totalWidth - value.toString().length + 1;
        return Array(length).join(paddingChar || '0') + value;
      };

    pokeNumber.innerHTML = '#'+leftPad(pokeinfo.id, 4);
})

var tdAbility = document.getElementById('ability')

function createElementLi(elementLi) {
    var types = document.getElementById('types')
    var li = document.createElement('li')
    var liElement = types.appendChild(li)
    liElement.innerHTML = elementLi;
}
api.then((types) => types.types)
   .then((type) => type.map((slot) => createElementLi(slot.type.name)))
    

api.then((images) => images)
   .then((other) => imgpoke.innerHTML = `<img src='${other.sprites.other.dream_world.front_default}'>`)

var tableInfo = document.getElementById('tabinfo')

api.then((pokeDetails) => pokeDetails)
   .then((info) => {
    
    const heightConvert = info.height / 10;
    const weightConvert = info.weight / 100;
    const abilityName = info.abilities.map((ability) => ability.ability.name).join(', ')
    tableInfo.innerHTML = `  
    <tr>
        <td>Species</td>
        <td>Seed</td>
    </tr>
    <tr>
        <td>Height</td>
        <td>${heightConvert} cm</td>
    </tr>
    <tr>
        <td>Weight</td>
        <td>${weightConvert} kg</td>
    </tr>
    <tr>
        <td>Abilities</td>
        <td>${abilityName}</td>
    </tr>
`})




