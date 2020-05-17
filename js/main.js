// execute on view load
(function () {

    fetchAllData().then(data => {
        // variable with all data
        const allItems = data;
        console.log(allItems);

        // all genres with number of occurences
        const genres = getGenres(allItems);
        // remove empty genres
        removeObjectItem(genres, "");
        console.log(genres);
        // print genre buttons
        for (var genre in genres) {
            let genreButton = createHtmlElement("button", "genre", `${genre} (${genres[genre]})`, "px-4 py-2 mt-2 font-semibold text-xs rounded-lg bg-gray-200 hover:bg-gray-300 uppercase mr-2");
            appendTo(genreButton, document.getElementById("genres"));
        };

        allItems.forEach(item => {
            createItemCard(item)
        });

    })

})();

// fetch all data from the entries.json file and return them.
function fetchAllData() {
    return axios.get('/entries.json')
        .then(function (response) {
            return response.data.items;
        })
        .catch(function (error) {
            console.log(error);
        })
}

// get all genres from items
// function inspired by: https://stackoverflow.com/questions/45630356/how-to-count-multiple-properties-values-in-array-of-objects-using-lodash
function getGenres(array) {
    return array.reduce((accumulator, currentValue) => {
        accumulator[_.upperCase(currentValue["genre"])] = accumulator[_.upperCase(currentValue["genre"])] ? accumulator[_.upperCase(currentValue["genre"])] + 1 : 1;

        // check if genre are different
        if (compareStrings(_.upperCase(currentValue["genre"]), _.upperCase(currentValue["genre-v2"]))) {

        } else {
            // add second genre
            accumulator[_.upperCase(currentValue["genre-v2"])] = accumulator[_.upperCase(currentValue["genre-v2"])] ? accumulator[_.upperCase(currentValue["genre-v2"])] + 1 : 1;
        }

        return accumulator;
    }, {});
}

// compare two strings
function compareStrings(string1, string2) {
    if (string1 === string2) {
        return true;
    } else {
        return false;
    }
}

function removeObjectItem(object, key) {
    return delete object[key];
}

function createHtmlElement(kind, id, text, classes) {
    let element = document.createElement(kind);
    element.id = id;
    element.innerHTML = text;
    element.className = classes;

    return element;
}

function appendTo(itemToApppend, parent) {
    parent.appendChild(itemToApppend);
}


// card styling: https://tailwindcomponents.com/component/simple-card
function createItemCard(item){
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