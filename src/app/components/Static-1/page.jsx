import React from 'react'
import { HandCoins, Car, Zap } from "lucide-react";

const Static1Page = () => {


    const steps = [

        {
            icon: HandCoins,
            title: "Your pick of rides at low prices.",
            description:
                "No matter where you're going, by bus or carpool, find the perfect ride from our wide range of destinations and routes at low prices.",
        },
        {
            icon: Car,
            title: "Trust who you travel with.",
            description:
                "We take the time to get to know each of our members and bus partners. We check reviews, profiles and IDs, so you know who you're travelling with and can book.",
        },
        {
            icon: Zap,
            title: "Scroll, click, tap and go!",
            description:
                "Booking a ride has never been easier! Thanks to our simple app powered by great technology, you can book a ride close to you in just minutes.",
        },
    ];

    return (
        <section className="bg-gradient-to-b from-sky-50 via-blue-50 to-blue-100 py-20">
            <div className="mx-auto max-w-6xl px-6 text-center">
                <h2 className="text-4xl font-extrabold text-gray-900">
                    How It <span className="text-orange-500">Works</span>
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-gray-500">
                    Drivers post their trips, passengers find rides, and together they split costs.
                    Search for available journeys, connect with drivers or passengers, and hit the
                    road. It's affordable, convenient, and eco-friendly!
                </p>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div key={index} className="flex flex-col items-center">
                                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm">
                                    <Icon size={28} className="text-orange-500" />
                                </div>
                                <h3 className="mt-6 text-xl font-bold text-gray-900">
                                    {step.title}
                                </h3>
                                <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                                    {step.description}
                                </p>
                                <button className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                                    Read more
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Static1Page;