import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Fix Leaflet marker icon issue in production/Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Gold Icon for Safari
const safariIcon = new L.DivIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: hsl(var(--accent)); width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3);"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
    popupAnchor: [0, -10]
});

const markers = [
    {
        id: "serengeti",
        name: "Serengeti",
        country: "Tanzania",
        coordinates: [-2.3333, 34.8333] as [number, number], // Leaflet uses [lat, lng]
        tours: ["Great Migration Safari", "Big Five Game Drive"],
        price: "₹4,200+",
        duration: "7 Days"
    },
    {
        id: "okavango",
        name: "Okavango Delta",
        country: "Botswana",
        coordinates: [-19.2500, 22.8667] as [number, number],
        tours: ["Waterways Discovery", "Night Game Drive"],
        price: "₹3,800+",
        duration: "5 Days"
    },
    {
        id: "kilimanjaro",
        name: "Kilimanjaro",
        country: "Tanzania",
        coordinates: [-3.0674, 37.3556] as [number, number],
        tours: ["Machame Route Trek", "Lemosho Summit"],
        price: "₹5,600+",
        duration: "10 Days"
    },
    {
        id: "masai-mara",
        name: "Masai Mara",
        country: "Kenya",
        coordinates: [-1.5000, 35.1500] as [number, number],
        tours: ["Mara Plains Explorer", "Balloon Safari"],
        price: "₹3,500+",
        duration: "6 Days"
    },
    {
        id: "kruger",
        name: "Kruger",
        country: "South Africa",
        coordinates: [-24.0000, 31.5000] as [number, number],
        tours: ["Wilderness Explorer", "Luxury Lodge Stay"],
        price: "₹4,500+",
        duration: "8 Days"
    },
    {
        id: "etosha",
        name: "Etosha",
        country: "Namibia",
        coordinates: [-18.8333, 15.9167] as [number, number],
        tours: ["Salt Pan Pans", "Desert Predator Tracking"],
        price: "₹3,200+",
        duration: "6 Days"
    },
    {
        id: "bwindi",
        name: "Bwindi",
        country: "Uganda",
        coordinates: [-1.0500, 29.6167] as [number, number],
        tours: ["Gorilla Trekking", "Mist Forest Walk"],
        price: "₹5,200+",
        duration: "4 Days"
    },
];

export const InteractiveMap = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-[600px] bg-[#f2ede4] rounded-3xl overflow-hidden relative border border-border shadow-safari group interaction-layer">
            {/* Header Badge */}
            <div className="absolute top-6 left-6 z-[1000] bg-white/70 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-sans font-bold border border-black/5 text-primary uppercase tracking-widest pointer-events-none flex items-center gap-2">
                <MapPin size={14} className="text-accent" /> Places we serve
            </div>

            <MapContainer
                center={[-10, 25]}
                zoom={3.5}
                scrollWheelZoom={false} // Disable until modifier is held if needed, but Leaflet is better
                className="w-full h-full leaflet-safari-theme"
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />

                {markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={marker.coordinates}
                        icon={safariIcon}
                    >
                        <Popup className="safari-popup" minWidth={260}>
                            <div className="p-1">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 className="font-serif text-lg font-bold text-primary m-0">{marker.name}</h4>
                                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">{marker.country}</p>
                                    </div>
                                    <span className="bg-accent/10 text-accent text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider h-fit">
                                        {marker.duration}
                                    </span>
                                </div>
                                <ul className="space-y-1.5 mb-4 list-none p-0">
                                    {marker.tours.map((tour: string) => (
                                        <li key={tour} className="flex items-center gap-2 text-[11px] text-foreground/80 font-medium">
                                            <div className="w-1 h-1 rounded-full bg-accent" />
                                            {tour}
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex items-center justify-between pt-3 border-t border-primary/10">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] text-muted-foreground font-sans font-medium uppercase tracking-wider">Starting From</span>
                                        <span className="text-sm font-bold text-primary">{marker.price}</span>
                                    </div>
                                    <button
                                        onClick={() => navigate('/book', { state: { destinationId: marker.id } })}
                                        className="bg-primary text-primary-foreground p-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all flex items-center justify-center shadow-sm"
                                        title="Book Now"
                                    >
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                <MapController />
            </MapContainer>

            <style dangerouslySetInnerHTML={{
                __html: `
                .leaflet-safari-theme .leaflet-tile-pane {
                    filter: sepia(0.2) hue-rotate(-15deg) saturate(0.8) brightness(1.05);
                }
                .leaflet-container {
                    background: #f2ede4 !important;
                }
                .safari-popup .leaflet-popup-content-wrapper {
                    border-radius: 1rem;
                    padding: 0;
                    overflow: hidden;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
                    border: 1px solid rgba(0,0,0,0.05);
                }
                .safari-popup .leaflet-popup-content {
                    margin: 12px;
                    width: 260px !important;
                }
                .safari-popup .leaflet-popup-tip {
                    background: white;
                }
            `}} />
        </div>
    );
};

const MapController = () => {
    const map = useMap();

    useEffect(() => {
        // Only zoom when the user explicitly interacts or uses modifier
        map.on('focus', () => {
            map.scrollWheelZoom.enable();
        });
        map.on('blur', () => {
            map.scrollWheelZoom.disable();
        });
    }, [map]);

    return null;
}
