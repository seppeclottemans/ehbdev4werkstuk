let genreFilters = [];
let targetAudience = [];
let allItems;

// execute on view load
(function () {

    fetchAllData().then(data => {
        // variable with all data
        allItems = data;
        // add eventlistners
        document.getElementById("familie").addEventListener("click", toggleFilter.bind(null, targetAudience, "familie"));
        document.getElementById("volwassenen").addEventListener("click", toggleFilter.bind(null, targetAudience, "volwassenen"));

        noActiveFilters();
    })

})();

// compare two strings
let compareStrings = (string1, string2) => {
    if (string1 === string2) {
        return true;
    } else {
        return false;
    }
}

// remover object property
let removeObjectProperty = (object, key) => {
    return delete object[key];
}

let clearDiv = (elementId) => {
    return document.getElementById(elementId).innerHTML = "";
}

let sortAlphabetical = (array, key) => {
    return array.sort(function(a,b) {
        return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
    });
}

let checkIfArrayIsEmpty = (array) => {
    if (array.length <= 0) {
        return true;
    } else {
        return false;
    }
}

// fetch all data from the entries.json file and return them.
function fetchAllData() {
    return axios.get('data/entries.json')
        .then(function (response) {
            return response.data.items;
        })
        .catch(function (error) {
            console.log(error);
        })
}

// print all items (this will onlyb be used if there are no filters active)
function printAllItems() {
    clearDiv("videos");
    allItems.forEach(item => {
        createItemCard(item)
    });
}

// get all genres from items
// function inspired by: https://stackoverflow.com/questions/45630356/how-to-count-multiple-properties-values-in-array-of-objects-using-lodash
function getGenres(array) {
    let genres = array.reduce((accumulator, currentValue) => {
        accumulator[_.upperCase(currentValue["genre"])] = accumulator[_.upperCase(currentValue["genre"])] ? accumulator[_.upperCase(currentValue["genre"])] + 1 : 1;

        // check if genre are different
        if (compareStrings(_.upperCase(currentValue["genre"]), _.upperCase(currentValue["genre-v2"]))) {

        } else {
            // add second genre
            accumulator[_.upperCase(currentValue["genre-v2"])] = accumulator[_.upperCase(currentValue["genre-v2"])] ? accumulator[_.upperCase(currentValue["genre-v2"])] + 1 : 1;
        }

        return accumulator;
    }, {})
    return genres;
}

function prinGenreButtons(genres) {
    clearDiv("genres");
    const genresDiv = document.getElementById("genres");
    // print genre buttons
    genres = sortAlphabetical(Object.entries(genres), 0)
    for (let [genre, amount] of genres) {
        let genreButton = createHtmlElement("button", genre, `${genre} (${amount})`, `px-4 py-2 mt-2 font-semibold text-xs rounded-lg bg-gray-200 hover:bg-gray-300 uppercase mr-2 ${checkIfGenreIsInActiveFilters(genre)}`);
        genreButton.addEventListener("click", toggleFilter.bind(null, genreFilters, genre));
        appendTo(genreButton, genresDiv);
    };
}

function checkIfGenreIsInActiveFilters(genre) {
    if (genreFilters.includes(genre)) {
        return "filterActive";
    }
}

// create a new html element
function createHtmlElement(kind, id, text, classes) {
    let element = document.createElement(kind);
    element.id = id;
    element.innerHTML = text;
    element.className = classes;

    return element;
}

// append element
function appendTo(itemToApppend, parent) {
    parent.appendChild(itemToApppend);
}

// card styling: https://tailwindcomponents.com/component/simple-card
function createItemCard(item) {
    let itemDiv = createHtmlElement("div", "item-card", "", "w-1/4 inline-block rounded overflow-hidden shadow-lg my-2 mx-8");
    let imagediv = createHtmlElement("div", "image-div", "", "w-full h-64 bg-cover bg-center");
    imagediv.style = `background-image:url('${item['thumbnail']['url']}')`
    let textDiv = createHtmlElement("div", "text-div", "", "px-6 py-4 h-40");
    let title = createHtmlElement("p", "title", `${item['name']}`, "font-bold text-xl mb-2 truncate");
    let text = createHtmlElement("p", "text", item['slug'], "text-grey-darker text-base");

    appendTo(title, textDiv)
    appendTo(text, textDiv)
    appendTo(imagediv, itemDiv)
    appendTo(textDiv, itemDiv)
    appendTo(itemDiv, document.getElementById("videos"))
}

// toggles filter from active to inactice
function toggleFilter(array, buttonId) {
    const button = document.getElementById(buttonId);

    if (button.classList.contains('filterActive')) {
        _.pull(array, buttonId);
        // check if there are active filters
        if (checkIfArrayIsEmpty(genreFilters) && checkIfArrayIsEmpty(targetAudience)) {
            noActiveFilters();
        } else {
            printItemsByFilters();
        }
    } else {
        array.push(buttonId);
        printItemsByFilters();
    }
    button.classList.toggle('filterActive');
}


function printItemsByFilters() {
    clearDiv("videos");
    document.getElementById("removeFilters").style.display = "block";

    let itemsToPrint = filterByAudience();

    // genre buttons
    if (targetAudience.length == 1) {
        const genres = getGenres(itemsToPrint);
        removeObjectProperty(genres, "");
        prinGenreButtons(genres)
    }else{
        // all genres with number of occurences
        const genres = getGenres(allItems);
        // remove empty genres
        removeObjectProperty(genres, "");

        // print genre buttons
        genreButtons = prinGenreButtons(genres);
    }

    if (!checkIfArrayIsEmpty(genreFilters)) {
        itemsToPrint = filterByGenre(itemsToPrint);
    }

    itemsToPrint.forEach(item => {
        createItemCard(item);
    });
}

// filter all items by selected audience
function filterByAudience() {
    if (targetAudience.length == 1) {
        const audience = targetAudience[0];
        return allItems.filter(function (item) {
            return item['category'] === audience;
        });
    } else {
        return allItems;
    }
}

// filter an item array by selected genres
function filterByGenre(itemArray) {
    return itemArray.filter(function (item) {
        return _.includes(genreFilters, _.upperCase(item['genre'])) || _.includes(genreFilters, _.upperCase(item['genre-v2']));
    })
}

// remove all active filters
function removeFilters(){
    genreFilters = [];
    targetAudience.forEach(function (selectedElement, index) {
        document.getElementById(selectedElement).classList.toggle('filterActive')
    });
    targetAudience.splice(0, 2);
    noActiveFilters();
}


function noActiveFilters(){
    document.getElementById("removeFilters").style.display = "none";
    // all genres with number of occurences
    const genres = getGenres(allItems);
    // remove empty genres
    removeObjectProperty(genres, "");

    // print genre buttons
    genreButtons = prinGenreButtons(genres);
    printAllItems();
}