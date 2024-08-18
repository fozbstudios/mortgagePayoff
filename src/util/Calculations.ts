import type errorWrapper from "./errorWrapper";

interface MonthlyMortgageStat {
	[key: string]: number | Date;
	id: string;
	newAmmountRemaining: number;
	principalAmmount: number;
	principalPercent: number;
	principalHeightNomalized: number;
	interestAmmount: number;
	interestPercent: number;
	interestHeightNomalized: number;
	date: Date;
}
function checkMortgageParamsForErrrorsAndAssertDefined(
	loanTermMonths: number,
	propertyValue: number,
	downPaymentDollars: number,
	interestRate: number,
	setLoanTermMonthsError:  React.Dispatch<React.SetStateAction<errorWrapper>>,
	setPropertyValueError:  React.Dispatch<React.SetStateAction<errorWrapper>>,
	setDownPaymentDollarsError:  React.Dispatch<React.SetStateAction<errorWrapper>>,
	setInterestRateError:  React.Dispatch<React.SetStateAction<errorWrapper>>,
) {
  console.log("validating props ",loanTermMonths,propertyValue,downPaymentDollars,interestRate)
  
	if (loanTermMonths === undefined || loanTermMonths <= 1) {
		setLoanTermMonthsError({bad:true,message:"The loan term must be greater than 1 month."});
	} else {
		setLoanTermMonthsError({bad:false,message:""});
	}
  if (interestRate === undefined || interestRate <= 0) {
		setInterestRateError({bad:true,message:"The interest rate must be positive."});
	} else {
		setInterestRateError({bad:false,message:""});
	}
  if (propertyValue === undefined || propertyValue <= 0) {
		setPropertyValueError({bad:true,message:"The property value must be positive."});
	} else {
		setPropertyValueError({bad:false,message:""});
	}
  if (downPaymentDollars === undefined || downPaymentDollars <= 0) {
		setDownPaymentDollarsError({bad:true,message:"The down payment must be positive."});
	} else if(downPaymentDollars>propertyValue){
    setDownPaymentDollarsError({bad:true,message:"The down payment must be less than the property value"})
  } else {
		setDownPaymentDollarsError({bad:false,message:""});
	}

  
}
//   message:"Down payment must be less than the value of the property,and greater than 0",
// message:"Interest Rate must be greater than 0"
// message:"The property can't be worth 0",
// The loan term can't be zzerro monnths
function calculatelateMonthlyPayment(
	loanAmmount: number,
	monthlyRate: number,
	loanTermMonths: number,
): number {
	const powerTerm = Math.pow(1 + monthlyRate, loanTermMonths);
	const numerator = monthlyRate * powerTerm;
	const denominator = powerTerm - 1;
	return loanAmmount * (numerator / denominator);
}
function calculateMortgageStats(
	loanTermMonths: number,
	loanStartMonthYear: string,
	loanAmmount: number,
	monthlyRate: number,
	monthlyPayment: number,
): MonthlyMortgageStat[] {
	const monthlyMortgageStats: MonthlyMortgageStat[] = [];
	for (let i = 0; i < loanTermMonths; i++) {
		const date = new Date(loanStartMonthYear);
		date.setMonth(date.getMonth() + i+1,1);
		const prevAmmountRemaining =
			i === 0 ? loanAmmount : monthlyMortgageStats[i - 1].newAmmountRemaining;
		const interestAmmount = monthlyRate * prevAmmountRemaining;
		const interestPercent = interestAmmount / monthlyPayment;
		const principalAmmount = monthlyPayment - interestAmmount;
		const principalPercent = 1 - interestPercent;
		const newAmmountRemaining = prevAmmountRemaining - principalAmmount;

		const currentStats: MonthlyMortgageStat = {
			date,
			interestAmmount,
			interestPercent,
			principalAmmount,
			principalPercent,
			newAmmountRemaining,
			principalHeightNomalized: newAmmountRemaining * principalPercent - 10,
			interestHeightNomalized: newAmmountRemaining * interestPercent - 100,
			id: "" + date + interestAmmount + principalAmmount + newAmmountRemaining,
		};
		monthlyMortgageStats.push(currentStats);
	}
	return monthlyMortgageStats;
}
export type { MonthlyMortgageStat as MonthlyMortgageStats };
export { calculatelateMonthlyPayment, checkMortgageParamsForErrrorsAndAssertDefined, calculateMortgageStats };
