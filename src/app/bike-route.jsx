import { extractURLfromEmbedMap } from "@/utils/helpers";

// BikeRoute component to display route information and embedded map
const BikeRoute = ({ data }) => {
    // Extract the URL from the embedded map data
    const embedUrl = extractURLfromEmbedMap(data.route);

    return (
        <div className="flex flex-col gap-8 items-center justify-center">

            {/* Container for the route information */}
            <div className="lg:w-[70%] flex flex-col gap-2">
                <h3>{data.title}</h3>
                <p className="text-justify">{data.body}</p>
            </div>
            
            {/* Embedded map iframe */}
            <iframe
                className="w-[92dvw] lg:w-[60dvw] rounded-lg"
                src={embedUrl}
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );
};

export default BikeRoute;
