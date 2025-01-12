import * as prismic from '@prismicio/client';
import { createClient } from '../../prismicio';
import {
  renderContent,
  fetchMainPageContent,
  fetchSubPageContent,
  fetchSocialContent,
  fetchNewsContent,
  fetchRoutesContent,
  fetchAllDocuments,
} from '@/utils/prismic-fetcher';

jest.mock('@/prismicio', () => ({
  createClient: jest.fn(),
}));

const mockClient = {
  getByUID: jest.fn(),
  getByID: jest.fn(),
  getByType: jest.fn(),
  get: jest.fn(),
};

createClient.mockReturnValue(mockClient);

describe('prismic-fetcher', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('renderContent', () => {
    test('fetches content by UID and constructs full UID', async () => {
      const mockDocument = {
        uid: 'test-uid',
        data: { parent: { id: 'parent-id' } },
      };
      const mockParentDocument = { uid: 'parent-uid' };
      mockClient.getByUID.mockResolvedValue(mockDocument);
      mockClient.getByID.mockResolvedValue(mockParentDocument);

      const result = await renderContent('test-uid');

      expect(mockClient.getByUID).toHaveBeenCalledWith('page', 'test-uid');
      expect(mockClient.getByID).toHaveBeenCalledWith('parent-id');
      expect(result.fullUid).toBe('parent-uid/test-uid');
    });

    test('fetches content by ID if fetching by UID fails', async () => {
      const mockDocument = {
        uid: 'test-uid',
        data: { parent: { id: 'parent-id' } },
      };
      const mockParentDocument = { uid: 'parent-uid' };
      mockClient.getByUID.mockRejectedValue(new Error('UID not found'));
      mockClient.getByID.mockResolvedValueOnce(mockDocument);
      mockClient.getByID.mockResolvedValueOnce(mockParentDocument);

      const result = await renderContent('test-id');

      expect(mockClient.getByUID).toHaveBeenCalledWith('page', 'test-id');
      expect(mockClient.getByID).toHaveBeenCalledWith('test-id');
      expect(mockClient.getByID).toHaveBeenCalledWith('parent-id');
      expect(result.fullUid).toBe('parent-uid/test-uid');
    });

    test('throws an error if no documents are returned', async () => {
      mockClient.getByUID.mockRejectedValue(new Error('UID not found'));
      mockClient.getByID.mockRejectedValue(new Error('ID not found'));

      await expect(renderContent('test-id')).rejects.toThrow('No documents were returned');
    });
  });

  describe('fetchMainPageContent', () => {
    test('fetches and returns main page content', async () => {
      const mockResponse = {
        results: [
          { id: '1', data: { parent: { id: null }, order: 1 } },
          { id: '2', data: { parent: { id: null }, order: 2 } },
        ],
      };
      mockClient.getByType.mockResolvedValue(mockResponse);

      const result = await fetchMainPageContent();

      expect(mockClient.getByType).toHaveBeenCalledWith('page');
      expect(result).toEqual(mockResponse.results);
    });

    test('handles errors correctly', async () => {
      mockClient.getByType.mockRejectedValue(new Error('Error fetching main page content'));

      await expect(fetchMainPageContent()).rejects.toThrow('Error fetching main page content');
    });
  });

  describe('fetchSubPageContent', () => {
    test('fetches and returns sub page content', async () => {
      const mockResponse = {
        results: [
          { id: '1', data: { parent: { id: 'main-id' }, order: 1 } },
          { id: '2', data: { parent: { id: 'main-id' }, order: 2 } },
        ],
      };
      mockClient.getByType.mockResolvedValue(mockResponse);

      const result = await fetchSubPageContent('main-id');

      expect(mockClient.getByType).toHaveBeenCalledWith('page');
      expect(result).toEqual(mockResponse.results);
    });

    test('handles errors correctly', async () => {
      mockClient.getByType.mockRejectedValue(new Error('Error fetching sub page content'));

      await expect(fetchSubPageContent('main-id')).rejects.toThrow('Error fetching sub page content');
    });
  });

  describe('fetchSocialContent', () => {
    test('fetches and returns social content', async () => {
      const mockResponse = {
        results: [{ data: { social_item: ['social-1', 'social-2'] } }],
      };
      mockClient.getByType.mockResolvedValue(mockResponse);

      const result = await fetchSocialContent();

      expect(mockClient.getByType).toHaveBeenCalledWith('social');
      expect(result).toEqual(mockResponse.results[0].data.social_item);
    });

    test('handles errors correctly', async () => {
      mockClient.getByType.mockRejectedValue(new Error('Error fetching social content'));

      await expect(fetchSocialContent()).rejects.toThrow('Error fetching social content');
    });
  });

  describe('fetchNewsContent', () => {
    test('fetches and returns news content', async () => {
      const mockResponse = {
        results: [
          { first_publication_date: '2023-01-01T00:00:00Z' },
          { first_publication_date: '2023-01-02T00:00:00Z' },
        ],
      };
      mockClient.getByType.mockResolvedValue(mockResponse);

      const result = await fetchNewsContent(false);

      expect(mockClient.getByType).toHaveBeenCalledWith('post');
      expect(result).toEqual(mockResponse.results);
    });

    test('fetches and returns latest news content', async () => {
      const mockResponse = {
        results: [
          { first_publication_date: '2023-01-01T00:00:00Z' },
          { first_publication_date: '2023-01-02T00:00:00Z' },
        ],
      };
      mockClient.getByType.mockResolvedValue(mockResponse);

      const result = await fetchNewsContent(true);

      expect(mockClient.getByType).toHaveBeenCalledWith('post');
      expect(result).toEqual(mockResponse.results.slice(0, 3));
    });

    test('handles errors gracefully', async () => {
      mockClient.getByType.mockRejectedValue(new Error('Error fetching news content'));

      await expect(fetchNewsContent(false)).rejects.toThrow('Error fetching news content');
    });
  });

  describe('fetchRoutesContent', () => {
    test('fetches and returns routes content', async () => {
      const mockResponse = {
        results: [
          { data: { title: 'Route A' } },
          { data: { title: 'Route B' } },
        ],
      };
      mockClient.getByType.mockResolvedValue(mockResponse);

      const result = await fetchRoutesContent();

      expect(mockClient.getByType).toHaveBeenCalledWith('route');
      expect(result).toEqual(mockResponse.results);
    });

    test('handles errors gracefully', async () => {
      mockClient.getByType.mockRejectedValue(new Error('Error fetching routes content'));

      await expect(fetchRoutesContent()).rejects.toThrow('Error fetching routes content');
    });
  });

  describe('fetchAllDocuments', () => {
    test('fetches and returns all documents matching the query', async () => {
      const mockResponse = {
        results: ['doc-1', 'doc-2'],
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await fetchAllDocuments('test query');

      expect(mockClient.get).toHaveBeenCalledWith({
        filters: [prismic.filter.fulltext('document', 'test query')],
        pageSize: 100,
      });
      expect(result).toEqual(mockResponse.results);
    });

    test('handles errors gracefully', async () => {
      mockClient.get.mockRejectedValue(new Error('Error fetching documents'));

      await expect(fetchAllDocuments('test query')).rejects.toThrow('Error fetching documents');
    });
  });
});