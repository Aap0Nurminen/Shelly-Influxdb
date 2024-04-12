// Define variables for InfluxDB URL and token
let influxDBUrl = "http://<your_influxdb_ip>/api/v2/write?org=<your_org>&bucket=<your_bucket>&precision=ns";
let influxDBToken = "<your_token>";

// Function to retrieve device information and set up periodic status updates
function handleDeviceInfo() {
    // Retrieve device information
    let deviceInfo = Shelly.getDeviceInfo();
    
    // Retrieve device name
    if (deviceInfo !== null) {
        let deviceName = deviceInfo.name;

        // Set timer to fetch device status periodically (every 3 minutes)
        Timer.set(180000, true, function() {
            // Make http get request to fetch device status
            Shelly.call("http.get", { url: "http://localhost/rpc/EM.GetStatus?id=0", timeout: 15 }, function(result, error_code, error_message) {
                // Handle HTTP response
                handleHttpResponse(result, error_code, error_message, deviceName);
            });
        });
    } else {
        // Log error if device info retrieval fails
        print("Error getting device info.");
    }
}

// Trigger device info retrieval and status update
handleDeviceInfo();

// Function to handle HTTP response from status update request
function handleHttpResponse(result, error_code, error_message, deviceName) {
    if (error_code !== 0) {
        // Log error if status update request fails
        print("Error fetching status:", error_message);
        return;
    }

    try {
        let response = JSON.parse(result.body);
        let lineProtocol = deviceName + " ";

        // Iterate through response fields to construct line protocol
        for (let key in response) {
            // Check if the field is not 'id' and is a numeric value
            if (key !== 'id' && typeof response[key] === 'number') {
                // Append key-value pair to line protocol with comma separator
                lineProtocol += key + "=" + response[key] + ",";
            }
        }

        // Remove trailing comma from line protocol
        lineProtocol = lineProtocol.slice(0, -1);

        // Send formatted line protocol to InfluxDB
        sendDataToInfluxDB(lineProtocol);

    } catch (error) {
        // Log error if parsing response fails
        print("Error parsing response:", error);
    }
}

// Function to send data to InfluxDB
function sendDataToInfluxDB(lineProtocol) {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": "Token " + influxDBToken
    };

    // Make HTTP POST request to send data to InfluxDB
    Shelly.call("http.request", {
        method: "POST",
        headers: headers,
        url: influxDBUrl,
        body: lineProtocol
    }, function(result, error_code, error_message) {
        if (error_code === 0) {
            // Log success message if data sent successfully
            print("Data sent to InfluxDB successfully.");
        } else {
            // Log error if data sending fails
            print("Error sending data to InfluxDB:", error_message);
        }
    });
}
