import React from "react";
import { useNavigate } from "react-router-dom";
import FooterCmp from "../components/footercmp.jsx";
import HeaderCmp from "../components/headercmp.jsx";
import {
  MessageSquare,
  Clock,
  FileText,
  Lock,
  TrendingUp,
} from "react-feather";
import { Shield, Truck, DollarSign, BarChart2 } from 'react-feather';
import { Sprout, ShoppingCart } from "lucide-react";
const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-[#D1E8D0]">
      <HeaderCmp />

      {/* Main Content */}
      <main className="flex-grow px-6 pt-10 pb-16 max-w-6xl mx-auto w-full">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center mb-16">
          <h1 className="text-4xl font-extrabold text-[#2A2A2A] mb-4">
            Welcome to KisanMitra
          </h1>
          <p className="text-lg text-[#4A4A4A] mb-6 max-w-2xl">
            Empowering Farmers & Buyers with a seamless platform to connect, trade,
            and grow together. Join us today and be a part of the future of
            agriculture!
          </p>
          <div className="flex gap-4">
            <button
              className="px-6 py-2 text-white bg-[#2A2A2A] rounded-lg hover:bg-[#A8CBB5] transition-colors"
              onClick={() => navigate("/register")}
            >
              Get Started
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white rounded-lg shadow-md p-10 mb-16">
          <h2 className="text-3xl font-bold text-[#2A2A2A] text-center mb-12">
            Features of KisanMitra
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="border border-[#A8CBB5] rounded-lg p-6 hover:shadow-lg transition-shadow bg-[#F5F9F4]">
              <div className="w-12 h-12 bg-[#D1E8D0] rounded-lg flex items-center justify-center mb-4 mx-auto">
                <MessageSquare className="h-6 w-6 text-[#4A7C59]" />
              </div>
              <h3 className="text-xl font-semibold text-[#2A2A2A] mb-2 text-center">
                Secure Messaging
              </h3>
              <p className="text-[#4A4A4A] text-center">
                Direct messaging system to communicate instantly and negotiate deals securely
              </p>
            </div>

            <div className="border border-[#A8CBB5] rounded-lg p-6 hover:shadow-lg transition-shadow bg-[#F5F9F4]">
              <div className="w-12 h-12 bg-[#D1E8D0] rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Clock className="h-6 w-6 text-[#4A7C59]" />
              </div>
              <h3 className="text-xl font-semibold text-[#2A2A2A] mb-2 text-center">
                Live Contract Status
              </h3>
              <p className="text-[#4A4A4A] text-center">
                Monitor contract progress, delivery, and payment milestones in real-time
              </p>
            </div>

            <div className="border border-[#A8CBB5] rounded-lg p-6 hover:shadow-lg transition-shadow bg-[#F5F9F4]">
              <div className="w-12 h-12 bg-[#D1E8D0] rounded-lg flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="h-6 w-6 text-[#4A7C59]" />
              </div>
              <h3 className="text-xl font-semibold text-[#2A2A2A] mb-2 text-center">
                Market Analytics
              </h3>
              <p className="text-[#4A4A4A] text-center">
                Insights and trends to help you make informed decisions and optimize your sales strategy
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
      <section id="how-it-works" className="bg-white rounded-lg shadow-md p-10 mb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2A2A2A] mb-4">How KisanMitra Works</h2>
            <p className="text-xl text-[#4A4A4A] max-w-2xl mx-auto">
              Simple steps to connect farmers with buyers and create successful agricultural partnerships
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* For Farmers */}
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#D1E8D0] rounded-full mb-4">
                  <Sprout className="h-8 w-8 text-[#4A7C59]" />
                </div>
                <h3 className="text-2xl font-bold text-[#2A2A2A]">For Farmers</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#4A7C59] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2A2A2A] mb-1">Register & Verify</h4>
                    <p className="text-[#4A4A4A]">
                      Create your farmer profile and get verified with your agricultural credentials
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#4A7C59] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2A2A2A] mb-1">List Your Crops</h4>
                    <p className="text-[#4A4A4A]">
                      Upload details of your available crops with photos, quantities, and pricing
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#4A7C59] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2A2A2A] mb-1">Connect & Negotiate</h4>
                    <p className="text-[#4A4A4A]">
                      Chat with interested buyers and negotiate the best prices for your produce
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#4A7C59] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2A2A2A] mb-1">Complete Transaction</h4>
                    <p className="text-[#4A4A4A]">
                      Finalize contracts, track delivery status, and receive secure payments
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Buyers */}
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#D1E8D0] rounded-full mb-4">
                  <ShoppingCart className="h-8 w-8 text-[#4A7C59]" />
                </div>
                <h3 className="text-2xl font-bold text-[#2A2A2A]">For Buyers</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#A8CBB5] text-[#2A2A2A] rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2A2A2A] mb-1">Create Buyer Account</h4>
                    <p className="text-[#4A4A4A]">Sign up as a verified buyer and set your procurement preferences</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#A8CBB5] text-[#2A2A2A] rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2A2A2A] mb-1">Browse Marketplace</h4>
                    <p className="text-[#4A4A4A]">
                      Explore available crops, filter by location, quality, and price ranges
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#A8CBB5] text-[#2A2A2A] rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2A2A2A] mb-1">Negotiate & Purchase</h4>
                    <p className="text-[#4A4A4A]">Contact farmers directly, negotiate terms, and place your orders</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#A8CBB5] text-[#2A2A2A] rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2A2A2A] mb-1">Track & Receive</h4>
                    <p className="text-[#4A4A4A]">Monitor delivery status and download contracts for your records</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      </main>

      <FooterCmp />
    </div>
  );
};

export default Landing;
