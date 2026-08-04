import React from 'react'

const Static2Page = () => {
    return (

        <section className="bg-gradient-to-b from-sky-50 via-blue-50 to-blue-100 py-16">
            <div className="mx-auto max-w-6xl px-6 space-y-8">

                {/* Gift Card Promo */}
                <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl overflow-hidden shadow-sm">
                    <div className="w-full md:w-1/2 p-10">
                        <span className="text-sm font-semibold text-gray-500">Gift Card</span>
                        <h3 className="mt-2 text-3xl font-extrabold text-gray-900 leading-snug">
                            Shop with Our gift cards
                        </h3>
                        <p className="mt-4 text-gray-500">
                            Introducing our gift cards! Give the gift of exploration or help make any
                            special occasion extra-memorable.
                        </p>
                        <button className="mt-6 rounded-lg bg-blue-600 text-white px-6 py-2.5 font-semibold hover:bg-blue-700 transition-colors">
                            Shop Gift Cards
                        </button>
                    </div>
                    <div className="w-full md:w-1/2 h-64 md:h-80">
                        <img
                            src="/images/buy.webp"
                            alt="Gift Card"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Book a Car / Become a Host */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Book a Car */}
                    <div className="relative rounded-2xl overflow-hidden shadow-sm h-80">
                        <img
                            src="/images/book.jpg"
                            alt="Book a Car"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10" />
                        <div className="absolute bottom-0 left-0 p-8 text-white">
                            <h3 className="text-2xl font-extrabold">Book a Car</h3>
                            <p className="mt-2 max-w-xs text-sm text-white/90">
                                Down the street or across the country, find the perfect vehicle for
                                your next adventure.
                            </p>
                        </div>
                    </div>

                    {/* Become a Host */}
                    <div className="relative rounded-2xl overflow-hidden shadow-sm h-80">
                        <img
                            src="/images/host.webp"
                            alt="Become a Host"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10" />
                        <div className="absolute bottom-0 left-0 p-8 text-white">
                            <h3 className="text-2xl font-extrabold">Become a host</h3>
                            <p className="mt-2 max-w-xs text-sm text-white/90">
                                Accelerate your entrepreneurship and start building a small car
                                sharing business.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};


export default Static2Page