import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SellingView = () => {
    const [sellingData, setSellingData] = useState([]);

    useEffect(() => {
        const fetchSellingData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/sellingData');
                setSellingData(response.data);
            } catch (error) {
                console.error('There was an error fetching the selling data!', error);
            }
        };
        fetchSellingData();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">Selling Data</h2>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 bg-gray-200 text-gray-600 border-b">Sale ID</th>
                        <th className="py-2 px-4 bg-gray-200 text-gray-600 border-b">Date</th>
                        <th className="py-2 px-4 bg-gray-200 text-gray-600 border-b">Total Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {sellingData.map((sale) => (
                        <tr key={sale.id} className="border-b hover:bg-gray-100">
                            <td className="py-2 px-4 text-center">{sale.id}</td>
                            <td className="py-2 px-4 text-center">{sale.date}</td>
                            <td className="py-2 px-4 text-center">{sale.grand_total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SellingView;
