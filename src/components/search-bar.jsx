"use client";

import React, { useEffect, useState, useRef } from "react";
import { globalSearch } from "../utils/global-search";

const SearchBar = () => {
    const [isClient, setIsClient] = useState(false); // Ensures the component only renders on the client
    const [query, setQuery] = useState(""); // Stores the user's search input
    const [results, setResults] = useState([]); // Holds the search results
    const [showModal, setShowModal] = useState(false); // Controls the modal visibility
    const modalRef = useRef(null); // Reference for modal to detect outside clicks

    // Ensures component renders only on the client
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Handles the search form submission
    const handleSearch = async (event) => {
        event.preventDefault();
        const searchResults = await globalSearch(query); // Fetch search results
        console.log("Search Results:", searchResults); // Log results for debugging
        setResults(searchResults); // Update state with results
        setShowModal(true); // Show the modal
    };

    // Closes the modal if a click happens outside of it
    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowModal(false);
        }
    };

    // Adds and cleans up the event listener for outside clicks
    useEffect(() => {
        if (showModal) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showModal]);

    // Prevents rendering on the server
    if (!isClient) {
        return null;
    }

    return (
        <div className="relative flex items-center justify-center">
            {/* Search form */}
            <form onSubmit={handleSearch} className="flex items-center">
                <input
                    type="text"
                    placeholder="Zoeken..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="
                        border border-gray-300 rounded 
                        focus:outline-none focus:ring focus:ring-primary
                        px-4 py-2 
                        w-40 md:w-52
                    "
                />
                <button
                    type="submit"
                    className="
                        absolute right-[-10px] 
                        bg-none border-none 
                        hover:bg-transparent focus:outline-none
                    "
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="
                            w-6 h-6 
                            fill-primary text-white 
                            hover:fill-none hover:text-secondary
                        "
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                    </svg>
                </button>
            </form>

            {/* Search results modal */}
            {showModal && (
                <div className="
                    fixed inset-0 
                    bg-black bg-opacity-50 
                    flex items-center justify-center
                ">
                    <div
                        ref={modalRef}
                        className="
                            relative bg-white 
                            p-4 rounded shadow-lg 
                            max-w-lg w-full
                        "
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="
                                absolute top-2 right-2 
                                text-primary text-lg 
                                border-none hover:text-white
                            "
                        >
                            &times;
                        </button>

                        {/* Modal content */}
                        <h2 className="text-xl mb-4">Zoekresultaten</h2>
                        {results.length > 0 ? (
                            <ul>
                                {results.map((result) => (
                                    <li key={result.id} className="list-none mb-2">
                                        <a
                                            href={result.url}
                                            className="text-primary hover:underline"
                                        >
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
