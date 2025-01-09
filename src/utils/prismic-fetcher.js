import * as prismic from '@prismicio/client';
import { createClient } from '../prismicio';

async function renderContent(documentIdentifier) {
  const client = createClient();

  async function fetchParentUid(parentId) {
    try {
      const parentDoc = await client.getByID(parentId);
      return parentDoc?.uid || '';
    } catch (error) {
      console.error('Error fetching parent UID:', error);
      return '';
    }
  }

  async function constructFullUid(document) {
    if (document.data.parent && document.data.parent.id) {
      const parentUid = await fetchParentUid(document.data.parent.id);
      return parentUid ? `${parentUid}/${document.uid}` : document.uid;
    }
    return document.uid;
  }

  try {
    // Try to fetch by UID first
    const documentByUid = await client.getByUID('page', documentIdentifier);
    if (documentByUid) {
      documentByUid.fullUid = await constructFullUid(documentByUid);
      return documentByUid;
    }
  } catch (error) {
    console.error('Fetching by UID failed:', error);
  }

  try {
    // Try to fetch by ID if fetching by UID fails
    const documentById = await client.getByID(documentIdentifier);
    if (documentById) {
      documentById.fullUid = await constructFullUid(documentById);
      return documentById;
    }
  } catch (error) {
    console.error('Fetching by ID failed:', error);
  }

  throw new Error('No documents were returned');
}


async function fetchMainPageContent() {

    try {
      const client = createClient();
      const response = await client.getByType('page');
      const filteredResults = response.results
        .filter(result => !result.data.parent.id)
        .sort((a, b) => a.data.order - b.data.order);

      return filteredResults;

    } catch (error) {
      console.error('Error fetching main page content from Prismic:', error);
      throw error;
    }
  }

async function fetchSubPageContent( mainPage ) {
    try {
        const client = createClient();
        const response = await client.getByType('page');
        const filteredResults = response.results
            .filter(result => result.data.parent.id == mainPage)
            .sort((a, b) => a.data.order - b.data.order);

        return filteredResults;

    } catch (error) {
        console.error('Error fetching sub page content from Prismic:', error);
        throw error;
    }
}

async function fetchSocialContent() {

    try {
      const client = createClient();
      const response = await client.getByType('social');

      return response.results[0].data.social_item;

    } catch (error) {
      console.error('Error fetching social content from Prismic:', error);
      throw error;
    }
  }

  async function fetchNewsContent(latest) {
    try {
      const client = createClient();
      const response = await client.getByType('post');
      const sortedResults = response.results
        .sort((a, b) => new Date(b.first_publication_date) - new Date(a.first_publication_date));

      if (latest) {
        return sortedResults.filter((_, index) => index < 3);
      }

      return sortedResults;
    } catch (error) {
      console.error('Error fetching news content from Prismic:', error);
      throw error;
    }
  }

  async function fetchRoutesContent() {

    try {
      const client = createClient();
      const response = await client.getByType('route');

      return response.results;

    } catch (error) {
      console.error('Error fetching news content from Prismic:', error);
      throw error;
    }
  }

  async function fetchAllDocuments(query) {
    const client = createClient();
    try {
      const response = await client.get({
        filters: [prismic.filter.fulltext('document', query)],
        pageSize: 100, // Adjust the page size as needed
      });
      console.log('Query:', query);
      console.log('Response:', response);
      return response.results;
    } catch (error) {
      console.error('Error fetching documents from Prismic:', error);
      throw error;
    }
  }

  export { fetchMainPageContent, fetchSubPageContent, fetchSocialContent, renderContent, fetchNewsContent, fetchRoutesContent, fetchAllDocuments };