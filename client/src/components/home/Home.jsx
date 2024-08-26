import React from 'react'
import PaymentForm from './PaymentForm';
import SellingView from './SellingView'
import PaymentList from './PaymentList';
import CommissionView from './CommissionView';

const Home = () => {
  return (
    <div>
        <SellingView />
        <CommissionView />
        <PaymentForm />
        <PaymentList />
    </div>
  )
}

export default Home;