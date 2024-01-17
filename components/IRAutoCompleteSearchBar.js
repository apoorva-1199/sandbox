import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import Icon from './Icon';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CloseIcon from '@mui/icons-material/Close';
import InputBase from '@mui/material/InputBase';
import { makeStyles } from '@mui/styles';;
import { useTheme } from '@mui/material/styles';
import IconButtonComponent from './IconButtonComponent';
import TextField from '@mui/material/TextField';
import { debounce } from 'lodash';

const SearchResultType = {
    ITEM: 'item',
    CATEGORY: 'category',
    CUSTOM: 'custom',
    STUDENT: 'student',
    FAMILY: 'family',
}

const CUSTOM_TYPE = {
    NO_RESULT: 'no-result',
    MORE_RESULT: 'more-result',
}



const StyledAutocompleteSearchContainer = styled(Box)`
  border-radius: 8px;
  height: 40px;
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;
  border-bottom-left-radius:  0;
  border-bottom-right-radius:0;
  border: 1px solid #dedede;
  box-shadow: '0 0px 8px rgb(0 0 0 / 30%)';
  background-color: #faf8f7
  border-bottom-color: #ffffff;
`;

const StyledActiveAutocompleteSearchContainer = styled(Box)`
  height: 40px;
  width: 100%;
  position: relative;
  input {
    border-bottom-left-radius:'0';
    border-bottom-right-radius: '0';
    box-shadow:'0px 2px 8px 3px rgb(0 0 0 / 20%)';
  }
`;

const StyledIcon = styled(Icon)`
  margin-right: 8px;
  margin-left: 8px;
  z-index: 1;
  fill: #6b6665;
`;

const StyledNoSearchbox = styled(Box)`
  pointer-events: none;
  padding: 16px 8px;
`;

const StyledIconButtonComponent = styled(IconButtonComponent)`
  padding: 4px;
  margin-right: 4px;
`;
const StyledIconButtonComponent2 = styled(IconButtonComponent)`
  margin: 0px;
  padding: 0px;
`;

const StyledTextField = styled(TextField)`
  height: inherit;
`;

const HiddenLabel = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

const autocompleteSearchStyles = makeStyles(() => ({
    root: {
        '& fieldset': {
            display: 'none',
        },
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
    },
    inputRoot: {
        padding: '0 !important',
        fontSize: '18px',
        height: 'inherit',
        '& input': {
            padding: '0 40px 0 48px !important',
            border: `1px solid #dedede`,
            height: 'inherit',
            borderRadius: '8px',
            boxSizing: 'border-box',
            backgroundColor: '#ffffff',
        },
    },
    paper: {
        backgroundColor: 'transparent',
        border: 0,
        borderRadius: 0,
        boxShadow: 'none',
        '& ul': {
            border: `1px solid #dedede`,
            borderBottomLeftRadius: '12px',
            borderBottomRightRadius: '12px',
            borderTop: 0,
            backgroundColor: '#ffffff',
            boxShadow: '-5px 2px 9px -3px rgb(0 0 0 / 20%), 5px 2px 9px -3px rgb(0 0 0 / 20%)',
        },
        '& li': {
            padding: 0,
        },
        '& li[aria-disabled="true"]': {
            opacity: 1,
        },
        padding: '0 8px 8px 8px',
        margin: '0 -8px -8px -8px',
    },
    listbox: {
        padding: 0,
        '& $option:last-child': {
            '& div': {
                borderBottom: 'none',
            },
        },
    },
    popperDisablePortal: {
        top: '40px',
    },
    popper: {
        backgroundColor: 'transparent',
        zIndex: 1099,
    },
}));

const useStyles = makeStyles(() => ({
    search: {
        borderRadius: '4px',
        width: '100%',
        display: 'flex',
    },
    inputRoot: {
        width: 'inherit',
    },
    inputInput: {
        padding: "8px 8px 8px 0px",
        width: '100%',
        '&:placeholder-shown': {
            textOverflow: 'ellipsis',
        },
    },
    closeIcon: {
        padding: '0px',
        color: "#6b6665",
    },
}));
const SearchItemTypography = styled(Typography)`
  color: #292524;
  flex: 1;
`;
const SearchItemFamilyTypography = styled(Typography)`
  color: #6b6665;
  margin-left: 16px;
`;
const StyledTagBox = styled(Box)`
  height: 24px;
  min-width: 40px;
  border-radius: 12px;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #dedede;
`;
const StyledTypography = styled(Typography)`
  color: #292524;
`;

