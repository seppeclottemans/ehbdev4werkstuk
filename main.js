// execute on view load
(function() {

  fetchAllData().then(data => {
    const allItems = data;
    console.log(allItems);
    var genresSet = new Set();
  })
})();

// fetch all data from the entries.json file and return them.
function fetchAllData() {
  return axios.get('/entries.json')
  .then(function (response) {
    return response.data
  })
  .catch(function (error) {
    console.log(error);
  })
}

