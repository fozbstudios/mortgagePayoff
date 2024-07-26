import { useMemo, useState } from 'react'
import AmortizationChart from './AmortizationChart'
import { Card, CardContent, CardHeader, Container, CssBaseline, ThemeProvider, createTheme, useMediaQuery } from '@mui/material'
import React from 'react';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import TableViewRoundedIcon from '@mui/icons-material/TableViewRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import IconSwitch from './IconSwitch';
import { calculateMortgageStats, calculatelateMonthlyPayment } from './util/Calculations';
import AmortizationTable from './AmortizationTable';
import IconData from './MaterialIconSvgs';

function App() {
  const [darkMode, setDarkMode] = useState(useMediaQuery('(prefers-color-scheme: dark)'));
  const [viewChart, setViewChart] = useState(true)
  // research bundle size opts
  const [houseLandValue, sethouseLandValue] = useState(365000)
  const [interestRateDecimal, setInterestRateDecimal] = useState(.07875)
  const [downPaymentDollars, setdownPaymentDollars] = useState(150000)
  const [loanTermMonths, setloanTermMonths] = useState(360)
  const [loanStartMonthYear, setloanStartMonthYear] = useState('October 1 2023')

  const loanAmmount = houseLandValue - downPaymentDollars
  const monthlyRate = interestRateDecimal / 12
  const monthlyPayment = useMemo(() =>
    calculatelateMonthlyPayment(loanAmmount, monthlyRate, loanTermMonths),
    [loanAmmount, monthlyRate, loanTermMonths])
  const monthlyMortgageStats = useMemo(
    () => calculateMortgageStats(loanTermMonths, loanStartMonthYear, loanAmmount, monthlyRate, monthlyPayment),
    [loanTermMonths, loanStartMonthYear, loanAmmount, monthlyRate, monthlyPayment])


  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode],
  );

  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container maxWidth={false} >
        <Card sx={{ height: '98%', }} elevation={7}>
          <CardHeader
            action={
              <>
                <IconSwitch value={darkMode} setValue={setDarkMode} offIcon={IconData.LightModeOutlined} onIcon={IconData.DarkModeRounded} />
                <IconSwitch value={viewChart} setValue={setViewChart} offIcon={IconData.TableViewRounded} onIcon={IconData.TimlineOutlined} />
              </>
            }
          />
          <CardContent sx={{ height: '99%', overflow:'auto' }}>
            {(viewChart)?
            <AmortizationChart houseLandValue={houseLandValue} monthlyMortgageStats={monthlyMortgageStats} />:
            <AmortizationTable  monthlyMortgageStats={monthlyMortgageStats}/>
}
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>


  )
}

export default App
