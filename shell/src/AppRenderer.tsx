import React from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router";
import * as h from "history";

async function insertScriptElUnlessAlreadyInTheDOM(parameters: {
  srcForScriptEl: string;
  idForScriptEl: string;
}): Promise<void> {
  const { srcForScriptEl, idForScriptEl } = parameters;

  return new Promise((resolve, reject) => {
    const anElementWithTheSameIdIsAlreadyInTheDOM =
      document.getElementById(idForScriptEl);

    if (anElementWithTheSameIdIsAlreadyInTheDOM) {
      resolve();
    } else {
      const script = document.createElement("script");
      script.src = srcForScriptEl;
      script.id = idForScriptEl;

      script.onload = () => resolve();
      script.onerror = (error) => {
        console.error(
          /* eslint-disable-line no-console */ `Error loading script with src ${srcForScriptEl}: `,
          error
        );
        reject(error);
      };

      document.head.appendChild(script);
    }
  });
}

interface AppRendererProps {
  path: string;
  app: string;
}

type RenderFunction = (insertionNodeId: string, history: h.History) => void;

const AppRenderer: React.FC<AppRendererProps> = ({ path, app }) => {
  const history = useHistory();
  const insertionNodeId = `insert-${app}`;
  const scriptId = `script-${app}`;

  useEffect(() => {
    (async () => {
      await insertScriptElUnlessAlreadyInTheDOM({
        srcForScriptEl: `/${path}/bundle.js`,
        idForScriptEl: scriptId,
      });

      const fn = (window as any)[`render${app}`] as RenderFunction;

      fn(insertionNodeId, history);
    })();

    return () => {
      const node = document.getElementById(insertionNodeId);
      if (node) ReactDOM.unmountComponentAtNode(node);

      const script = document.getElementById(scriptId);
      if (script) script.parentNode?.removeChild(script);
    };
  }, []);

  return <div id={insertionNodeId}></div>;
};

export { AppRenderer };
