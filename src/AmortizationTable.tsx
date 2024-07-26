import { MonthlyMortgageStats as MonthlyMortgageStat } from "./util/Calculations";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { currencyFormatter, paymentPortionFormatter, shortDateFormatter } from "./util/Formatters";
interface AmortizationTableProps {
    monthlyMortgageStats:MonthlyMortgageStat[]
  }
  const AmortizationTable: React.FC<AmortizationTableProps> = ({
    monthlyMortgageStats,
  }) => {
    return (
        <Table  stickyHeader size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Balance</TableCell>
                    <TableCell align="right">Interest</TableCell>
                    <TableCell align="right">Principal</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>

                {
                //sholdn't need ftrom or subscript
                monthlyMortgageStats.map((row) => (
                    <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {shortDateFormatter(row.date)}
                        </TableCell>
                        <TableCell align="right">{currencyFormatter.format(row.newAmmountRemaining)}</TableCell>
                        <TableCell align="right">{paymentPortionFormatter(row.interestAmmount, row.interestPercent)}</TableCell>
                        <TableCell align="right">{paymentPortionFormatter(row.principalAmmount, row.principalPercent)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )

}
export default AmortizationTable