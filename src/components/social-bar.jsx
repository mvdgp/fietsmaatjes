"use client";

import React, { useEffect, useState } from 'react';
import { buildSocial } from '@/utils/menu-builder';
import { ReactSVG } from 'react-svg';
import { linkResolver } from '@/utils/helpers';

const SocialBar = () => {
  const [socialItems, setsocialItems] = useState([]);

  // Fetch menu items from Prismic
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const socialData = await buildSocial();
        setsocialItems(socialData);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    fetchMenu();
  }, []);

  return (
    <div className="social-bar flex items-center gap-4">
      {socialItems.map((item, index) => (
        <a key={`${linkResolver(item.link)}-${index}`} href={item.link.url} target={item.link.target} rel="noopener noreferrer">
          <ReactSVG
            src={`data:image/svg+xml;base64,${btoa(item.icon[0].text)}`}
            beforeInjection={(svg) => {
              svg.classList.add('svg-container', 'fill-white', 'hover:fill-secondary', 'transition', 'ease-in-out');
            }}
          />
        </a>
      ))}
    </div>
  );
};

export default SocialBar;