import Dockerode from "dockerode";

async function pullImageFromDockerHub(imageName: string) {
  try {
    const docker = new Dockerode();
    return new Promise((res, rej) => {
      docker.pull(imageName, (err: Error, stream: NodeJS.ReadableStream) => {
        if (err) throw err;
        docker.modem.followProgress(
          stream,
          (err, response) => (err ? rej(err) : res(response)),
          (event) => {
            console.log(event.status);
          }
        );
      });
    });
  } catch (error) {
    console.error(`Failed to pull image ${imageName}:`, error);
  }
}
export default pullImageFromDockerHub;
