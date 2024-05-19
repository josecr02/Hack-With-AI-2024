console.log('Server Started !')

const axios = require("axios");
const cheerio = require("cheerio");
// const pretty = require("pretty");
// https://www.amazon.in/Acer-Nitro-AN515-57-i5-11400H-Graphics/product-reviews/B099ZZ13JB/ref=cm_cr_dp_d_show_all_btm?ie=UTF8&reviewerType=all_reviews

var URL = 'https://www.amazon.in/Acer-Nitro-AN515-57-i5-11400H-Graphics/product-reviews/B099ZZ13JB/ref=cm_cr_dp_d_show_all_btm?ie=UTF8&reviewerType=all_reviews';
var reviews = [];

const scrapeReviews = async (url) => {
    let reviews = [];
    let nextPageUrl = url;

    while (nextPageUrl) {
        try {
            // Fetch the HTML content of the current page
            const { data } = await axios.get(nextPageUrl);
            // Load the HTML content into Cheerio
            const $ = cheerio.load(data);

            // Extract reviews, authors, and dates from the current page
            $('.review').each((i, elem) => {
                const review = $(elem).find('.review-text-content span').text().trim();
                const date = $(elem).find('.review-date').text().trim();
                reviews.push({ review, date });
            });

            // Find the URL for the next page
            const nextPageElement = $('li.a-last a');
            if (nextPageElement.length > 0) {
                nextPageUrl = nextPageElement.attr('href');
            } else {
                nextPageUrl = null;
            }
        } catch (error) {
            console.error('Error scraping reviews:', error);
            nextPageUrl = null;  // Stop if there's an error
        }
    }

    return reviews;
};

scrapeReviews(URL);
// console.log(yo);

// axios.get(URL) 
// 	.then(
//         ({ data }) => {
//             // console.log(data);
//             const $ = cheerio.load(data); 
//             // Extract reviews and authors from the current page
//             $('.review').each((i, elem) => {
//                 const review = $(elem).find('.review-text-content span').text().trim();
//                 const date = $(elem).find('.review-date').text().trim();
//                 reviews.push({ review, date });
//             });
// 		// console.log(reviews)
//         const nextPageElement = $('a-last a').text();
//         console.log(nextPageElement);
//         console.log('finished Scraping !')
//         }
//     );
