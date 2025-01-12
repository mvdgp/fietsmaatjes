import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '@/components/search-bar';
import { globalSearch } from '@/utils/global-search';

jest.mock('@/utils/global-search');

describe('SearchBar', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders search input and button', () => {
        render(<SearchBar />);
        expect(screen.getByPlaceholderText('Zoeken...')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('handles search form submission and displays results', async () => {
        const mockResults = [
            { id: 1, url: '/result1', title: [{ text: 'Result 1' }] },
            { id: 2, url: '/result2', title: [{ text: 'Result 2' }] },
        ];
        globalSearch.mockResolvedValue(mockResults);

        render(<SearchBar />);
        const input = screen.getByPlaceholderText('Zoeken...');
        const button = screen.getByRole('button');

        fireEvent.change(input, { target: { value: 'test' } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(globalSearch).toHaveBeenCalledWith('test');
            expect(screen.getByText('Result 1')).toBeInTheDocument();
            expect(screen.getByText('Result 2')).toBeInTheDocument();
        });
    });

    test('closes modal when clicking outside', async () => {
        const mockResults = [
            { id: 1, url: '/result1', title: [{ text: 'Result 1' }] },
        ];
        globalSearch.mockResolvedValue(mockResults);

        render(<SearchBar />);
        const input = screen.getByPlaceholderText('Zoeken...');
        const button = screen.getByRole('button');

        fireEvent.change(input, { target: { value: 'test' } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText('Result 1')).toBeInTheDocument();
        });

        fireEvent.mouseDown(document);
        await waitFor(() => {
            expect(screen.queryByText('Result 1')).not.toBeInTheDocument();
        });
    });
});