import DynamoDB from "aws-sdk/clients/dynamodb";

const dynamoDBConfig = {
  region: "us-fake-1",
  accessKeyId: "fake",
  secretAccessKey: "fake",
  tableName: "todoTable",
  endpoint: "http://localhost:8000"
} as const;

const client = new DynamoDB({
  region: dynamoDBConfig.region,
  credentials: {
    secretAccessKey: dynamoDBConfig.secretAccessKey,
    accessKeyId: dynamoDBConfig.accessKeyId
  },
  endpoint: dynamoDBConfig.endpoint
});

async function createTable() {
  await client
    .createTable({
      TableName: "todoTable",
      KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
      AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
      BillingMode: "PAY_PER_REQUEST"
    })
    .promise();
}

async function putItem() {
  await client
    .putItem({
      TableName: "todoTable",
      Item: {
        id: {
          S: "123"
        },
        content: {
          S: "hello!"
        }
      }
    })
    .promise();
}

export { createTable, putItem, dynamoDBConfig };
