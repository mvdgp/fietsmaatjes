import { createClient } from '../prismicio';

async function renderContent(documentIdentifier) {
  const client = createClient();

  try {
    // Try to fetch by ID first
    const documentById = await client.getByID(documentIdentifier);
    if (documentById) {
      return documentById;
    }
  } catch (error) {
    console.warn('Fetching by ID failed, trying by UID:', error);
  }

  try {
    // Try to fetch by UID if fetching by ID fails
    const documentByUid = await client.getByUID('page', documentIdentifier);
    if (documentByUid) {
      return documentByUid;
    }
  } catch (error) {
    console.error('Fetching by UID failed:', error);
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

  export { fetchMainPageContent, fetchSubPageContent, fetchSocialContent, renderContent };