import React, { Suspense } from "react";
import { withRouter } from "react-router-dom";

const styles = {
    container: {
        maxWidth: "120rem",
        padding: "3.2rem",
        margin: "50px auto",
        width: "800px",
        boxShadow:
            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
    },

    heading: {
        color: "#333333",
        letterSpacing: "0.1rem",
    },

    list: {
        marginLeft: "20px",
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
    },

    list_item: {
        color: "#333333",
        letterSpacing: "1.2px",
        fontSize: "1.6rem",
        alignItems: "center",
        padding: "0.2rem",
        borderRadius: "0.3rem",
    },
};

class About extends React.Component {
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
    }

    async componentDidMount() {
        const { match } = this.props;
        this.setState({ loading: true });
        const initialState = await About.getInitialState(match.params);
        this.setState(initialState);
    }

    render() {

        return (
            <Suspense fallback={<p>Loading...</p>}>
                <div style={styles.container}>
                    <div>
                        <h1 style={styles.heading}> Server React DOM APIs </h1>
                        <div style={styles.list}>
                            <p style={styles.list_item}>1. renderToPipeableStream</p>
                            <p style={styles.list_item}>2. renderToStaticNodeStream</p>
                            <p style={styles.list_item}>3. renderToReadableStream</p>
                            <p style={styles.list_item}>4. renderToStaticMarkup</p>
                            <p style={styles.list_item}>5. renderToString</p>
                        </div>
                    </div>
                </div>
            </Suspense>)
    }

}
export default withRouter(About);