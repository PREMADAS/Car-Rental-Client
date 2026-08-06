"use client";
import { useEffect, useState } from "react";
import { Star, Gauge } from "lucide-react";
import Link from "next/link";

const AvailableCarPage = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/cars')
            .then(res => res.json())
            .then(data => {
                setCars(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching cars:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-sky-50 to-blue-100">
                <span className="loading loading-spinner loading-lg text-orange-500"></span>
                <p className="text-gray-500">Loading cars...</p>
            </div>
        );
    }

    return (
        <section className="bg-gradient-to-b from-sky-50 via-blue-50 to-blue-100 py-16 ">
            <div className="mx-auto max-w-7xl px-6">
                <h2 className="text-3xl font-bold text-blue-900 mb-8">Available Cars</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cars.map(car => (
                        <div
                            key={car._id}
                            className="rounded-2xl border border-blue-100 bg-white p-4 shadow-md shadow-blue-100/50 
    hover:shadow-lg hover:shadow-blue-200/60 hover:-translate-y-1 
    transition-all duration-300"
                        >
                            <img src={car.image} alt={car.name} className="w-full h-40 object-cover rounded-xl" />
                            <h3 className="mt-3 font-bold text-lg text-gray-900">{car.name}</h3>
                            <p className="text-blue-600 font-semibold">${car.pricePerDay}/day</p>
                            <div className="flex items-center gap-1 mt-1">
                                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                                <span className="text-sm text-gray-700 font-medium">
                                    {car.rating ?? "4.5"}
                                </span>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                                <Gauge size={16} className="text-blue-500" />
                                <span className="text-sm text-gray-700 font-medium">
                                    {car.mileage ?? "N/A"}
                                </span>
                            </div>
                            <Link href={`/Available_car/Details/${car._id}`}> <button className="btn mt-3 w-full rounded-lg bg-emerald-400 text-white py-2 font-medium hover:bg-emerald-500 transition-colors">
                                View Details
                            </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AvailableCarPage;