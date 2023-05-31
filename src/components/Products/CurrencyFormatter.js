// Convert float to currency string
export const CurrencyFormatter = ({ amount }) => {
    const formattedAmount = amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  
    return <span>{formattedAmount}</span>;
  }