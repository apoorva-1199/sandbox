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
  fill: ${props => props.color && props.color};
  margin-right: 4px;
`;

class HomeModule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classDetails: null,
            loading: true,
            selectedTabProductCode: "component11633525148090",
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
        return {
            classDetails,
            loading: false,
            tabDetails,
            gradebookAnalytics,
            studentListWithAnalytics
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

    render() {
        const { classDetails, loading, selectedTabProductCode, tabDetails, gradebookAnalytics, studentListWithAnalytics } = this.state;
        const { theme } = this.props;
        const intl = intlModule;

        if (loading || !classDetails || !tabDetails) {
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

        function handleProductChange(selectedOption) {
            if (selectedTabProductCode != selectedOption) {
                this.setState({ selectedTabProductCode: selectedOption });
            }
        };

        function handleTabChange(event, selectedOption) {
            handleProductChange(selectedOption);
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
                        icon: null,
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
                        icon: null,
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
                        <Box pt={4} pb={4} display="flex" maxWidth="1280px" flexWrap="wrap">
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
                                                        <StyledIcon data-tid={'icon-' + analytics.dataTid} item={analytics.icon} color={analytics.iconColor} />
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
                        </Box>
                    </Box>
                </Box>
            </Box>)
    }

}



export default withRouter(HomeModule);
