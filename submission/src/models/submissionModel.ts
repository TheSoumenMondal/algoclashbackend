import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "User id is required"],
    },
    problemId: {
      type: String,
      required: [true, "Problem id is required"],
    },
    code: {
      type: String,
      required: [true, "Code is required"],
    },
    language: {
      type: String,
      required: [true, "Language is required"],
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "WA", "RE", "TLE", "MLE"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
