"use client";

import React, { useEffect, useState } from 'react';

const SearchBar = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <div className="flex items-center justify-center relative">
            <input
                type="text"
                placeholder="Zoeken..."
                className="border border-gray-300 rounded focus:outline-none"
            />
            <button
                type="submit"
                className="absolute right-[-10px] bg-none border-none hover:bg-transparent"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-6 h-6 fill-primary text-white hover:text-secondary hover:fill-none"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                </svg>
            </button>
        </div>
    );
};

export default SearchBar;