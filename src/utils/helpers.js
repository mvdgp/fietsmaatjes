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

export { linkResolver };
