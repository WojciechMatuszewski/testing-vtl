import * as path from "path";
import * as fs from "fs";
import { AppSyncUnitResolver } from "amplify-appsync-simulator/lib/resolvers";
import {
  AmplifyAppSyncSimulator,
  AmplifyAppSyncSimulatorAuthenticationType,
  RESOLVER_KIND
} from "amplify-appsync-simulator";
import { dynamoDBConfig } from "./dynamo";

const requestMappingTemplate = fs.readFileSync(
  path.join(__dirname, "./templates/request.template.vtl"),
  { encoding: "utf-8" }
);

const responseMappingTemplate = fs.readFileSync(
  path.join(__dirname, "./templates/response.template.vtl"),
  {
    encoding: "utf-8"
  }
);

describe("resolver", () => {
  it("works", async () => {
    const simulator = new AmplifyAppSyncSimulator();
    simulator.init({
      dataSources: [
        {
          type: "AMAZON_DYNAMODB",
          name: "dynamodb",
          config: dynamoDBConfig
        }
      ],
      appSync: {
        name: "mockAppsyncName",
        additionalAuthenticationProviders: [],
        defaultAuthenticationType: {
          authenticationType: AmplifyAppSyncSimulatorAuthenticationType.API_KEY
        }
      },
      schema: {
        content: `{type Query {mockQueryOperation: String}}`
      }
    });

    const resolver = new AppSyncUnitResolver(
      {
        requestMappingTemplate: requestMappingTemplate,
        responseMappingTemplate: responseMappingTemplate,
        kind: RESOLVER_KIND.UNIT,
        fieldName: "mockFieldName",
        typeName: "mockTypeName",
        dataSourceName: "dynamodb"
      },
      simulator
    );

    const result = await resolver.resolve(
      undefined,
      { id: "123" },
      // These fields are required but are empty. Again this is because we are only interested in mapping templates here.
      { appsyncErrors: [] },
      { fieldNodes: [] }
    );

    // item inserted inside `init-dynamo.ts`
    expect(result).toEqual({ content: "hello!", id: "123" });

    simulator.stop();
  });
});
