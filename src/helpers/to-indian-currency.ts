const ToIndianCurrency = (num: number) => {
    const curr = num.toLocaleString('en-IN', {
       style: 'currency',
       currency: 'INR'
    });
 return curr;
 };
 export default ToIndianCurrency;