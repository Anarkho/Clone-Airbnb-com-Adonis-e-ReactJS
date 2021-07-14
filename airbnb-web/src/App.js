import React, { Fragment } from "react";
import Routes from "./routes.js";
import { GlobalStyle } from "./styles/global.js";
const App = () => {
    return (
        <Fragment>
            <Routes/>;
            <GlobalStyle />
        </Fragment>
    )
}
export default App;