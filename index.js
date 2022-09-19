// Every module returns a promise
const puppeteer = require('puppeteer');
const fs = require('fs/promises');

/*
    ================================================
        Just Configure The Variables Below
    ================================================
*/
    const siteCollectionUrl = 'https://miamibeachbum.com/collections/shop-all'
    let selectorYouWantToStartScraping = '[data-products-grid] a[data-grid-link]'


/*
    ================================================
        Just Configure The Variables Above
    ================================================
*/

// To handle a promise, we will set to use asynchronous syntax to our functions
async function startApp() {
    /*
        1. Launch the browser. This await syntax is very useful since we don't know
        how long it'll take to launch the browser
    */
    const browser = await puppeteer.launch()

    /*
        2. Once it is done, we then create a new page/tab in the browser
    */
    const page = await browser.newPage()

    /*
        3. After creating a new page, tell the browser to navigate to a specific URL
    */
    await page.goto(siteCollectionUrl)

    /*
        Example:
        ~ Take a screenshot of that page
        Screenshot Options: Visit this blog https://www.testim.io/blog/puppeteer-screenshot/
    */
    await page.screenshot({path: './images/miamibeach2.png', fullPage: true})
    await page.screenshot({path: './images/miamibeach.png'})

    /* 
        Example:
        ~ Evaluate the page and extract useful data of that page
        Digital Ocean Puppeteer (blog) https://www.digitalocean.com/community/tutorials/how-to-scrape-a-website-using-node-js-and-puppeteer#step-4-mdash-scraping-data-from-multiple-pages
        Data Save to JSON file (blog) https://www.geeksforgeeks.org/node-js-fs-extra-outputjson-function/
    */
    const shopCollectionsAllUrl = await page.evaluate(() => {
        const arr = Array.from(document.querySelectorAll(selectorYouWantToStartScraping))
        return arr.map(data => data.href)
    })
    // console.log(shopCollectionsAllUrl, shopCollectionsAllUrl.length)

    /*
        4. Lastly, don't forget to close the browser
    */
    await page.close()
    await browser.close()
}

startApp()