"use client";

import { PrismicNextLink } from '@prismicio/next';
import { PrismicImage, PrismicRichText } from '@prismicio/react';
import { dateResolver } from '@/utils/helpers';

/**
 * @typedef {import("@prismicio/client").Content.ContentcardSlice} ContentcardSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ContentcardSlice>} ContentcardProps
 * @param {ContentcardProps}
 */
const Contentcards = ({ slice }) => {

  console.log(slice);

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
const ContentCardItem = ({ item }) => {

  return (
    <div className="group flex md:flex-col rounded bg-secondary hover:bg-primary flex-shrink-0 w-[350px] h-[200px] md:w-[250px] md:h-[350px] m-4 items-center md:text-center gap-1">
      <div className="pl-4 md:pl-0 pt-4">
        <PrismicImage field={item.image} className="w-[130px] md:w-[220px] h-[160px] object-cover object-center rounded" />
        {item.date ? (
          <div className="relative mt-[-28px] bg-white rounded-b p-1 flex items-center justify-center gap-1 w-[130px] w-full opacity-75">
            <p className="text-primary font-bold">{dateResolver(item.date).day}</p>
            <h6 className="text-primary">{dateResolver(item.date).month}</h6>
            <p className="text-primary font-bold">{dateResolver(item.date).year}</p>
          </div>
        ) : <div className="w-[113px]"></div>}
      </div>
      <div className="flex flex-col h-full justify-start p-4 break-words whitespace-normal">
        <PrismicRichText
          field={item.title}
          components={{
            heading2: ({ children }) => <h2 className="group-hover:text-white transition ease-in-out">{children}</h2>,
          }}
        />
        {item.subtitle ? (
          <h6 className="group-hover:text-white text-primary font-semibold pb-1">{item.subtitle.length > 28 ? `${item.subtitle.substring(0, 28)}` : item.subtitle}</h6>
        ) : null}
        <h6 className="group-hover:text-white text-justify md:text-center text-primary hover:text-white">
          {item.body.length > 150 ? `${item.body.substring(0, 150)}...` : item.body}
        </h6>
        <div className="mt-auto">
          <PrismicNextLink field={item.link} className="text-xs font-bold group-hover:text-tertiary hover:no-underline"/>
        </div>
      </div>
    </div>
  );
};

export default Contentcards;