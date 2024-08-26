import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentForm = () => {
  const [paymentData, setPaymentData] = useState({
    sale_id: '',
    total_amount: '',
    installment_number: '',
    installment_amount: '',
    installment_total: '',
    payment_date: ''
  });

  const [sellingData, setSellingData] = useState([]);

  // Mengambil selling data dari server
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPaymentData((prevState) => {
      let updatedData = {
        ...prevState,
        [name]: value,
      };

      // Otomatis mengisi total_amount berdasarkan sale_id yang dipilih
      if (name === 'sale_id') {
        const selectedSale = sellingData.find(sale => sale.id === parseInt(value));
        if (selectedSale) {
          updatedData.total_amount = selectedSale.grand_total;
        } else {
          updatedData.total_amount = '';
        }
      }

      // Menghitung installment_amount berdasarkan total_amount dan installment_total
      if (name === 'installment_total') {
        const totalAmount = parseFloat(updatedData.total_amount);
        if (totalAmount && value) {
          updatedData.installment_amount = (totalAmount / parseInt(value)).toFixed(2);
        }
      }

      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/payments', paymentData);
      alert('Payment data submitted!');
      setPaymentData({
        sale_id: '',
        total_amount: '',
        installment_number: '',
        installment_amount: '',
        installment_total: '',
        payment_date: ''
      });
    } catch (error) {
      console.error('There was an error submitting the payment data!', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Payment Data</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Sale ID:
            <select
              name="sale_id"
              value={paymentData.sale_id}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Pilih ID Penjualan</option>
              {sellingData.map((sale) => (
                <option key={sale.id} value={sale.id}>
                  {sale.id} - {sale.transaction_number}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Jumlah Pembayaran:
            <input
              type="text"
              name="total_amount"
              value={paymentData.total_amount}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              readOnly
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nomor Cicilan:
            <input
              type="text"
              name="installment_number"
              value={paymentData.installment_number}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Total Cicilan (Durasi):
            <select
              name="installment_total"
              value={paymentData.installment_total}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Pilih Total Cicilan</option>
              {[1, 3, 6, 12].map((option) => (
                <option key={option} value={option}>
                  {option}x
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Jumlah Pembayaran Cicilan (Rp):
            <input
              type="text"
              name="installment_amount"
              value={paymentData.installment_amount}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              readOnly
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tanggal Pembayaran:
            <input
              type="date"
              name="payment_date"
              value={paymentData.payment_date}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </label>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit Payment
          </button>
        </div>
      </form>
    </div>
    
  );
};

export default PaymentForm;