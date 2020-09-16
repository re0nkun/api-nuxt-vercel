const express = require("express");
const axios = require('axios');
const app = express();

app.get("/", function(req, res) {
  const token = 'AAAAAAAAAAAAAAAAAAAAAJlcGAEAAAAAqIR1q9F54yuoPBUT7lz%2FS08w0Uw%3D2qaTende0yfTeVO7F68eK4w589vdFf6ePMG6wxqdvaxGlWocmd'

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
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      const r = response.data

      // const data = []
      // for (let i = 0; i < r.data.length; i++) {
      //   r.includes.users.find(u => {
      //     if (u.id === r.data[i].author_id) {
      //       data.push({
      //         ...r.data[i],
      //         user: { ...u }
      //       })
      //     }
      //   })
      // }

      const data = r.data.map(d => {
        const user = r.includes.users.find(u => {
          return u.id === d.author_id
        })

        const media = r.includes.media.filter(m => {
          if (d.attachments) {
            return d.attachments.media_keys.some(k => {
              return k === m.media_key
            })
            // return m.media_key === d.attachments.media_keys[0]
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