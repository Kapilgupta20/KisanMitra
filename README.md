# 🌾 KisanMitra: Smart Agriculture Marketplace

---

## 🚀 Project Overview
**KisanMitra** is an intelligent web-based platform built for the Smart India Hackathon 2024 (Problem Statement #1640). It connects farmers directly with buyers, streamlining agricultural commerce and enabling contract farming. Our team ranked among the top 6 out of 500+ nationwide, earning the title of Grand Finalist.

Key goals:
- Empower small & marginal farmers with transparent pricing and direct market access.
- Simplify contract creation, negotiation, and fulfillment for both parties.
- Provide real-time insights (weather, crop rates) to support decision-making.

---

## 🔥 Features

* **Farmer Dashboard**

  * View & manage listings, contracts and chat with buyers
  * Integrated weather widget (WeatherAPI)
* **Buyer Dashboard**

  * Browse, filter crop listings by location, price and crop type
  * Initiate and sign digital contracts
* **Contracts Module**

  * Create, review, and track contract status (Pending, In Progress, Completed)
* **Real-Time Chat**

  * Instant communication between farmers and buyers
* **Analytics & Notifications**

  * Email and SMS alerts for contract status, weather updates, and more

---

## 🛠 Tech Stack

| Layer          | Technology                 |
| -------------- | -------------------------- |
| Frontend       | React.js, Tailwind CSS     |
| Backend        | Node.js, Express.js        |
| Database       | MongoDB                    |
| APIs           | WeatherAPI, Twilio (SMS)   |

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Kapilgupta20/KisanMitra.git
cd KisanMitra
```

### 2. Set up environment variables

Create seperate `.env` files in both the frontend and backend folders

### 3. Backend setup

```bash
cd Backend
npm install
npm run dev     # Server runs on http://localhost:8000
```

### 4. Frontend setup

```bash
cd Frontend
npm install
npm run start   # Runs on http://localhost:5173
```
