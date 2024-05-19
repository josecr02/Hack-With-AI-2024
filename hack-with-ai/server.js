console.log('Server Started !')

const axios = require("axios");
const cheerio = require("cheerio");
// const pretty = require("pretty");
// https://www.amazon.in/Acer-Nitro-AN515-57-i5-11400H-Graphics/product-reviews/B099ZZ13JB/ref=cm_cr_dp_d_show_all_btm?ie=UTF8&reviewerType=all_reviews

var URL = 'https://www.amazon.in/Acer-Nitro-AN515-57-i5-11400H-Graphics/product-reviews/B099ZZ13JB/ref=cm_cr_dp_d_show_all_btm?ie=UTF8&reviewerType=all_reviews';
var reviews = [];

axios.get(URL) 
	.then(
        ({ data }) => {
            // console.log(data);
            const $ = cheerio.load(data); 
            // Extract reviews and authors from the current page
            $('.review').each((i, elem) => {
                const review = $(elem).find('.review-text-content span').text().trim();
                const date = $(elem).find('.review-date').text().trim();
                reviews.push({ review, date });
            });
		console.log(reviews)
        console.log('finished Scraping !')
        }
    );
