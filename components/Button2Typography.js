import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import React from 'react';

export const Button2Typo = styled(Typography)`
    font-size: ${props => props.theme.typography.button2.fontSize};
    font-weight:${props => props.theme.typography.button2.fontWeight};
    line-height:${props => props.theme.typography.button2.lineHeight};
    letter-spacing:${props => props.theme.typography.button2.letterSpacing};
`
export default function Button2Typography(props) {
    return <Button2Typo {...props} />
}