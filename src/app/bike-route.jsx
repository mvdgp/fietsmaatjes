import { extractURLfromEmbedMap } from "@/utils/helpers";

const BikeRoute = (item) => {
    const embedUrl = extractURLfromEmbedMap(item.data.route);

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-[70%] flex flex-col gap-2">
                <h3>{item.data.title}</h3>
                <p className="text-justify">{item.data.body}</p>
            </div>
            <iframe
                className="w-[95dvw] lg:w-[80dvw] lg:w-[50dvw] rounded-lg"
                src={embedUrl}
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );
};

export default BikeRoute;