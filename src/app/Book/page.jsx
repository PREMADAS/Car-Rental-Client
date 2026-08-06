"use client";

import React from "react";

export default function BookCarPage() {

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {};

        // Convert FormData to plain object
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });

        console.log(data);
    };

    return (
        <div className="min-h-screen bg-[#F1F5FB] pt-28 pb-16 px-4">
            <div className="max-w-xl mx-auto">

                {/* Header */}
                <div className="mb-6 px-1">

                    <h1 className="text-4xl font-bold text-[#0F2A43]">
                        Book Car
                    </h1>

                </div>

                {/* Booking Form Panel */}
                <div className="bg-white border border-[#D9E4F5] rounded-2xl shadow-[0_8px_30px_rgba(15,42,67,0.06)] p-6">

                    <form onSubmit={onSubmit} className="space-y-6">

                        {/* Driver Needed */}
                        <div>
                            <label className="block text-sm font-semibold text-[#0F2A43] mb-3">
                                Driver Needed
                            </label>
                            <div className="flex gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="driverNeeded"
                                        value="yes"
                                        className="radio radio-sm"
                                    />
                                    <span className="text-[#3C4E64]">Yes</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="driverNeeded"
                                        value="no"
                                        className="radio radio-sm"
                                    />
                                    <span className="text-[#3C4E64]">No</span>
                                </label>
                            </div>
                        </div>

                        {/* Special Note */}
                        <div>
                            <label
                                htmlFor="specialNote"
                                className="block text-sm font-semibold text-[#0F2A43] mb-3"
                            >
                                Special Note
                            </label>
                            <textarea
                                id="specialNote"
                                name="specialNote"
                                rows={4}
                                placeholder="Write any special note for your booking..."
                                className="w-full rounded-xl border border-[#D9E4F5] bg-[#F6F9FE] px-4 py-3 text-[#0F2A43] placeholder-[#8CA0BC] focus:outline-none focus:ring-2 focus:ring-[#2F6FED]/40 resize-none"
                            />
                        </div>

                        {/* Book Now Button */}
                        <button
                            type="submit"
                            className="btn w-full py-4 rounded-xl bg-gradient-to-r from-[#2F6FED] to-[#4FD1E8] text-white text-xl font-bold border-none"
                        >
                            Book Now
                        </button>

                    </form>
                </div>

            </div>
        </div>
    );
}