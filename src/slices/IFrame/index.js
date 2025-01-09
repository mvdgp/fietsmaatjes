const IFrame = ({ slice }) => {
  const url = slice.primary.url.url;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex items-center justify-center h-[100vh] w-full"
    >
      <div className="flex items-center justify-center scale-80 w-[100dvw] h-[100vh]">
        <iframe
          className="w-full h-full"
          src={url}
          width="600"
          height="400"
          style={{ border: 0, overflow: 'auto' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default IFrame;