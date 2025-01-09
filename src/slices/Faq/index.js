import { useState } from "react";

/**
 * @typedef {import("@prismicio/client").Content.FaqSlice} FaqSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<FaqSlice>} FaqProps
 * @param {FaqProps}
 */
const Faq = ({ slice }) => {
  const set = slice.primary.set;
  const [visibleIndex, setVisibleIndex] = useState(null);

  const toggleVisibility = (index) => {
    setVisibleIndex(visibleIndex === index ? null : index);
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="p-4 flex flex-col w-full gap-4"
    >
      <h1>Veelgestelde Vragen</h1>
      {set.map((item, index) => (
        <div key={index} className="flex flex-col items-start">
          <p
            className={`flex items-center text-primary w-full p-2 rounded justify-start gap-2 font-bold cursor-pointer ${
              visibleIndex === index
                ? "bg-secondary"
                : index % 2 === 0
                ? "bg-white"
                : "bg-quaternary"
            }`}
            onClick={() => toggleVisibility(index)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`size-4 transition-transform duration-200 ${
                visibleIndex === index ? "rotate-90" : ""
              }`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            {item.question}
          </p>
          {visibleIndex === index && <p className="ml-6">{item.answer}</p>}
        </div>
      ))}
    </section>
  );
};

export default Faq;