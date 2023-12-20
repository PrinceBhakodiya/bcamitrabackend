const axios = require('axios');

axios
  .get("http://www.pressuresensitive.xyz/")
  .then(function (response) {
    const reTitles = /(?<=\<div class="content"><a\shref=.*?\>).*?(?=\<\/a\>)/g;
    [...response.data.matchAll(reTitles)].forEach(title => console.log(`- ${title}`));
   });