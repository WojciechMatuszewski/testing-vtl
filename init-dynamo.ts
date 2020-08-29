import { createTable, putItem } from "./dynamo";

createTable()
  .then(putItem)
  .then(() => console.log("Ready to go!"))
  .catch(e => console.log("An error occurred", e));
