import serengetiImg from "@/assets/safari-serengeti.jpg";
import okavango from "@/assets/safari-okavango.jpg";
import kilimanjaro from "@/assets/safari-kilimanjaro.jpg";
import masaiMara from "@/assets/safari-masai-mara.jpg";

export interface Expedition {
    id: string;
    title: string;
    location: string;
    duration: string;
    price: string;
    image: string;
    budgetTier: string;
    description?: string;
    itinerary?: { day: number; title: string; desc: string }[];
    highlights?: string[];
}

export const expeditions: Expedition[] = [
    {
        id: "serengeti",
        title: "The Great Serengeti Migration",
        location: "Tanzania",
        duration: "7 Days",
        price: "₹4,200",
        image: serengetiImg,
        budgetTier: "Mid-Range",
        description: "Experience the world's most spectacular wildlife event. Witness millions of wildebeest and zebras traverse the endless plains of the Serengeti, followed closely by Africa's top predators.",
        highlights: ["Witness the Mara River crossing", "Sunrise hot air balloon safari", "Expert-led predator tracking"],
        itinerary: [
            { day: 1, title: "Arrival in Arusha", desc: "Welcome to Tanzania. Transfer to your luxury lodge for a briefing and welcome dinner." },
            { day: 2, title: "To Central Serengeti", desc: "Fly into the heart of the Serengeti. Afternoon game drive in the Seronera Valley." },
            { day: 3, title: "The Migration Trail", desc: "Full day tracking the great herds. Experience the sheer scale of the migration." },
            { day: 4, title: "Ngorongoro Crater", desc: "Descend into the 'Garden of Eden' for a unique ecosystem encounter." }
        ]
    },
    {
        id: "okavango",
        title: "Okavango Delta Discovery",
        location: "Botswana",
        duration: "5 Days",
        price: "₹3,800",
        image: okavango,
        budgetTier: "Mid-Range",
        description: "Navigate the crystal-clear waterways of the world's largest inland delta. A pristine wilderness where desert meets water, offering unique aquatic and land-based wildlife encounters.",
        highlights: ["Mokoro (dugout canoe) excursions", "Private island bush camping", "Legendary sunset photography"],
        itinerary: [
            { day: 1, title: "Maun to the Delta", desc: "Bush plane transfer deep into the delta. Settle into your water-based camp." },
            { day: 2, title: "Waterways & Wildlife", desc: "Morning mokoro glide through lily-covered channels. Afternoon walking safari." }
        ]
    },
    {
        id: "kilimanjaro",
        title: "Kilimanjaro & Safari Combo",
        location: "Tanzania",
        duration: "10 Days",
        price: "₹5,600",
        image: kilimanjaro,
        budgetTier: "Premium",
        description: "The ultimate Tanzanian adventure. Conquer the 'Roof of Africa' followed by a well-deserved luxury safari in the surrounding national parks.",
        highlights: ["Summiting Uhuru Peak", "Luxury recovery spa day", "Tarangire elephant encounters"]
    },
    {
        id: "masai-mara",
        title: "Masai Mara Big Five",
        location: "Kenya",
        duration: "6 Days",
        price: "₹3,500",
        image: masaiMara,
        budgetTier: "Best Value",
        description: "A classic Kenyan safari in the world-famous Masai Mara. Renowned for its exceptional populations of lion, leopard, cheetah, and elephant.",
        highlights: ["Cultural visit to a Maasai village", "Big Five spotting", "Mara River picnic lunch"]
    },
    {
        id: "kruger",
        title: "Kruger Wilderness Explorer",
        location: "South Africa",
        duration: "8 Days",
        price: "₹4,500",
        image: "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg",
        budgetTier: "Mid-Range",
        description: "Explore South Africa's flagship national park. A vast landscape of diverse ecosystems and unparalleled wildlife viewing opportunities."
    },
    {
        id: "etosha",
        title: "Etosha Salt Pans Safari",
        location: "Namibia",
        duration: "6 Days",
        price: "₹3,200",
        image: okavango,
        budgetTier: "Best Value",
        description: "Discover the stark beauty of the Etosha Pan. A unique landscape where wildlife gathers around waterholes against a backdrop of shimmering white salt."
    },
    {
        id: "bwindi",
        title: "Bwindi Gorilla Trekking",
        location: "Uganda",
        duration: "4 Days",
        price: "₹5,200",
        image: kilimanjaro,
        budgetTier: "Premium",
        description: "An intimate encounter with our closest relatives. Trek through the ancient Bwindi Impenetrable Forest to spend a life-changing hour with mountain gorillas."
    },
    {
        id: "south-luangwa",
        title: "South Luangwa Walking Safari",
        location: "Zambia",
        duration: "7 Days",
        price: "₹4,800",
        image: masaiMara,
        budgetTier: "Premium",
        description: "Experience the bush on foot in the birthplace of the walking safari. An immersive way to connect with the African wilderness and its smaller details."
    },
];
