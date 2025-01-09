async function linkResolver(linkObject) {
    switch (linkObject.link_type) {
        case 'Web':
            if (!linkObject.url.startsWith('http://') && !linkObject.url.startsWith('https://')) {
                linkObject.url = 'http://' + linkObject.url;
            }
            break;
        default:
            // Handle default case
            break;
    }

    return linkObject;
}

function dateResolver(date) {
    const months = [
        "JANUARI", "FEBRUARI", "MAART", "APRIL", "MEI", "JUNI",
        "JULI", "AUGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DECEMBER"
    ];

    const [year, month, day] = date.split("-");
    const resolvedDate = {
        day: day,
        month: months[parseInt(month) - 1],
        year: year
    };

    return resolvedDate;
}

function extractURLfromEmbedMap(rawText) {
    if (!rawText) {
      console.error("Invalid rawText input:", rawText);
      return null;
    }
    // Update the regex to handle the src attribute correctly
    const srcMatch = rawText.match(/src="([^"]*)"/);
    if (srcMatch && srcMatch[1]) {
      return srcMatch[1];
    }
    return null; // Return null if no src attribute is found
  } 

export { linkResolver, dateResolver, extractURLfromEmbedMap };