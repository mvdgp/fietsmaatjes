"use client";

import { useEffect, useState } from 'react';
import { fetchNewsContent } from '@/utils/prismic-fetcher';
import { PrismicRichText, PrismicImage } from '@prismicio/react';
import { dateResolver } from '@/utils/helpers';

/**
 * @typedef {import("@prismicio/client").Content.LatestNewsSlice} LatestNewsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<LatestNewsSlice>} LatestNewsProps
 * @param {LatestNewsProps}
 */
const LatestNews = ({ slice }) => {
  const [news, setNews] = useState([]);

  // Fetch latest news on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const latestNews = await fetchNewsContent(true);
        setNews(latestNews);
      } catch (error) {
        console.error('Error fetching latest news:', error);
      }
    };

    fetchData();
  }, []);

  // Truncate text to a specified length
  const truncateText = (text, length) => {
    if (!text || text.length <= length) return text;
    return text.substring(0, length) + '...';
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="
        mt-8 w-full p-4 text-center
      "
    >
      <h1 className="mb-2 border-b pb-2 border-primary">Laatste nieuwsberichten</h1>
      <div
        className="
          p-4 grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3
          justify-items-center gap-4
        "
      >
        {news.length > 0 ? (
          news.map((item, index) => {
            const formattedDate = dateResolver(item.first_publication_date.split('T')[0]);
            const hasImage = item.data.image && item.data.image.url;

            return (
              <div
                key={index}
                className="
                  group hover:bg-primary hover:text-white
                  w-[350px] h-[400px] bg-secondary rounded p-4
                  flex flex-col justify-between
                "
              >
                {hasImage && (
                  <PrismicImage
                    field={item.data.image}
                    className="
                      rounded w-[340px] h-[150px]
                      object-cover object-center
                    "
                  />
                )}
                <div
                  className={`
                    mb-3 gap-1 bg-white rounded-b opacity-80
                    mt-[-20px] w-full flex items-center justify-center
                    ${hasImage ? '' : 'p-2'}
                  `}
                >
                  <p className="text-primary font-bold">{formattedDate.day}</p>
                  <p className="text-primary">{formattedDate.month}</p>
                  <p className="text-primary font-bold">{formattedDate.year}</p>
                </div>
                {item.data.title && (
                  <PrismicRichText
                    field={item.data.title}
                    components={{
                      heading1: ({ children }) => (
                        <h1 className="group-hover:text-white">
                          {truncateText(item.data.title[0]?.text, 28)}
                        </h1>
                      ),
                    }}
                  />
                )}
                {item.data.body && (
                  <div>
                    {item.data.body.map((block, i) => (
                      <p className="text-xs text-justify" key={i}>
                        {truncateText(block.text, 400)}
                      </p>
                    ))}
                  </div>
                )}
                <a
                  href={`/nieuws#${item.uid}`}
                  className="
                    group-hover:text-tertiary hover:no-underline
                    font-bold text-xs mt-auto
                  "
                >
                  Lees meer
                </a>
              </div>
            );
          })
        ) : (
          <p className="text-primary">Geen nieuws beschikbaar :(</p>
        )}
      </div>
      <div className="flex flex-col w-full items-start p-4">
        <p className="font-bold">Op de hoogte blijven?</p>
        <p>
          Meld u aan voor onze{' '}
          <a href="https://www.fietsmaatjes.nl" target="_blank">
            nieuwsbrief
          </a>
          !
        </p>
      </div>
    </section>
  );
};

export default LatestNews;