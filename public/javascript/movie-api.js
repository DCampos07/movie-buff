const axios = require('axios');

axios.get("http://www.omdbapi.com/?t=Toy+Story&apikey=d69ff318")
.then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });