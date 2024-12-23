import fs from "fs";
import os from "os";
import path from "path";

const logPerformance = (server) => {
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

  const logData = {
    timestamp: new Date().toISOString(),
    servername: server,
    userCPUTime: userCPUTime.toFixed(2),
    systemCPUTime: systemCPUTime.toFixed(2),
    currentCPUUsagePercent: currentCPUUsagePercent.toFixed(2),
    rssMemory: memoryUsage.rss,
    heapTotalMemory: memoryUsage.heapTotal,
    heapUsedMemory: memoryUsage.heapUsed,
    freeMemory,
    totalMemory,
    uptime: uptime.toFixed(2),
  };


  return logData;
};

export { logPerformance };
