"use client";

import { useEffect, useState, useRef } from "react";
import { fetchNewsContent, fetchRoutesContent } from "../../utils/prismic-fetcher";
import { dateResolver, extractURLfromEmbedMap } from "@/utils/helpers";
import Post from "@/app/post";

/**
 * @typedef {import("@prismicio/client").Content.ArchiveSlice} ArchiveSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ArchiveSlice>} ArchiveProps
 * @param {ArchiveProps}
 */
const Archive = ({ slice }) => {

  const variation = slice.variation;

  if (variation === "automatic") {
    const [news, setNews] = useState([]);
    const [expandedYears, setExpandedYears] = useState({});
    const [expandedMonths, setExpandedMonths] = useState({});
    const [selectedNewsItem, setSelectedNewsItem] = useState(null);
    const [articleNotFound, setArticleNotFound] = useState(false);
    const newsRef = useRef([]); // Ref to avoid dependency loop

    // Fetch news data on initial page load
    useEffect(() => {
      const fetchData = async () => {
        try {
          const allNews = await fetchNewsContent(false);

          setNews([...allNews]);
          newsRef.current = allNews; // Store fetched news in ref
          console.log("All news with mock data:", [...allNews]);

          // Set default expanded state for current year and month
          const currentYear = new Date().getFullYear();
          const currentMonth = new Date().getMonth() + 1;
          setExpandedYears({ [currentYear]: true });
          setExpandedMonths({ [`${currentYear}-${currentMonth}`]: true });

          // Handle initial hash in URL
          const hash = window.location.hash.substring(1);
          if (hash) {
            const selectedItem = allNews.find((item) => item.slugs[0] === hash);
            if (selectedItem) {
              setSelectedNewsItem(selectedItem);
              setArticleNotFound(false);
            } else {
              setArticleNotFound(true);
            }
          } else if (allNews.length > 0) {
            // Set the hash to the newest news item's slug
            const newestItem = allNews[0];
            window.location.hash = newestItem.slugs[0];
            setSelectedNewsItem(newestItem);
            setArticleNotFound(false);
          }
        } catch (error) {
          console.error("Error fetching all news:", error);
        }
      };

      fetchData();
    }, []); // Empty dependency array to fetch only once

    // Listen for hash changes
    useEffect(() => {
      const handleHashChange = () => {
        const hash = window.location.hash.substring(1);
        const selectedItem = newsRef.current.find((item) => item.slugs[0] === hash); // Use ref
        if (selectedItem) {
          setSelectedNewsItem(selectedItem);
          setArticleNotFound(false);
        } else {
          setArticleNotFound(true);
        }
      };

      window.addEventListener("hashchange", handleHashChange);

      return () => {
        window.removeEventListener("hashchange", handleHashChange);
      };
    }, []); // Empty dependency array to listen only once

    // Collapse all groups on non-lg devices when an article is selected
    useEffect(() => {
      const mediaQuery = window.matchMedia("(max-width: 1023px)"); // Tailwind's lg breakpoint is 1024px
      if (selectedNewsItem && mediaQuery.matches) {
        setExpandedYears({});
        setExpandedMonths({});
      }
    }, [selectedNewsItem]);

    const toggleYear = (year) => {
      setExpandedYears({ [year]: !expandedYears[year] });
      setExpandedMonths({});
    };

    const toggleMonth = (year, month) => {
      const key = `${year}-${month}`;
      setExpandedMonths({ [key]: !expandedMonths[key] });
    };

    const groupedNews = news.reduce((acc, item) => {
      const publicationDate = new Date(item.first_publication_date);
      const year = publicationDate.getFullYear();
      const month = publicationDate.getMonth() + 1;

      if (!acc[year]) acc[year] = {};
      if (!acc[year][month]) acc[year][month] = [];
      acc[year][month].push(item);

      return acc;
    }, {});

    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="flex w-full flex-col lg:flex-row p-4 gap-8"
      >
        <div className="w-full lg:w-[350px]">
          {Object.keys(groupedNews).length > 0 ? (
            Object.keys(groupedNews)
              .sort((a, b) => b - a) // Sort years in descending order
              .map((year) => (
                <div key={year} className="py-1">
                  <h2
                    onClick={() => toggleYear(year)}
                    className="bg-primary flex items-center justify-between text-white hover:bg-secondary p-2 px-3 rounded cursor-pointer"
                  >
                    {year}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className={`transition-transform duration-200 text-white size-4 ${expandedYears[year] ? "rotate-90" : ""
                        }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </h2>
                  {expandedYears[year] && (
                    <div className="">
                      {Object.keys(groupedNews[year])
                        .sort((a, b) => b - a) // Sort months in descending order
                        .map((month) => {
                          const key = `${year}-${month}`;
                          return (
                            <div key={month} className="py-2">
                              <h3
                                onClick={() => toggleMonth(year, month)}
                                className="flex items-center gap-2 justify-between uppercase cursor-pointer hover:text-secondary p-2 px-3 border-b border-primary"
                              >
                                {new Date(year, month - 1).toLocaleString(
                                  "nl-NL",
                                  { month: "long" }
                                )}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className={`transition-transform duration-200 size-4 ${expandedMonths[`${year}-${month}`]
                                    ? "rotate-90"
                                    : ""
                                    }`}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                                  />
                                </svg>
                              </h3>

                              {expandedMonths[key] && (
                                <div className="">
                                  {groupedNews[year][month]
                                    .sort(
                                      (a, b) =>
                                        new Date(b.first_publication_date) -
                                        new Date(a.first_publication_date)
                                    ) // Sort items in descending order by date
                                    .map((item, index) => {
                                      const publicationDate =
                                        item.first_publication_date.split("T")[0];
                                      const itemBgColor =
                                        window.location.hash.substring(1) ===
                                          item.slugs[0]
                                          ? "bg-secondary"
                                          : index % 2 === 0
                                            ? "bg-white"
                                            : "bg-quaternary";
                                      return (
                                        <div
                                          key={index}
                                          className={`cursor-pointer hover:bg-secondary flex gap-2 items-center rounded p-2 ${itemBgColor}`}
                                          onClick={() => {
                                            window.location.hash = item.slugs[0];
                                            setSelectedNewsItem(item);
                                            setArticleNotFound(false);
                                          }}
                                        >
                                          <h3>
                                            {dateResolver(publicationDate).day}
                                          </h3>
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
              ))
          ) : (
            <p>Laden...</p>
          )}
        </div>
        <div className="lg:max-w-[calc(100%-350px)]">
          {articleNotFound ? (
            "artikel niet gevonden"
          ) : selectedNewsItem ? (
            <div className="news-item-details">
              <Post {...selectedNewsItem} />
            </div>
          ) : (
            ""
          )}
        </div>
      </section>
    );
  } else if (variation === "default") {
    const [toggleRoute, setToggleRoute] = useState({});
    const [route, setRoute] = useState([]);
    const routesRef = useRef([]);

    // Fetch route data on initial page load
    useEffect(() => {
      const fetchData = async () => {
        try {
          const allRoutes = await fetchRoutesContent();
          setRoute([...allRoutes]);
          routesRef.current = allRoutes; // Store fetched routes in ref
          console.log("All routes with mock data:", [...allRoutes]);

          // Check if there's a hash in the URL and expand the corresponding item
          const hash = window.location.hash.substring(1);
          if (hash) {
            const index = allRoutes.findIndex(item => item.slugs[0] === hash);
            if (index !== -1) {
              setToggleRoute(prevState => ({ ...prevState, [index]: true }));
            }
          }
        } catch (error) {
          console.error("Error fetching all routes:", error);
        }
      };

      fetchData();

      // Listen for hash changes
      const handleHashChange = () => {
        const hash = window.location.hash.substring(1);
        const index = routesRef.current.findIndex(item => item.slugs[0] === hash);
        if (index !== -1) {
          setToggleRoute(prevState => ({ ...prevState, [index]: true }));
        }
      };

      window.addEventListener('hashchange', handleHashChange);

      return () => {
        window.removeEventListener('hashchange', handleHashChange);
      };
    }, []); // Empty dependency array to fetch only once

    const handleToggleRoute = (index, slug) => {
      setToggleRoute(prevState => ({ ...prevState, [index]: !prevState[index] }));
      if (!toggleRoute[index]) {
        window.location.hash = slug;
      } else {
        // Do not clear the hash
        window.location.hash = slug;
      }
    };

    return (
      <section className="p-4">
        {route.length > 0 ? (
          route.map((item, index) => {
            const embedUrl = extractURLfromEmbedMap(item.data.route);
            return (
              <div key={index} className="flex flex-col gap-2 w-[80dvw]">
                <h3
                  className="flex items-center justify-between py-2 border-b border-primary cursor-pointer"
                  onClick={() => handleToggleRoute(index, item.slugs[0])}
                >
                  {item.data.title}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className={`size-5 transition-transform duration-200 ${toggleRoute[index] ? "rotate-90" : ""}`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </h3>
                <div className={`pt-2 flex flex-col md:flex-row gap-8 justify-between ${toggleRoute[index] ? "" : "hidden"}`}>
                  <p className="md:w-[50%] text-justify">{item.data.body}</p>
                  <iframe
                    className="w-[80dvw] md:w-[50dvw] rounded-lg"
                    src={embedUrl}
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            );
          })
        ) : (
          <p>Laden...</p>
        )}
      </section>
    );
  }
};

export default Archive;