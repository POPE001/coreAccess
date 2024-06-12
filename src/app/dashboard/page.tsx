import React from 'react';
// import SalesGraph from '../../components/SalesGraph'; // Adjust the path based on your file structure

const AnalyticsDashboard = () => {
    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Analytics</h1>
            
            <div className="grid grid-cols-4 gap-4 mb-4">
                {/* Summary Cards */}
                <div className="bg-white shadow rounded p-4">
                    <p className="text-gray-600">Ticket Sales</p>
                    <p className="text-xl font-semibold">40,000</p>
                </div>
                <div className="bg-white shadow rounded p-4">
                    <p className="text-gray-600">Events Organized</p>
                    <p className="text-xl font-semibold">30</p>
                </div>
                <div className="bg-white shadow rounded p-4">
                    <p className="text-gray-600">Current Earning</p>
                    <p className="text-xl font-semibold">100 NEAR</p>
                </div>
                <div className="bg-white shadow rounded p-4">
                    <p className="text-gray-600">Sales by Month</p>
                    {/* <SalesGraph /> */}

                    {/* Placeholder for graph */}
                </div>
            </div>
            
            {/* Graph Section */}
            <div className="bg-white shadow rounded p-4 mb-4">
                {/* Placeholder for Sales Graph */}
            </div>

            {/* Live Events Section */}
            <div className="bg-white shadow rounded p-4">
                <h2 className="text-xl font-bold mb-4">Live Events</h2>
                {/* List of events */}
            </div>
        </div>
    );
}

export default AnalyticsDashboard;
