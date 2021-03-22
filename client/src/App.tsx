import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Chat from "./Components/Chat/Chat";
import Join from "./Components/Join/Join";
interface App {}

const App: React.FC<App> = ({}) => {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Join} />
            <Route path="/chat" component={Chat} />
        </BrowserRouter>
    );
};

export default App;
