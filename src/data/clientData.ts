import { BusinessListing } from "../types";

export const businessListings: BusinessListing[] = [
  {
    id: "1",
    name: "The Goodfellas Executive Barbershop",
    type: "Barbershop",
    distance: "1.2 mi",
    location: "Kaniu Drive, Utawala, NRB",
    rating: 4.0,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
    logo: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=100&h=100&fit=crop",
    description: "Experience premium grooming in a relaxed, modern environment. We specialize in classic cuts, skin fades, and hot towel shaves. Our master barbers bring years of experience to ensure you leave looking your absolute best.",
    openUntil: "8:00 PM",
    isTopRated: true,
    services: [
      { id: "s1", name: "Signature Haircut", duration: "45 mins", description: "", price: 450, currency: "ksh" },
      { id: "s2", name: "Skin Fade & Line Up", duration: "60 mins", description: "", price: 550, currency: "ksh" },
      { id: "s3", name: "Beard Trim with Hot Towel", duration: "30 mins", description: "", price: 300, currency: "ksh" },
      { id: "s4", name: "The Royal Shave", duration: "45 mins", description: "", price: 400, currency: "ksh" },
    ]
  },
  {
    id: "2",
    name: "The Boss Barbershop",
    type: "Barbershop",
    distance: "2.4 mi",
    location: "Utawala Complex, Estrn Bypass",
    rating: 4.5,
    reviews: 44,
    image: "https://images.unsplash.com/photo-1585747860-435d68820f70?w=800&q=80",
    logo: "",
    description: "The ultimate destination for the modern man. Precision cuts and elite grooming services.",
    openUntil: "9:00 PM",
    isTopRated: false,
    services: [
      { id: "b1", name: "Executive Cut", duration: "40 mins", description: "", price: 500, currency: "ksh" }
    ]
  },
  {
    id: "3",
    name: "Fuzion Salon & Spa",
    type: "Hair Salon",
    distance: "3.0 mi",
    location: "Eastern Bypass, NRB",
    rating: 5.0,
    reviews: 10,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
    logo: "",
    description: "Premium hair styling and spa treatments for all. Modern techniques in a luxury setting.",
    openUntil: "7:30 PM",
    isTopRated: true,
    services: [
      { id: "f1", name: "Hair Styling", duration: "60 mins", description: "", price: 1200, currency: "ksh" }
    ]
  },
  {
    id: "4",
    name: "Lexx Barbershop",
    type: "Barbershop",
    distance: "4.1 mi",
    location: "Utawala, NRB",
    rating: 4.5,
    reviews: 2,
    image: "https://images.unsplash.com/photo-1593702288056-7927b442d0fa?w=800&q=80",
    logo: "",
    description: "Quick, clean, and professional. Best fades in Utawala.",
    openUntil: "10:00 PM",
    isTopRated: false,
    services: [
      { id: "l1", name: "Clean Cut", duration: "30 mins", description: "", price: 350, currency: "ksh" }
    ]
  }
];
