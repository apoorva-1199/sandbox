import * as React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useTheme } from '@mui/material/styles';

const defaultSize = 'default';
const propsMap = {
    size: 'fontSize',
};

/*  This function creates an iconProps object from propsMap and props and returns this very same object.  
    traverse the props object and apply the following rules for creating the iconProps:
        1. if props key present in propsMap then replace the key with respective propsMap value
        2. if key not present in propsMap then copy the same key value in iconMap
    for example: if props = {size: '100 px', color: 'red'} then this function returns {fontSize: '100 px', color:  'red'}; */
const createIconProps = (props) => {
    props.size = props.size ? props.size : defaultSize;
    let iconProps = {};
    Object.entries(props).forEach(([key, value]) => {
        const newKey = propsMap[key] ? propsMap[key] : key;
        iconProps[newKey] = value;
    });
    return iconProps;
};

export default function Icon(props) {
    const { flip, style, ...rest } = props;
    const theme = useTheme();
    const IconComponet = props.item || ErrorOutlineIcon;
    return (
        <IconComponet alt={props.alt || ""} {...createIconProps(Object.assign({}, rest))} style={{ ...style, transform: flip && theme.direction === 'rtl' && 'scaleX(-1)' }} />
    );
}
