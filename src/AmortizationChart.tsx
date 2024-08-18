import {
	ResponsiveChartContainer,
	ChartsXAxis,
	ChartsAxisHighlight,
	ChartsReferenceLine,
	ChartsTooltip,
	ChartsYAxis,
	axisClasses,
} from "@mui/x-charts";
import {
	AreaPlot,
	LineHighlightPlot,
	LinePlot,
	MarkPlot,
} from "@mui/x-charts/LineChart";
import type React from "react";

import { ChartsLegend } from "@mui/x-charts/ChartsLegend";
import { breakpoints, currentBreakpoint } from "./util/breakpoints";
import {
	currencyFormatter,
	paymentPortionFormatter,
	shortDateFormatter,
} from "./util/Formatters";
import type { DatasetElementType } from "@mui/x-charts/internals";

interface AmortizationChartProps {
	propertyValue: number|null;
	monthlyMortgageStats: DatasetElementType<number>[];
}
const ANGLE = 45;

const AmortizationChart: React.FC<AmortizationChartProps> = ({
	propertyValue,
	monthlyMortgageStats,
}) => {
	const curBreak = currentBreakpoint();

	const xAxisTickMultipes: { [key in breakpoints]: number } = {
		[breakpoints.Xl]: 6,
		[breakpoints.Lg]: 12,
		[breakpoints.Md]: 18,
		[breakpoints.Sm]: 24,
		[breakpoints.Xs]: 30,
	};

	console.log("bp", breakpoints[currentBreakpoint()]);
	const tickMultiplcationFactor = Math.round(monthlyMortgageStats.length/360)
	return (
		<ResponsiveChartContainer
			sx={{
				marginBottom: 3,
				[`.${axisClasses.left} .${axisClasses.label}`]: {
					// Move the y-axis label with CSS
					transform: "translateX(-30px)",
				},
				[".MuiLineElement-series-newAmmountRemaining"]: {
					strokeWidth: "3px",
				},
				[".MuiLineElement-series-principalHeightNomalized"]: {
					stroke: "none!important",
				},
				[".MuiLineElement-series-interestHeightNomalized"]: {
					stroke: "none!important",
				},
			}}
			xAxis={[
				{
					id: "dateAxis",
					dataKey: "date",

					tickLabelInterval: (_value, index) =>
						index %( xAxisTickMultipes[curBreak]*tickMultiplcationFactor) === 0 ||
						index===0 ||
						index + 1 === monthlyMortgageStats.length,
					scaleType: "band",
					valueFormatter: (value) => shortDateFormatter(value),
					disableTicks: true,
					tickLabelStyle: {
						angle: ANGLE,
						textAnchor: "start",
						fontSize: 12,
					},
				},
			]}
			yAxis={[
				{
					id: "balanceAxis",
					scaleType: "linear",
					label: "Balance",
					min: 0,
					max: propertyValue! + 10000,
				},
			]}
			dataset={monthlyMortgageStats}
			series={[
				{
					type: "line",
					label: "Ammount Remaining($)",
					dataKey: "newAmmountRemaining",
					id: "newAmmountRemaining",
					showMark: ({ index }) => index % 12 === 0,
					valueFormatter: (v) => currencyFormatter.format(v as number),
				},
				{
					type: "line",
					label: "Interest (% of Monthly Payment)",
					area: true,
					stack: "%s",
					showMark: false,
					disableHighlight: true,
					dataKey: "interestHeightNomalized",
					id: "interestHeightNomalized",
					valueFormatter: (_v, { dataIndex }) => {
						return paymentPortionFormatter(
							monthlyMortgageStats[dataIndex].interestAmmount,
							monthlyMortgageStats[dataIndex].interestPercent,
						);
					},
				},
				{
					type: "line",
					label: "Principal (% of Monthly Payment)",
					area: true,
					stack: "%s",
					showMark: false,
					disableHighlight: true,
					dataKey: "principalHeightNomalized",
					id: "principalHeightNomalized",
					valueFormatter: (_v, { dataIndex }) => {
						return paymentPortionFormatter(
							monthlyMortgageStats[dataIndex].principalAmmount,
							monthlyMortgageStats[dataIndex].principalPercent,
						);
					},
				},
			]}
		>
			<ChartsXAxis skipAnimation />
			<AreaPlot skipAnimation />
			<ChartsYAxis skipAnimation />
			<LinePlot skipAnimation />
			<MarkPlot skipAnimation />

			<ChartsLegend skipAnimation />
			<LineHighlightPlot />
			<ChartsAxisHighlight x="line" skipAnimation />
			<ChartsTooltip trigger="axis" skipAnimation />
			<ChartsReferenceLine
				skipAnimation
				y={propertyValue}
				label="House Price"
				labelAlign="end"
				lineStyle={{ stroke: "#128128", strokeDasharray: "3 3" }}
			/>
		</ResponsiveChartContainer>
	);
};

export default AmortizationChart;
