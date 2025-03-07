import { PrismicImage } from "@prismicio/react";

// BikeRoute component to display route information and embedded map
const BikeRoute = ({ data }) => {

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
                <PrismicImage
                    className="w-[200px] h-[200px]"
                    field={data.qr_code}
                    alt={data.title}>
                </PrismicImage>
            </div>

            {/* Container for the map image */}
            <PrismicImage
                className="ml-40 w-[80%] rounded-lg"
                field={data.route}
                alt={data.title}
            ></PrismicImage>

        </div>
    );
};

export default BikeRoute;
