import z from "zod";

export const createSubmissionZodSchema = z
  .object({
    userId: z.string(),
    problemId: z.string(),
    code: z.string(),
    language: z.string(),
  })
  .strict();

export type CreateSubmissionDTO = z.infer<typeof createSubmissionZodSchema>;
