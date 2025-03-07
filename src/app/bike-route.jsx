import { PrismicImage } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";

// BikeRoute component to display route information and embedded map
const BikeRoute = ({ data }) => {

    return (
        <div className="w-full flex flex-col items-center justify-center">

            {/* Container for the route information */}
            <div className="w-[95%] flex flex-col">
                <div className="flex flex-col justify-center">
                    <div className="flex flex-col lg:flex-row justify-between">
                        <div className="flex flex-col gap-2 justify-center">
                            <h3 className="pt-1">{data.title}</h3>
                            <div className="">
                                <p className="font-bold">Afstand: {data.distance}km</p>
                                <div className="mt-4 flex flex-col gap-1">
                                    <button className="py-2 w-[250px]" onClick={() => window.location.href = data.download_route.url}>Download Fietsknoop[+] Route</button>
                                </div>
                            </div>
                        </div>
                        <PrismicImage
                            className="mt-4 lg:mt-0 w-[150px] h-[150px]"
                            field={data.qr_code}
                            alt={data.title}>
                        </PrismicImage>
                    </div>
                </div>
                <p className="mt-4 pt-4 border-t border-primary text-justify">{data.body}</p>
                <br/>
                <p className="text-justify italic">Scan de QR code of ga naar <a href={data.route_link.url} target="blank">{data.route_link.url}</a> (inloggen noodzakelijk).<br />
                    Je kunt de route ook downloaden via de download knop (hiervoor is een Fietsknoop[+] abonnement vereist).</p>
            </div>
            {/* Container for the map image */}
            <a className="w-full" href={data.route_link.url} target="blank">
                <PrismicImage
                    className="mt-8 w-[90%] rounded-lg"
                    field={data.route}
                    alt={data.title}
                ></PrismicImage>
            </a>

        </div>
    );
};

export default BikeRoute;
