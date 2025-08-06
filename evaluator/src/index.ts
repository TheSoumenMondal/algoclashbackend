import app from "./app.js";
import { serverConfig } from "./config/serverConfig.js";
import submissionWorker from "./worker/submissionWorker.js";
import { QUEUE } from "./utils/constant.js";

app.listen(serverConfig.PORT, async () => {
  console.log(`Server is running on port ${serverConfig.PORT}`);
  console.log(
    `Bull Board UI available at: http://localhost:${serverConfig.PORT}/admin/queues`
  );
  
  // Start the submission worker
  submissionWorker(QUEUE.SUBMISSION_QUEUE);
  console.log("Submission worker started and listening for jobs");
});
