import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Body3Typography from './Body3Typography';
import React from 'react';
import styled from 'styled-components';


const TypographySubtitle1 = styled(CustomTypography)`
  color: #6d6d6d;
`;

const StyledTitle = styled(Typography)`
  color: #292524 ;
`;


export default function TitleSubtitleComponent(props) {
    const { title, subTitle } = props;
    const theme = useTheme();

    return (
        <>
            <Box>
                <Box>
                    <Box
                        display="flex"
                        alignItems={'flex-start'}
                        flexDirection={'inherit'}
                        mb={'8px'}
                    >
                        <Box>
                            <StyledTitle
                                data-tid={`text-pageTitle`}
                                component={'h1'}
                                variant={'h1'}
                            >
                                {title.text}
                            </StyledTitle>
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <TypographySubtitle1
                        data-tid={`text-pageSubTitle`}
                        component={'h2'}
                        variant={'subtitle2'}
                        font-color={theme.palette.background.contrastText}
                    >
                        {subTitle.text}
                    </TypographySubtitle1>
                </Box>
            </Box>
        </>
    );
}

function CustomTypography(props) {
    let { variant, ...restProps } = props;
    switch (variant) {
        case 'body3':
            return <Body3Typography {...restProps}>{props.children}</Body3Typography>;
        default:
            return (
                <Typography variant={variant} {...restProps}>
                    {props.children}
                </Typography>
            );
    }
}
