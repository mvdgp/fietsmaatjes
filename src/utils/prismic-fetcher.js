import { createClient } from '../prismicio';

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

  export { fetchMainPageContent, fetchSubPageContent, fetchSocialContent };