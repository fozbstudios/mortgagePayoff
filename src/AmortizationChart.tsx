import { ResponsiveChartContainer, ChartsXAxis, ChartsAxisHighlight, ChartsReferenceLine, ChartsTooltip, ChartsYAxis, AxisConfig, axisClasses } from '@mui/x-charts'
import { AreaPlot, LineHighlightPlot, LinePlot, MarkPlot } from '@mui/x-charts/LineChart'
import React from 'react'

import { ChartsLegend } from "@mui/x-charts/ChartsLegend";
import { breakpoints, currentBreakpoint } from './util/breakpoints';
import { MonthlyMortgageStats as MonthlyMortgageStat } from './util/Calculations';
import { currencyFormatter, paymentPortionFormatter, shortDateFormatter } from './util/Formatters';


interface AmortizationChartProps {
  houseLandValue: number
  monthlyMortgageStats:MonthlyMortgageStat[]
}
const ANGLE = 45



const AmortizationChart: React.FC<AmortizationChartProps> = ({
  houseLandValue,
  monthlyMortgageStats,
}) => {
 

  const xAxisTickMultipes: { [key in breakpoints]: number } = {
    [breakpoints.Xl]: 6,
    [breakpoints.Lg]: 12,
    [breakpoints.Md]: 18,
    [breakpoints.Sm]: 24,
    [breakpoints.Xs]: 30,

  }
  

  const xAxis: [AxisConfig] = [{
    id: "xaxis",
    dataKey: 'date',
    tickLabelInterval: (_value, index) => index % xAxisTickMultipes[currentBreakpoint()] === 0 || index + 1 === monthlyMortgageStats.length,
    scaleType: 'band',
    valueFormatter: (value, _context) => shortDateFormatter(value),
    disableTicks: true,
    tickLabelStyle: {
      angle: ANGLE,
      textAnchor: 'start',
      fontSize: 12,
    }
  }]
  const yAxis: [AxisConfig] = [{ label: "Balance", min: 0, max: houseLandValue + 10000 }];

  console.log('bp', breakpoints[currentBreakpoint()])

  return (
    <ResponsiveChartContainer
      sx={
        {
          marginBottom: 3,
          [`.${axisClasses.left} .${axisClasses.label}`]: {
            // Move the y-axis label with CSS
            transform: 'translateX(-30px)',
          },
          ['.MuiLineElement-series-newAmmountRemaining']: {
            strokeWidth: '3px',
          },
          ['.MuiLineElement-series-principalHeightNomalized']: {
            stroke: 'none!important',
          },
          ['.MuiLineElement-series-interestHeightNomalized']: {
            stroke: 'none!important',
          }
        }
      }

      xAxis={xAxis}
      yAxis={yAxis}
      dataset={monthlyMortgageStats}
      series={[
        { type: 'line', label: 'Ammount Remaining($)', dataKey: 'newAmmountRemaining', id: 'newAmmountRemaining', showMark: ({ index }) => index % 12 === 0, valueFormatter: (v) => currencyFormatter.format(v) },
        {
          type: 'line', label: 'Interest (% of Monthly Payment)', area: true, stack: '%s', showMark: false, disableHighlight: true, dataKey: 'interestHeightNomalized', id: 'interestHeightNomalized',
          valueFormatter: (v, { dataIndex }) => {
            return paymentPortionFormatter(monthlyMortgageStats[dataIndex].interestAmmount, monthlyMortgageStats[dataIndex].interestPercent);
          },
        },
        {
          type: 'line', label: 'Principal (% of Monthly Payment)', area: true, stack: '%s', showMark: false, disableHighlight: true, dataKey: 'principalHeightNomalized', id: 'principalHeightNomalized',
          valueFormatter: (v, { dataIndex }) => {
            return paymentPortionFormatter(monthlyMortgageStats[dataIndex].principalAmmount, monthlyMortgageStats[dataIndex].principalPercent);
          },
        },
      ]}
    >
      <ChartsXAxis skipAnimation />
      <AreaPlot skipAnimation/>
      <ChartsYAxis skipAnimation/>
      <LinePlot skipAnimation/>
      <MarkPlot skipAnimation/>

      <ChartsLegend skipAnimation/>
      <LineHighlightPlot />
      <ChartsAxisHighlight x="line" skipAnimation/>
      <ChartsTooltip trigger="axis" skipAnimation/>
      <ChartsReferenceLine
      skipAnimation
        y={houseLandValue}
        label="House Price"
        labelAlign="end"
        lineStyle={{ stroke: '#128128', strokeDasharray: '3 3' }}
      />
    </ResponsiveChartContainer>

  );

}

export default AmortizationChart