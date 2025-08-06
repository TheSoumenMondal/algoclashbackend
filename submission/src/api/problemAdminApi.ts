import axiosInstance from "../config/axiosInstance.js";
import serverConfig from "../config/serverConfig.js";

async function fetchProblemDetails(problemId: string) {
  try {
    console.log(
      `${serverConfig.PROBLEM_ADMIN_SERVICE_URL}/api/v1/problems/${problemId}`
    );

    const response = await axiosInstance.get(
      `${serverConfig.PROBLEM_ADMIN_SERVICE_URL}/api/v1/problems/${problemId}`
    );
    console.log("Api Response", response.data);
    return response.data;
  } catch (error) {
    console.log("Error fetching problem details:", error);
  }
}

export default fetchProblemDetails;
