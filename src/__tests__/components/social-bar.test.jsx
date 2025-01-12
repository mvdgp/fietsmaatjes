import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SocialBar from '@/components/social-bar';
import { buildSocial } from '@/utils/menu-builder';

jest.mock('@/utils/menu-builder');

describe('SocialBar', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('fetches and displays social items', async () => {
        const mockSocialItems = [
            {
                link: { url: 'https://facebook.com', target: '_blank' },
                icon: [{ text: '<svg>...</svg>' }],
            },
            {
                link: { url: 'https://twitter.com', target: '_blank' },
                icon: [{ text: '<svg>...</svg>' }],
            },
        ];
        buildSocial.mockResolvedValue(mockSocialItems);

        const { container } = render(<SocialBar />);

        await waitFor(() => {
            expect(container.querySelector('a[href="https://facebook.com"]')).toBeInTheDocument();
            expect(container.querySelector('a[href="https://twitter.com"]')).toBeInTheDocument();
        });
    });

    test('handles fetch error correctly', async () => {
        buildSocial.mockRejectedValue(new Error('Failed to fetch'));

        const { container } = render(<SocialBar />);

        await waitFor(() => {
            expect(container.querySelector('a[href="https://facebook.com"]')).not.toBeInTheDocument();
            expect(container.querySelector('a[href="https://twitter.com"]')).not.toBeInTheDocument();
        });
    });
});