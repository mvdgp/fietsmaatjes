import { fetchMainPageContent, fetchSubPageContent, fetchSocialContent } from "./prismic-fetcher";

async function buildMenu () {

    // Fetch main page content
    const mainPages = await fetchMainPageContent();
    const menu = [];

    for (const mainPage of mainPages) {

        // Fetch sub page content
        const submenu = [];
        const subPages = await fetchSubPageContent(mainPage.id);

        for (const subPage of subPages) {

            // Create sub menu item
            submenu.push({
                id: subPage.id,
                url: `${mainPage.url}${subPage.url}`,
                label: subPage.data.title[0].text
            });
        }

        // Create main menu item
        menu.push({
            id: mainPage.id,
            url: mainPage.url,
            label: mainPage.data.title[0].text,
            submenu: submenu
        });
    }

    return (menu);
};

async function buildSocial () {
    
    // Fetch social content
    const socials = await fetchSocialContent();

    return (socials);
}

export { buildMenu, buildSocial };