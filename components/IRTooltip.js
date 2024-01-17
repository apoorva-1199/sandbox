import * as React from "react";
import { useCallback, useRef } from "react";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { createStyles, makeStyles } from '@mui/styles';;
import { useTheme } from '@mui/material/styles';


const useStyles = makeStyles((theme) =>
    createStyles({
        tooltip: {
            backgroundColor: theme.palette.background.contrastText,
            color: theme.palette.secondary.contrastText,
        },
    })
);

function IRTooltip(props) {
    const { title, ariaHidden } = props;

    const theme = useTheme();
    const classes = useStyles(theme);

    const [open, setOpen] = React.useState(false);
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);
    const childrenRef = useRef(null);
    const handleKeyDown = useCallback(
        (nativeEvent) => {
            if (nativeEvent.key === "Escape" || nativeEvent.key === "Esc") {
                onClose();
            }
        },
        [open]
    );

    React.useEffect(() => {
        if (!open) {
            return undefined;
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open]);

    const handleDisabledChange = useCallback(() => {
        if (childrenRef && childrenRef.current && childrenRef.current.disabled) {
            onClose();
        }
    }, [childrenRef.current]);

    React.useEffect(() => {
        handleDisabledChange();
    }, [props.children]);

    return title ? (
        <Tooltip
            title={
                <Typography aria-hidden={ariaHidden ? true : false} variant="caption">
                    {title}
                </Typography>
            }
            open={open}
            onOpen={onOpen}
            onClose={onClose}
            classes={{ tooltip: classes.tooltip }}
        >
            {React.cloneElement(props.children, {
                ref: props.childrenRef || childrenRef,
            })}
        </Tooltip>
    ) : (
        <>{props.children}</>
    );
}

export default IRTooltip;
