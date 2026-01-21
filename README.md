# **ARTORA**

**Artora** is a **full-stack MERN** application built as a personal portfolio project to demonstrate real-world application architecture, **secure** authentication, and **role-based** access control.

The platform allows _artists_ to **list artworks**, _collectors_ to **buy or bid**, and _admins_ to **curate and manage auctions**, closely mirroring how modern art marketplaces operate.

<hr />

## 🚀 **Live Deployment**

- **Frontend:** [app.artora.qzz.io](https://app.artora.qzz.io) (Vercel)
- **Backend API:** [api.artora.qzz.io](https://api.artora.qzz.io) (Render)

## ✨ **Key Features**

- 🔐 Secure Authentication using **JWT**
- 📧 **OTP-based** Email Verification (Brevo)
- 👥 **Role-Based Access Control** (Admin, Artist, Collector)
- 🎨 Artwork Listings (Direct Sell & Auction)
- 🔎 _Filtering_, _Search_ with **debouncing** & **Pagination**
- 🕒 Automated Auction Lifecycle (**Cron**-based start, end & winner selection)
- 🛒 Order & Checkout Flow (COD implemented)
- 🧾 Admin Dashboard for curation & auction management
- 📦 **Image Optimization** & Uploads (Cloudinary + Sharp)
- ⚙️ Clean API Architecture with Express & MongoDB

## 🧑‍💼 **Roles & Permissions**

### 👑 Admin

- Verify and reject artworks
- Create and manage auctions
- Control artwork visibility

### 🎨 Artist

- Upload artworks
- View listed artworks
- Track sales
- Update profile

### 🛍 Collector

- Browse artworks without login
- Buy direct-sale artworks
- Place bids in auctions
- Checkout with shipping address (COD)
- Track purchase history

## 🎨 **Artworks**

- Supports Direct Sell and Auction artworks
- Each artwork includes one optimized image
- Visibility workflow:

> Uploaded → Admin Verified → Publicly Visible

## ⏱ **Auctions**

- Created by Admin only
- Auction lifecycle handled using Cron jobs:
  - Automatically marked Live at start time
  - Automatically Ended at end time
  - Highest bidder selected automatically after auction ends
- Winner is determined based on the highest bid

## 🧾 **Orders & Payments**

- Checkout available for direct-sale artworks
- Cash on Delivery (COD) implemented
- Order tracking available for:
  - Buyers
  - Artists

## 🛠 **Tech Stack**

### Frontend

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Redux Toolkit (RTK)
- Socket.IO Client

### Backend

- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (image storage)
- Sharp (image optimization)
- Brevo (email & OTP)
- Node-Cron (auction automation)
- Socket.IO

## 🧠 **Role-Based Access Control**

Role-based access is enforced at both frontend and backend levels.

### Frontend (Next.js Middleware)

- Public access to artwork browsing
- Authentication required for protected routes
- Role isolation (Admin / Artist / Collector)
- Unauthorized access returns a 404 illusion instead of redirects

### Backend (Express Middleware)

- Protected APIs require authentication
- Middleware checks if user is logged in
- Authentication validation prevents unauthorized access

## ⚙️ **Environment Variables**

### Backend

```env
MONGO_URL=your_mongodb_url
PORT=4500
JWT_SECRET=your_jwt_secret
NODE_ENV=production
BREVO_API_KEY=your_brevo_api_key
SENDER_EMAIL=your_sender_email
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLIENT_URL=https://app.artora.qzz.io
```

### Frontend

```env
NEXT_PUBLIC_API_URL=https://api.artora.qzz.io
```

## 🧪 **Local Development**

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## 📌 **Project Purpose**

Artora was built to demonstrate:

- Production-grade authentication patterns
- Role-based access control (frontend + backend)
- Clean separation of frontend & backend
- Auction and order management logic
