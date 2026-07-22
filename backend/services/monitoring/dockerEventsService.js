const Docker = require("dockerode");

const docker = new Docker();

async function getDockerEvents() {

  const events = [];

  return new Promise((resolve, reject) => {

    docker.getEvents({ since: Math.floor(Date.now() / 1000) - 600 }, (err, stream) => {

      if (err) {
        reject(err);
        return;
      }

      stream.on("data", (buffer) => {

        try {

          const event = JSON.parse(buffer.toString());

          if (event.Type === "container") {

            events.unshift({
              id: event.id,
              container: event.Actor.Attributes.name || "unknown",
              action: event.Action,
              time: new Date(event.time * 1000).toLocaleTimeString(),
            });

            if (events.length > 20) {
              events.pop();
            }

          }

        } catch {}

      });

      setTimeout(() => {
        stream.destroy();
        resolve(events);
      }, 1000);

    });

  });

}

module.exports = {
  getDockerEvents,
};
