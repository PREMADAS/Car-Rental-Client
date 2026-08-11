"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AddCarPage = () => {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });
        data.pricePerDay = Number(data.pricePerDay);
        data.seatCapacity = Number(data.seatCapacity);

        setSubmitting(true);
        try {
            const res = await fetch(`/api/new`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
            });

            if (res.status === 401) {
                toast.error("Please login first");
                router.push("/Login?redirect=/private/Add-car");
                return;
            }

            if (!res.ok) {
                throw new Error("Failed to add car");
            }

            const result = await res.json();

            if (result.insertedId) {
                toast.success("Car added successfully!");
                form.reset();
                router.push("/my-added-cars");
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to add car");
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <section className="min-h-screen bg-gradient-to-b from-sky-50 via-blue-50 to-blue-100 py-16 px-6">
            <div className="mx-auto max-w-3xl mt-13">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-extrabold text-blue-900">
                        Add Your <span className="text-orange-500">Car</span>
                    </h2>
                    <p className="mt-3 text-gray-500">
                        List your car for rent and start earning today.
                    </p>
                </div>

                <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow-lg shadow-blue-100/60 border border-blue-100 p-8 md:p-10 space-y-6">
                    {/* Car Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Car Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="e.g. Toyota Corolla 2023"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors"
                        />
                    </div>

                    {/* Price & Car Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Daily Rent Price ($)
                            </label>
                            <input
                                type="number"
                                name="pricePerDay"
                                placeholder="e.g. 45"
                                required
                                min="0"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Car Type
                            </label>
                            <select
                                name="carType"
                                required
                                defaultValue=""
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors bg-white"
                            >
                                <option value="" disabled>Select car type</option>
                                <option value="SUV">SUV</option>
                                <option value="Sedan">Sedan</option>
                                <option value="Hatchback">Hatchback</option>
                                <option value="Luxury">Luxury</option>
                                <option value="Coupe">Coupe</option>
                                <option value="Convertible">Convertible</option>
                                <option value="Van">Van</option>
                            </select>
                        </div>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Image URL
                        </label>
                        <input
                            type="url"
                            name="image"
                            placeholder="https://i.ibb.co/your-image.jpg"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors"
                        />
                        <p className="mt-1.5 text-xs text-gray-400">
                            Upload the image to imgbb.com or postimages.org and insert the link.
                        </p>
                    </div>

                    {/* Seat Capacity & Pickup Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Seat Capacity
                            </label>
                            <input
                                type="number"
                                name="seatCapacity"
                                placeholder="e.g. 5"
                                required
                                min="1"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Pickup Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                placeholder="e.g. Chattogram, Bangladesh"
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            rows={4}
                            placeholder="Write details about your car (features, condition, etc.)"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors resize-none"
                        />
                    </div>

                    {/* Availability Status */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Availability Status
                        </label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="available"
                                    value="Available"
                                    defaultChecked
                                    className="accent-blue-600"
                                />
                                <span className="text-sm text-gray-700">Available</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="available"
                                    value="Unavailable"
                                    className="accent-blue-600"
                                />
                                <span className="text-sm text-gray-700">Unavailable</span>
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full rounded-lg bg-blue-600 text-white py-3 font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60"
                    >
                        {submitting ? "Adding..." : "Add Car"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default AddCarPage;