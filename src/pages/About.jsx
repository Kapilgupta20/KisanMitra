import React from "react";
import FooterCmp from "../components/footercmp.jsx";
import HeaderCmp from "../components/headercmp.jsx"; // Import the HeaderCmp
import { Lightbulb, Target, BarChart } from "lucide-react";

const About = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <HeaderCmp /> {/* Add the HeaderCmp here */}

             {/* Main Content */}
            <main className="flex-grow bg-white text-[#2A2A2A] px-4 py-10">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold mb-6 text-center">About KisanMitra</h1>
                    <p className="text-lg text-center text-[#555] mb-10">
                        <strong>KisanMitra</strong> is a platform designed to connect farmers directly with buyers, aiming to create a fair and efficient agricultural marketplace.
                    </p>
                    
                    <p className="text-lg text-center text-[#555] mb-10">
                        <strong>Our Mission</strong> is to improve the agricultural supply chain using technology, ensuring fair prices for farmers and fresh produce for consumers.
                    </p>

                    <p className="text-lg text-center text-[#555] mb-10">
                        We developed <strong>KisanMitra</strong> for <strong>Smart India Hackathon 2024</strong> under <strong>Problem Statement 1640</strong>. Our solution earned us a spot as <strong>Grand Finalists</strong> among over 500 teams across India.
                    </p>

                    {/* Vision, Mission, and Impact Sections */}
<section className="mb-10">
    <div className="flex justify-between gap-10 flex-wrap">
        {/* Vision Section */}
        <div className="flex-1 p-6 bg-[#F0F9F1] rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Lightbulb className="mr-3 text-[#2A2A2A]" size={24} /> {/* Vision Icon */}
                Our Vision
            </h2>
            <p className="text-lg text-[#555]">
                To ensure fair compensation for farmers and access to high-quality agricultural products for consumers.
            </p>
        </div>

        {/* Mission Section */}
        <div className="flex-1 p-6 bg-[#F0F9F1] rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Target className="mr-3 text-[#2A2A2A]" size={24} /> {/* Mission Icon */}
                Our Mission
            </h2>
            <p className="text-lg text-[#555]">
                To eliminate inefficiencies in the agricultural supply chain using technology.
            </p>
        </div>

        {/* Impact Section */}
        <div className="flex-1 p-6 bg-[#F0F9F1] rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <BarChart className="mr-3 text-[#2A2A2A]" size={24} /> {/* Impact Icon */}
                Our Impact
            </h2>
            <p className="text-lg text-[#555]">
                We've connected over <strong>10,000 farmers</strong> with <strong>1,000+ buyers</strong> and facilitated transactions worth <strong>₹100 crores</strong>.
            </p>
        </div>
    </div>
</section>

{/* Team Section */}
{/* <section className="mb-10 text-center">
                        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
                        <p className="text-lg text-[#555]">
                            Our team is a blend of agricultural experts, technologists, and business professionals working to transform the sector.
                        </p>
                    </section> */}

                    {/* Join Our Team Button */}
                    {/* <div className="text-center mt-8">
                        <button
                            className="bg-[#2A2A2A] text-white px-6 py-3 rounded-md hover:bg-[#A8CBB5] transition-colors"
                            onClick={() => window.location.href = "/careers"} // Update the link as per your routing setup
                        >
                            Join Our Team
                        </button>
                    </div> */}
                </div>
            </main>

            {/* Footer */}
            <FooterCmp />
        </div>
    );
};

export default About;
