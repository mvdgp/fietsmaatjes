"use client";

import { useEffect, useState } from 'react';
import { buildSocial } from '@/utils/menu-builder';
import { ReactSVG } from 'react-svg';
import { linkResolver } from '@/utils/helpers';

const SocialBar = () => {
  const [socialItems, setSocialItems] = useState([]);

  // Fetch social menu items from Prismic
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const socialData = await buildSocial();
        setSocialItems(socialData);
      } catch (error) {
        console.error('Error fetching social menu:', error);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <div className="social-bar flex items-center gap-4">
      {socialItems.length > 0 && socialItems.map((item, index) => (
        <a
          key={`${linkResolver(item.link)}-${index}`} 
          href={item.link.url}
          target={item.link.target}
          rel="noopener noreferrer"
          className="social-icon"
        >
          <ReactSVG
            src={`data:image/svg+xml;base64,${btoa(item.icon[0].text)}`}
            beforeInjection={(svg) => {
              svg.classList.add(
                'svg-container',
                'fill-white',
                'hover:fill-secondary',
                'transition',
                'ease-in-out'
              );
            }}
          />
        </a>
      ))}
    </div>
  );
};

export default SocialBar;
