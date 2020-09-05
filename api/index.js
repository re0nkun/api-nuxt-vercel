const express = require("express");
const axios = require('axios');
const app = express();

app.get("/", function(req, res) {
  // res.send({
  //   message: 'Hello world!'
  // })

  axios.get('https://qiita.com/api/v2/items?query=tag:javascript&per_page=1&page=1')
    .then(response => {
      res.send(response.data);
    });
});

module.exports = app
// module.exports = {
//   path: "/api",
//   handler: app
// };