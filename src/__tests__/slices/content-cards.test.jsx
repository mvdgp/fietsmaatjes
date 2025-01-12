import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Contentcards from '@/slices/ContentCards';

jest.mock('@prismicio/react', () => ({
  PrismicNextLink: jest.fn(({ children, field }) => <a href={field.url}>{field.text}</a>),
  PrismicImage: jest.fn(() => <img alt="Mock Image" />),
  PrismicRichText: jest.fn(({ field }) => <div>{field[0].text}</div>),
}));

jest.mock('@/utils/helpers', () => ({
  dateResolver: jest.fn(() => ({ day: '01', month: 'Jan', year: '2023' })),
}));

const mockSlice = {
  primary: {
    card: [
      {
        image: { url: 'mock-image-url' },
        date: '2023-01-01',
        title: [{ type: 'heading2', text: 'Mock Title' }],
        subtitle: 'Mock Subtitle',
        body: 'Mock body text that is quite long and should be truncated.',
        link: { url: 'mock-link-url', text: 'Mock Link' },
      },
    ],
  },
};

describe('Contentcards', () => {
  test('renders the content cards section', () => {
    render(<Contentcards slice={mockSlice} />);
    expect(screen.getByRole('img', { name: /Mock Image/i })).toBeInTheDocument();
    expect(screen.getByText(/Mock Title/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock Subtitle/i)).toBeInTheDocument();
    expect(screen.getByText((content, element) => {
      return element.tagName.toLowerCase() === 'h6' && content.startsWith('Mock body text that is quite long and should be truncated');
    })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Mock Link/i })).toBeInTheDocument();
  });

  test('renders the date correctly', () => {
    render(<Contentcards slice={mockSlice} />);
    expect(screen.getByText(/01/i)).toBeInTheDocument();
    expect(screen.getByText(/Jan/i)).toBeInTheDocument();
    expect(screen.getByText(/2023/i)).toBeInTheDocument();
  });

  test('handles missing date correctly', () => {
    const sliceWithoutDate = {
      primary: {
        card: [
          {
            image: { url: 'mock-image-url' },
            date: null,
            title: [{ type: 'heading2', text: 'Mock Title' }],
            subtitle: 'Mock Subtitle',
            body: 'Mock body text that is quite long and should be truncated.',
            link: { url: 'mock-link-url' },
          },
        ],
      },
    };
    render(<Contentcards slice={sliceWithoutDate} />);
    expect(screen.queryByText(/01/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Jan/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/2023/i)).not.toBeInTheDocument();
  });
});