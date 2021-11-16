var express = require('express'),
    cors = require("cors"),
    app = express(),
    bodyParser = require('body-parser'),
    axios = require('axios');

    const url = require('url');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.get("/api/repos", (req, res) => {
    const queryObject = url.parse(req.url,true).query;

    const repoSearchKey = queryObject.repoSearchText

    console.log(queryObject);

    if(repoSearchKey){
        axios({
            method: "get",
            url: `https://api.github.com/search/repositories?q=${repoSearchKey}&sort=stars&order=desc:`,
        }).then(response => {
            res.send(response.data);
        }).catch(err => {
            res.send(err);
        });
    }

});

const PORT = process.env.PORT || 3001;
module.exports = app.listen(PORT, () => {
    console.log('Server running on port %d', PORT);
})
