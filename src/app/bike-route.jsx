import { extractURLfromEmbedMap } from "@/utils/helpers";

// BikeRoute component to display route information and embedded map
const BikeRoute = ({ data }) => {
    // Extract the URL from the embedded map data
    const embedUrl = extractURLfromEmbedMap(data.route);

    return (
        <div className="flex flex-col gap-8 items-center">

            {/* Container for the route information */}
            <div className="lg:w-[70%] flex flex-col gap-2">
                <h3 className="pt-1">{data.title}</h3>
                <div className="">
                    <p className="font-bold">Afstand: {data.distance}km</p>
                    <div className="mt-4 flex flex-col gap-1">
                        <button className="py-2 w-[250px]" onClick={() => window.location.href = data.download_route.url}>Download Fietsknoop[+] Route</button>
                    </div>
                </div>
                <p className=" mt-4 pt-4 border-t border-primary text-justify">{data.body}</p>
            </div>

            {/* Embedded map iframe */}
            <iframe
                className="w-[92dvw] lg:w-[53dvw] rounded-lg"
                src={embedUrl}
                width="300"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            {/* Display step bodies */}
            {data.steps && data.steps.length > 0 && (
                <div className="flex flex-col gap-1 lg:w-[70%]">
                    <p className="font-bold pb-2">Knooppunten Fietsroute</p>
                    {data.steps.map((steps, index) => {
                        const googleMapsLink = `https://www.google.com/maps/place/${steps.step.replace(/ /g, '+')}`;
                        return (
                            <div className="flex gap-4 py-1" key={index}>
                                <p className="font-bold">{index + 1}. </p>
                                <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">{steps.step}</a>
                            </div>
                        );
                    })}
                </div>
            )}

        </div>
    );
};

export default BikeRoute;
