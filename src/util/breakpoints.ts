import { useMediaQuery, useTheme } from "@mui/material";
enum breakpoints {
    Xs,
    Sm,
    Md,
    Lg,
    Xl
}
/**
 * useBreakpoint
 * 
 * @returns 
 */
function currentBreakpoint():breakpoints {
    const theme = useTheme();

    /**
     * useMediaQuery
     *
     */
    const mq_xs = useMediaQuery(theme.breakpoints.only('xs'));
    const mq_sm = useMediaQuery(theme.breakpoints.only('sm'));
    const mq_md = useMediaQuery(theme.breakpoints.only('md'));
    const mq_lg = useMediaQuery(theme.breakpoints.only('lg'));

    /**
     * getBreakPointName
     *
     */
    
    if (mq_xs) {
        return breakpoints.Xs;
    }
    if (mq_sm) {
        return breakpoints.Sm;
    }
    if (mq_md) {
        return breakpoints.Md;
    }
    if (mq_lg) {
        return breakpoints.Lg;
    }
    else {
        return breakpoints.Xl;
    }
}

export {currentBreakpoint, breakpoints}