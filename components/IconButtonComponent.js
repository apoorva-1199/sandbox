import Button from '@mui/material/Button';
import { createStyles, makeStyles } from '@mui/styles';
import * as React from "react";
import { useTheme } from '@mui/material/styles';


const useStyles = (props) =>
    makeStyles((theme) =>
        createStyles({
            root: {
                ...theme.typography.button, //adding default typography
                borderRadius: "8px",
                margin: props.margin,
                minWidth: props.minWidth,
                minHeight: props.minHeight ? props.minHeight : "40px",
                textDecoration:
                    theme.settings && theme.settings.underlineLinks
                        ? "underline"
                        : "none",
                padding: props.padding && props.padding,
                textTransform: 'none',
                outlineOffset: '2px',
                "&:disabled": {
                    //disabled button styles
                    pointerEvents: "auto",
                    cursor: "no-drop",
                    backgroundColor: `${theme.palette.grey["400"]}`,
                    color: `${theme.palette.background.contrastText}`,
                    border: "0px",
                    "&:hover": {
                        color: `${theme.palette.background.contrastText2}`,
                        border: "0px",
                        backgroundColor: `${theme.palette.grey["400"]}`,
                    },
                },
            },
            outlinedWithoutColor: {
                border: `1px solid ${props.isActive
                    ? theme.palette.primary.dark
                    : theme.palette.grey["900"]
                    }`,
                color: theme.palette.grey["900"],
                background: props.isActive ? theme.palette.primary.dark : undefined,
                "&:hover, &:focus": {
                    background: props.isActive
                        ? theme.palette.primary.dark
                        : theme.palette.grey["400"],
                    border: `1px solid ${props.isActive
                        ? theme.palette.primary.dark
                        : theme.palette.grey["900"]
                        }`,
                },
            },
            textRoot: {
                outlineOffset: '0px',
            },
            textWithoutColor: {
                color: theme.palette.grey["900"],
                "&:hover, &:focus": {
                    background: theme.palette.grey["400"],
                },
            },
            selectedTextWithColor: {
                color: theme.palette.secondary.main,
            },
            activeTextWithoutColor: {
                background: theme.palette.secondary.light,
                color: theme.palette.secondary.dark,
                "&:hover, &:focus": {
                    color: theme.palette.secondary.dark,
                    background: theme.palette.secondary.light,
                },
            },
            textWithSecondaryColor: {
                color: theme.palette.background.contrastText3,
            },
            containedSecondary: {
                "&:focus": {
                    background: theme.palette.secondary.dark,
                },
            }
        })
    )();

function IconButtonComponent(props) {
    const {
        children,
        margin,
        minWidth,
        minHeight,
        isActive = false,
        variant = "ghost",
        color = "default",
        disabled,
        padding,
        isSelected,
        ...rest
    } = props;
    const theme = useTheme();
    const classes = useStyles({ margin, minWidth, minHeight, isActive, padding });
    const variantMap = {
        primary: "contained",
        neutral: "outlined",
        ghost: "text",
    };
    const buttonVariant = variantMap[variant];
    const isContainedVariant = buttonVariant === "contained";
    const isContainedWithoutColor = isContainedVariant && color === "default";
    const isOutlinedWithoutColor =
        buttonVariant === "outlined" && color === "default";
    const isTextWithoutColor = !isSelected && (!buttonVariant || buttonVariant === "text") && color === "default";
    const isTextWithSecondaryColor =
        buttonVariant === "text" && color === "secondary";

    return (
        <Button
            ref={props.buttonRef}
            disableFocusRipple
            disableElevation
            variant={buttonVariant}
            disabled={disabled}
            color={isContainedWithoutColor ? "secondary" : color}
            classes={{
                root: classes.root,
                outlined: isOutlinedWithoutColor
                    ? classes.outlinedWithoutColor
                    : undefined,
                text: `${classes.textRoot} ${isTextWithoutColor
                    ? isActive
                        ? classes.activeTextWithoutColor
                        : classes.textWithoutColor
                    : isSelected
                        ? classes.selectedTextWithColor
                        : undefined}`,
                textSecondary: isTextWithSecondaryColor
                    ? isActive
                        ? classes.activeTextWithoutColor
                        : classes.textWithSecondaryColor
                    : undefined,
                containedSecondary: classes.containedSecondary
            }}
            {...rest}
        >
            {children}
        </Button>
    );
}

export default IconButtonComponent;
