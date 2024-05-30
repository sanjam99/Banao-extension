const puppeteer = require('puppeteer');

const scrapeLinkedInProfile = async (url) => {
    try {
        // Launching browser in headless mode
        const browser = await puppeteer.launch({ headless: false }); // Set headless to true
        const page = await browser.newPage();

        // Login to LinkedIn
        await page.goto('https://www.linkedin.com/login', { waitUntil: 'networkidle2' });
        await page.type('input#username', 'sanketjam@protonmail.com');
        await page.type('input#password', 'Sanjam99');
        await page.click('.btn__primary--large.from__button--floating');
        await page.waitForNavigation();

        // Function to scrape profile data
        const getProfileData = async () => {
            await page.goto(url);
            await page.waitForSelector('.text-heading-xlarge.inline.t-24.v-align-middle.break-words', { timeout: 60000 });

            return page.evaluate(() => {
                const name = document.querySelector('.text-heading-xlarge.inline.t-24.v-align-middle.break-words')?.textContent || '';
                const location = document.querySelector('.text-body-small.inline.t-black--light.break-words')?.textContent.trim() || '';
                const about = document.querySelector('div.full-width.t-14.t-normal.t-black.display-flex.align-items-center span[aria-hidden="true"]')?.innerText.trim() || '';
                const bio = document.querySelector('.text-body-medium.break-words[data-generated-suggestion-target="urn:li:fsu_profileActionDelegate:-71558079"]')?.textContent.trim() || '';
                const bioLine = document.querySelector('.text-body-medium.break-words[data-generated-suggestion-target="urn:li:fsu_profileActionDelegate:-71558079"]')?.textContent.trim() || '';
                const followerCount = document.querySelector('p.text-body-small span[aria-hidden="true"]')?.innerText || '';
                const connectionCount = document.querySelector('ul li.text-body-small span')?.textContent.trim() || '';
            if(followerCount != null & connectionCount != null){
                return {
                    name,
                    url: window.location.href,
                    about,
                    bio,
                    location,
                    followerCount,
                    connectionCount,
                    bioLine
                };
            }
            });
        };

        let profileData = {};
        let attempts = 0;
        const maxAttempts = 3;

        // Retry logic for scraping
        do {
            attempts++;
            profileData = await getProfileData();
        } while ((profileData.followerCount == null || profileData.connectionCount == null) && attempts < maxAttempts);

        // Closing browser
        await browser.close();

        // Logging and returning profile data
        console.log('Profile data scraped successfully:', profileData);
        return profileData;

    } catch (error) {
        console.error('An error occurred:', error);
    }
};

module.exports = scrapeLinkedInProfile;
