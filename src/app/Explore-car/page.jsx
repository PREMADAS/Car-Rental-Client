"use client";
import React from "react";
import { useEffect, useState } from "react";
import { Fuel, Users, Gauge, MapPin, Star, Search, SlidersHorizontal } from "lucide-react";



const COLORS = {
    bg: "#f0f9ff",
    surface: "#1B1F26",
    border: "#2C323D",
    text: "#F4F2EC",
    textMuted: "#8B92A0",
    accent: "#FF5A36",
    available: "#35D07F",
    unavailable: "#E5484D",
};

const FONTS_IMPORT =
    "@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');";

export default function ExploreCarPage() {


    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [availabilityFilter, setAvailabilityFilter] = useState("all");
    useEffect(() => {
        const typeParam = selectedTypes.length > 0 ? selectedTypes.join(",") : "";

        const params = new URLSearchParams();
        if (searchText) params.append("search", searchText);
        if (typeParam) params.append("type", typeParam);
        if (availabilityFilter !== "all") params.append("available", availabilityFilter === "available");
        setLoading(true);


        fetch(`http://localhost:5000/explore?${params.toString()}`)
            .then(res => res.json())
            .then(data => {
                setCars(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching cars:", error);
                setLoading(false);
            });
    }, [searchText, selectedTypes, availabilityFilter]);
    return (
        <div style={{ background: COLORS.bg, minHeight: "100vh", fontFamily: "'Inter', sans-serif", paddingTop: 80 }}>
            <style>{FONTS_IMPORT}</style>




            <div style={{ maxWidth: 1240, margin: "0 auto", padding: "40px 24px 80px" }}>
                <h1
                    style={{
                        margin: "0 0 28px",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 700,
                        fontSize: "clamp(28px, 4vw, 40px)",
                        color: "#12151A",
                    }}
                >
                    Explore the Cars
                </h1>

                <div className="flex gap-3 mb-7 flex-wrap">
                    {/* Search input */}
                    <div className="flex-1 min-w-[260px] flex items-center gap-2 bg-[#1B1F26] border border-[#2C323D] rounded-lg px-3.5 py-2.5">
                        <Search size={16} className="text-[#8B92A0]" />
                        <input
                            placeholder="Search by brand or model..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="bg-transparent border-none outline-none text-[#F4F2EC] text-sm w-full placeholder:text-[#8B92A0]"
                        />
                    </div>

                    {/* Filter icon + All / Available / Unavailable buttons */}
                    <div className="flex gap-1.5 items-center">
                        <SlidersHorizontal size={15} className="text-[#8B92A0]" />

                        <button
                            onClick={() => setAvailabilityFilter("all")}
                            className={`rounded-md px-3.5 py-2.5 text-xs font-semibold cursor-pointer border transition-colors ${availabilityFilter === "all"
                                ? "bg-[#FF5A36] text-[#12151A] border-[#FF5A36]"
                                : "bg-[#1B1F26] text-[#8B92A0] border-[#2C323D] hover:text-[#F4F2EC]"
                                }`}
                        >
                            All
                        </button>

                        <button
                            onClick={() => setAvailabilityFilter("available")}
                            className={`rounded-md px-3.5 py-2.5 text-xs font-semibold cursor-pointer border transition-colors ${availabilityFilter === "available"
                                ? "bg-[#FF5A36] text-[#12151A] border-[#FF5A36]"
                                : "bg-[#1B1F26] text-[#8B92A0] border-[#2C323D] hover:text-[#F4F2EC]"
                                }`}
                        >
                            Available
                        </button>

                        <button
                            onClick={() => setAvailabilityFilter("unavailable")}
                            className={`rounded-md px-3.5 py-2.5 text-xs font-semibold cursor-pointer border transition-colors ${availabilityFilter === "unavailable"
                                ? "bg-[#FF5A36] text-[#12151A] border-[#FF5A36]"
                                : "bg-[#1B1F26] text-[#8B92A0] border-[#2C323D] hover:text-[#F4F2EC]"
                                }`}
                        >
                            Unavailable
                        </button>
                    </div>
                </div>

                {loading && (
                    <div className="flex flex-col justify-center items-center h-80 gap-4">
                        <span className="loading loading-spinner loading-lg text-orange-500"></span>
                        <p className="text-gray-500">Loading cars...</p>
                    </div>
                )}
                {!loading && (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                            gap: 20,
                        }}
                    >
                        {cars.map((car) => {
                            const unavailable = !car.available;
                            return (
                                <div
                                    key={car._id}
                                    style={{
                                        background: COLORS.surface,
                                        border: `1px solid ${COLORS.border}`,
                                        borderRadius: 10,
                                        overflow: "hidden",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
                                        <img
                                            src={car.imageUrl}
                                            alt={`${car.brand} ${car.model}`}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                filter: unavailable ? "grayscale(0.85) brightness(0.55)" : "none",
                                            }}
                                        />
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: 14,
                                                right: 14,
                                                border: `2px solid ${car.available ? COLORS.available : COLORS.unavailable}`,
                                                color: car.available ? COLORS.available : COLORS.unavailable,
                                                fontFamily: "'JetBrains Mono', monospace",
                                                fontSize: 11,
                                                fontWeight: 500,
                                                letterSpacing: "0.12em",
                                                padding: "4px 10px",
                                                borderRadius: 3,
                                                transform: "rotate(-6deg)",
                                                background: "rgba(18,21,26,0.75)",
                                            }}
                                        >
                                            {car.available ? "AVAILABLE" : "UNAVAILABLE"}
                                        </div>
                                        <div
                                            style={{
                                                position: "absolute",
                                                bottom: 10,
                                                left: 10,
                                                fontFamily: "'JetBrains Mono', monospace",
                                                fontSize: 11,
                                                color: COLORS.text,
                                                background: "rgba(18,21,26,0.75)",
                                                padding: "3px 8px",
                                                borderRadius: 3,
                                                letterSpacing: "0.08em",
                                            }}
                                        >
                                            {car.licensePlate}
                                        </div>
                                    </div>

                                    <div style={{ padding: "16px 18px 18px", display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                                            <div>
                                                <p style={{ margin: 0, color: COLORS.textMuted, fontSize: 12 }}>
                                                    {car.brand} · {car.year}
                                                </p>
                                                <h3
                                                    style={{
                                                        margin: "2px 0 0",
                                                        fontFamily: "'Space Grotesk', sans-serif",
                                                        fontWeight: 700,
                                                        fontSize: 19,
                                                        color: COLORS.text,
                                                        lineHeight: 1.15,
                                                    }}
                                                >
                                                    {car.model}
                                                </h3>
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center", gap: 4, color: COLORS.textMuted, fontSize: 13 }}>
                                                <Star size={14} fill={COLORS.accent} color={COLORS.accent} />
                                                <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{car.rating.toFixed(1)}</span>
                                            </div>
                                        </div>

                                        <div
                                            style={{
                                                display: "grid",
                                                gridTemplateColumns: "1fr 1fr",
                                                gap: 8,
                                                fontFamily: "'JetBrains Mono', monospace",
                                                fontSize: 12,
                                                color: COLORS.textMuted,
                                            }}
                                        >
                                            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                                <Gauge size={13} /> {car.transmission}
                                            </span>
                                            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                                <Fuel size={13} /> {car.fuelType}
                                            </span>
                                            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                                <Users size={13} /> {car.seats} seats
                                            </span>
                                            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                                <MapPin size={13} /> {car.location}
                                            </span>
                                        </div>

                                        <div
                                            style={{
                                                marginTop: "auto",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                paddingTop: 6,
                                                borderTop: `1px solid ${COLORS.border}`,
                                            }}
                                        >
                                            <div>
                                                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, color: COLORS.text }}>
                                                    ${car.pricePerDay}
                                                </span>
                                                <span style={{ fontSize: 12, color: COLORS.textMuted }}> /day</span>
                                            </div>
                                            <button
                                                onClick={() => console.log("Selected car:", car)}
                                                style={{
                                                    background: unavailable ? "transparent" : COLORS.accent,
                                                    color: unavailable ? COLORS.text : "#12151A",
                                                    border: unavailable ? `1px solid ${COLORS.border}` : "none",
                                                    borderRadius: 6,
                                                    padding: "9px 16px",
                                                    fontWeight: 600,
                                                    fontSize: 13,
                                                    cursor: "pointer",
                                                }}
                                            >
                                                Details
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                )}
            </div>
        </div >
    );
}