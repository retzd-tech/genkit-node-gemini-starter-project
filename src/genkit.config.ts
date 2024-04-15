import { configureGenkit } from "@genkit-ai/core";
import { googleAI } from "@genkit-ai/googleai";
import { myPlugin1 } from "./plugins/custom";

export default configureGenkit({
  plugins: [googleAI(), myPlugin1({ apiKey: "test" })],
  logLevel: "debug",
  enableTracingAndMetrics: true,
});
