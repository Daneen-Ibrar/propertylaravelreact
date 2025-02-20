import React from 'react';

const FormattedPrice = ({ price }) => {
  const formattedPrice = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(Number(price));

  return <span>{formattedPrice}</span>;
};

export default FormattedPrice;
