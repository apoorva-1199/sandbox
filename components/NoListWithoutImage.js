import Typography from '@mui/material/Typography';
import * as React from 'react';
import IconButtonComponent from './IconButtonComponent';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';


const StyledTypography = styled(Typography)``;

function NoListWithoutImage(props) {
    const { title, titleVariantComponent, subtitle, textAlign, buttonProps, dataTid, titleAlign, marginNeeded, customButton, minHeight, display } = props;
    const theme = useTheme();

    return (
        <Box width={1} borderRadius="8px" p={4} bgcolor={theme.palette.primary.light} minHeight={minHeight} display={display}>
            <Box maxWidth={620} margin={marginNeeded == undefined || marginNeeded ? "auto" : "unset"}>
                <Box mb={1} color={theme.palette.background.contrastText} textAlign={'center'}>
                    <StyledTypography data-tid={`text-title-${dataTid}`} align={titleAlign ? titleAlign : "center"} variant="h6" component={titleVariantComponent || 'span'}>
                        {title}
                    </StyledTypography>
                </Box>
                <Box color={theme.palette.background.contrastText2} textAlign={'center'}>
                    <Typography data-tid={`text-subtitle-${dataTid}`} align={textAlign} variant="body1" component={'span'}>{subtitle}</Typography>
                </Box>
                {buttonProps && <Box mt={2} width={1} display='flex' justifyContent='center' color={theme.palette.background.contrastText}>
                    <IconButtonComponent variant={buttonProps.variant} color={buttonProps.color} onClick={buttonProps.onClick} data-tid={`button-${dataTid}`} >{buttonProps.label}</IconButtonComponent>
                </Box>}
                {customButton && <Box mt={2} width={1} display='flex' justifyContent='center'>
                    {customButton}
                </Box>}
            </Box>
        </Box>
    );
}

export default NoListWithoutImage;