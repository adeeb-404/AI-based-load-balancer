import http from "http";
import os from "os";
import fs from "fs";
import path from "path";
// Server setup
//  const server = http.createServer((req, res) => {
//   const startCPU = process.cpuUsage();

//   res.writeHead(200, { "Content-Type": "text/plain" });
//   res.end("Server is running.\n");

//   const endCPU = process.cpuUsage(startCPU);
//   const cpuTime = (endCPU.user + endCPU.system) / 1000; // CPU time used for this request in milliseconds

//   logPerformance(cpuTime);
// });

// // Start the server
// const PORT = 3030;
// server.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });

// Function to log performance
const logPerformance = (server) => {
  try {
    console.log("logPerformance function called");
    
    const memoryUsage = process.memoryUsage();
    const freeMemory = os.freemem();
    const totalMemory = os.totalmem();
    const uptime = os.uptime();
    const currentCPUUsage = process.cpuUsage();

    const userCPUTime = currentCPUUsage.user / 1000;
    const systemCPUTime = currentCPUUsage.system / 1000;

    const cpus = os.cpus();
    const cpu = cpus[0];
    const total = Object.values(cpu.times).reduce((acc, tv) => acc + tv, 0);
    const usage = process.cpuUsage();
    const currentCPUUsagePercent = (usage.user + usage.system) / total * 100;
console.log("beofr  log data");
    const logData = {
      timestamp: new Date(),
      servername: server,
      cpuUsage: {
        user: userCPUTime,
        system: systemCPUTime,
        percent: currentCPUUsagePercent
      },
      memoryUsage: {
        rss: memoryUsage.rss,
        heapTotal: memoryUsage.heapTotal,
        heapUsed: memoryUsage.heapUsed,
      },
      freeMemory,
      totalMemory,
      uptime,
    };
    console.log("before append");
    const pathR="C:/Users/Swankier/majorProjectGit/AI-based-load-balancer/filefetch/server_logs.txt";
    // const logFilePath = path.join(__dirname, 'server_logs.txt');
    fs.appendFileSync('server_logs.txt', JSON.stringify(logData) + "\n");
    console.log('The "data to append" was appended to file!');
    // console.log("Log Data:", JSON.stringify(logData, null, 2));

  } catch (err) {
    console.error("Error in logPerformance function:", err);
  }
};













// **Use this only when u have to log the data when server is idle, also u can use this for testing**
// Log performance every 5 seconds
// setInterval(() => {
//   const memoryUsage = process.memoryUsage();
//   const freeMemory = os.freemem();
//   const totalMemory = os.totalmem();
//   const uptime = os.uptime();
//   const currentCPUUsage = process.cpuUsage();

//   // Calculate the real-time CPU usage since the last log
//   const userCPUTime = currentCPUUsage.user / 1000; // Convert microseconds to milliseconds
//   const systemCPUTime = currentCPUUsage.system / 1000; // Convert microseconds to milliseconds

//   // Additional CPU percentage calculation
//   const cpus = os.cpus();
//   const cpu = cpus[0];
//   const total = Object.values(cpu.times).reduce((acc, tv) => acc + tv, 0);
//   const usage = process.cpuUsage();
//   const currentCPUUsagePercent = (usage.user + usage.system) / total * 100;

//   const logData = {
//     timestamp: new Date(),
//     servername:server,
//     cpuUsage: {
//       user: userCPUTime, // Real-time user CPU time in milliseconds
//       system: systemCPUTime, // Real-time system CPU time in milliseconds
//       percent: currentCPUUsagePercent // CPU usage percentage
//     },
//     memoryUsage: {
//       rss: memoryUsage.rss,
//       heapTotal: memoryUsage.heapTotal,
//       heapUsed: memoryUsage.heapUsed,
//     },
//     freeMemory,
//     totalMemory,
//     uptime,
//   };

//   console.log(JSON.stringify(logData, null, 2));

//   // Save to a log file
//   fs.appendFileSync("server_logs.txt", JSON.stringify(logData) + "\n");
// }, 5000);

export default logPerformance;