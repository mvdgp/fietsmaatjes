"use client";

import { PrismicRichText, PrismicImage } from '@prismicio/react';
import { useEffect, useRef, useState } from 'react';

/**
 * @typedef {import("@prismicio/client").Content.SectionSlice} SectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SectionSlice>} SectionProps
 * @param {SectionProps}
 */
const Section = ({ slice }) => {
  const variation = slice.variation;
  const bgColor = slice.primary.background_color;
  const imageRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState('auto');

  useEffect(() => {
    if (imageRef.current) {
      setMaxHeight(`${imageRef.current.clientHeight}px`);
    }
  }, []);

  if (variation === "default") {
    console.log(bgColor);
    return (
      <section className={`px-2 py-4 h-full w-full flex flex-col md:flex-row gap-6 max-w-[90dvw] ${bgColor === "lichtblauw" ? "bg-secondary" : "bg-secondary"} ${bgColor === "wit" ? "bg-white" : "bg-white"}`}>
        <PrismicImage
          ref={imageRef}
          field={slice.primary.image}
          className="mt-6 md:w-[40dvw] max-h-[500px] object-cover object-center rounded"
        />
        <div className="flex gap-3 flex-col p-4 md:w-[60dvw]">
          <PrismicRichText
            field={slice.primary.body}
            components={{
              paragraph: ({ children }) => (
                <p className="text-justify">
                  {children}
                </p>
              ),
            }}
          />
        </div>
      </section>
    );
  } else if (variation === "vertical") {
    return (
      <section className="h-full w-full flex flex-col gap-6">
        <PrismicImage
          ref={imageRef}
          field={slice.primary.image}
          className="w-full h-[70dvh] object-cover object-center rounded"
        />
        <div className="py-4 px-8 md:px-40 w-full">
          <PrismicRichText
            field={slice.primary.body}
            components={{
              heading1: ({ children }) => <h1 className="text-justify">{children}</h1>,
              paragraph: ({ children }) => (
                <p className="mt-4 text-justify" style={{ maxHeight, overflow: 'hidden' }}>
                  {children}
                </p>
              ),
            }}
          />
        </div>
      </section>
    );
  } else if (variation === "mirrored") {
    return (
      <section className={`h-full w-full flex flex-col md:flex-row gap-10 py-10 px-8 lg:px-36 ${bgColor === "Lichtblauw" ? "bg-secondary" : bgColor === "Wit" ? "bg-white" : ""}`}>
      <div className="p-4 md:w-[60dvw]">
        <PrismicRichText
        field={slice.primary.body}
        components={{
          heading1: ({ children }) => <h1 className="text-justify">{children}</h1>,
          paragraph: ({ children }) => (
          <p className="mt-4 text-justify" style={{ maxHeight, overflow: 'hidden' }}>
            {children}
          </p>
          ),
        }}
        />
      </div>
      <PrismicImage
        ref={imageRef}
        field={slice.primary.image}
        className="md:w-[40dvw] max-w-[75dvh] object-cover object-center rounded"
      />
      </section>
    );

  } else if (variation === "stacked") {
    return (
      <section className="relative h-full w-full flex flex-col gap-6">
        <PrismicImage
          ref={imageRef}
          field={slice.primary.image}
          className="w-full h-[70dvh] object-cover object-center rounded"
        />
        <div className="absolute inset-0 flex items-end mb-14 justify-center">
          <div className="p-4 w-full bg-white bg-opacity-60 p-4 md:p-10 flex items-center justify-center">
            <div className="font-semibold text-white text-center w-full">
              <PrismicRichText
                field={slice.primary.body}
                components={{
                  heading1: ({ children }) => <h1 className="text-4xl">{children}</h1>,
                  heading2: ({ children }) => <h2 className="text-4xl text-white">{children}</h2>,
                  heading3: ({ children }) => <h3 className="text-4xl text-primary">{children}</h3>,
                }}
              />
            </div>
          </div>
        </div>
      </section>
    );
  } else if (variation === "noImage") {
    return (
      <div className="px-8 py-2 md:px-52 flex flex-col w-full text-justify items-center">
        <div>
          <PrismicRichText field={slice.primary.body} />
        </div>
      </div>
    );
  } else {
    return (
      <div>test</div>
    );
  }
};

export default Section;