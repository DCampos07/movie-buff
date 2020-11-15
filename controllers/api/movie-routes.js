const router = require('express').Router();
const axios = require('axios');


router.get('/', (req, res) => {
    axios.get("http://www.omdbapi.com/?t=Toy+Story&apikey=d69ff318")  
    .then(function (response) {
            const movies = {
                title: response.data.Title,
                poster: response.data.Poster
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
})

module.exports = router;
