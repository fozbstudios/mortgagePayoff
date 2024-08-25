import { useMemo, useState } from 'react'
import AmortizationChart from './AmortizationChart'
import { Card, CardContent, CardHeader, Container, CssBaseline, Drawer, Grid, TextField, ThemeProvider, createTheme, useMediaQuery } from '@mui/material'
import IconSwitch from './IconSwitch';
import { calculateMortgageStats, calculatelateMonthlyPayment, checkMortgageParamsForErrrorsAndAssertDefined } from './util/Calculations';
import AmortizationTable from './AmortizationTable';
import IconData from './MaterialIconSvgs';
import MortgageParam from './MortgageParam';
import type errorWrapper from './util/errorWrapper';

function App() {
  const [darkMode, setDarkMode] = useState(useMediaQuery('(prefers-color-scheme: dark)'));
  const [viewChart, setViewChart] = useState(true)

  const [propertyValue, setpropertyValue] = useState<number|null>(365000)
  const [interestRatePercent, setInterestRateDecimal] = useState<number|null>(7.875)
  const [downPaymentDollars, setDownPaymentDollars] = useState<number|null>(150000)
  const [loanTermMonths, setloanTermMonths] = useState<number|null>(360)
  const [loanStartMonthYear, setloanStartMonthYear] = useState('2023-10')

  const [downPaymentError,setDownPaymentError]=useState<errorWrapper>({bad:false,message:''})
  const [interestRateError,setInterestRateError]=useState<errorWrapper>({bad:false,message:''})
  const [propertyValueError,setPropertyValueError]=useState<errorWrapper>({bad:false,message:''})
  const [loanTermMonthsError,setLoanTermMonthsError]=useState<errorWrapper>({bad:false,message:''})

const errors=[downPaymentError,interestRateError,propertyValueError,loanTermMonthsError]
const overallError=errors.find(element=>element.bad)
  const portrait = useMediaQuery('@media (orientation: portrait)')  
  console.log(portrait)
  useMemo(()=>checkMortgageParamsForErrrorsAndAssertDefined(loanTermMonths,propertyValue,downPaymentDollars,interestRatePercent,setLoanTermMonthsError,setPropertyValueError,setDownPaymentError,setInterestRateError),[loanTermMonths, propertyValue, downPaymentDollars, interestRatePercent])

  const loanAmmount = propertyValue - downPaymentDollars
  const monthlyRate = interestRatePercent / 1200
  const monthlyPayment = useMemo(() =>
    calculatelateMonthlyPayment(loanAmmount, monthlyRate, loanTermMonths),
    [loanAmmount, monthlyRate, loanTermMonths])
  const monthlyMortgageStats = useMemo(
    () => calculateMortgageStats(loanTermMonths, loanStartMonthYear, loanAmmount, monthlyRate, monthlyPayment),
    [loanTermMonths, loanStartMonthYear, loanAmmount, monthlyRate, monthlyPayment])
  const d = <Drawer
    sx={{
      backgroundColor: 'red',
      width: 3,
      flexShrink: 0,
    }}
    variant="persistent"
    anchor={portrait ? 'bottom' : 'left'}
    open={true}
  />
  console.log(d.props.anchor)
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
        components: {
          MuiInputLabel: {
            defaultProps: { shrink: true }
          },
          MuiOutlinedInput: {
            defaultProps: {
              notched: true
            }
          }
        }
      }),
    [darkMode],
  );
  const drawerPercent = portrait?'270px':'208px'
  let cardContent=<></>
  console.log(overallError)
  if (overallError===undefined) {
    if (viewChart) {
              cardContent=<AmortizationChart  {...{propertyValue,monthlyMortgageStats}} /> 
    } else {
      cardContent=  <AmortizationTable {...{theme,monthlyMortgageStats}} />
      
    }
  }else{
    cardContent=<p>{overallError?.message}</p>
  }
  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth={false} disableGutters={true} sx={{ display: 'flex', flexDirection: portrait ? 'column-reverse' : 'row' }}>
        <Drawer PaperProps={{
          style: {
            height: portrait ? drawerPercent : '100%',
            width: portrait ? '100%' : drawerPercent,
          }
        }}
        anchor='bottom'
          sx={{
            backgroundColor: 'red',
            height: portrait ? drawerPercent : '100%',
            width: portrait ? '100%' : drawerPercent,
            flexShrink: 0,

            "& .MuiDrawer-paper": {
              width: drawerPercent,
              boxSizing: "border-box",
              margin: 0,
              padding: 0
            }
          }}
          variant="persistent"
          open={true}
        >
          <Grid container justifyContent='space-evenly' spacing={1} padding={1} >
            <MortgageParam label= 'Property Value' error={propertyValueError} value={propertyValue} dataType='$' setValue={setpropertyValue}  overallError={overallError}/>
            <MortgageParam label='Down Payment' value={downPaymentDollars} error={downPaymentError} dataType='$' setValue={setDownPaymentDollars}  overallError={overallError}/>
            <MortgageParam label='Loan Term (Months)' value={loanTermMonths} dataType='' setValue={setloanTermMonths}  error={loanTermMonthsError} overallError={overallError}/>
            <MortgageParam label='Interest Rate' value={interestRatePercent} dataType='%' setValue={setInterestRateDecimal} error={interestRateError}  overallError={overallError}/>
            <MortgageParam label='Loan Start' dataType="month" value={loanStartMonthYear} setValue={setloanStartMonthYear} overallError={overallError}/>
          </Grid>
        </Drawer>

        <Card open={true} sx={{ flexGrow: 1, height: '100%', alignContent: 'center', justifyContent: 'center' }} elevation={7}>
          <CardHeader sx={{ paddingX: '8px', paddingTop: '8px' }}
            action={
              <>
                <IconSwitch value={darkMode} setValue={setDarkMode} offIcon={IconData.LightModeOutlined} onIcon={IconData.DarkModeRounded} />
                <IconSwitch value={viewChart} setValue={setViewChart} offIcon={IconData.TableViewRounded} onIcon={IconData.TimlineOutlined} />
              </>
            }
          />
          {/* {overallError!==null} */}
          <CardContent sx={{ paddingX: '8px', paddingTop: '0px', height: '99%', width: '100%', display: 'flex', alignContent: 'center', justifyContent: 'center', bgcolor:darkMode?'':'FloralWhite', overflow: 'auto' }}>
{cardContent}            
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>


  )
}

export default App
