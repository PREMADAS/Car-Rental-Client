"use client";

import { useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";

const UpdateCarPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const { user, loading: authLoading } = useContext(AuthContext);

    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            router.push(`/Login?redirect=/private/Update-car/${id}`);
            return;
        }

        setLoading(true);
        fetch(`http://localhost:5000/my-added-cars/${id}`, {
            credentials: "include",
        })
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error(`Server returned ${res.status}`);
                }
                return res.json();
            })
            .then((data) => setCar(data))
            .catch((err) => {
                console.error(err);
                setError(err.message || "Failed to load car");
            })
            .finally(() => setLoading(false));
    }, [id, user, authLoading, router]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });
        data.pricePerDay = Number(data.pricePerDay);

        setSubmitting(true);
        try {
            const res = await fetch(`http://localhost:5000/my-added-cars/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
            });

            if (res.status === 401) {
                toast.error("Please login first");
                router.push(`/Login?redirect=/private/Update-car/${id}`);
                return;
            }

            if (!res.ok) {
                throw new Error("Failed to update car");
            }

            const result = await res.json();

            if (result.modifiedCount > 0 || result.matchedCount > 0) {
                toast.success("Car updated successfully!");
                router.push("/private/My-added-car");
            } else {
                toast.error("Nothing was updated");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update car");
        } finally {
            setSubmitting(false);
        }
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-blue-500"></span>
            </div>
        );
    }

    if (error || !car) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <p className="text-red-500">{error || "Car not found"}</p>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-gradient-to-b from-sky-50 via-blue-50 to-blue-100 py-16 px-6">
            <div className="mx-auto max-w-3xl mt-13">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-extrabold text-blue-900">
                        Update Your <span className="text-orange-500">Car</span>
                    </h2>
                    <p className="mt-3 text-gray-500">{car.name}</p>
                </div>

                <form
                    onSubmit={onSubmit}
                    className="bg-white rounded-2xl shadow-lg shadow-blue-100/60 border border-blue-100 p-8 md:p-10 space-y-6"
                >
                    {/* Price & Car Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Daily Rent Price ($)
                            </label>
                            <input
                                type="number"
                                name="pricePerDay"
                                defaultValue={car.pricePerDay}
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
                                defaultValue={car.carType}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors bg-white"
                            >
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
                            defaultValue={car.image}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Pickup Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            defaultValue={car.location}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            defaultValue={car.description}
                            rows={4}
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
                                    defaultChecked={car.available === "Available"}
                                    className="accent-blue-600"
                                />
                                <span className="text-sm text-gray-700">Available</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="available"
                                    value="Unavailable"
                                    defaultChecked={car.available === "Unavailable"}
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
                        {submitting ? "Updating..." : "Update Car"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default UpdateCarPage;