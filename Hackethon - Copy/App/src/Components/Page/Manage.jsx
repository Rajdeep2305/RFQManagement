import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Navbar from "../Modules/Navbar";

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Manage = () => {
  // Sample Data for the RFQ, Vendors, and Bids
  const [rfqs, setRfqs] = useState([
    { id: 1, title: "RFQ 1", status: "Active" },
    { id: 2, title: "RFQ 2", status: "Closed" },
  ]);
  const [vendors] = useState([
    { id: 1, name: "Vendor A", location: "New York", price: 500, quality: 4 },
    { id: 2, name: "Vendor B", location: "California", price: 450, quality: 5 },
    { id: 3, name: "Vendor C", location: "Texas", price: 550, quality: 3 },
  ]);
  const [bids] = useState([
    { vendor: "Vendor A", price: 500, quality: 4 },
    { vendor: "Vendor B", price: 450, quality: 5 },
    { vendor: "Vendor C", price: 550, quality: 3 },
  ]);
  const [sortBy, setSortBy] = useState("location");

  // Sorting Vendors
  const sortedVendors = [...vendors].sort((a, b) => {
    if (sortBy === "location") return a.location.localeCompare(b.location);
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "quality") return a.quality - b.quality;
    return 0;
  });

  // Handle Creating New RFQ
  const handleCreateRFQ = () => {
    const newRFQ = { id: rfqs.length + 1, title: "New RFQ", status: "Pending" };
    setRfqs([...rfqs, newRFQ]);
  };

  // Chart Data for Reporting
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "RFQ Completion Rate",
        data: [65, 59, 80, 81, 56],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="text-center text-red-500 font-extrabold text-[25px]  ">
          ***In this page there is some logical Error
        </div>

        {/* Dashboard */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">RFQ Dashboard</h1>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg">
              <h2 className="font-semibold">Total RFQs</h2>
              <p>{rfqs.length}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <h2 className="font-semibold">Active RFQs</h2>
              <p>{rfqs.filter((rfq) => rfq.status === "Active").length}</p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg">
              <h2 className="font-semibold">Closed RFQs</h2>
              <p>{rfqs.filter((rfq) => rfq.status === "Closed").length}</p>
            </div>
          </div>
        </div>

        {/* RFQ Management */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Manage RFQs</h2>
          <button
            onClick={handleCreateRFQ}
            className="bg-blue-500 text-white p-2 rounded mb-4"
          >
            Create New RFQ
          </button>
          <div className="space-y-4">
            {rfqs.map((rfq) => (
              <div key={rfq.id} className="border p-4 rounded">
                <h3 className="font-semibold">{rfq.title}</h3>
                <p>Status: {rfq.status}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vendor Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Vendor Selection</h2>
          <div className="mb-4">
            <label htmlFor="sort" className="mr-2">
              Sort By:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="location">Location</option>
              <option value="price">Price</option>
              <option value="quality">Quality</option>
            </select>
          </div>
          <div className="space-y-4">
            {sortedVendors.map((vendor) => (
              <div key={vendor.id} className="border p-4 rounded">
                <h3 className="font-semibold">{vendor.name}</h3>
                <p>Location: {vendor.location}</p>
                <p>Price: ${vendor.price}</p>
                <p>Quality: {vendor.quality}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bid Comparison */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Bid Comparison</h2>
          <div className="grid grid-cols-3 gap-4">
            {bids.map((bid, index) => (
              <div key={index} className="border p-4 rounded">
                <h3 className="font-semibold">{bid.vendor}</h3>
                <p>Price: ${bid.price}</p>
                <p>Quality: {bid.quality}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reporting */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Reporting</h2>
          <div className="w-full max-w-4xl mx-auto">
            <Line data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Manage;
