# 🚗 DriveFleet — Car Rental Platform

DriveFleet is a full-stack car rental platform where users can explore available cars, view detailed car information, book vehicles, manage their bookings, and maintain their own listings — all through a clean, responsive, and modern interface.

**🔗 Live Site:** [https://car-rental-platform-client.vercel.app](https://car-rental-platform-client.vercel.app/)

**🔗 Server Repository:** [https://github.com/PREMADAS/car-rental-server](https://github.com/PREMADAS/car-rental-server)

---

## ✨ Features

- 🔐 **Secure Authentication** — Email/password login with hashed passwords (bcrypt) and Google Sign-In, protected with JWT stored in HTTPOnly cookies.
- 🚙 **Browse & Explore Cars** — View available cars on the homepage and explore the full car collection with search-by-name and filter-by-type functionality.
- 📅 **Booking System** — Logged-in users can book any car with driver preference and special notes, with real-time booking count tracking (`$inc`) for each vehicle.
- 🛠️ **Manage Your Own Listings** — Add, update, and delete your own car listings with full CRUD support, protected so only the owner can edit or remove their cars.
- 📊 **My Bookings Dashboard** — Track all your bookings in one place, including car details, total price, and booking date.
- 📱 **Fully Responsive Design** — Optimized layouts for mobile, tablet, and desktop devices with a clean, recruiter-friendly UI.
- ⚡ **Smooth Route Handling** — Reloading any route (public or private) works seamlessly without errors or unwanted redirects for logged-in users.

---

## 🛠️ Tech Stack

**Client:**
- Next.js (App Router)
- React
- Tailwind CSS
- Lucide React (icons)
- React Toastify (toast notifications)

**Server:**
- Node.js & Express.js
- MongoDB
- JWT (jsonwebtoken) with HTTPOnly cookies
- bcrypt (password hashing)
- Google Auth Library (Google Login)

---

## ⚙️ Getting Started (Local Setup)

1. Clone the repository:
   ```bash
   git clone https://github.com/PREMADAS/Car-Rental-Client.git
   cd Car-Rental-Client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your environment variables:
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:5000
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

> ⚠️ Make sure the [server](https://github.com/PREMADAS/car-rental-server) is running as well — the client depends on it for all data and authentication.

---

## 📌 Notes

- All sensitive credentials (MongoDB URI, JWT secret, Google Client ID/Secret) are secured using environment variables and are **not** committed to this repository.
- This project was built as part of Assignment Category CAT_05 — DriveFleet Car Rental Platform.