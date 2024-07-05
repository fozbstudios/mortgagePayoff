import { useState } from 'react'
// import './App.css'
import AmortizationChart from './AmortizationChart'
import { Container, Paper } from '@mui/material'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Container maxWidth={false} sx={{minHeight:'100%',minWidth:'100%', alignItems:'center'}}>
          <Paper sx={{height:'90%', alignItems: 'center' }} elevation={3}>
            <AmortizationChart/>
          </Paper>
    </Container>


  )
}

export default App
