import { useMemo, useState } from 'react'
import AmortizationChart from './AmortizationChart'
import { Card, CardContent, CardHeader, Container, CssBaseline, Drawer, ThemeProvider, createTheme, useMediaQuery } from '@mui/material'
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

  const portrait = useMediaQuery('@media (orientation: portrait)')
  console.log(portrait)

  const loanAmmount = houseLandValue - downPaymentDollars
  const monthlyRate = interestRateDecimal / 12
  const monthlyPayment = useMemo(() =>
    calculatelateMonthlyPayment(loanAmmount, monthlyRate, loanTermMonths),
    [loanAmmount, monthlyRate, loanTermMonths])
  const monthlyMortgageStats = useMemo(
    () => calculateMortgageStats(loanTermMonths, loanStartMonthYear, loanAmmount, monthlyRate, monthlyPayment),
    [loanTermMonths, loanStartMonthYear, loanAmmount, monthlyRate, monthlyPayment])
const d=<Drawer
        sx={{
          backgroundColor:'red',
          width: 3,
          flexShrink: 0,
        }}
        variant="persistent"
        anchor= {portrait?'bottom':'left'}
        open={true}
      />
console.log(d.props.anchor)
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode],
  );
  const drawerPercent='10%'
  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth={false}  sx={{display:'flex', flexDirection: portrait?'column-reverse':'row'}}>
      <Drawer
        sx={{
          backgroundColor:'red',
          height: portrait? drawerPercent:'100%',
          width: portrait? '100%':drawerPercent,
          flexShrink: 0,
        }}
        variant="persistent"
        open={true}
      />
        
        <Card open={true} sx={{flexGrow:1, height: '100%',alignContent:'center',justifyContent:'center'}} elevation={7}>
          <CardHeader sx={{paddingX:'8px', paddingTop:'8px'}}
            action={
              <>
                <IconSwitch value={darkMode} setValue={setDarkMode} offIcon={IconData.LightModeOutlined} onIcon={IconData.DarkModeRounded} />
                <IconSwitch value={viewChart} setValue={setViewChart} offIcon={IconData.TableViewRounded} onIcon={IconData.TimlineOutlined} />
              </>
            }
          />
          <CardContent   sx={{ paddingX:'8px', paddingTop:'4px', height: '99%', width: '100%', display:'flex', alignContent:'center', justifyContent:'center', overflow:'auto' }}>
            {(viewChart)?
            <AmortizationChart houseLandValue={houseLandValue} monthlyMortgageStats={monthlyMortgageStats} />:
            <AmortizationTable theme={theme} monthlyMortgageStats={monthlyMortgageStats}/>
}
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>


  )
}

export default App
