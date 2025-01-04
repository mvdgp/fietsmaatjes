"use client";

import React, { useState, useEffect, useRef } from 'react';
import SubMenu from '@/components/sub-menu';
import { useMediaQuery } from 'react-responsive';

const NavigationMenu = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const navRef = useRef(null);
  const isMediumScreen = useMediaQuery({ query: '(min-width: 768px)' });

  // Toggle the main menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu if clicked outside
  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setIsOpen(false);
      setOpenSubMenu(null);
    }
  };

  // Add/remove event listener for outside clicks
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle menu item click
  const handleMenuItemClick = () => {
    setIsOpen(false);
    setOpenSubMenu(null);
  };

  // Handle mouse enter on menu item
  const handleMouseEnter = (item) => {
    if (isMediumScreen) {
      setHoveredItem(item);
    }
  };

  // Handle mouse leave on menu item
  const handleMouseLeave = (item) => {
    if (isMediumScreen && hoveredItem === item) {
      setHoveredItem(null);
    }
  };

  // Toggle sub-menu for mobile view
  const handleSubMenuToggle = (item) => {
    if (!isMediumScreen) {
      setOpenSubMenu(openSubMenu === item ? null : item);
    }
  };

  return (
    <nav ref={navRef}>
      {/* Mobile menu button */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      {/* Main menu */}
      <ul className={`pb-4 md:pb-0 flex gap-6 ${isOpen ? 'flex-col absolute px-6 pt-8 bg-primary rounded w-[330px]' : 'hidden'} md:flex`}>
        {menuItems.map((item) => (
          <li
            key={item.id}
            className="group md:flex md:flex-col list-none relative items-center md:mt-3"
            onMouseEnter={() => handleMouseEnter(item)}
            onMouseLeave={() => handleMouseLeave(item)}
          >
            <a
              href={item.url}
              className="font-bold text-base text-white hover:text-secondary hover:no-underline"
              onClick={handleMenuItemClick}
            >
              {item.label}
            </a>
            {item.submenu.length > 0 && (
              <button
                onClick={() => handleSubMenuToggle(item)}
                className="border-none absolute right-0 md:relative"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4 fill-none text-white hover:fill-none group-hover:text-secondary md:mt-[-6px]"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            )}
            {((hoveredItem === item && item.submenu.length > 0) || (openSubMenu === item && item.submenu.length > 0)) && (
              <div
                className="relative md:absolute md:w-[220px] top-full left-0 pt-2 md:pt-0 block"
                onMouseEnter={() => handleMouseEnter(item)}
                onMouseLeave={() => handleMouseLeave(item)}
              >
                <SubMenu menuItem={item} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationMenu;