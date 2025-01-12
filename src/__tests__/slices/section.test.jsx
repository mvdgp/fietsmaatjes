import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Section from '@/slices/Section';

jest.mock('@prismicio/react', () => ({
  PrismicRichText: jest.fn(({ field, components }) => <div>{field[0].text}</div>),
  PrismicImage: jest.fn(({ field, className }) => <img src={field.url} alt={field.alt} className={className} />),
}));

const mockSlice = {
  slice_type: 'section',
  variation: 'default',
  primary: {
    background_color: 'lichtblauw',
    image: { url: 'https://example.com/image.jpg', alt: 'Example Image' },
    body: [{ type: 'paragraph', text: 'Example Body Text' }],
  },
};

describe('Section', () => {
  test('renders the default variation', () => {
    render(<Section slice={{ ...mockSlice, variation: 'default' }} />);
    expect(screen.getByAltText('Example Image')).toBeInTheDocument();
    expect(screen.getByText('Example Body Text')).toBeInTheDocument();
  });

  test('renders the vertical variation', () => {
    render(<Section slice={{ ...mockSlice, variation: 'vertical' }} />);
    expect(screen.getByAltText('Example Image')).toBeInTheDocument();
    expect(screen.getByText('Example Body Text')).toBeInTheDocument();
  });

  test('renders the mirrored variation', () => {
    render(<Section slice={{ ...mockSlice, variation: 'mirrored' }} />);
    expect(screen.getByAltText('Example Image')).toBeInTheDocument();
    expect(screen.getByText('Example Body Text')).toBeInTheDocument();
  });

  test('renders the stacked variation', () => {
    render(<Section slice={{ ...mockSlice, variation: 'stacked' }} />);
    expect(screen.getByAltText('Example Image')).toBeInTheDocument();
    expect(screen.getByText('Example Body Text')).toBeInTheDocument();
  });

  test('renders the noImage variation', () => {
    render(<Section slice={{ ...mockSlice, variation: 'noImage' }} />);
    expect(screen.getByText('Example Body Text')).toBeInTheDocument();
  });

  test('renders fallback content for unknown variation', () => {
    render(<Section slice={{ ...mockSlice, variation: 'unknown' }} />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});