const cluster = require("cluster");
const os = require("os");

// Mock DB Call
const numberOfUsersInDB = function () {
  this.count = this.count || 5;
  this.count = this.count + this.count;
  return this.count;
}

if (cluster.isMaster) {
  const cpus = os.cpus().length;

  console.log(`Forking for ${cpus} CPUs`);
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.id} crashed.` + "Starting a new worker...");
      cluster.fork();
    }
  });

  const updateWorkers = () => {
    const usersCount = numberOfUsersInDB();
    Object.values(cluster.workers).forEach(worker => {
      worker.send({ usersCount });
    });
  };

  updateWorkers();
  setInterval(updateWorkers, 10000);

  Object.values(cluster.workers).forEach(worker => {
    worker.send(`Hello Worker ${worker.id}`);
  });
} else {
  require("./server");
}