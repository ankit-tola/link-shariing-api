const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeMetadata(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    return {
      title: $('title').text() || '',
      description: $('meta[name="description"]').attr('content') || '',
      image: $('meta[property="og:image"]').attr('content') || '',
    };
  } catch (err) {
    return { title: '', description: '', image: '' };
  }
}

module.exports = scrapeMetadata;
