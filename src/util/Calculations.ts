interface MonthlyMortgageStat {
[key: string]: number|Date
    id:number
    newAmmountRemaining: number
    principalAmmount: number
    principalPercent: number
    principalHeightNomalized: number
    interestAmmount: number
    interestPercent: number
    interestHeightNomalized: number
    date: Date
  }
  function calculatelateMonthlyPayment(loanAmmount: number, monthlyRate: number, loanTermMonths: number): number {
    const powerTerm = Math.pow(1 + monthlyRate, loanTermMonths)
    const numerator = (monthlyRate * powerTerm)
    const denominator = (powerTerm - 1)
    return loanAmmount * (numerator / denominator)
  }
  function calculateMortgageStats(loanTermMonths:number,loanStartMonthYear:string,loanAmmount:number,monthlyRate:number,monthlyPayment:number):MonthlyMortgageStat[] {
    const monthlyMortgageStats:MonthlyMortgageStat[]=[]
    for (let i = 0; i < loanTermMonths; i++) {
        const date = new Date(loanStartMonthYear)
        date.setMonth(date.getMonth() + i)
        const prevAmmountRemaining = (i === 0) ? loanAmmount : monthlyMortgageStats[i - 1].newAmmountRemaining
        const interestAmmount = monthlyRate * prevAmmountRemaining
        const interestPercent = interestAmmount / monthlyPayment
        const principalAmmount = monthlyPayment - interestAmmount
        const principalPercent = 1 - interestPercent
        const newAmmountRemaining = prevAmmountRemaining - principalAmmount
    
        const currentStats:MonthlyMortgageStat = {
          date,
          interestAmmount,
          interestPercent,
          principalAmmount,
          principalPercent,
          newAmmountRemaining,
          principalHeightNomalized: newAmmountRemaining * principalPercent - 10,
          interestHeightNomalized: newAmmountRemaining * interestPercent - 100,
          id:i
        }
        monthlyMortgageStats.push(currentStats)
      }
      return monthlyMortgageStats
    }
  export type {MonthlyMortgageStat as MonthlyMortgageStats}
  export {calculatelateMonthlyPayment,calculateMortgageStats}