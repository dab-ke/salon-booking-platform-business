import { useState } from "react";
import type { BusinessProfile, Service } from "../types";

interface Props {
  profile: BusinessProfile;
  onUpdate: (profile: BusinessProfile) => void;
}

export default function BusinessProfilePage({ profile, onUpdate }: Props) {
  const [editingAbout, setEditingAbout] = useState(profile.about);
  const [editingWhatsapp, setEditingWhatsapp] = useState(profile.whatsapp);
  const [editingWebsite, setEditingWebsite] = useState(profile.website);
  const [showAddService, setShowAddService] = useState(false);
  const [newService, setNewService] = useState<Partial<Service>>({
    name: "", duration: "", description: "", price: 0,
  });
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [newStaffName, setNewStaffName] = useState("");
  const [newStaffRole, setNewStaffRole] = useState("");

  const handleSaveInfo = () => {
    onUpdate({
      ...profile,
      about: editingAbout,
      whatsapp: editingWhatsapp,
      website: editingWebsite,
    });
  };

  const toggleDay = (dayIndex: number) => {
    const updated = [...profile.operatingHours];
    updated[dayIndex] = { ...updated[dayIndex], enabled: !updated[dayIndex].enabled };
    if (!updated[dayIndex].enabled) {
      updated[dayIndex].open = "Closed";
      updated[dayIndex].close = "Closed";
    } else {
      updated[dayIndex].open = "09:00 AM";
      updated[dayIndex].close = "07:00 PM";
    }
    onUpdate({ ...profile, operatingHours: updated });
  };

  const togglePreference = (key: keyof typeof profile.bookingPreferences) => {
    onUpdate({
      ...profile,
      bookingPreferences: {
        ...profile.bookingPreferences,
        [key]: !profile.bookingPreferences[key],
      },
    });
  };

  const addService = () => {
    if (!newService.name || !newService.price) return;
    const svc: Service = {
      id: `s${Date.now()}`,
      name: newService.name || "",
      duration: newService.duration || "30 mins",
      description: newService.description || "",
      price: newService.price || 0,
    };
    onUpdate({ ...profile, services: [...profile.services, svc] });
    setNewService({ name: "", duration: "", description: "", price: 0 });
    setShowAddService(false);
  };

  const removeService = (id: string) => {
    onUpdate({ ...profile, services: profile.services.filter((s) => s.id !== id) });
  };

  const addStaff = () => {
    if (!newStaffName) return;
    onUpdate({
      ...profile,
      staff: [
        ...profile.staff,
        { id: `st${Date.now()}`, name: newStaffName, role: newStaffRole || "Barber", avatar: "" },
      ],
    });
    setNewStaffName("");
    setNewStaffRole("");
    setShowAddStaff(false);
  };

  const removeStaff = (id: string) => {
    onUpdate({ ...profile, staff: profile.staff.filter((s) => s.id !== id) });
  };

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Business Profile</h1>
          <p className="text-sm text-gray-500">Manage your salon's public presence and operations</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15,3 21,3 21,9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          View Public Listing
        </button>
      </div>

      {/* Business Header Card */}
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-xl bg-gray-100">
              <img src={profile.coverImage} alt={profile.name} className="h-full w-full object-cover" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
                {profile.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Verified
                  </span>
                )}
              </div>
              <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="10" r="3" />
                  <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                </svg>
                {profile.address}
              </div>
              <div className="mt-1 flex items-center gap-3">
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  <svg className="h-4 w-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {profile.rating} ({profile.reviewCount} Reviews)
                </span>
                <span className="flex items-center gap-1 text-sm font-medium text-emerald-600">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
                    <polyline points="17,6 23,6 23,12" />
                  </svg>
                  {profile.badge}
                </span>
              </div>
            </div>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit Cover & Logo
          </button>
        </div>
      </div>

      {/* Business Information + Operating Hours (side by side) */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        {/* Business Information */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-4 flex items-center gap-2">
            <svg className="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <h3 className="text-lg font-bold text-gray-900">Business Information</h3>
          </div>

          <label className="mb-1 block text-sm font-medium text-gray-700">About Us</label>
          <textarea
            value={editingAbout}
            onChange={(e) => setEditingAbout(e.target.value)}
            rows={4}
            className="mb-4 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-700 transition focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
          />

          <label className="mb-1 block text-sm font-medium text-gray-700">WhatsApp Business Number</label>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                </svg>
              </span>
              <input
                type="text"
                value={editingWhatsapp}
                onChange={(e) => setEditingWhatsapp(e.target.value)}
                className="w-full rounded-lg border border-gray-200 py-2.5 pl-9 pr-3 text-sm text-gray-700 transition focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
            </div>
            <button className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50">
              Verify
            </button>
          </div>

          <label className="mb-1 block text-sm font-medium text-gray-700">Website (Optional)</label>
          <input
            type="text"
            value={editingWebsite}
            onChange={(e) => setEditingWebsite(e.target.value)}
            className="mb-4 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-700 transition focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
          />

          <button
            onClick={handleSaveInfo}
            className="rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 active:scale-[0.98]"
          >
            Save Information
          </button>
        </div>

        {/* Operating Hours */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-4 flex items-center gap-2">
            <svg className="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12,6 12,12 16,14" />
            </svg>
            <h3 className="text-lg font-bold text-gray-900">Operating Hours</h3>
          </div>

          <div className="space-y-3">
            {profile.operatingHours.map((schedule, idx) => (
              <div key={schedule.day} className="flex items-center gap-3">
                <button
                  onClick={() => toggleDay(idx)}
                  className={`toggle-switch shrink-0 ${schedule.enabled ? "active" : ""}`}
                />
                <span className={`w-10 text-sm font-semibold ${schedule.enabled ? "text-gray-800" : "text-gray-400"}`}>
                  {schedule.day}
                </span>
                <div className="flex flex-1 items-center justify-end gap-2 text-sm">
                  <span className={schedule.enabled ? "text-gray-600" : "text-gray-300"}>
                    {schedule.open}
                  </span>
                  <span className="text-gray-300">-</span>
                  <span className={schedule.enabled ? "text-gray-600" : "text-gray-300"}>
                    {schedule.close}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services & Pricing */}
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="6" cy="6" r="3" />
              <circle cx="6" cy="18" r="3" />
              <line x1="20" y1="4" x2="8.12" y2="15.88" />
              <line x1="14.47" y1="14.48" x2="20" y2="20" />
              <line x1="8.12" y1="8.12" x2="12" y2="12" />
            </svg>
            <h3 className="text-lg font-bold text-gray-900">Services & Pricing</h3>
          </div>
          <button
            onClick={() => setShowAddService(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Service
          </button>
        </div>

        {/* Add Service Form */}
        {showAddService && (
          <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Service name"
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Duration (e.g., 30 mins)"
                value={newService.duration}
                onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Description"
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
              />
              <input
                type="number"
                placeholder="Price ($)"
                value={newService.price || ""}
                onChange={(e) => setNewService({ ...newService, price: Number(e.target.value) })}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
              />
            </div>
            <div className="mt-3 flex gap-2">
              <button onClick={addService} className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600">
                Add
              </button>
              <button onClick={() => setShowAddService(false)} className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {profile.services.map((svc) => (
            <div key={svc.id} className="flex items-center justify-between rounded-xl border border-gray-200 p-4 transition hover:border-gray-300">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-800">{svc.name}</p>
                <p className="text-xs text-gray-400">{svc.duration} • {svc.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-800">${svc.price}</span>
                <button
                  onClick={() => removeService(svc.id)}
                  className="rounded p-1 text-gray-300 transition hover:bg-red-50 hover:text-red-500"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio & Gallery */}
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21,15 16,10 5,21" />
            </svg>
            <h3 className="text-lg font-bold text-gray-900">Portfolio & Gallery</h3>
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17,8 12,3 7,8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Upload Photos
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {profile.gallery.map((photo) => (
            <div key={photo.id} className="group relative h-28 w-28 overflow-hidden rounded-xl bg-gray-100 sm:h-32 sm:w-32">
              <img src={photo.url} alt={photo.alt} className="h-full w-full object-cover transition group-hover:scale-105" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30">
                <svg className="h-5 w-5 text-white opacity-0 transition group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <polyline points="3,17 9,11 13,15 18,10 21,13" />
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                </svg>
              </div>
            </div>
          ))}
          <button className="flex h-28 w-28 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 transition hover:border-emerald-300 hover:text-emerald-500 sm:h-32 sm:w-32">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span className="text-xs font-medium">Add More</span>
          </button>
        </div>
      </div>

      {/* Staff Members + Booking Preferences (side by side) */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        {/* Staff Members */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <h3 className="text-lg font-bold text-gray-900">Staff Members</h3>
            </div>
            <button
              onClick={() => setShowAddStaff(true)}
              className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 transition hover:text-emerald-600"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add
            </button>
          </div>

          {showAddStaff && (
            <div className="mb-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
              <input
                type="text"
                placeholder="Name"
                value={newStaffName}
                onChange={(e) => setNewStaffName(e.target.value)}
                className="mb-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Role (e.g., Senior Stylist)"
                value={newStaffRole}
                onChange={(e) => setNewStaffRole(e.target.value)}
                className="mb-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
              />
              <div className="flex gap-2">
                <button onClick={addStaff} className="rounded-lg bg-emerald-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-600">Add</button>
                <button onClick={() => setShowAddStaff(false)} className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {profile.staff.map((member) => (
              <div key={member.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gray-200 to-gray-300 text-sm font-bold text-gray-500">
                    {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{member.name}</p>
                    <p className="text-xs text-gray-400">{member.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeStaff(member.id)}
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 transition hover:bg-gray-100"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Preferences */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-4 flex items-center gap-2">
            <svg className="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
              <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
              <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
              <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" />
            </svg>
            <h3 className="text-lg font-bold text-gray-900">Booking Preferences</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-800">Auto-Approve Appointments</p>
                <p className="text-xs text-gray-400">Automatically accept incoming booking requests</p>
              </div>
              <button
                onClick={() => togglePreference("autoApprove")}
                className={`toggle-switch ${profile.bookingPreferences.autoApprove ? "active" : ""}`}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-800">Deposit Required</p>
                <p className="text-xs text-gray-400">Require 20% upfront payment to confirm</p>
              </div>
              <button
                onClick={() => togglePreference("depositRequired")}
                className={`toggle-switch ${profile.bookingPreferences.depositRequired ? "active" : ""}`}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-800">WhatsApp Notifications</p>
                <p className="text-xs text-gray-400">Receive instant alerts for new bookings</p>
              </div>
              <button
                onClick={() => togglePreference("whatsappNotifications")}
                className={`toggle-switch ${profile.bookingPreferences.whatsappNotifications ? "active" : ""}`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-xl border border-red-200 bg-white p-5">
        <div className="mb-4 flex items-center gap-2">
          <svg className="h-5 w-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <h3 className="text-lg font-bold text-red-600">Danger Zone</h3>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-800">Pause Listing</p>
              <p className="text-xs text-gray-400">Temporarily hide your business from the directory</p>
            </div>
            <button
              onClick={() => onUpdate({ ...profile, isPaused: !profile.isPaused })}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
            >
              {profile.isPaused ? "Unpause Listing" : "Pause Listing"}
            </button>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-red-600">Delete Business Account</p>
              <p className="text-xs text-gray-400">Permanently remove your business and all data</p>
            </div>
            <button className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
