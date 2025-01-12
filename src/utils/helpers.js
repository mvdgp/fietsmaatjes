/**
 * Resolves the link object to a proper URL.
 * @param {Object} linkObject - The link object to resolve.
 * @returns {Object} - The resolved link object.
 */
async function linkResolver(linkObject) {
    if (linkObject.link_type === 'Web') {
        if (!linkObject.url.startsWith('http://') && !linkObject.url.startsWith('https://')) {
            linkObject.url = 'http://' + linkObject.url;
        }
    }
    return linkObject;
}

/**
 * Resolves a date string to an object with day, month, and year.
 * @param {string} date - The date string in the format 'YYYY-MM-DD'.
 * @returns {Object} - The resolved date object.
 */
function dateResolver(date) {
    const months = [
        "JANUARI", "FEBRUARI", "MAART", "APRIL", "MEI", "JUNI",
        "JULI", "AUGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DECEMBER"
    ];

    const [year, month, day] = date.split("-");
    return {
        day: day,
        month: months[parseInt(month) - 1],
        year: year
    };
}

/**
 * Extracts the URL from an embed map raw text.
 * @param {string} rawText - The raw text containing the embed map.
 * @returns {string|null} - The extracted URL or null if not found.
 */
function extractURLfromEmbedMap(rawText) {
    if (!rawText) {
        console.error("Invalid rawText input:", rawText);
        return null;
    }
    const srcMatch = rawText.match(/src="([^"]*)"/);
    return srcMatch ? srcMatch[1] : null;
}

export { linkResolver, dateResolver, extractURLfromEmbedMap };