"use client";
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const initialData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Sales by Month',
      data: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 2,
      borderRadius: 5,
      borderSkipped: false,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: '#4B5563',
        font: {
          size: 14,
        },
      },
    },
    title: {
      display: true,
      text: 'Sales by Month',
      color: '#1F2937',
      font: {
        size: 18,
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#4B5563',
      },
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        color: '#4B5563',
        stepSize: 200,
      },
      grid: {
        color: '#E5E7EB',
      },
    },
  },
};

const Dashboard: React.FC = () => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = { ...prevData };
        newData.datasets[0].data = newData.datasets[0].data.map(value => value + Math.floor(Math.random() * 100));
        return newData;
      });
    }, 3000); // Update data every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Analytics</h1>
        <button className="btn bg-blue-500 text-white px-5 py-2 rounded shadow-lg hover:bg-blue-700">Download</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="col-span-1 md:col-span-3 flex space-x-4">
          <select className="bg-white border border-gray-300 px-4 py-2 rounded w-full md:w-auto text-gray-700">
            <option>Timeframe: All-time</option>
          </select>
          <select className="bg-white border border-gray-300 px-4 py-2 rounded w-full md:w-auto text-gray-700">
            <option>People: All</option>
          </select>
          <select className="bg-white border border-gray-300 px-4 py-2 rounded w-full md:w-auto text-gray-700">
            <option>Topic: All</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-600">Ticket Sales</p>
          <p className="text-3xl font-semibold text-gray-900">40,000</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-600">Events Organized</p>
          <p className="text-3xl font-semibold text-gray-900">30</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-600">Current Earning</p>
          <p className="text-3xl font-semibold text-gray-900">100 NEAR</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center col-span-1 md:col-span-2 row-span-2">
          <p className="text-gray-600 mb-4">Sales by Month</p>
          <div className="h-60 bg-gray-100 rounded-lg flex items-center justify-center p-4">
            <Bar data={data} options={options} />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-600">Revenue Growth (last month)</p>
          <p className="text-3xl font-semibold text-gray-900">64%</p>
          <div className="h-28 bg-gray-100 rounded-lg flex items-center justify-center mt-4 p-2">
            <Bar data={data} options={{ ...options, plugins: { ...options.plugins, title: { display: false } } }} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-600">Revenue Growth (all time)</p>
          <p className="text-3xl font-semibold text-gray-900">86%</p>
          <div className="h-28 bg-gray-100 rounded-lg flex items-center justify-center mt-4 p-2">
            <Bar data={data} options={{ ...options, plugins: { ...options.plugins, title: { display: false } } }} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center col-span-1 md:col-span-2">
          <p className="text-gray-600">Account Balance</p>
          <p className="text-3xl font-semibold text-gray-900">100 NEAR</p>
          <button className="text-blue-600 mt-4 hover:underline">Request Withdrawal</button>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Live Events</h2>
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <p className='text-gray-900'>BlockBash</p>
            <p className='text-gray-900'>1100/1200 sold</p>
          </div>
          <div className="h-2 bg-blue-200 rounded-full">
            <div className="h-full bg-blue-600 w-11/12 rounded-full"></div>
          </div>
        </div>
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <p className='text-gray-900'>CryptoFestival</p>
            <p className='text-gray-900'>1100/1200 sold</p>
          </div>
          <div className="h-2 bg-blue-200 rounded-full">
            <div className="h-full bg-blue-600 w-11/12 rounded-full"></div>
          </div>
        </div>
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <p className='text-gray-900'>Blockchain Festival</p>
            <p className='text-gray-900'>1100/1200 sold</p>
          </div>
          <div className="h-2 bg-blue-200 rounded-full">
            <div className="h-full bg-blue-600 w-9/12 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
