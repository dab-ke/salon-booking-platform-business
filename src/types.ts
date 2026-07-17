export interface Service {
  id: string;
  name: string;
  duration: string;
  description: string;
  price: number;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface DaySchedule {
  day: string;
  enabled: boolean;
  open: string;
  close: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  alt: string;
}

export interface BookingPreferences {
  autoApprove: boolean;
  depositRequired: boolean;
  whatsappNotifications: boolean;
}

export interface BusinessProfile {
  name: string;
  address: string;
  rating: number;
  reviewCount: number;
  badge: string;
  verified: boolean;
  coverImage: string;
  logoImage: string;
  about: string;
  whatsapp: string;
  website: string;
  operatingHours: DaySchedule[];
  services: Service[];
  gallery: GalleryPhoto[];
  staff: StaffMember[];
  bookingPreferences: BookingPreferences;
  isPaused: boolean;
}

export interface Booking {
  id: string;
  clientName: string;
  clientPhone: string;
  service: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  amount: number;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalVisits: number;
  lastVisit: string;
  totalSpent: number;
  avatar: string;
}

export interface Message {
  id: string;
  clientName: string;
  clientAvatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}
