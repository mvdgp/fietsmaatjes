import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavigationMenu from '@/components/navigation-menu';
import * as nextRouter from 'next/navigation';

const mockMenuItems = [
  {
    id: 1,
    label: 'Home',
    url: '/',
    uid: 'home',
    submenu: [],
  },
  {
    id: 2,
    label: 'About',
    url: '/about',
    uid: 'about',
    submenu: [
      {
        id: 3,
        label: 'Team',
        url: '/about/team',
        uid: 'team',
      },
    ],
  },
];

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('NavigationMenu', () => {
  beforeEach(() => {
    nextRouter.usePathname.mockReturnValue('/');
  });

  test('renders menu items', () => {
    render(<NavigationMenu menuItems={mockMenuItems} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  test('toggles mobile menu', async () => {
    render(<NavigationMenu menuItems={mockMenuItems} />);
    const menuButton = screen.getAllByRole('button')[0]; // Select the first button
  
    // First click to open the menu
    fireEvent.click(menuButton);
  
    // Debug output after the first click to see if "Home" is visible
    screen.debug(); // This prints the DOM state to the console
  
    // Wait for the menu to be visible (e.g., "Home" link becomes visible)
    await screen.findByText('Home'); // Ensure "Home" becomes visible
  
    // Second click to close the menu
    fireEvent.click(menuButton);
  
    // Debug output after the second click to see if "Home" is still visible
    screen.debug(); // This prints the DOM state to the console
  
    // Wait for the menu to be closed (e.g., the <ul> element has the 'hidden' class)
    await waitFor(() => {
      const menuList = screen.getByRole('list'); // Assuming the <ul> has a role of 'list'
      expect(menuList).toHaveClass('hidden');
    });
  });

  test('highlights active menu item', () => {
    nextRouter.usePathname.mockReturnValue('/about');  // Correct path for active item
    render(<NavigationMenu menuItems={mockMenuItems} />);
    expect(screen.getByText('About')).toHaveClass('text-tertiary');
  });
});