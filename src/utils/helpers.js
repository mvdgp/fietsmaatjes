async function linkResolver(linkObject) {
    switch (linkObject.link_type) {
        case 'Web':
            if (!linkObject.url.startsWith('http://') && !linkObject.url.startsWith('https://')) {
                linkObject.url = 'http://' + linkObject.url;
            }
            break;
        case 'Document':
            // Handle Document link type
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

export { linkResolver, dateResolver };