from locust import HttpUser, task, between

class FileFetchingUser(HttpUser):
    # Define the wait time between requests for each user
    wait_time = between(1, 5)  # Random wait time between 1 to 5 seconds
    file_url = "http://localhost:3000"
    # @task
    # def fetch_dummy_file(self):
    #     # This is the URL of the endpoint that simulates file fetching
        
    #     self.client.get(self.file_url+"/user1")

    # @task
    # def get_about(self):
    #     self.client.get(self.file_url+"/user2")
    from locust import HttpUser, task, between

class FileFetchingUser(HttpUser):
    # Define the wait time between requests for each user
    wait_time = between(1, 5)  # Random wait time between 1 to 5 seconds
    file_url = "http://localhost:3000"

    @task
    def post_data(self):
        # Example POST request with JSON payload
        for i in range(20):
            payload = {
            "username": "user"+str(i),
            "password": "securepassword"
            }
            self.client.post(self.file_url + "/", json=payload)

    @task
    def get_home(self):
        self.client.get(self.file_url)

    
   