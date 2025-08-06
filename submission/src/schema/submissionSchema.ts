export const pingRouteSchema = {
  200: {
    type: "object",
    required: ["message", "timestamp"],
    properties: {
      message: { type: "string" },
      timestamp: { type: "string", format: "date-time" },
    },
  },
};

export const createSubmissionSchema = {
  body: {
    type: "object",
    required: ["userId", "problemId", "code", "language"],
    properties: {
      userId: { type: "string" },
      problemId: { type: "string" },
      code: { type: "string" },
      language: { type: "string" },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        message: { type: "string" },
        submissionId: { type: "string" },
      },
    },
  },
};
