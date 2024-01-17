import styled from "styled-components";
import Typography from "@mui/material/Typography";
import React from 'react';

const StyledTypography = styled(Typography)`
    font-size: 1 rem;
    font-weight: 400;
    line-height: 1.4;
    font-family: "\"Work Sans\",\"Roboto\",\"Helvetica\",\"Arial\",sans-serif";
    letter-spacing: 0em;
`

export default function Body3Typography(props) {
    return <StyledTypography {...props} />
} 
