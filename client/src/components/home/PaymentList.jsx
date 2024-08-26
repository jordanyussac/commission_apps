import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentList = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/payments');
                setPayments(response.data);
            } catch (error) {
                console.error('There was an error fetching the payment data!', error);
            }
        };

        fetchPayments();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">Payment Data</h2>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 bg-gray-200 text-gray-600 border-b">ID Pembayaran</th>
                        <th className="py-2 px-4 bg-gray-200 text-gray-600 border-b">ID Penjualan</th>
                        <th className="py-2 px-4 bg-gray-200 text-gray-600 border-b">Jumlah Total</th>
                        <th className="py-2 px-4 bg-gray-200 text-gray-600 border-b">Nomor Cicilan</th>
                        <th className="py-2 px-4 bg-gray-200 text-gray-600 border-b">Jumlah Cicilan (Rp)</th>
                        <th className="py-2 px-4 bg-gray-200 text-gray-600 border-b">Total Cicilan</th>
                        <th className="py-2 px-4 bg-gray-200 text-gray-600 border-b">Tanggal Pembayaran</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment.payment_id} className="border-b hover:bg-gray-100">
                            <td className="py-2 px-4 text-center">{payment.payment_id}</td>
                            <td className="py-2 px-4 text-center">{payment.sale_id}</td>
                            <td className="py-2 px-4 text-center">{payment.total_amount}</td>
                            <td className="py-2 px-4 text-center">{payment.installment_number}</td>
                            <td className="py-2 px-4 text-center">{payment.installment_amount}</td>
                            <td className="py-2 px-4 text-center">{payment.installment_total}</td>
                            <td className="py-2 px-4 text-center">{payment.payment_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentList;
