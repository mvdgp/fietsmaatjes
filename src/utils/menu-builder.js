import { fetchMainPageContent, fetchSubPageContent, fetchSocialContent } from "./prismic-fetcher";

/**
 * Builds the menu structure by fetching main and sub page content.
 * @returns {Promise<Array>} - A promise that resolves to an array representing the menu structure.
 */
async function buildMenu() {
    // Fetch main page content
    const mainPages = await fetchMainPageContent();
    const menu = [];

    for (const mainPage of mainPages) {
        // Fetch sub page content
        const subPages = await fetchSubPageContent(mainPage.id);

        // Create sub menu items
        const submenu = subPages.map(subPage => ({
            id: subPage.id,
            uid: subPage.uid,
            url: `${mainPage.url}${subPage.url}`,
            label: subPage.data.title[0].text
        }));

        // Create main menu item
        menu.push({
            id: mainPage.id,
            uid: mainPage.uid,
            url: mainPage.url,
            label: mainPage.data.title[0].text,
            submenu: submenu
        });
    }

    return menu;
}

/**
 * Fetches and returns social content.
 * @returns {Promise<Array>} - A promise that resolves to an array of social content.
 */
async function buildSocial() {
    // Fetch social content
    const socials = await fetchSocialContent();
    return socials;
}

export { buildMenu, buildSocial };