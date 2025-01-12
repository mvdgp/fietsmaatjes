import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LatestNews from '@/slices/LatestNews';
import { fetchNewsContent } from '@/utils/prismic-fetcher';

jest.mock('@/utils/prismic-fetcher', () => ({
  fetchNewsContent: jest.fn(),
}));

jest.mock('@prismicio/react', () => ({
  PrismicRichText: jest.fn(({ field, components }) => <div>{field[0].text}</div>),
  PrismicImage: jest.fn(({ field, className }) => <img src={field.url} alt={field.alt} className={className} />),
}));

jest.mock('@/utils/helpers', () => ({
  dateResolver: jest.fn((date) => ({ day: '01', month: 'Jan', year: '2023' })),
}));

const mockSlice = {
  slice_type: 'latestNews',
  variation: 'default',
  primary: {},
};

const mockNews = [
  {
    uid: 'news-1',
    first_publication_date: '2023-01-01T00:00:00Z',
    data: {
      image: { url: 'https://example.com/image1.jpg', alt: 'Image 1' },
      title: [{ type: 'heading1', text: 'News Title 1' }],
      body: [{ type: 'paragraph', text: 'News Body 1' }],
    },
  },
  {
    uid: 'news-2',
    first_publication_date: '2023-01-02T00:00:00Z',
    data: {
      image: { url: 'https://example.com/image2.jpg', alt: 'Image 2' },
      title: [{ type: 'heading1', text: 'News Title 2' }],
      body: [{ type: 'paragraph', text: 'News Body 2' }],
    },
  },
];

describe('LatestNews', () => {
  beforeEach(() => {
    fetchNewsContent.mockResolvedValue(mockNews);
  });

  test('renders the LatestNews section with news items', async () => {
    render(<LatestNews slice={mockSlice} />);
    await waitFor(() => {
      expect(screen.getByText(/Laatste nieuwsberichten/i)).toBeInTheDocument();
      expect(screen.getByText(/News Title 1/i)).toBeInTheDocument();
      expect(screen.getByText(/News Title 2/i)).toBeInTheDocument();
      expect(screen.getByText(/News Body 1/i)).toBeInTheDocument();
      expect(screen.getByText(/News Body 2/i)).toBeInTheDocument();
    });
  });

  test('renders the formatted date correctly', async () => {
    render(<LatestNews slice={mockSlice} />);
    await waitFor(() => {
      expect(screen.getAllByText(/01/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Jan/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/2023/i).length).toBeGreaterThan(0);
    });
  });

  test('renders the "Geen nieuws beschikbaar" message when no news is available', async () => {
    fetchNewsContent.mockResolvedValue([]);
    render(<LatestNews slice={mockSlice} />);
    await waitFor(() => {
      expect(screen.getByText(/Geen nieuws beschikbaar/i)).toBeInTheDocument();
    });
  });

  test('handles errors when fetching news', async () => {
    fetchNewsContent.mockRejectedValue(new Error('Error fetching latest news'));
    render(<LatestNews slice={mockSlice} />);
    await waitFor(() => {
      expect(screen.getByText(/Geen nieuws beschikbaar/i)).toBeInTheDocument();
    });
  });
});