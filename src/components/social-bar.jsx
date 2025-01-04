"use client"

import React, { useEffect, useState } from 'react';
import { buildSocial } from '@/utils/menu-builder';
import { ReactSVG } from 'react-svg';

const SocialBar = () => {

    const [socialItems, setsocialItems] = useState([]);

    // Fetch menu items from Prismic
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const socialData = await buildSocial();
                console.log('Fetched social items:', socialData);
                setsocialItems(socialData);
            } catch (error) {
                console.error('Error fetching menu:', error);
            }
        };

        fetchMenu();
    }, []);

    useEffect(() => {
        console.log('socialItems:', socialItems);
    }, [socialItems]);

    return (
        <div className="social-bar flex items-center gap-4">
            {socialItems.map((item, index) => (
                <a key={`${item.link.url}-${index}`} href={item.link.url} target="_blank" rel="noopener noreferrer">
                    <ReactSVG src={`data:image/svg+xml;base64,${btoa(item.icon[0].text)}`} className="svg-container" />
                </a>
            ))}
        </div>
    );
};

export default SocialBar;