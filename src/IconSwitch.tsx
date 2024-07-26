import { styled } from "@mui/material";
import Switch, { SwitchProps } from "@mui/material/Switch/Switch"



interface IconSwitchProps extends SwitchProps {
  value: boolean,
  setValue?: React.Dispatch<React.SetStateAction<boolean>>
  offIcon: string,
  onIcon: string
}

const StyledSwitch = styled(Switch)<IconSwitchProps>(({ theme,checked,offIcon,onIcon }) => ({
    '&.Mui-checked': {
      color: '#fff',
    },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',

    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: checked?onIcon:offIcon,
    },
  },
}));

const handleChange = (event: React.ChangeEvent<HTMLInputElement>, setFunc: React.Dispatch<React.SetStateAction<boolean>>) => {
  setFunc(event.target.checked);
};
const IconSwitch: React.FC<IconSwitchProps> = ({ value, setValue, offIcon, onIcon }: IconSwitchProps) => {

  return <StyledSwitch  value={value} checked={value} onChange={(e) => handleChange(e, setValue)} offIcon={offIcon} onIcon={onIcon} />
}
export default IconSwitch
