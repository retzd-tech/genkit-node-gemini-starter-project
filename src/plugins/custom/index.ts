import { genkitPlugin, GenkitError } from "@genkit-ai/core";
import { defineModel } from "@genkit-ai/ai/model";
import { simulateSystemPrompt } from "@genkit-ai/ai/model/middleware";
import { toGenerateRequest } from "@genkit-ai/ai/lib/generate";
import { z } from "zod";
import { Plugin } from "@genkit-ai/core";

export const myPlugin1 = genkitPlugin(
  "my-plugin1",
  async (options: { apiKey?: string }) => {
    defineModel(
      {
        // be sure to include your plugin as a provider prefix
        name: "my-plugin/my-model",
        // label for your model as shown in Genkit Developer UI
        label: "My Awesome Model",
        // optional list of supported versions of your model
        versions: ["my-model-001", "my-model-001"],
        // model support attributes
        supports: {
          multiturn: false, // true if your model supports conversations
          media: false, // true if your model supports multimodal input
          tools: false, // true if your model supports tool/function calling
          output: ["text", "json"], // types of output your model supports
        },
        // Zod schema for your model's custom configuration
        // configSchema: z.object({
        //   safetySettings: z.object({ response: z.string() }),
        // }),
        // list of middleware for your model to use
        use: [simulateSystemPrompt()],
      },
      async (options?: any): Promise<any> => {
        // const myModelRequest = toMyModelRequest(request);
        // const myModelResponse = await myModelApi(myModelRequest);
        return {
          "candidates": [
            {
              "index": 0,
              "message": {
                "role": "model",
                "content": [
                  {
                    "text": "example result"
                  }
                ]
              },
              "finishReason": "stop",
              "custom": {
                "safetyRatings": [
                  {
                    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    "probability": "NEGLIGIBLE"
                  },
                  {
                    "category": "HARM_CATEGORY_HATE_SPEECH",
                    "probability": "NEGLIGIBLE"
                  },
                  {
                    "category": "HARM_CATEGORY_HARASSMENT",
                    "probability": "NEGLIGIBLE"
                  },
                  {
                    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                    "probability": "NEGLIGIBLE"
                  }
                ]
              }
            }
          ],
          "custom": {
            "candidates": [
              {
                "content": {
                  "parts": [
                    {
                      "text": "s"
                    }
                  ],
                  "role": "model"
                },
                "finishReason": "STOP",
                "index": 0,
                "safetyRatings": [
                  {
                    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    "probability": "NEGLIGIBLE"
                  },
                  {
                    "category": "HARM_CATEGORY_HATE_SPEECH",
                    "probability": "NEGLIGIBLE"
                  },
                  {
                    "category": "HARM_CATEGORY_HARASSMENT",
                    "probability": "NEGLIGIBLE"
                  },
                  {
                    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                    "probability": "NEGLIGIBLE"
                  }
                ]
              }
            ]
          },
          "usage": {
            "inputCharacters": 1,
            "inputImages": 0,
            "outputCharacters": 1,
            "outputImages": 0
          },
          "latencyMs": 1900.0616250038147
        }
        // const a = request;
        // return {};
      }
    );
  }
);

export interface MyPluginOptions {
  apiKey?: string;
}

export const myPlugin2: Plugin<[MyPluginOptions] | []> = genkitPlugin(
  "myPlugin2",
  async (options?: any): Promise<{}> => {
    return { result: "test" };
  }
);
