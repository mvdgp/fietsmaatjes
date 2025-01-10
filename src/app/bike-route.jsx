import React from 'react';
import { extractURLfromEmbedMap } from '@/utils/helpers';

const BikeRoute = ({ item, index, handleToggleRoute, toggleRoute }) => {
  const embedUrl = extractURLfromEmbedMap(item.data.route);

  return (
    <div key={index} className="flex flex-col gap-2 w-[80dvw]">
      <h3
        className="flex items-center justify-between py-2 border-b border-primary cursor-pointer"
        onClick={() => handleToggleRoute(index, item.slugs[0])}
      >
        {item.data.title}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={`size-5 transition-transform duration-200 ${toggleRoute[index] ? "rotate-90" : ""}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </h3>
      <div className={`pt-2 flex flex-col md:flex-row gap-8 justify-between ${toggleRoute[index] ? "" : "hidden"}`}>
        <p className="md:w-[50%] text-justify">{item.data.body}</p>
        <iframe
          className="w-[80dvw] md:w-[50dvw] rounded-lg"
          src={embedUrl}
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default BikeRoute;