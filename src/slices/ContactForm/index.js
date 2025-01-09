import React, { useState } from 'react';
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.ContactFormSlice} ContactFormSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ContactFormSlice>} ContactFormProps
 * @param {ContactFormProps}
 */
const ContactForm = ({ slice }) => {
  const [voornaam, setVoornaam] = useState('');
  const [achternaam, setAchternaam] = useState('');
  const [email, setEmail] = useState('');
  const [telefoonnummer, setTelefoonnummer] = useState('');
  const [woonplaats, setWoonplaats] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!voornaam || !email || !telefoonnummer || !woonplaats) {
      setErrorMessage('Vul alle verplichte velden in.');
      setIsSubmitted(false);
    } else {
      setErrorMessage('');
      setIsSubmitted(true);
    }
  };

  const handleInputChange = (setter) => (event) => {
    console.log(`Input change: ${event.target.name} = ${event.target.value}`);
    setter(event.target.value);
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex w-full h-full p-8 gap-10 flex-col md:flex-row"
    >
      <div className="text-justify">
        <div>
          <h1 className="py-2">Contact</h1>
          <div className="md:max-w-[70dvw]">
            <PrismicRichText field={slice.primary.body} />
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <form className="flex flex-col gap-2 bg-secondary rounded p-4 w-full" onSubmit={handleSubmit}>
          <div className="md:flex md:gap-4">
            <label className="md:w-1/2">
              Voornaam: <span className="text-red-500">*</span>
              <input
                type="text"
                name="voornaam"
                className="text-black text-xs w-full p-2 bg-white rounded"
                value={voornaam}
                onChange={handleInputChange(setVoornaam)}
              />
            </label>
            <label className="md:w-1/2">
              Achternaam:
              <input
                type="text"
                name="achternaam"
                className="text-black text-xs w-full p-2 bg-white rounded"
                value={achternaam}
                onChange={handleInputChange(setAchternaam)}
              />
            </label>
          </div>
          <div className="md:flex md:gap-4">
            <label className="md:w-1/2">
              Email: <span className="text-red-500">*</span>
              <input
                type="email"
                name="email"
                className="text-black text-xs w-full p-2 bg-white rounded"
                value={email}
                onChange={handleInputChange(setEmail)}
              />
            </label>
            <label className="md:w-1/2">
              Telefoonnummer: <span className="text-red-500">*</span>
              <input
                type="tel"
                name="telefoonnummer"
                className="text-black text-xs w-full p-2 bg-white rounded"
                value={telefoonnummer}
                onChange={handleInputChange(setTelefoonnummer)}
              />
            </label>
          </div>
          <label>
            Woonplaats en buurt: <span className="text-red-500">*</span>
            <input
              type="text"
              name="woonplaats"
              className="text-black text-xs w-full p-2 mb-4 bg-white rounded"
              value={woonplaats}
              onChange={handleInputChange(setWoonplaats)}
            />
          </label>
          <label>
            <textarea
              name="message"
              rows="10"
              className="text-black text-xs w-full p-2 bg-white rounded"
              placeholder="Schrijf hier uw bericht..."
              value={message}
              onChange={handleInputChange(setMessage)}
            ></textarea>
          </label>
          <button type="submit" className="p-2 bg-primary text-white rounded">Verzenden</button>
          {isSubmitted && <p className="bg-green-500 mt-2 text-white rounded p-2 font-bold">Formulier succesvol verzonden!</p>}
          {errorMessage && <p className="bg-red-500 mt-2 text-white rounded p-2 font-bold">{errorMessage}</p>}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;