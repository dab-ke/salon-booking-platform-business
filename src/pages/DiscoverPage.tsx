import { useState } from "react";
import { businessListings } from "../data/clientData";

export default function DiscoverPage() {
  const [selectedId, setSelectedId] = useState<string>(businessListings[0].id);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const selectedListing = businessListings.find(b => b.id === selectedId) || businessListings[0];

  const filteredListings = businessListings.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "All" || b.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Sidebar - Discover List */}
      <div className="flex w-[400px] flex-col border-r border-gray-100">
        <div className="p-5">
          {/* Search Input */}
          <div className="relative mb-4">
            <svg className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search salons, barbers, services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl bg-gray-50 py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500/20"
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {["All", "Barbershop", "Hair Salon", "Nail Art"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition ${
                  activeFilter === filter
                    ? "bg-slate-900 text-white"
                    : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Listings List */}
        <div className="flex-1 overflow-y-auto px-4 pb-20">
          <div className="space-y-4">
            {filteredListings.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`flex w-full gap-4 rounded-2xl p-3 text-left transition ${
                  selectedId === item.id ? "bg-gray-50 ring-1 ring-gray-100" : "hover:bg-gray-50"
                }`}
              >
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-200">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-bold text-gray-900">{item.name}</h3>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                    <span>{item.type}</span>
                    <span className="h-1 w-1 rounded-full bg-gray-300" />
                    <span>{item.distance}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <circle cx="12" cy="10" r="3" />
                      <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                    </svg>
                    <span className="truncate">{item.location}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    <svg className="h-3.5 w-3.5 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="text-xs font-bold text-gray-900">{item.rating.toFixed(1)}</span>
                    <span className="text-[10px] text-gray-400">({item.reviews})</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - Salon Detail View */}
      <div className="flex-1 overflow-y-auto">
        {/* Cover Image */}
        <div className="relative h-80 w-full bg-gray-200">
          <img src={selectedListing.image} alt={selectedListing.name} className="h-full w-full object-cover" />
          
          {/* Logo Badge */}
          <div className="absolute -bottom-10 left-10 h-24 w-24 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-sm">
            {selectedListing.logo ? (
              <img src={selectedListing.logo} alt="logo" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-100 text-2xl font-bold text-gray-400">
                {selectedListing.name[0]}
              </div>
            )}
          </div>
        </div>

        <div className="px-10 pb-20 pt-14">
          {/* Header Actions */}
          <div className="mb-6 flex items-center justify-end gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-600">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
              </svg>
              WhatsApp
            </button>
            <button className="rounded-xl bg-emerald-500 px-8 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-600">
              Book Now
            </button>
            <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-100 bg-white text-gray-500 transition hover:bg-gray-50">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            </button>
          </div>

          {/* Title and Info */}
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">{selectedListing.name}</h1>
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-500 font-medium">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="10" r="3" />
                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
              </svg>
              {selectedListing.location}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm font-medium">
              <div className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="text-gray-900">{selectedListing.rating.toFixed(1)}</span>
                <span className="text-gray-400">({selectedListing.reviews} Reviews)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-gray-900">Open</span>
                <span className="h-1 w-1 rounded-full bg-gray-300" />
                <span className="text-gray-400">Closes {selectedListing.openUntil}</span>
              </div>
              {selectedListing.isTopRated && (
                <span className="rounded bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-600">
                  Top Rated
                </span>
              )}
            </div>

            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-gray-500 font-medium">
              {selectedListing.description}
            </p>
          </div>

          {/* Services Section */}
          <div className="mt-12">
            <h2 className="text-xl font-extrabold text-gray-900">Services</h2>
            <div className="mt-6 space-y-4">
              {selectedListing.services.map((svc) => (
                <div key={svc.id} className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 transition hover:border-gray-200">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{svc.name}</h3>
                    <p className="mt-1 text-sm text-gray-400 font-medium">{svc.duration}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-lg font-extrabold text-gray-900">
                      {svc.currency} {svc.price}
                    </span>
                    <button className="rounded-lg bg-emerald-50 px-6 py-2 text-sm font-bold text-emerald-600 transition hover:bg-emerald-100">
                      Select
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
