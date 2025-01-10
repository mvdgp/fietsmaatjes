"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { fetchNewsContent, fetchRoutesContent } from "../../utils/prismic-fetcher";
import { dateResolver } from "@/utils/helpers";
import Post from "@/app/post";
import BikeRoute from "@/app/bike-route";

/**
 * @typedef {import("@prismicio/client").Content.ArchiveSlice} ArchiveSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ArchiveSlice>} ArchiveProps
 * @param {ArchiveProps}
 */
const Archive = ({ slice: { variation, slice_type } }) => {
  const [state, setState] = useState({
    items: [],
    expandedYears: {},
    expandedMonths: {},
    selectedItem: null,
    itemNotFound: false,
  });
  const itemsRef = useRef([]);
  const initialHash = useRef(window.location.hash.substring(1));

  // Fetch data on initial page load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allItems = variation === "automatic" ? await fetchNewsContent(false) : await fetchRoutesContent();
        itemsRef.current = allItems;
        setState((prevState) => ({
          ...prevState,
          items: allItems,
          expandedYears: variation === "automatic" ? { [new Date().getFullYear()]: true } : {},
          expandedMonths: variation === "automatic" ? { [`${new Date().getFullYear()}-${new Date().getMonth() + 1}`]: true } : {},
        }));
        handleInitialHash(allItems);
      } catch (error) {
        console.error("Error fetching all items:", error);
      }
    };

    fetchData();
  }, [variation]);

  // Handle initial hash in URL
  const handleInitialHash = (allItems) => {
    if (initialHash.current) {
      const selectedItem = allItems.find((item) => item.uid === initialHash.current);
      if (selectedItem) {
        setState((prevState) => ({ ...prevState, selectedItem, itemNotFound: false }));
      } else {
        setState((prevState) => ({ ...prevState, itemNotFound: true }));
        console.error("Item not found for hash:", initialHash.current);
      }
    } else if (allItems.length > 0) {
      const newestItem = allItems[0];
      window.location.hash = newestItem.uid;
      setState((prevState) => ({ ...prevState, selectedItem: newestItem, itemNotFound: false }));
    }
  };

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      const selectedItem = itemsRef.current.find((item) => item.uid === hash);
      if (selectedItem) {
        setState((prevState) => ({ ...prevState, selectedItem, itemNotFound: false }));
      } else {
        setState((prevState) => ({ ...prevState, itemNotFound: true }));
        console.error("Item not found for hash change:", hash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Collapse all groups on non-lg devices when an item is selected
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    if (state.selectedItem && mediaQuery.matches) {
      setState((prevState) => ({ ...prevState, expandedYears: {}, expandedMonths: {} }));
    }
  }, [state.selectedItem]);

  const toggleYear = (year) => {
    setState((prevState) => ({
      ...prevState,
      expandedYears: { [year]: !prevState.expandedYears[year] },
      expandedMonths: {},
    }));
  };

  const toggleMonth = (year, month) => {
    const key = `${year}-${month}`;
    setState((prevState) => ({
      ...prevState,
      expandedMonths: { [key]: !prevState.expandedMonths[key] },
    }));
  };

  const groupedItems = useMemo(() => {
    return variation === "automatic" ? groupItemsByDate(state.items) : {};
  }, [state.items, variation]);

  const sortedItems = useMemo(() => {
    return variation === "default" ? sortItemsByTitle(state.items) : [];
  }, [state.items, variation]);

  return (
    <section data-slice-type={slice_type} data-slice-variation={variation} className="flex w-full flex-col lg:flex-row p-4 gap-8">
      <div className="w-full lg:w-[350px]">
        {variation === "automatic" && Object.keys(groupedItems).length > 0 ? (
          renderGroupedItems(groupedItems, toggleYear, toggleMonth, state.expandedYears, state.expandedMonths, setState)
        ) : variation === "default" && sortedItems.length > 0 ? (
          renderSortedItems(sortedItems, setState)
        ) : (
          <p>Laden...</p>
        )}
      </div>
      <div className="lg:max-w-[calc(100%-350px)]">
        {state.itemNotFound ? (
          "artikel niet gevonden"
        ) : state.selectedItem ? (
          <div className="item-details">
            {variation === "automatic" ? <Post {...state.selectedItem} /> : <BikeRoute {...state.selectedItem} />}
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

const groupItemsByDate = (items) => {
  return items.reduce((acc, item) => {
    const publicationDate = new Date(item.first_publication_date);
    const year = publicationDate.getFullYear();
    const month = publicationDate.getMonth() + 1;

    if (!acc[year]) acc[year] = {};
    if (!acc[year][month]) acc[year][month] = [];
    acc[year][month].push(item);

    return acc;
  }, {});
};

const sortItemsByTitle = (items) => {
  return items.sort((a, b) => a.data.title.localeCompare(b.data.title));
};

const renderGroupedItems = (groupedItems, toggleYear, toggleMonth, expandedYears, expandedMonths, setState) => {
  return Object.keys(groupedItems)
    .sort((a, b) => b - a)
    .map((year) => (
      <div key={year} className="py-1">
        <h2 onClick={() => toggleYear(year)} className="bg-primary flex items-center justify-between text-white hover:bg-secondary p-2 px-3 rounded cursor-pointer">
          {year}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`transition-transform duration-200 text-white size-4 ${expandedYears[year] ? "rotate-90" : ""}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </h2>
        {expandedYears[year] && (
          <div>
            {Object.keys(groupedItems[year])
              .sort((a, b) => b - a)
              .map((month) => {
                const key = `${year}-${month}`;
                return (
                  <div key={month} className="py-2">
                    <h3 onClick={() => toggleMonth(year, month)} className="flex items-center gap-2 justify-between uppercase cursor-pointer hover:text-secondary p-2 px-3 border-b border-primary">
                      {new Date(year, month - 1).toLocaleString("nl-NL", { month: "long" })}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`transition-transform duration-200 size-4 ${expandedMonths[key] ? "rotate-90" : ""}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </h3>
                    {expandedMonths[key] && (
                      <div>
                        {groupedItems[year][month]
                          .sort((a, b) => new Date(b.first_publication_date) - new Date(a.first_publication_date))
                          .map((item, index) => {
                            const publicationDate = item.first_publication_date.split("T")[0];
                            const itemBgColor = window.location.hash.substring(1) === item.uid ? "bg-secondary" : index % 2 === 0 ? "bg-white" : "bg-quaternary";
                            return (
                              <div key={index} className={`cursor-pointer hover:bg-secondary flex gap-2 items-center rounded p-2 ${itemBgColor}`} onClick={() => handleItemClick(item, setState)}>
                                <h3>{dateResolver(publicationDate).day}</h3>
                                <p>{item.data.title[0].text}</p>
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        )}
      </div>
    ));
};

const renderSortedItems = (sortedItems, setState) => {
  return sortedItems.map((item, index) => {
    const itemBgColor = window.location.hash.substring(1) === item.uid ? "bg-secondary" : index % 2 === 0 ? "bg-white" : "bg-quaternary";
    return (
      <div key={index} className={`cursor-pointer hover:bg-secondary flex gap-2 items-center rounded p-2 ${itemBgColor}`} onClick={() => handleItemClick(item, setState)}>
        <p>{item.data.title}</p>
      </div>
    );
  });
};

const handleItemClick = (item, setState) => {
  window.location.hash = item.uid;
  setState((prevState) => ({ ...prevState, selectedItem: item, itemNotFound: false }));
};

export default Archive;