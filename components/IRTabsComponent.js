import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React from "react";
import styled from "styled-components";
import TabScrollButton from '@mui/material/TabScrollButton';
import { createStyles, makeStyles } from '@mui/styles';
import Skeleton from '@mui/material/Skeleton';

const useStyles = makeStyles(() =>
    createStyles({
        selected: {
            color: '#292524',
            backgroundColor: "#dedede"
        },
        tabRoot: {
            margin: "0px 24px 0px 0px",
            minHeight: 36,
            minWidth: 0,
            borderRadius: "4px",
            opacity: 1,
            color: "#292524",
            '&:last-child': {
                marginRight: 0
            },
            '&[data-focus-visible-added]': {
                outlineOffset: "-2px"
            }

        },
        scrollButtons: {
            width: '20px',
            '&:first-child': {
                paddingRight: "4px"
            },
            '&:last-child': {
                paddingLeft: "4px"
            }
        }
    })
)


const TabsBox = styled(Box)`
width: 100%;
`;

const StyledTab = styled(Tab)`
text-transform: none;

&:hover {
    background-color: #dedede;
	color: #292524;
  }

div{
    align-items: center;
}
`;

const StyledTabs = styled(Tabs)`
  align-items: center;
  min-height: 36px;
`;


function TabSkeleton() {
    return (
        <Box display="flex" alignItems="center">
            <Skeleton width={150} height={36} />
            <Box ml={3}>
                <Skeleton width={100} height={18} />
            </Box>
            <Box ml={3}>
                <Skeleton width={100} height={18} />
            </Box>
        </Box>
    );
}

export default function IRTabsComponent(props) {
    const classes = useStyles();

    const a11yProps = (index, id) => {
        return {
            'data-tid': `button-product-0-indx-${index}`,
            id: `product-tab-${id}-${index}`,
            'aria-controls': `product-tab-${id}-${index}`,
        };
    };

    const ScrollButtonComponent = (buttonProps) => {
        return !buttonProps.disabled ? <TabScrollButton data-tid={`button-scroll-${buttonProps.direction}`} {...buttonProps} /> : null;
    }

    return (
        <Box width={1}>
            <TabsBox full-width={props.isMobile}>
                <StyledTabs
                    value={props.selectedValue}
                    onChange={(props.onChange)}
                    TabIndicatorProps={{
                        style: {
                            display: 'none',
                        },
                    }}
                    variant="scrollable"
                    scrollButtons={props.isMobile ? "on" : "auto"}
                    aria-label="tab list"
                    ScrollButtonComponent={ScrollButtonComponent}
                    selectionFollowsFocus
                    classes={{ scrollButtons: classes.scrollButtons }}
                >
                    {
                        props.tabsConfig && props.tabsConfig.map((tab, index) => {
                            return <StyledTab classes={{ selected: classes.selected, root: classes.tabRoot }} padding={tab.padding} marginRight={props.tabSpacing} value={tab.id} label={tab.label} disabled={tab.disabled} {...a11yProps(index, tab.id)} />;
                        })
                    }
                </StyledTabs>
                {!props.tabsConfig && <TabSkeleton />}
            </TabsBox>
        </Box>
    );
}
