"use client";

import { useState } from 'react';
import { PrismicNextLink } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import { ReactSVG } from 'react-svg';

/**
 * @typedef {import("@prismicio/client").Content.InfoCardsSlice} InfoCardsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<InfoCardsSlice>} InfoCardsProps
 * @param {InfoCardsProps}
 */
const InfoCards = ({ slice }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpanded = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="flex flex-row flex-wrap items-center justify-center">
      {slice.primary.card.map((item, index) => (
        <InfoCardsItem
          key={index}
          item={item}
          variation={slice.variation}
          isExpanded={expandedIndex === index}
          toggleExpanded={() => toggleExpanded(index)}
        />
      ))}
    </section>
  );
};

/**
 * Renders a single content card item.
 * @param {Object} props
 * @param {Object} props.item - The content card item data.
 * @param {string} props.variation - The variation of the slice.
 * @param {boolean} props.isExpanded - Whether the item is expanded.
 * @param {Function} props.toggleExpanded - Function to toggle the expanded state.
 */
const InfoCardsItem = ({ item, variation, isExpanded, toggleExpanded }) => {
  return (
    <div
      className={`group flex flex-col p-4 border border-primary rounded hover:bg-primary flex-shrink-0 
      ${isExpanded ? 'md:w-[500px] md:h-[300px] w-[320px] h-[500px]' : 'md:w-[200px] md:h-[300px] w-[320px] h-[200px]'}
      m-4 items-center text-center gap-1`}
    > 
      <ReactSVG
        src={`data:image/svg+xml;base64,${btoa(item.icon)}`}
        beforeInjection={(svg) => {
          svg.classList.add('svg-container', 'group-hover:text-white', 'transition', 'ease-in-out');
        }}
      />
      <PrismicRichText
        field={item.title}
        components={{
          heading2: ({ children }) => <h2 className="group-hover:text-white transition ease-in-out">{children}</h2>,
        }}
      />
      {variation === "infoCardsExpandable" ? (
        isExpanded ? (
          <PrismicRichText
            field={item.body_expanded}
            components={{
              paragraph: ({ children }) => <p className="text-xs text-primary group-hover:text-white transition ease-in-out">{children}</p>,
            }}
          />
        ) : (
          <h6 className="text-primary group-hover:text-white text-center">{item.body}</h6>
        )
      ) : (
        <h6 className="text-primary group-hover:text-white text-center">{item.body}</h6>
      )}
      <PrismicNextLink field={item.link} className="mt-auto text-xs font-bold group-hover:text-tertiary hover:no-underline" />
      {variation === "infoCardsExpandable" && (
        <a onClick={toggleExpanded} className="cursor-pointer mt-2 text-xs font-bold group-hover:text-tertiary hover:no-underline">
          {isExpanded ? "Terug" : "Lees meer"}
        </a>
      )}
    </div>
  );
};

export default InfoCards;