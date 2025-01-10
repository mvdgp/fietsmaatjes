import { fetchAllDocuments } from './prismic-fetcher';

export const globalSearch = async (query) => {
  try {
    const documents = await fetchAllDocuments(query);
    const results = documents.map((doc) => {
      let url;
      let title;
      if (doc.type === 'post') {
        url = '/nieuws#' + doc.uid;
        title = 'Nieuws - ' + doc.data.title[0].text;
      } else if (doc.type === 'route') {
        url = '/doe-mee/fietsroutes#' + doc.uid;
        title = 'Fietsroutes - ' + doc.data.title;
      } else {
        url = doc.url;
        title = doc.data.title || doc.data.name || 'Untitled';
      }

      return {
        id: doc.id,
        title: title,
        url: url,
      };
    });

    return results;
  } catch (error) {
    console.error('Error performing global search:', error);
    return [];
  }
};