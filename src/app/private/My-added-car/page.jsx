"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { toast } from "react-toastify";

export default function MyAddedCarsPage() {
    const { user, loading: authLoading } = useContext(AuthContext);
    const router = useRouter();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);

    const handleUpdate = (car) => {
        router.push(`/private/Update/${car._id}`);
    };

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            router.push("/Login?redirect=/my-added-cars");
            return;
        }

        setLoading(true);
        fetch(`/api/my-added-cars?email=${user.email}`, {
            credentials: "include",
        })
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error(`Server returned ${res.status}`);
                }
                return res.json();
            })
            .then((data) => setCars(Array.isArray(data) ? data : []))
            .catch((err) => {
                console.error(err);
                setError(err.message || "Failed to load your cars");
            })
            .finally(() => setLoading(false));
    }, [user, authLoading, router]);

    const openDeleteModal = (car) => {
        setSelectedCar(car);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setSelectedCar(null);
        setDeleteModalOpen(false);
    };

    const handleConfirmDelete = async () => {
        try {
            const res = await fetch(`/api/my-added-cars/${selectedCar._id}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!res.ok) {
                throw new Error("Failed to delete car");
            }

            const result = await res.json();

            if (result.deletedCount > 0) {
                toast.success("Car deleted successfully!");
                setCars((prev) => prev.filter((c) => c._id !== selectedCar._id));
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete car");
        } finally {
            closeDeleteModal();
        }
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-[#2F6FED]"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <section className="min-h-screen pt-28 pb-16 px-4">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-[#0F2A43] mb-8">My Added Cars</h1>

                {cars.length === 0 ? (
                    <p className="text-[#5B7290]">You haven&apos;t added any cars yet.</p>
                ) : (
                    <div className="flex flex-col gap-4">
                        {cars.map((car) => (
                            <div
                                key={car._id}
                                className="rounded-2xl border border-[#D9E4F5] bg-white p-3 shadow-md flex flex-col sm:flex-row gap-4"
                            >
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full sm:w-[180px] h-[120px] object-cover rounded-xl flex-shrink-0"
                                />

                                <div className="flex-1 flex flex-col justify-center gap-1">
                                    <h3 className="font-bold text-lg text-[#0F2A43]">
                                        {car.name}
                                    </h3>
                                    <p className="text-sm text-[#5B7290]">
                                        {car.carType} · {car.location} · {car.seatCapacity} seats
                                    </p>
                                    <p className="text-[#2F6FED] font-semibold">
                                        ${car.pricePerDay}/Km
                                    </p>
                                </div>

                                <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-center gap-3 sm:w-[140px] flex-shrink-0">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold text-center ${car.available === "Available"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {car.available}
                                    </span>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleUpdate(car)}
                                            className="btn rounded-lg bg-sky-400 text-white px-4 py-1.5 text-sm font-semibold hover:bg-blue-700 transition-colors"
                                        >
                                            Update
                                        </button>

                                        <button
                                            onClick={() => openDeleteModal(car)}
                                            className="btn rounded-lg bg-red-500 text-white px-4 py-1.5 text-sm font-semibold hover:bg-red-600 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {deleteModalOpen && selectedCar && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
                    <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <button
                            onClick={closeDeleteModal}
                            className="absolute right-4 top-4 text-[#5B7290] hover:text-[#0F2A43]"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-xl font-bold text-[#0F2A43] mb-2">
                            Delete this car?
                        </h2>
                        <p className="text-sm text-[#5B7290] mb-6">
                            Are you sure you want to delete{" "}
                            <span className="font-semibold">{selectedCar.name}</span>? This
                            action cannot be undone.
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={closeDeleteModal}
                                className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="flex-1 rounded-lg bg-red-500 text-white py-2 text-sm font-semibold hover:bg-red-600"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}