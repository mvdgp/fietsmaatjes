"use client";

import { PrismicNextLink } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import { ReactSVG } from 'react-svg';

/**
 * @typedef {import("@prismicio/client").Content.ContentcardSlice} ContentcardSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ContentcardSlice>} ContentcardProps
 * @param {ContentcardProps}
 */
const Contentcards = ({ slice }) => {
  
  return (
    <section className="flex flex-row flex-wrap">
      {slice.primary.card.map((item, index) => (
        <ContentCardItem key={index} item={item} />
      ))}
    </section>
  );
};

/**
 * Renders a single content card item.
 * @param {Object} props
 * @param {Object} props.item - The content card item data.
 */
const ContentCardItem = ({ item }) => (
  <div className="group flex flex-col p-4 border border-primary rounded hover:bg-primary flex-shrink-0 w-[200px] h-[300px] m-4 items-center text-center gap-1">
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
    <p className="group-hover:text-white text-justify">{item.body}</p>
    <PrismicNextLink field={item.link} className="mt-auto text-xs font-bold group-hover:text-tertiary no-underline" />
  </div>
);

export default Contentcards;