"use client";

import React, { useEffect, useState, useRef } from 'react';
import { globalSearch } from '../utils/global-search';

const SearchBar = () => {
    const [isClient, setIsClient] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSearch = async (event) => {
        event.preventDefault();
        const searchResults = await globalSearch(query);
        console.log('Search Results:', searchResults); // Log the search results
        setResults(searchResults);
        setShowModal(true);
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowModal(false);
        }
    };

    useEffect(() => {
        if (showModal) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showModal]);

    if (!isClient) {
        return null;
    }

    return (
        <div className="flex items-center justify-center relative">
            <form onSubmit={handleSearch} className="flex items-center">
                <input
                    type="text"
                    placeholder="Zoeken..."
                    className="border border-gray-300 rounded focus:outline-none"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
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
            </form>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div ref={modalRef} className="bg-white p-4 rounded shadow-lg max-w-lg w-full relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-2 text-primary text-lg border-none hover:text-white"
                        >
                            &times;
                        </button>
                        <h2 className="text-xl mb-4">Zoekresultaten</h2>
                        {results.length > 0 ? (
                            <ul>
                                {results.map((result) => (
                                    <li key={result.id} className="list-none mb-2">
                                        <a href={result.url} className="text-primary hover:underline">
                                            {result.title[0].text || result.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Geen resultaten</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;