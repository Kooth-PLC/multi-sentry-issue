import h from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ErrorBoundary } from "./ErrorBoundary";

declare global {
  interface Window {
    renderLandingPage: any;
    unmountLandingPage: any;
  }
}

const App = ({ history }: { history: h.History }) => {
  const fallbackHistory = createBrowserHistory(); // When running this micro-frontend locally on its own, it won't receive history (because it comes from the app shell). So we're creating a fallback value here.

  return (
    <Router history={history ?? fallbackHistory}>
      <ErrorBoundary>
        <main>
          <h1>Landing page</h1>
          <p>Landing page content</p>

          <Link to="/app-2">Sub page</Link>
        </main>
      </ErrorBoundary>
    </Router>
  );
};

window.renderLandingPage = (insertionNodeId: string, history: h.History) => {
  const insertionNode = document.getElementById(insertionNodeId);
  ReactDOM.render(<App history={history} />, insertionNode);
};

window.unmountLandingPage = (insertionNodeId: string) => {
  const insertionNode = document.getElementById(insertionNodeId);
  insertionNode && ReactDOM.unmountComponentAtNode(insertionNode);
};
