import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SubMenu from '@/components/sub-menu';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
}));

describe('SubMenu', () => {
    const mockMenuItem = {
        submenu: [
            { id: 1, url: '/item1', uid: 'item1', label: 'Item 1' },
            { id: 2, url: '/item2', uid: 'item2', label: 'Item 2' },
        ],
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders submenu items', () => {
        usePathname.mockReturnValue('/item1');
        render(<SubMenu menuItem={mockMenuItem} />);

        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    test('applies active class to the correct submenu item', () => {
        usePathname.mockReturnValue('/item1');
        render(<SubMenu menuItem={mockMenuItem} />);

        const activeItem = screen.getByText('Item 1');
        expect(activeItem).toHaveClass('text-[#FFEC00]');
    });

    test('does not apply active class to inactive submenu items', () => {
        usePathname.mockReturnValue('/item1');
        render(<SubMenu menuItem={mockMenuItem} />);

        const inactiveItem = screen.getByText('Item 2');
        expect(inactiveItem).not.toHaveClass('text-[#FFEC00]');
    });
});