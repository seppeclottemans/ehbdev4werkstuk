var _ = require('lodash');
// get all genres from items
// function inspired by: https://stackoverflow.com/questions/45630356/how-to-count-multiple-properties-values-in-array-of-objects-using-lodash
export function getGenres(array) {
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

let genreFilters = ["THEATER", "DANS"];

export function filterByGenre(itemArray) {
    return itemArray.filter(function (item) {
        return _.includes(genreFilters, _.upperCase(item['genre'])) || _.includes(genreFilters, _.upperCase(item['genre-v2']));
    })
}

// compare two strings
let compareStrings = (string1, string2) => {
    if (string1 === string2) {
        return true;
    } else {
        return false;
    }
}