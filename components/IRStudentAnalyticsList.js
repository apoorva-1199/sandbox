import React from 'react';
import Icon from './Icon';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';
import IRTooltip from './IRTooltip';
import Body3Typography from './Body3Typography';
import ListItem from '@mui/material/ListItem';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InfoIcon from '@mui/icons-material/Info';


const StyledTypography = styled(Typography)`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: left;
//   margin-left: 16px;
  color: #292524;
`;

const StyledBody3Typo = styled(Body3Typography)`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: left;
  color: #292524;
`;

const StyledIcon2 = styled(Icon)`

`;

const StyledListBox = styled(ListItem)`
  width: 100%;
  outline-offset: -2px;
  border-bottom: 1px solid #dedede;
  padding: 16px 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  &:hover {
    background: #f0f0f0;
  }
`;

const StyledIcon = styled(Box)`
  display: flex;
  align-items: center;
  pointer-events: auto;
`;

const StyledBox = styled(Box)`
  svg {
    fill: #aa543a;
  }
`;

function IRStudentAnalyticsList(props) {
    let listData = props.listData;
    let colLabels = props.colLabels;
    const theme = useTheme();
    const [hoverIndex, setHoverIndex] = React.useState(0);
    const ListItemID = {
        NAME: 'name',
        PROGRESS: 'progress',
        AVGSCORE: 'avgScore',
        STATUS: 'status',
        ACTIONS: 'actions',
    };
    const shouldProgressBeVisible = true;

    //Defaults as per desktop
    let isMobile = false;
    let isLandscape = false;


    const setRightIconVisibility = index => {
        setHoverIndex(index);
    };

    let analyticsWidth = colLabels && `${50 / (colLabels.length - 1)}%`; // removing the index 0 label and equally dividing the rest cols

    const hasMoreOptions = listItem => {
        let iconPresent = listItem.items.find(el => el.id == ListItemID.ACTIONS);
        return iconPresent;
    };

    const keyDownHandler = (event, sortFunction) => {
        if (event.keyCode == 32 || event.keyCode == 13) {
            event.preventDefault();
            sortFunction();
        }
    };

    return (
        <Box>
            {colLabels && (
                <Box display="flex" py={1.5} justifyContent={!shouldProgressBeVisible && 'space-between'}>
                    {colLabels.map((col, index) => {
                        return (
                            <Box
                                width={col.width ? col.width : index == 0 ? '50%' : analyticsWidth}
                                display="flex"
                                maxWidth={col.maxWidth}
                                flex={shouldProgressBeVisible && col.flex}
                                pr={0.5}
                                alignItems="center"
                            >
                                <IRTooltip title={col.tooltip}>
                                    <Box
                                        aria-label={col.ariaLabel}
                                        display="flex"
                                        style={{ cursor: ((col.title && col.sortIcon) || (col.title && col.rightIcon)) ? 'pointer' : 'default' }}
                                        tabIndex={(col.title && col.sortIcon) || (col.title && col.rightIcon) ? 0 : -1}
                                        onKeyDown={e => keyDownHandler(e, col.onLabelClick)}
                                        role={(col.title && col.sortIcon) || (col.title && col.rightIcon) && 'button'}
                                        onMouseOver={() => {
                                            setRightIconVisibility(index);
                                        }}
                                        onMouseLeave={() => {
                                            setRightIconVisibility(null);
                                        }}
                                    >
                                        <Box display="inline-grid" alignItems="center">
                                            <StyledTypography
                                                data-tid={'value-' + col.dataTid}
                                                onClick={col.onLabelClick}
                                                fontColor={col.isSelected ? "#aa543a" : "#292524"}
                                                variant={col.typography || 'body1'}
                                                component="span"
                                            >
                                                {col.title}
                                            </StyledTypography>
                                        </Box>
                                        {col.sortIcon && col.isSelected && <StyledBox pl={1}>{ArrowDropDownIcon}</StyledBox>}
                                        {col.icon && (
                                            <Box pl={1} display="flex" alignItems="center">
                                                <StyledIcon2
                                                    style={{ cursor: 'pointer' }}
                                                    fontSize={'18px'}
                                                    data-tid={`icon-header-${index}`}
                                                    item={InfoIcon}
                                                    color={col.isSelected ? "#aa543a" : "#292524"}
                                                />
                                            </Box>
                                        )}
                                        {/* {col.rightIcon && (hoverIndex == index || col.isSelected) && <StyledBox>{col.rightIcon}</StyledBox>} */}
                                    </Box>
                                </IRTooltip>
                            </Box>
                        );
                    })}
                </Box>
            )}
            <Box role="list">
                {listData.map((listItem, listindex) => {
                    return (
                        <StyledListBox
                            button
                            role="listitem"
                            hasIcon={hasMoreOptions(listItem)}
                            data-tid={`list-${listindex}`}
                            readOnly={!props.itemClickHandler}
                            customPointer={listItem.customPointer}
                            disableRipple={true}
                            onClick={event => {
                                props.itemClickHandler && props.itemClickHandler(event, listItem.uuid, listItem.state);
                            }}
                            style={{ borderBottom: `${props.hideLastItemBorder && listindex === listData.length - 1 && 'unset'}` }}
                            justifyContent={shouldProgressBeVisible ? 'flex-start' : 'space-between'}
                        >
                            {listItem.items.map((item, index) => {
                                return (
                                    <Box width={item.width ? item.width : index == 0 ? '50%' : analyticsWidth} maxWidth={item.maxWidth} flex={shouldProgressBeVisible && item.flex} display="flex" mr={(!shouldProgressBeVisible && item.id === 'status') && '17%'}>
                                        {item.itemIcon && (
                                            <IRTooltip title={item.itemIcon.tooltip}>
                                                <StyledIcon>
                                                    <StyledIcon2
                                                        size={'medium'}
                                                        data-tid={`icon-${item.itemIcon.type}-${listindex}-${index}`}
                                                        color={item.itemIcon.color}
                                                        sx={{ fill: item.itemIcon.color }}
                                                        item={TrendingUpIcon} />
                                                </StyledIcon>
                                            </IRTooltip>
                                        )}
                                        {item.value && (
                                            <Box pl={item.itemIcon ? 1.5 : item.paddingLeft ? item.paddingLeft : 0} width="100%">
                                                {!item.isCustomComponent ? (
                                                    <Box display="inline-grid" width="100%">
                                                        <Box display={'flex'} alignItems={'center'}>
                                                            <Box display="inline-grid">
                                                                <IRTooltip title={item.tooltip}>
                                                                    <Box overflow="hidden" aria-label={item.ariaLabel} role={item.ariaLabel && "text"}>
                                                                        <StyledBody3Typo
                                                                            component='span'
                                                                            data-tid={`text-${item.id}-${listindex}-${index}`}
                                                                            fontColor={item.color}
                                                                            marginLeft={item.marginLeft}
                                                                            aria-hidden={!!item.ariaLabel}
                                                                        >
                                                                            {item.value}
                                                                        </StyledBody3Typo>
                                                                    </Box>
                                                                </IRTooltip>
                                                                {item.subtitle && (
                                                                    <IRTooltip title={item.subtitle}>
                                                                        <Box display="flex" alignItems="center">
                                                                            {item.subtitleIcon && (
                                                                                <StyledIcon>
                                                                                    <StyledIcon2
                                                                                        size={'medium'}
                                                                                        data-tid={`icon-subtitle-${item.id}-${listindex}-${index}`}
                                                                                        color={item.subtitleIcon.color}
                                                                                        item={item.subtitleIcon.icon}
                                                                                        margin={'0 8px 0 0'}
                                                                                    />
                                                                                </StyledIcon>
                                                                            )}
                                                                            <Box display="inline-grid" overflow="hidden">
                                                                                <StyledBody3Typo
                                                                                    data-tid={`text-subtitle-${item.id}-${listindex}-${index}`}
                                                                                    fontColor={item.color || "#6d6d6d"}
                                                                                    variant={item.typography ? item.typography : 'body2'}
                                                                                >
                                                                                    {item.subtitle}
                                                                                </StyledBody3Typo>
                                                                            </Box>
                                                                        </Box>
                                                                    </IRTooltip>
                                                                )}
                                                            </Box>
                                                            {item.itemRightIcon && (
                                                                <IRTooltip title={item.itemRightIcon.tooltip}>
                                                                    <Box pl={1} display="flex" alignItems="center">
                                                                        <StyledIcon2
                                                                            style={{ cursor: 'pointer' }}
                                                                            fontSize={'18px'}
                                                                            data-tid={`icon-${item.itemRightIcon.type}-${index}`}
                                                                            item={item.itemRightIcon.icon}
                                                                            color={item.itemRightIcon.color || "#292524"}
                                                                        />
                                                                    </Box>
                                                                </IRTooltip>
                                                            )}
                                                        </Box>
                                                    </Box>
                                                ) : (
                                                    <Box data-tid={`text-${item.id}-${listindex}-${index}`}>{item.value}</Box>
                                                )}
                                            </Box>
                                        )}
                                    </Box>
                                );
                            })}
                        </StyledListBox>
                    );
                })}
            </Box>
        </Box>
    );
}


export default IRStudentAnalyticsList;
