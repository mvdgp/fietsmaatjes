"use client"

import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';

/**
 * @typedef {import("@prismicio/client").Content.ContentcardSlice} ContentcardSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ContentcardSlice>} ContentcardProps
 * @param {ContentcardProps}
 */
const Contentcard = ({ slice }) => {
  return (
    <section>
      <PrismicNextImage field={slice.primary.image} />
      <span>{slice.primary.date}</span>
      <PrismicRichText field={slice.primary.title} />
      <PrismicRichText field={slice.primary.body} />
      {slice.primary.link ? (
        <PrismicNextLink field={slice.primary.link}>
          {slice.primary.link_label}
        </PrismicNextLink>
      ) : (
        <span>No link available</span>
      )}
    </section>
  );
};

export default Contentcard;