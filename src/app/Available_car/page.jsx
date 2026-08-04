"use client";
import { useEffect, useState } from "react";

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
        return <div className="py-20 text-center font-bold">Loading cars...</div>;
    }

    return (
        <section className="mx-auto max-w-7xl px-6 py-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Available Cars</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cars.map(car => (
                    <div key={car._id} className="rounded-2xl border border-gray-200 p-4 shadow-sm">
                        <img src={car.image} alt={car.name} className="w-full h-40 object-cover rounded-xl" />
                        <h3 className="mt-3 font-bold text-lg">{car.name}</h3>
                        <p className="text-black font-semibold">${car.pricePerDay}/day</p>
                        <button className="mt-3 w-full rounded-lg bg-emerald-400 text-white py-2 font-medium hover:bg-emerald-500">
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AvailableCarPage;