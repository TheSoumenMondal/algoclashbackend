import app from "./app.js";
import serverConfig from "./config/serverConfig.js";
import connectDB from "./config/dbConfig.js";


connectDB().then(() => {
  app.listen(serverConfig.PORT, () => {
    console.log(`Server is running on port ${serverConfig.PORT}`);
  });
});
