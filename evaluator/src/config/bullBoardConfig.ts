import express from "express";
import { Queue as QueueMQ } from "bullmq";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter.js";
import { ExpressAdapter } from "@bull-board/express";
import sampleQueue from "../queue/sampleQueue.js";
import submissionQueue from "../queue/submissionQueue.js";
import evaluationQueue from "../queue/evaluationQueue.js";

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [
    new BullMQAdapter(sampleQueue as QueueMQ),
    new BullMQAdapter(submissionQueue as QueueMQ),
    new BullMQAdapter(evaluationQueue as QueueMQ),
  ],
  serverAdapter: serverAdapter,
});

export { serverAdapter, addQueue, removeQueue, setQueues, replaceQueues };

export function createBullBoardApp(): express.Application {
  const app = express();

  app.use("/admin/queues", serverAdapter.getRouter());

  return app;
}
