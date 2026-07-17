import { useState, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import MobileNav from "./components/MobileNav";
import Toast from "./components/Toast";
import DashboardPage from "./pages/DashboardPage";
import BookingsPage from "./pages/BookingsPage";
import ClientsPage from "./pages/ClientsPage";
// import MessagesPage from "./pages/MessagesPage";
import BusinessProfilePage from "./pages/BusinessProfilePage";
import {
  businessProfile as initialProfile,
  bookings as initialBookings,
  clients,
  // messages,
} from "./data/mockData";
import type { BusinessProfile, Booking } from "./types";

export default function App() {
  const [activePage, setActivePage] = useState("profile");
  const [profile, setProfile] = useState<BusinessProfile>(initialProfile);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
  };

  const hideToast = useCallback(() => setToastVisible(false), []);

  const handleUpdateProfile = (updated: BusinessProfile) => {
    setProfile(updated);
    showToast("Profile updated successfully!");
  };

  const handleUpdateBooking = (id: string, status: Booking["status"]) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
    showToast(`Booking ${status}!`);
  };

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage bookings={bookings} />;
      case "bookings":
        return <BookingsPage bookings={bookings} onUpdateBooking={handleUpdateBooking} />;
      case "clients":
        return <ClientsPage clients={clients} />;
      case "messages":
        // return <MessagesPage messages={messages} />;
        return null;
      case "profile":
        return <BusinessProfilePage profile={profile} onUpdate={handleUpdateProfile} />;
      default:
        return <DashboardPage bookings={bookings} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar activePage={activePage} onNavigate={setActivePage} />
      </div>

      {/* Mobile Bottom Nav */}
      <MobileNav activePage={activePage} onNavigate={setActivePage} />

      {/* Main Content */}
      <main className="min-h-screen px-4 pt-6 pb-6 md:ml-[220px] md:px-8">
        {renderPage()}
      </main>

      {/* Toast Notification */}
      <Toast message={toastMessage} visible={toastVisible} onClose={hideToast} />
    </div>
  );
}
