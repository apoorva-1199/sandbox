import React from "react";
import Box from '@mui/material/Box';
import TitleSubtitleComponent from "./TitleSubtitleComponent";
import { withRouter } from "react-router-dom";
import enLocale from 'date-fns/locale/en-US';
import format from 'date-fns/format';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import IRTabsComponent from "./IRTabsComponent";
import Icon from "./Icon";
import * as intlModule from 'react-intl';
import IRAutocompleteSearchBar from "./IRAutoCompleteSearchBar";
import TableSortLabel from '@mui/material/TableSortLabel';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import InfoIcon from '@mui/icons-material/Info';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import GetTimeComponent from "./GetTimeComponent";
import GetTimeSpent from "./GetTimeSpent";
import IRStudentAnalyticsList from "./IRStudentAnalyticsList";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import NoListWithoutImage from "./NoListWithoutImage";
import { withTheme } from '@mui/styles';

const StyledToggleButtonTypography = styled(Typography)`
  color: #292524;
  text-transform: none;
  display: flex;
  align-items: center;
`;

const StyledTypography = styled(Typography)`
  color: #292524
`;

const StyledIcon = styled(Icon)`
  margin-right: 4px;
`;

const StyledTableSortLabel = styled(TableSortLabel)`
   {
    &.MuiTableSortLabel-icon {
      fill: #b45c3d;
    }
  }
`;

const ORDER = {
    ASC: 'asc',
    DESC: 'desc',
}


const ORDERBY = {
    NAME: 'name',
    LASTACTIVE: 'lastActive',
    TIME: 'time',
    SCORE: 'score',
    COMPLETION: 'completion',
}

