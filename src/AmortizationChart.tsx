import { ResponsiveChartContainer, ChartsXAxis, ChartsAxisHighlight, ChartsReferenceLine, ChartsTooltip, ChartsYAxis, AxisConfig } from '@mui/x-charts'
import { LineHighlightPlot, LinePlot, MarkPlot } from '@mui/x-charts/LineChart'
import React from 'react'

import { ChartsLegend } from "@mui/x-charts/ChartsLegend";


const referenceLineValue = 32;
interface AmortizationChartProps {
  houseLandValue: number
  interestRate: number
  downPaymentDollars: number
  loanTermMonths: number
  loanStartMonthYear: string
}
const shortDate= (date:Date)=>{
return date.toLocaleDateString(undefined, {
    year: '2-digit',
    month: 'short',
  }).replace(' ',"'");
}
const angle=45

const yAxis = [{ label: "Temperature (°F)" }];

const AmortizationChart: React.FC<AmortizationChartProps> = ({
  houseLandValue = 365000,
  interestRate = 7.875,
  downPaymentDollars = 150000,
  loanTermMonths = 360,
  loanStartMonthYear = '1Oct23'
}) => {
  const xAxisData = [
    new Date('2023-12-04'),
    new Date('2023-12-05'),
    new Date('2023-12-06'),
    new Date('2023-12-07'),
    new Date('2023-12-08'),
    new Date('2023-12-09'),
    new Date('2023-12-10'),
  ];
  const seriesData = [
    [43, 38, 36, 30, 37, 43, 44],
    [31, 28, 27, 27, 33, 40, 35]
  ]

  const xAxis: [AxisConfig] = [{
    id: "xaxis",
    data: xAxisData,
    tickInterval: xAxisData,
    tickLabelInterval: (_value, index) => index % 1 === 0,
    scaleType: 'time',
    valueFormatter: (value, _context) => shortDate(value),
    disableTicks:true,
    tickLabelStyle: {
      angle: angle,
      textAnchor: 'start',
      fontSize: 12,
    }  
  }]
  return (
    <ResponsiveChartContainer
      xAxis= {xAxis}
      yAxis={yAxis}
      series={[
        { type: 'line', label: 'Atlanta, GA', data: seriesData[0] },
        { type: 'line', label: 'Toronto, ON', data: seriesData[1] },
      ]}
    >
      <LinePlot />
      <ChartsXAxis />
      <ChartsYAxis />
      <MarkPlot />
      <ChartsLegend />
      <LineHighlightPlot />
      <ChartsAxisHighlight x="line" />
      <ChartsTooltip trigger="axis" />
      <ChartsReferenceLine
        y={referenceLineValue}
        label="Freezing"
        labelAlign="end"
        lineStyle={{ stroke: '#128128', strokeDasharray: '3 3' }}
      />
    </ResponsiveChartContainer>

  );

}

export default AmortizationChart