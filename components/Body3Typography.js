import styled from '@emotion/styled'
import Typography from "@mui/material/Typography";
import React from 'react';

const StyledTypography = styled(Typography)`
    font-size: ${props => props.theme.typography.body3.fontSize};
    font-weight: ${props => props.theme.typography.body3.fontWeight};
    line-height: ${props => props.theme.typography.body3.lineHeight};
    font-family: ${props => props.theme.typography.body3.fontFamily};
    letter-spacing: ${props => props.theme.typography.body3.letterSpacing};
`

export default function Body3Typography(props) {
    return <StyledTypography {...props} />
} 