class HomeModule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classDetails: null,
            loading: true,
            selectedTabProductCode: "component11633525148090",
            orderBy: ORDERBY.NAME,
            order: ORDER.DESC,
            percentageCompletion: null
        };
        if (this.props.staticContext && this.props.staticContext.initialState) {
            this.state = Object.assign(
                this.state,
                this.props.staticContext.initialState
            );
        }
    }

    static async getInitialState(matchParams) {
        if (
            typeof window !== "undefined" &&
            window.__INITIAL_STATE__ &&
            window.__INITIAL_STATE__ !== "__INITIAL_STATE__"
        ) {
            const initialState = window.__INITIAL_STATE__;
            // need to delete the initial state so that subsequent
            // navigations do not think they were server side rendered
            // and pull up the wrong initial state
            delete window.__INITIAL_STATE__;
            return initialState;
        }
        const classDetails = await this.getClassDetails();
        const tabDetails = await this.getTabDetails();
        const gradebookAnalytics = await this.getGradebookAnalytics();
        const studentListWithAnalytics = await this.getStudentAnalyticsList();
        let completionArray = gradebookAnalytics.data.products.map(el => el.__analytics.percentageCompletion);
        let percentageCompletion = completionArray.reduce((a, b) => a + b, 0);
        return {
            classDetails,
            loading: false,
            tabDetails,
            gradebookAnalytics,
            studentListWithAnalytics,
            percentageCompletion
        };
    }

    static async getClassDetails() {
        const classDetailsResponse = await fetch("/api/classDetails");
        return classDetailsResponse.json();
    }

    static async getTabDetails() {
        const tabDetailsResponse = await fetch("/api/tabDetails");
        return tabDetailsResponse.json();
    }

    static async getGradebookAnalytics() {
        const gradebookAnalytics = await fetch("/api/gradebookAnalytics");
        return gradebookAnalytics.json();
    }

    static async getStudentAnalyticsList() {
        const studentListWithAnalytics = await fetch("/api/studentListWithAnalytics");
        return studentListWithAnalytics.json();
    }

    async componentDidMount() {
        const { match } = this.props;
        this.setState({ loading: true });
        const initialState = await HomeModule.getInitialState(match.params);
        this.setState(initialState);
    }
    handleSelectedProductChange = (product) => {
        this.setState({ selectedTabProductCode: product });
    }

    render() {
        const { classDetails, loading, selectedTabProductCode, tabDetails, gradebookAnalytics, studentListWithAnalytics, percentageCompletion, orderBy, order } = this.state;
        const { theme } = this.props;
        const intl = intlModule;

        if (loading || !classDetails || !tabDetails || !gradebookAnalytics) {
            return <div>Loading...</div>;
        }

        function timeStampToDateInLocale(timeStamp) {
            let date = new Date(timeStamp);
            let dateString = format(date, 'EEE MMM dd yyyy', {
                locale: enLocale,
            }).split(' ');

            let dateInFormat = `${dateString[1]} ${dateString[2]}, ${dateString[3]}`;

            return dateInFormat;
        };

        function titleSubtitleComponentProps() {
            let classObj = classDetails && classDetails.class;
            let startDate = timeStampToDateInLocale(classObj.startdate);
            let endDate = timeStampToDateInLocale(classObj.enddate);
            if (classObj) {
                return {
                    title: {
                        text: "Gradebook",
                    },
                    subTitle: {
                        variant: 'subtitle2',
                        text: `Class Dates: ${startDate} - ${endDate}`,
                    },
                };
            } else return {};
        }

        function getToggleButtonConfig() {
            let productArray = [];
            if (tabDetails) {
                productArray = tabDetails.tabs.map((product) => (
                    {
                        id: product.code,
                        label: (
                            <StyledToggleButtonTypography component={'span'} variant="body1">
                                {product.config.title.defaultMessage}
                            </StyledToggleButtonTypography>
                        ),
                    }));
            }


            return productArray;
        };

        function onEnterPress() {

        }
        function onItemClick() {

        }

        function getSearchResult() {

        }

        function closeClickSearchHandler() {

        }

        const getSortIcon = (orderById) => {
            return (
                <StyledTableSortLabel
                    aria-label={"Sort"}
                    active={true}
                    tabIndex={-1}
                    direction={orderBy === orderById ? order : ORDER.ASC}
                    onClick={() => {
                        handleRequestSort(orderById);
                    }}
                    IconComponent={ArrowDropDownIcon}
                    role="img"
                />
            );
        };

        const searchBarProps = {
            placeholder: "Search",
            getSearchResult: getSearchResult,
            onClose: closeClickSearchHandler,
            onItemClick: onItemClick,
            onEnterPress: onEnterPress,
            id: 'main-focus-area',
        };



        const handleTabChange = (event, selectedOption) => {
            if (selectedTabProductCode != selectedOption) {
                this.handleSelectedProductChange(selectedOption);
            }
        };

        function tabsProps() {
            return {
                selectedValue: selectedTabProductCode,
                onChange: handleTabChange,
                tabsConfig: getToggleButtonConfig(),
            };
        }

        const getEmDash = () => {
            return '—';
        };

        const getEnDash = () => {
            return '–';
        }

        function productAnalyticsSummaryConfig() {
            let passingScore = 70;
            let abovePassingScoreCount = 0;
            let belowPassingScoreCount = 0;
            let totalStudentCount = gradebookAnalytics.data.students.length;
            gradebookAnalytics.data.students.forEach((student, index) => {
                let studentProductAnalytics = student.products[selectedTabProductCode] && student.products[selectedTabProductCode].__analytics;
                studentProductAnalytics && studentProductAnalytics.grade && Math.round(studentProductAnalytics.grade) < parseFloat(passingScore)
                    ? belowPassingScoreCount++
                    : abovePassingScoreCount++;
            });
            let selectedTabProduct = gradebookAnalytics.data.products.find(product => product.meta.productcode == selectedTabProductCode);
            let analytics = [];
            if (
                selectedTabProduct &&
                selectedTabProduct.__analytics.percentageCompletion &&
                Math.round(selectedTabProduct.__analytics.percentageCompletion) > 0
            ) {
                analytics.push(
                    {
                        title: selectedTabProduct['__analytics'].scorableItems ? (
                            abovePassingScoreCount > 1 ?
                                (
                                    `${abovePassingScoreCount} Students`
                                ) : (
                                    `${abovePassingScoreCount} Student`
                                )
                        ) : (
                            getEmDash()
                        ),
                        subtitle: `Above ${passingScore}%`,
                        icon: ArrowUpwardIcon,
                        iconColor: "#28691b",
                        iconText: `${Math.round((abovePassingScoreCount / totalStudentCount) * 100)}%`,
                        width: '30%',
                        dataTid: 'above-passing-score',
                    },
                    {
                        title: selectedTabProduct['__analytics'].scorableItems ? (
                            belowPassingScoreCount > 1 ? (
                                `${belowPassingScoreCount} Students`
                            ) : (
                                `${belowPassingScoreCount} Student`
                            )
                        ) : (
                            getEmDash()
                        ),
                        subtitle: `Below ${passingScore}%`,
                        icon: ArrowDownwardIcon,
                        iconColor: "#df2020",
                        iconText: `${Math.round((belowPassingScoreCount / totalStudentCount) * 100)}%`,
                        width: '30%',
                        dataTid: 'below-passing-score',
                    },
                    {
                        title: selectedTabProduct['__analytics'].scorableItems ? `${Math.round(selectedTabProduct.__analytics.grade)}%` : getEmDash(),
                        subtitle: "Average Score",
                        width: '20%',
                        dataTid: 'average-score',
                    },
                    {
                        title: `${Math.round(selectedTabProduct.__analytics.percentageCompletion)}%`,
                        subtitle: "Average Completion",
                        width: '20%',
                        dataTid: 'average-completion',
                    },
                );
            }
            return analytics;
        }

        const studentListItemClickHandler = () => {

        }

        const renderDetails = () => {
            let studentAnalyticsList = [];
            if (gradebookAnalytics) {
                let selectedTabProduct = gradebookAnalytics.data.products.find(product => product.meta.productcode == selectedTabProductCode);
                gradebookAnalytics.data.students.forEach((student, index) => {
                    let studentAnalytics = student.products[selectedTabProductCode] && student.products[selectedTabProductCode].__analytics;
                    if (studentAnalytics) {
                        let isBelowPassingScore = Math.round(studentAnalytics.grade) < parseFloat(70);
                        let completionPercentage = Math.round(studentAnalytics.percentageCompletion);
                        let studentData = {
                            uuid: `${student.meta.uuid}`,
                            meta: {
                                name: `${student.meta.fn} ${student.meta.ln ? student.meta.ln : ''}`,
                            },
                            items: [
                                {
                                    id: 'name',
                                    value: `${student.meta.fn} ${student.meta.ln ? student.meta.ln : ''}`,
                                    itemIcon: selectedTabProduct['__analytics'].scorableItems
                                        ? {
                                            icon: isBelowPassingScore ? TrendingDownIcon : TrendingUpIcon,
                                            color: isBelowPassingScore ? "#df2020" : "#28691b",
                                            type: isBelowPassingScore ? 'below' : 'above',
                                        }
                                        : null,
                                    width: '40%',
                                    flex: 1,
                                },
                                {
                                    id: 'lastActive',
                                    value: <GetTimeComponent lastAccessed={student.meta.lastActive} />,
                                    width: '17%',
                                    color: theme.palette.surface.contrastText2,
                                    typography: 'body1',
                                    originalValue: student.meta.lastActive,
                                    maxWidth: '180px',
                                },
                                {
                                    id: 'time',
                                    value: completionPercentage == 0 ? getEnDash() : <GetTimeSpent timestamp={studentAnalytics.ts} />,
                                    width: '13%',
                                    color: theme.palette.surface.contrastText2,
                                    typography: 'body1',
                                    originalValue: completionPercentage == 0 ? 0 : studentAnalytics.ts,
                                    marginLeft: completionPercentage == 0 && '16px',
                                    maxWidth: '180px',
                                },
                            ],
                        };

                        if (selectedTabProduct['__analytics'].scorableItems) {
                            studentData.items.push({
                                id: 'score',
                                value: completionPercentage == 0 ? getEnDash() : `${Math.round(studentAnalytics.grade)}%`,
                                width: '15%',
                                color: theme.palette.surface.contrastText2,
                                typography: 'body1',
                                originalValue: completionPercentage == 0 ? -1 : Math.round(studentAnalytics.grade),
                                marginLeft: completionPercentage == 0 && '16px',
                                maxWidth: '180px',
                            });
                        }
                        studentData.items.push({
                            id: 'completion',
                            value: `${completionPercentage}%`,
                            width: '15%',
                            color: theme.palette.surface.contrastText2,
                            typography: 'body1',
                            originalValue: completionPercentage,
                            maxWidth: '180px',
                        });
                        studentAnalyticsList.push(studentData);
                    }
                });
            }
            return studentAnalyticsList;
        }

        const handleRequestSort = (property) => {

        };

        const colLabels = () => {
            let selectedTabProduct = gradebookAnalytics.data.products.find(product => product.meta.productcode == selectedTabProductCode);
            const tabName = tabDetails.tabs.find(item => {
                return item.code === selectedTabProductCode;
            });

            let columns = [
                {
                    title: "Name",
                    dataTid: 'name',
                    width: '40%',
                    rightIcon: getSortIcon(ORDERBY.NAME),
                    isSelected: true,
                    onLabelClick: () => {
                        handleRequestSort(ORDERBY.NAME);
                    },
                    flex: 1,
                    ariaLabel:
                        orderBy === ORDERBY.NAME
                            ? order === ORDER.ASC
                                ? "Sort by Ascending"
                                : "Sort by Descending"
                            : '',
                },
                {
                    title: "Last Active",
                    icon: InfoIcon,
                    tooltip: "Last Active",
                    dataTid: 'last-active',
                    width: '17%',
                    rightIcon: getSortIcon(ORDERBY.LASTACTIVE),
                    isSelected: ORDERBY.LASTACTIVE == orderBy,
                    onLabelClick: () => {
                        handleRequestSort(ORDERBY.LASTACTIVE);
                    },
                    maxWidth: '180px',
                    ariaLabel:
                        orderBy === ORDERBY.LASTACTIVE
                            ? order === ORDER.ASC
                                ? "Sort by Ascending"
                                : "Sort by Descending"
                            : '',
                },
                {
                    title: "Time Spent",
                    icon: InfoIcon,
                    tooltip: "Time spent",
                    dataTid: 'time',
                    width: '13%',
                    rightIcon: getSortIcon(ORDERBY.TIME),
                    isSelected: ORDERBY.TIME == orderBy,
                    onLabelClick: () => {
                        handleRequestSort(ORDERBY.TIME);
                    },
                    maxWidth: '180px',
                    ariaLabel:
                        orderBy === ORDERBY.TIME
                            ? order === ORDER.ASC
                                ? "Sort by Ascending"
                                : "Sort by Descending"
                            : '',
                },
            ];

            if (selectedTabProduct && selectedTabProduct['__analytics'] && selectedTabProduct['__analytics'].scorableItems) {
                columns.push({
                    title: "Score",
                    icon: InfoIcon,
                    tooltip: "Score",
                    dataTid: 'score',
                    width: '15%',
                    rightIcon: getSortIcon(ORDERBY.SCORE),
                    isSelected: ORDERBY.SCORE == orderBy,
                    onLabelClick: () => {
                        handleRequestSort(ORDERBY.SCORE);
                    },
                    maxWidth: '180px',
                    ariaLabel:
                        orderBy === ORDERBY.SCORE
                            ? order === ORDER.ASC
                                ? "Sort by Ascending"
                                : "Sort by Descending"
                            : '',
                });
            }

            columns.push({
                title: "Completion",
                icon: InfoIcon,
                tooltip: "Completion",
                dataTid: 'completion',
                width: '15%',
                rightIcon: getSortIcon(ORDERBY.COMPLETION),
                isSelected: ORDERBY.COMPLETION == orderBy,
                onLabelClick: () => {
                    handleRequestSort(ORDERBY.COMPLETION);
                },
                maxWidth: '180px',
                ariaLabel:
                    orderBy === ORDERBY.COMPLETION
                        ? order === ORDER.ASC
                            ? "Sort by Ascending"
                            : "Sort by Descending"
                        : '',
            });

            return columns;
        };

        return (
            <Box sx={{ backgroundColor: theme.palette.primary.main }}>
                <Box mx={4} px={2}>
                    <Box pb={2}>
                        <Box pb={3} pt={3} display="flex" alignItems="center" justifyContent="space-between">
                            <TitleSubtitleComponent {...titleSubtitleComponentProps()} />
                        </Box>
                        <Box>
                            <IRTabsComponent isMobile={false} {...tabsProps()}></IRTabsComponent>
                        </Box>
                        <Box pt={productAnalyticsSummaryConfig().length <= 0 ? 2 : 4} pb={productAnalyticsSummaryConfig().length <= 0 ? 2 : 4} display="flex" maxWidth="1280px" flexWrap="wrap" justifyContent={productAnalyticsSummaryConfig().length <= 0 && "center"}>
                            {
                                productAnalyticsSummaryConfig().length <= 0 ?
                                    <Box my={2} maxWidth={'1200px'}>
                                        <NoListWithoutImage
                                            dataTid="noAnalytics"
                                            title={'No progress to show yet'}
                                            subtitle={'Once students submit actvities, you can view their progress here.'}
                                            textAlign={'left'}
                                            titleAlign={'left'}
                                            marginNeeded={true}
                                        />
                                    </Box> :
                                    <>
                                        {productAnalyticsSummaryConfig().map((analytics, index, arr) => {
                                            return (
                                                <>
                                                    <Box
                                                        display={'flex'}
                                                        alignItems={'center'}
                                                        justifyContent={'center'}
                                                        mt={index > 1 && 1.5}
                                                        py={3}
                                                        px={3}
                                                        paddingRight={index > 3 && 0}
                                                        borderLeft={index > 0 && `1px solid ${theme.palette.grey['400']}`}
                                                        width={analytics.width}
                                                        flex={'1'}
                                                    >
                                                        <>
                                                            <Box>
                                                                <StyledTypography
                                                                    data-tid={'title-' + analytics.dataTid}
                                                                    color={theme.palette.surface.contrastText}
                                                                    style={{ paddingBottom: '8px' }}
                                                                    variant={'h6'}
                                                                    component={'p'}
                                                                >
                                                                    {analytics.title}
                                                                </StyledTypography>
                                                                <StyledTypography
                                                                    data-tid={'value-' + analytics.dataTid}
                                                                    color={theme.palette.surface.contrastText2}
                                                                    variant={'body1'}
                                                                >
                                                                    {analytics.subtitle}
                                                                </StyledTypography>
                                                            </Box>
                                                            {analytics.icon && (
                                                                <Box display="flex" pl={1}>
                                                                    <StyledIcon sx={{ fill: analytics.iconColor }} data-tid={'icon-' + analytics.dataTid} item={analytics.icon} color={analytics.iconColor} />
                                                                    <StyledTypography data-tid={'value-' + analytics.dataTid} color={analytics.iconColor}>
                                                                        {analytics.iconText}
                                                                    </StyledTypography>
                                                                </Box>
                                                            )}
                                                        </>
                                                    </Box>
                                                </>
                                            );
                                        })}
                                    </>}
                        </Box>
                        <Box display="flex" pb={2}>
                            <StyledTypography variant="h4" color={theme.palette.surface.contrastText}>
                                Students
                            </StyledTypography>
                        </Box>
                        <Box display="flex" pb={3}>
                            <Box flex={1}>
                                <Box maxWidth={'400px'}>
                                    <IRAutocompleteSearchBar {...searchBarProps} />
                                </Box>
                                <Box maxWidth={'1500px'}>
                                    <IRStudentAnalyticsList
                                        colLabels={colLabels()}
                                        listData={renderDetails()}
                                        itemClickHandler={studentListItemClickHandler}
                                    ></IRStudentAnalyticsList>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>)
    }

}



export default withTheme(withRouter(HomeModule));
