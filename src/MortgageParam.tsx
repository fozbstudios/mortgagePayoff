import {
	Grid,
	InputAdornment,
	TextField,
} from "@mui/material";
import type React from "react";
import { NumericFormat } from "react-number-format";
import errorWrapper from "./util/errorWrapper";

interface MortgageParamProps {
	value: number;
	setValue: React.Dispatch<React.SetStateAction<number |string | null>>;
	label: string;
	dataType: "$" | "%" | "month" | "";
	error: errorWrapper;
	overallError: errorWrapper;
}

const dollarAdornment = <InputAdornment position="start">$</InputAdornment>;
const percentAdornment = <InputAdornment position="end">%</InputAdornment>;

const MortgageParam: React.FC<MortgageParamProps> = ({
	value,
	setValue,
	dataType,
	error,
	overallError,
	label,
}: MortgageParamProps) => {
	let content = undefined;
	if (dataType === "month") {
		content = (
			<TextField
				inputProps={{ type: "month" }}
				disabled={overallError !== undefined}
				autoComplete="off"
				name={label}
				label={label}
        value={value}
				fullWidth={true}
        onChange={(e)=>{
          // need to do the splitting because date month is 0 indexed while our input is not
          setValue(e.target.value)
        }}
			/>
		);
	} else {
		const disabled=!error.bad && overallError !== undefined
		content = (
			<NumericFormat
				{...{ label, value }}
				allowNegative={false}
				disabled={disabled}
				readOnly={disabled}
				autoComplete="off"
				customInput={TextField}
				name={label}
				label={label}
				thousandSeparator=","
				fullWidth={true}
				error={error.bad}
				onValueChange={(values, sourceInfo) => {
					console.log(values, sourceInfo);
					if (values.floatValue === undefined) {
						setValue(null);
					} else {
						setValue(values.floatValue as number);
						console.log(this, values.floatValue);
					}
				}}
				helperText={error.message}
				variant="outlined"
				sx={{ outline: "notched" }}
				InputProps={{
					...(dataType === "$" && { startAdornment: dollarAdornment }),
					...(dataType === "%" && { endAdornment: percentAdornment }),
				}}
			/>
		);
	}
	return (
		<Grid xs={12} xl={12} spacing={3} container item direction={"row"}>
			<Grid item xs={12}>
				{content}
			</Grid>
				{/* <Slider /> */}
		</Grid>
	);
};
export default MortgageParam;
