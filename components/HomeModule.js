import React from "react";
import Box from '@mui/material/Box';
import TitleSubtitleComponent from "./TitleSubtitleComponent";
import { withRouter } from "react-router-dom";
import enLocale from 'date-fns/locale/en-US';
import format from 'date-fns/format';
class HomeModule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classDetails: null,
            loading: true
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
        return {
            classDetails,
            loading: false
        };
    }

    static async getClassDetails() {
        const classDetailsResponse = await fetch("/api/classDetails");
        return classDetailsResponse.json();
    }

    async componentDidMount() {
        const { match } = this.props;
        this.setState({ loading: true });
        const initialState = await HomeModule.getInitialState(match.params);
        this.setState(initialState);
    }

    render() {
        const { classDetails, loading } = this.state;
        const { theme } = this.props;

        if (loading || !classDetails) {
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

        return (
            <Box sx={{ backgroundColor: theme.palette.primary.main }}>
                <Box mx={4} px={2}>
                    <Box pb={2}>
                        <Box pb={3} pt={3} display="flex" alignItems="center" justifyContent="space-between">
                            <TitleSubtitleComponent {...titleSubtitleComponentProps()} />
                        </Box>
                    </Box>
                </Box>
            </Box>)
    }

}



export default withRouter(HomeModule);
