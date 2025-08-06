import Docker from "dockerode";

async function createContainer(
  imageName: string,
  cmdExecutableCommand: string[]
) {
  const docker = new Docker();

  const container = await docker.createContainer({
    Image: imageName,
    Cmd: cmdExecutableCommand,
    AttachStdin: true,
    AttachStdout: true,
    AttachStderr: true,
    Tty: false,
    HostConfig: {
      Memory: 512 * 1024 * 1024, // 512 MB
    },
    OpenStdin: true,
  });
  return container;
}

export default createContainer;
