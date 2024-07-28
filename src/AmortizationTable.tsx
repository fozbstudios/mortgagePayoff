import { MonthlyMortgageStats as MonthlyMortgageStat } from "./util/Calculations";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { currencyFormatter, paymentPortionFormatter, shortDateFormatter } from "./util/Formatters";
import { Theme } from "@mui/material/styles";
interface AmortizationTableProps {
    monthlyMortgageStats: MonthlyMortgageStat[]
    theme:Theme
  }
const AmortizationTable: React.FC<AmortizationTableProps> = ({
    monthlyMortgageStats,
    theme
}) => {
    return (

        <Table stickyHeader size="small" aria-label="a dense table" 
            sx={{
                marginBottom: '50px',
                width: "auto",
                tableLayout: "auto",
                ['.MuiTableCell-root']: {
                    paddingLeft: '4px',
                    paddingRight: '4px',
                    paddingTop: '4px',
                    paddingBottom: '4px',
                    [theme.breakpoints.up('sm')]: {
                        paddingLeft: '8px',
                        paddingRight: '8px',
                        paddingTop: '6px',
                        paddingBottom: '6px',
                    },
                    [theme.breakpoints.up('lg')]: {
                        paddingLeft: '16px',
                        paddingRight: '16px',
                        paddingTop: '6px',
                        paddingBottom: '6px',
                    },

                },
            }}  >
            <TableHead>
                <TableRow>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Balance</TableCell>
                    <TableCell align="center">Interest</TableCell>
                    <TableCell align="center">Principal</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>

                {
                    monthlyMortgageStats.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center" component="th" scope="row">
                                {shortDateFormatter(row.date)}
                            </TableCell>
                            <TableCell align="center">{currencyFormatter.format(row.newAmmountRemaining)}</TableCell>
                            <TableCell align="center">{paymentPortionFormatter(row.interestAmmount, row.interestPercent)}</TableCell>
                            <TableCell align="center">{paymentPortionFormatter(row.principalAmmount, row.principalPercent)}</TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    )

}
export default AmortizationTable