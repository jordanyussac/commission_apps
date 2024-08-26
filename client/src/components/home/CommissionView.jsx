import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommissionView = () => {
    const [commissionData, setCommissionData] = useState([]);

    useEffect(() => {
        const fetchCommissionData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/commission');
                setCommissionData(response.data);
            } catch (error) {
                console.error('There was an error fetching the commission data!', error);
            }
        };
        fetchCommissionData();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">Commission Data</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 bg-gray-200 text-gray-600 border-">Marketing</th>
                        <th className="py-2 px-4 bg-gray-200 text-gray-600 border-">Bulan</th>
                        <th className="py-2 px-4 bg-gray-200 text-gray-600 border-">Omzet</th>
                        <th className="py-2 px-4 bg-gray-200 text-gray-600 border-">Komisi %</th>
                        <th className="py-2 px-4 bg-gray-200 text-gray-600 border-">Komisi Nominal</th>
                    </tr>
                </thead>
                <tbody>
                    {commissionData.map((commission, index) => (
                        <tr key={index} className="hover:bg-gray-100 border-b">
                            <td className="py-2 px-4 text-center">{commission.Marketing}</td>
                            <td className="py-2 px-4 text-center">{commission.Bulan}</td>
                            <td className="py-2 px-4 text-center">{commission.Omzet}</td>
                            <td className="py-2 px-4 text-center">{commission["Komisi %"]}</td>
                            <td className="py-2 px-4 text-center">{commission["Komisi Nominal"]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CommissionView;
