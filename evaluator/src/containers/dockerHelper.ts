import DockerStreamOutput from "../types/dockerStreamOutput.js";
import { DOCKER_STREAM_HEADER_SIZE } from "../utils/constant.js";

export const decodeDockerStream = (buffer: Buffer) => {
  let offset = 0;
  const output: DockerStreamOutput = { stdout: "", stderr: "" };
  while (offset < buffer.length) {
    const typeOfstream = buffer[offset];
    const length = buffer.readUInt32BE(offset + 4);
    offset += DOCKER_STREAM_HEADER_SIZE;
    if (typeOfstream === 1) {
      output.stdout += buffer.toString("utf8", offset, offset + length);
    } else if (typeOfstream === 2) {
      output.stderr += buffer.toString("utf8", offset, offset + length);
    }
    offset += length;
  }
  return output;
};
