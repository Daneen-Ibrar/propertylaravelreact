import { useMemo } from "react";

export const useMonthlyPayment = (total, interestRate, duration) => {
  const monthlyPayment = useMemo(() => {
    const principle = total;
    const monthlyInterest = interestRate / 100 / 12;
    const numberOfPaymentMonths = duration * 12;

    return (
      principle *
      monthlyInterest *
      Math.pow(1 + monthlyInterest, numberOfPaymentMonths) /
      (Math.pow(1 + monthlyInterest, numberOfPaymentMonths) - 1)
    );
  }, [total, interestRate, duration]); // Dependencies for memoization

  return { monthlyPayment };

};

export const usePaymentCalculations = (total, monthlyPayment, duration) => {
  const totalPaid = useMemo(() => {
    const durationValue = typeof duration === "object" ? duration.value : duration;
    const monthlyPaymentValue =
      typeof monthlyPayment === "object" ? monthlyPayment.value : monthlyPayment;
    return durationValue * 12 * monthlyPaymentValue;
  }, [duration, monthlyPayment]);

  const totalInterest = useMemo(() => {
    const totalValue = typeof total === "object" ? total.value : total;
    return totalPaid - totalValue;
  }, [total, totalPaid]);

  return { totalPaid, totalInterest };
};
