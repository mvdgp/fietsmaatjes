import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InfoCards from '@/slices/InfoCards';

jest.mock('@prismicio/react', () => ({
  PrismicNextLink: jest.fn(({ field, className }) => <a href={field.url} className={className}>{field.text}</a>),
  PrismicRichText: jest.fn(({ field, components }) => <div>{field[0].text}</div>),
}));

jest.mock('react-svg', () => ({
  ReactSVG: jest.fn(({ src, beforeInjection }) => <svg className="svg-container" />),
}));

const mockSlice = {
  slice_type: 'infoCards',
  variation: 'infoCardsExpandable',
  primary: {
    card: [
      {
        icon: 'mock-icon',
        title: [{ type: 'heading2', text: 'Mock Title 1' }],
        body: 'Mock Body 1',
        body_expanded: [{ type: 'paragraph', text: 'Mock Expanded Body 1' }],
        link: { url: 'www.example.com', text: 'Example Link', link_type: 'Web', target: '_blank' },
      },
      {
        icon: 'mock-icon',
        title: [{ type: 'heading2', text: 'Mock Title 2' }],
        body: 'Mock Body 2',
        body_expanded: [{ type: 'paragraph', text: 'Mock Expanded Body 2' }],
        link: { url: 'www.example.com', text: 'Example Link', link_type: 'Web', target: '_blank' },
      },
    ],
  },
};

describe('InfoCards', () => {
  test('renders the InfoCards section with all cards', () => {
    render(<InfoCards slice={mockSlice} />);
    expect(screen.getByText(/Mock Title 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock Title 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock Body 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock Body 2/i)).toBeInTheDocument();
  });

  test('toggles the expanded state of a card', () => {
    render(<InfoCards slice={mockSlice} />);
    const readMoreLinks = screen.queryAllByText(/Lees meer/i);
    fireEvent.click(readMoreLinks[0]);
    expect(screen.getByText(/Mock Expanded Body 1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Mock Body 1/i)).not.toBeInTheDocument();

    const backLinks = screen.queryAllByText(/Terug/i);
    fireEvent.click(backLinks[0]);
    expect(screen.getByText(/Mock Body 1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Mock Expanded Body 1/i)).not.toBeInTheDocument();
  });

  test('renders the link correctly', () => {
    render(<InfoCards slice={mockSlice} />);
    const links = screen.queryAllByText(/Example Link/i);
    links.forEach((link, index) => {
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'http://www.example.com');
      expect(link).toHaveAttribute('target', '_blank');
    });
  });
});