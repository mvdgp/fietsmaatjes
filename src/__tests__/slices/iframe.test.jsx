import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import IFrame from '@/slices/IFrame';

const mockSlice = {
    slice_type: 'iframe',
    variation: 'default',
    primary: {
        url: {
            url: 'https://example.com',
        },
    },
};

describe('IFrame', () => {
    test('renders the iframe with the correct URL', () => {
        render(<IFrame slice={mockSlice} />);
        const iframe = screen.getByRole('iframe');
        expect(iframe).toBeInTheDocument();
        expect(iframe).toHaveAttribute('src', 'https://example.com');
      });

    test('renders the iframe with correct dimensions and attributes', () => {
        render(<IFrame slice={mockSlice} />);
        const iframe = screen.getByRole('iframe');
        expect(iframe).toHaveAttribute('width', '600');
        expect(iframe).toHaveAttribute('height', '400');
        expect(iframe).toHaveAttribute('style', 'border: 0px; overflow: auto;');
        expect(iframe).toHaveAttribute('loading', 'lazy');
        expect(iframe).toHaveAttribute('referrerPolicy', 'no-referrer-when-downgrade');
    });
});