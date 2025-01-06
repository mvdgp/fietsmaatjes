"use client";

import { useEffect, useState } from 'react';
import { fetchNewsContent } from '../../utils/prismic-fetcher';
import { dateResolver } from '@/utils/helpers';

/**
 * @typedef {import("@prismicio/client").Content.ArchiveSlice} ArchiveSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ArchiveSlice>} ArchiveProps
 * @param {ArchiveProps}
 */
const Archive = ({ slice }) => {
  const [news, setNews] = useState([]);
  const [expandedYears, setExpandedYears] = useState({});
  const [expandedMonths, setExpandedMonths] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allNews = await fetchNewsContent(false);

        setNews([...allNews]);
        console.log('All news with mock data:', [...allNews]);

        // Set default expanded state for current year and month
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        setExpandedYears({ [currentYear]: true });
        setExpandedMonths({ [`${currentYear}-${currentMonth}`]: true });
      } catch (error) {
        console.error('Error fetching all news:', error);
      }
    };

    fetchData();
  }, []);

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
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="flex w-full flex-col lg:flex-row p-4 gap-8">
      <div className="w-full lg:w-[350px]">
        {Object.keys(groupedNews).length > 0 ? (
          Object.keys(groupedNews)
            .sort((a, b) => b - a) // Sort years in descending order
            .map((year) => (
              <div key={year} className="py-1">
                <h2 onClick={() => toggleYear(year)} className="bg-primary text-white hover:bg-secondary p-2 px-3 rounded cursor-pointer">
                  {year}
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
                              className="flex items-center gap-2 justify-between uppercase cursor-pointer hover:text-secondary p-2 border-b border-primary"
                            >
                              {new Date(year, month - 1).toLocaleString('nl-NL', { month: 'long' })}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className={`size-4 transform transition-transform duration-200 ${expandedMonths[key] ? 'rotate-90' : ''
                                  }`}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                              </svg>
                            </h3>

                            {expandedMonths[key] && (
                              <div className="">
                                {groupedNews[year][month]
                                  .sort((a, b) => new Date(b.first_publication_date) - new Date(a.first_publication_date)) // Sort items in descending order by date
                                  .map((item, index) => {
                                    const publicationDate = item.first_publication_date.split('T')[0];
                                    const itemBgColor = index % 2 === 0 ? 'bg-white' : 'bg-quaternary';
                                    return (
                                      <div key={index} className={`hover:bg-secondary flex gap-2 items-center rounded p-2 ${itemBgColor}`}>
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
            ))
        ) : (
          <p>No news available</p>
        )}
      </div>
      <div> Nieuwsartikel </div>
    </section>
  );
};

export default Archive;