function IRAutocompleteSearchBar(props) {
    const classes = useStyles();
    const autocompleteSearchboxClasses = autocompleteSearchStyles();
    const theme = useTheme();
    const [searchString, setSearchString] = useState(props.searchString);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [autoCompleteEl, setAutoCompleteEl] = useState(null);
    const shiftTabPressedRef = useRef(false);
    const tabKeyPressedRef = useRef(false);
    const iconButtonRef = useRef();

    useEffect(() => {
        if (shiftTabPressedRef.current && autoCompleteEl) {
            autoCompleteEl.focus();
            shiftTabPressedRef.current = false;
        }
    }, [autoCompleteEl, shiftTabPressedRef]);

    useEffect(() => {
        if (tabKeyPressedRef.current && iconButtonRef.current) {
            iconButtonRef.current.focus();
            tabKeyPressedRef.current = false;
        }
    }, [iconButtonRef.current, tabKeyPressedRef]);

    useEffect(() => {
        setSearchString(props.searchString);
        if (props.handleKeyUp === false) {
            setIsSearchActive(false);
        }
        setSearchResult([]);
    }, [props.searchString, props.id]);

    const inputFocusedHandler = (event, isFocused) => {
        if (isFocused) {
            setIsSearchActive(true);
        } else {
            handKeyPressOnSerachBar(event, true, event.currentTarget.value);
            setSearchResult([]);
        }
    };

    const handKeyPressOnSerachBar = (event, forced = false, value) => {
        if (event.charCode == '13' || forced) {
            //Enter pressed
            if (!forced) {
                let searchString = event.target.value;
                setSearchString(searchString);
            }
            setIsSearchActive(false);
            let str = value || searchString;
            value && setSearchString(value);
            props.onEnterPress && props.onEnterPress(str);
        }
    };

    const getSearchMoreResultComponent = tempSearchStr => {
        return (
            <Box
                data-tid={'list-item-show-more-result'}
                onClick={event => {
                    handKeyPressOnSerachBar(event, true, tempSearchStr);
                }}
                display="flex"
                alignItems="left"
                width="100%"
                px={1}
                py={2}
                borderTop={`1px solid #dedede}`}
            >
                <StyledIcon item={SearchIcon} size={'large'} />
                <SearchItemTypography component="span" variant={'body1'}>
                    {`More search results for ${tempSearchStr}`}
                </SearchItemTypography>
                <StyledTypography>Press Enter</StyledTypography>
            </Box>
        );
    };

    const handleToggle = React.useCallback(
        debounce(str => {
            props.onKeyPress && props.onKeyPress(str);
        }, 1000),
        [],
    );

    const handleKeyUpOnSearch = event => {
        let searchString = event.target.value;
        props.onKeyPress && handleToggle(searchString);
    };

    const handleInputChange = event => {
        let tempSearchString = event.currentTarget.value;
        let tempSearchResult;
        if (tempSearchString && tempSearchString.length > 1) {
            tempSearchResult = props.getSearchResult(tempSearchString);
            if (tempSearchResult.length > 0) {
                tempSearchResult.push({
                    type: SearchResultType.CUSTOM,
                    cutomComponent: getSearchMoreResultComponent(tempSearchString),
                    value: tempSearchString,
                    id: CUSTOM_TYPE.MORE_RESULT,
                });
            } else {
                //No serach result found scenario
                tempSearchResult.push({
                    type: SearchResultType.CUSTOM,
                    cutomComponent: <Box>No result</Box>,
                    value: tempSearchString,
                    id: CUSTOM_TYPE.NO_RESULT,
                });
            }
        } else {
            tempSearchResult = [];
        }
        setSearchResult(tempSearchResult);
        setSearchString(tempSearchString);
    };

    const handleCloseClick = () => {
        setSearchResult([]);
        setSearchString('');
        props.onClose && props.onClose();
    };

    const CustomSearchResultList = ({ option, state }) => {
        let OptionComponent;
        switch (option.type) {
            case SearchResultType.ITEM:
            case SearchResultType.FAMILY:
            case SearchResultType.STUDENT:
                OptionComponent = (
                    <Box display="flex" data-tid={`list-item-${option.id}`} alignItems="left" width="100%" px={1} py={2} tabIndex={0}>
                        {option.icon && <StyledIcon item={option.icon} size={'24px'} />}
                        <SearchItemTypography component="span" isAFamily={option.type === SearchResultType.FAMILY} variant={'body1'}>
                            {option.value}
                        </SearchItemTypography>
                        {option.type === SearchResultType.FAMILY && (
                            <SearchItemFamilyTypography>{<FormattedMessage {...messages.bookCollection} />}</SearchItemFamilyTypography>
                        )}

                        {option.tags && option.tags.length > 0 ? (
                            <Box display={'flex'}>
                                {option.tags.map(tag => (
                                    <StyledTagBox>
                                        <StyledTypography data-tid={`text-tag-${tag}`}>{tag}</StyledTypography>
                                    </StyledTagBox>
                                ))}
                            </Box>
                        ) : (
                            <></>
                        )}
                    </Box>
                );
                break;
            case SearchResultType.CATEGORY:
                break;
            case SearchResultType.CUSTOM:
                OptionComponent = option.cutomComponent;
                break;
            default:
                break;
        }

        return OptionComponent;
    };

    const searchOptionSelectionHandler = (id, isAFamily, isPlaceholder) => {
        setSearchResult([]);
        setSearchString('');
        props.onItemClick(id, isAFamily, isPlaceholder);
    };

    const activeSearchBarCloseIconClick = (event, value, reason) => {
        if (reason == 'clear') {
            setSearchResult([]);
            setSearchString('');
            props.handleKeyUp && props.onClose && props.onClose();
        }
        if (reason == 'select-option') {
            if (value.type == SearchResultType.CUSTOM) {
                handKeyPressOnSerachBar(event, true, value.value);
                setSearchResult([]);
            } else {
                searchOptionSelectionHandler(value.id, value.type === SearchResultType.FAMILY, value.isPlaceholder);
            }
        }
    };

    const disableNoSearchOption = option => {
        return option.id == CUSTOM_TYPE.NO_RESULT;
    };


    const onKeyDown = event => {
        if (!event.shiftKey && event.keyCode == 9) {
            //If tab key is pressed, we set tabKeyPressedRef to true, and as soon as the close icon ref is set, we give it focus
            tabKeyPressedRef.current = true;
        } else if (event.shiftKey && event.keyCode == 9) {
            //If Shift + tab key is pressed, we set shiftTabPressedRef to true, and as soon as the autocomplete container ref is set, we give it focus
            shiftTabPressedRef.current = true;
        }
    };

    return isSearchActive ? (
        <StyledActiveAutocompleteSearchContainer
            isOptionsPresent={!props.hideAutocompleteResult && searchResult && searchResult.length > 0}
            tabIndex={0}
            id={props.id}
        >
            <Box display="flex" alignItems="center" paddingLeft={'9px'} height="100%">
                <StyledIcon data-tid="icon-autocomplete-search" item={SearchIcon} size={'large'} />
            </Box>
            <Autocomplete
                closeIcon={
                    <StyledIconButtonComponent2
                        hoverColor="transparent"
                        iconConfig={{ icon: CloseIcon, color: '#7f7a79', width: '20px', height: '20px' }}
                        aria-label={"Search close icon"}
                        tooltipText={"Clear text"}
                    />
                }
                id="serach-input"
                freeSolo
                open
                clearText=""
                options={props.hideAutocompleteResult ? [] : searchResult}
                fullWidth
                disablePortal
                onChange={(event, value, reason) => {
                    activeSearchBarCloseIconClick(event, value, reason);
                }}
                classes={{
                    ...autocompleteSearchboxClasses,
                    listbox: `${autocompleteSearchboxClasses.listbox}`,
                }}
                getOptionDisabled={option => disableNoSearchOption(option)}
                value={searchString && searchString.length > 0 ? searchString : null}
                renderInput={params => (
                    <StyledTextField
                        data-tid={'input-serach-box'}
                        autoFocus
                        autoComplete="on"
                        onKeyPress={event => {
                            handKeyPressOnSerachBar(event);
                        }}
                        onChange={event => {
                            handleInputChange(event);
                        }}
                        onKeyUp={event => {
                            handleKeyUpOnSearch(event);
                        }}
                        onBlur={event => {
                            inputFocusedHandler(event, false);
                        }}
                        onKeyDown={onKeyDown}
                        {...params}
                        placeholder={props.placeholder}
                        variant="outlined"
                    />
                )}
                getOptionLabel={(option) => {
                    return option.value ? option.value : option;
                }}
                renderOption={(option, state) => {
                    return <CustomSearchResultList option={option} state={state} />;
                }}
            />
        </StyledActiveAutocompleteSearchContainer>
    ) : (
        <StyledAutocompleteSearchContainer
            ref={autoCompleteRef => {
                setAutoCompleteEl(autoCompleteRef);
            }}
            tabIndex={0}
            id={props.id}
            role="searchbox"
            aria-label={"Search Close"}
        >
            <Box display="flex" alignItems="center" pl={1}>
                <StyledIcon item={SearchIcon} data-tid="icon-autocomplete-search" size={'large'} />
            </Box>
            <HiddenLabel htmlFor="searchBox">Search Box</HiddenLabel>
            <InputBase
                data-tid="input-autocomplete-searchtextbox"
                autoComplete="on"
                id={'searchBox'}
                onBlur={event => {
                    inputFocusedHandler(event, false);
                }}
                onFocus={event => {
                    inputFocusedHandler(event, true);
                }}
                placeholder={props.placeholder}
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                value={searchString}
                inputProps={{
                    style: {
                        fontSize: '18px',
                        color: '#292524',
                    },
                }}
            />
            {searchString && (
                <Box display="flex" alignItems="center">
                    <StyledIconButtonComponent
                        iconButtonRef={iconButtonRef}
                        onClick={() => handleCloseClick()}
                        iconConfig={{
                            icon: HighlightOffIcon,
                        }}
                        data-tid={'icon-close-search'}
                        aria-label={"Close Search"}
                        tooltipText={"Clear Text"}
                    />
                </Box>
            )}
        </StyledAutocompleteSearchContainer>
    );
}

export default IRAutocompleteSearchBar;
