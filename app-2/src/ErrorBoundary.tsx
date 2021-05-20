import * as React from "react";
import { useHistory } from "react-router";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

const AlertCard: React.FC = () => (
  <div>
    <p>Something went wrong. Please refresh the page and try again.</p>
  </div>
);

const DSN = "updateme";

const ErrorBoundary: React.FC = ({ children }) => {
  const history = useHistory() as any;

  React.useEffect(() => {
    Sentry.init({
      dsn: DSN,
      environment: "live",
      integrations: [
        new Integrations.BrowserTracing({
          routingInstrumentation: Sentry.reactRouterV5Instrumentation(history),
        }),
      ],
      tracesSampleRate: 1.0,
    });
  }, []);

  return (
    <Sentry.ErrorBoundary fallback={<AlertCard />}>
      {children}
    </Sentry.ErrorBoundary>
  );
};

export { ErrorBoundary };
