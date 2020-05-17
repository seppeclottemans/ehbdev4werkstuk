// execute on view load
(function () {

  fetchAllData().then(data => {
    const allItems = data;
    console.log(allItems);
    let genres = getGenres(allItems);
    console.log(genres);
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
    if(compareStrings(_.upperCase(currentValue["genre"]), _.upperCase(currentValue["genre-v2"]))){
        
    }else{
      // add second genre
      accumulator[_.upperCase(currentValue["genre-v2"])] = accumulator[_.upperCase(currentValue["genre-v2"])] ? accumulator[_.upperCase(currentValue["genre-v2"])] + 1 : 1;
    }

    return accumulator;
  }, {});
}

// compare two strings
function compareStrings(string1, string2){
    if(string1 === string2){
      return true;
    }else{
      return false;
    }
}