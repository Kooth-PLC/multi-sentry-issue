import h from "history";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ErrorBoundary } from "./ErrorBoundary";

declare global {
  interface Window {
    renderSubPage: any;
    unmountSubPage: any;
  }
}

const App = ({ history }: { history: h.History }) => {
  const fallbackHistory = createBrowserHistory(); // When running this micro-frontend locally on its own, it won't receive history (because it comes from the app shell). So we're creating a fallback value here.

  const [cat, setCat] = useState<string>();

  useEffect(() => {
    fetch("https://aws.random.cat/meow").then((r) => {
      r.json().then((json) => {
        setCat(json.file);
      });
    });
  }, []);

  return (
    <Router history={history ?? fallbackHistory}>
      <ErrorBoundary>
        <main>
          <h1>App 2</h1>
          <p>Sub page content</p>
          {!cat && <p>Loading...</p>}
          {cat && <img src={cat} alt="Cat" />}

          <Link to="/app-1">Landing page</Link>
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
