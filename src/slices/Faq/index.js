"use client";

import { useState } from "react";

/**
 * @typedef {import("@prismicio/client").Content.FaqSlice} FaqSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<FaqSlice>} FaqProps
 * @param {FaqProps}
 */
const Faq = ({ slice }) => {
  const { set } = slice.primary;
  const [visibleIndex, setVisibleIndex] = useState(null);

  /**
   * Toggles the visibility of the FAQ answer
   * @param {number} index - Index of the FAQ item
   */
  const toggleVisibility = (index) => {
    setVisibleIndex(visibleIndex === index ? null : index);
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="
        p-4
        flex flex-col
        w-full h-full md:w-[80%]
        gap-4
      "
    >
      <h1>Veelgestelde Vragen</h1>
      {set.map((item, index) => (
        <div key={index}
          className="
          flex flex-col
          rounded
          bg-quaternary
          ">
          <p
            className="
              flex items-center
              text-primary
              w-full p-2
              justify-start gap-2
              font-bold cursor-pointer
              text-sm
            "
            onClick={() => toggleVisibility(index)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`
                w-[16px] h-[16px]
                transition-transform duration-200
                ${visibleIndex === index ? 'rotate-90' : ''}
              `}
              style={{ minWidth: '16px', minHeight: '16px' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            {item.question}
          </p>
          {visibleIndex === index && <p className="ml-8 pb-4 pr-6 text-sm text-justify">{item.answer}</p>}
        </div>
      ))}
    </section>
  );
};

export default Faq;