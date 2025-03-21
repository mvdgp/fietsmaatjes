import React from 'react';

/**
 * IFrame component to display an iframe with the given URL
 * @param {Object} props - Component properties
 * @param {Object} props.slice - Slice data from Prismic
 * @returns {JSX.Element} Rendered IFrame component
 */
const IFrame = ({ slice }) => {
  const url = slice.primary.url.url;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="
        flex items-center justify-center
        h-[100dvh] w-full
      "
    >
      <div
        className="
          flex items-center justify-center
          scale-80
          w-[100dvw] h-[100dvh]
        "
      >
        <iframe
          role="iframe"
          className="w-full h-full"
          src={url}
          width="600"
          height="400"
          style={{ border: 0, overflow: 'auto' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default IFrame;