// execute on view load
(function() {

  fetchAllData().then(data => {
    const allItems = data;
    console.log(allItems);
    let genres = getGenres(allItems, new Set());
    genres = SetToArray(genres);
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
function getGenres(array, set){
  array.forEach(item => {
    addToSet(item, set);
  });
  return set;
}

// add an item to set
function addToSet(item, set){
    set.add(_.toUpper(item.genre));
}

// set to array
function SetToArray(set){
   return Array.from(set);
}