import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Layout from "components/layout";
import Page404 from "components/404";

import { routes } from "routes";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type Context = {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
};

export const UserContext = createContext<Context | null>(null);

type Props = {
  children: React.ReactNode;
};

const UserContextProvider = ({ children }: Props) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername("");
  }, []);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

const App = () => (
  <UserContextProvider>
    <Router>
      <Layout>
        <Switch>
          {routes.map((routeProps, index) => (
            <Route exact {...routeProps} key={index} />
          ))}
          <Route component={Page404} />
        </Switch>
      </Layout>
    </Router>
  </UserContextProvider>
);

export default App;
