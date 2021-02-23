import DineroFactory from 'dinero.js';

export const formatMoney = (money: number) => { 
  return DineroFactory({ amount: money, precision: 2, currency: 'AOA' }).toFormat('$0,0.00')
}
