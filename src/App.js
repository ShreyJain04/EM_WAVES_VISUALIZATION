// src/App.js
import React from "react";
import { ParameterProvider } from "./components/context";
import ParameterControls from "./components/parameterControls";
import FieldVisualization from "./components/fieldVisualisation";
import Legend from "./components/legend";

function App() {
  return (
    <ParameterProvider>
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "250px",
            padding: "10px",
            backgroundColor: "#f7f7f7",
          }}
        >
          <ParameterControls />
          {/* <Legend /> */}
        </div>
        <div style={{ flexGrow: 1 }}>
          <FieldVisualization />
        </div>
      </div>
    </ParameterProvider>
  );
}

export default App;
