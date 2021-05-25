import h from "history";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Router, Link, Route, Switch, useParams } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ErrorBoundary } from "./ErrorBoundary";

declare global {
  interface Window {
    renderSubPage: any;
    unmountSubPage: any;
  }
}

const ComponentOne = () => {
  const [cat, setCat] = useState<string>();

  useEffect(() => {
    fetch("https://aws.random.cat/meow").then((r) => {
      r.json().then((json) => {
        setCat(json.file);
      });
    });
  }, []);

  return (
    <main>
      <h1>App 2</h1>
      <p>Sub page content</p>
      {!cat && <p>Loading...</p>}
      {cat && (
        <img
          src={cat}
          alt="Cat"
          style={{ maxWidth: "100%", maxHeight: "20rem" }}
        />
      )}

      <p>
        <Link to="/app-1">Landing page</Link>
      </p>
      <p>
        <Link to="/app-2/hello">Sub-sub page</Link>
      </p>
      <p>
        <Link to="/app-2/world">Sub-sub page</Link>
      </p>
    </main>
  );
};

const ComponentTwo = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <main>
      <h1>App 2: {slug}</h1>
      <p>Some more sub page content</p>
      <p>
        <Link to="/app-1">Landing page</Link>
      </p>
      <p>
        <Link to="/app-2">Sub page</Link>
      </p>
    </main>
  );
};

const App = ({ history }: { history: h.History }) => {
  const fallbackHistory = createBrowserHistory(); // When running this micro-frontend locally on its own, it won't receive history (because it comes from the app shell). So we're creating a fallback value here.

  return (
    <Router history={history ?? fallbackHistory}>
      <ErrorBoundary>
        <main>
          <Switch>
            <Route exact path="/app-2/:slug">
              <ComponentTwo />
            </Route>
            <Route path="/app-2">
              <ComponentOne />
            </Route>
          </Switch>
        </main>
      </ErrorBoundary>
    </Router>
  );
};

window.renderSubPage = (insertionNodeId: string, history: h.History) => {
  const insertionNode = document.getElementById(insertionNodeId);
  ReactDOM.render(<App history={history} />, insertionNode);
};

window.unmountSubPage = (insertionNodeId: string) => {
  const insertionNode = document.getElementById(insertionNodeId);
  insertionNode && ReactDOM.unmountComponentAtNode(insertionNode);
};
