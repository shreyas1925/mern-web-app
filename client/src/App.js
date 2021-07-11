import React, { createContext,useReducer} from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Login from "./Components/Login";
import Signup from "./Components/SignUp";
import Logout from "./Components/Logout";
import Error from "./Components/Error";
import NavBar from "./Components/NavBar";
import { initialState,reducer } from "./reducers/UserReducer";

export const UserContext = createContext();

const App = () => {

const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
    <UserContext.Provider value={{state,dispatch}}>
      <NavBar/>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route  path="/about">
          <About />
        </Route>

        <Route  path="/login">
       
          <Login />
        </Route>

        <Route  path="/contact">
          <Contact />
        </Route>

        <Route  path="/signup">
          <Signup />
        </Route>

        <Route  path="/logout">
          <Logout />
        </Route>

        <Route>
          <Error />
        </Route>
      </Switch>
      </UserContext.Provider>
    </>
  );
};

export default App;

