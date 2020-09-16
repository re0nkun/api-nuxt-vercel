const express = require("express");
const axios = require('axios');
const app = express();

app.get("/", function(req, res) {
  // res.setHeader('Access-Control-Allow-Credentials', true)
  // res.setHeader('Access-Control-Allow-Origin', '*')
  // res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  // res.setHeader(
  //   'Access-Control-Allow-Headers',
  //   'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  // )

  // Count
  const max_results = 30

  // Hashtag
  let hashTag = ''
  if (req.query.hashtag) {
    hashTag = `#${req.query.hashtag}`
  }
  const keyword = encodeURIComponent(`#函館 ${hashTag} has:media -is:retweet -is:quote`)

  // Next token
  let nextToken = ''
  if (req.query.next) {
    nextToken = `&next_token=${req.query.next}`
  }

  axios.get(`https://api.twitter.com/2/tweets/search/recent?query=${keyword}&max_results=${max_results}&tweet.fields=created_at,entities&expansions=author_id,attachments.media_keys&user.fields=pinned_tweet_id,profile_image_url&media.fields=preview_image_url,url,height,width${nextToken}`, {
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`
    }
  })
    .then(response => {
      const r = response.data

      const data = r.data.map(d => {
        const user = r.includes.users.find(u => {
          return u.id === d.author_id
        })

        const media = r.includes.media.filter(m => {
          if (d.attachments) {
            return d.attachments.media_keys.some(k => {
              return k === m.media_key
            })
          }
        })

        return {
          ...d,
          user: { ...user },
          media: media
        }
      })

      res.send({ data, meta: { ...r.meta } });
    });
});

module.exports = app
// module.exports = {
//   path: "/api",
//   handler: app
// };