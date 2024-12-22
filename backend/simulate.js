import axios from 'axios';
import PQueue  from 'p-queue';

const ec2Url = "http://54.87.3.127:3000/"; // Replace with your EC2 public IP
const requestCount = 1000; // Total requests
const concurrentRequests = 50; // Max concurrent requests

const queue = new PQueue({ concurrency: concurrentRequests });

async function sendRequest() {
  try {
    const response = await axios.get(ec2Url);
    console.log(`Status: ${response.status} - Response: ${response.data}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

async function simulateRequests() {
  console.log(`Sending ${requestCount} requests to ${ec2Url}`);
  for (let i = 0; i < requestCount; i++) {
    queue.add(() => sendRequest());
  }
  await queue.onIdle();
  console.log('All requests completed.');
}

simulateRequests();
