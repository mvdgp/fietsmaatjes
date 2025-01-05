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

  console.log(slice);

  return (
    <section className="flex flex-row flex-wrap items-center justify-center">
      {slice.primary.card.map((item, index) => (
        <InfoCardsItem key={index} item={item} variation={slice.variation} />
      ))}
    </section>
  );
};

/**
 * Renders a single content card item.
 * @param {Object} props
 * @param {Object} props.item - The content card item data.
 * @param {string} props.variation - The variation of the slice.
 */
// ...existing code...

const InfoCardsItem = ({ item, variation }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className={`group flex flex-col p-4 border border-primary rounded hover:bg-primary flex-shrink-0 
      ${expanded ? 'md:w-[500px] md:h-[300px] w-[320px] h-[500px]' : 'md:w-[200px] md:h-[300px] w-[320px] h-[200px]'}
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
        expanded ? (
          <PrismicRichText
// ...existing code...
            field={item.body_expanded}
            components={{
              paragraph: ({ children }) => <p className="text-primary group-hover:text-white transition ease-in-out">{children}</p>,
            }}
          />
        ) : (
          <p className="text-primary group-hover:text-white text-center">{item.body}</p>
        )
      ) : (
        <p className="text-primary group-hover:text-white text-center">{item.body}</p>
      )}
      <PrismicNextLink field={item.link} className="mt-auto text-xs font-bold group-hover:text-tertiary hover:no-underline" />
      {variation === "infoCardsExpandable" && (
        <a onClick={toggleExpanded} className="cursor-pointer mt-2 text-xs font-bold group-hover:text-tertiary hover:no-underline">
          {expanded ? "Terug" : "Lees meer"}
        </a>
      )}
    </div>
  );
};

export default InfoCards;