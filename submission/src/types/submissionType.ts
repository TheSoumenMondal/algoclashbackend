import { Document } from "mongoose";

export interface SubmissionType extends Document {
    userId: string;
    problemId: string;
    code: string;
    language: string;
    status: "Pending" | "Accepted" | "WA" | "RE" | "TLE" | "MLE";
    createdAt?: Date;
    updatedAt?: Date;
}