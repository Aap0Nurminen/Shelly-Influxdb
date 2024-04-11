# Shelly data to InfluxDB 2.x using Shelly script

This repository contains a Shelly script for easy integration of Shelly devices with InfluxDB 2.x. The script automates status updates to InfluxDB for real-time monitoring and analysis.

## Key Features:
- **Device Name Retrieval:** Utilizes Shelly.getDeviceInfo() to extract device names from Shelly devices.
- **Automated Status Updates:** Periodically fetches device statuses via HTTP GET requests, leveraging RPC endpoints such as EM.GetStatus.
- **InfluxDB Integration:** Formats retrieved data into InfluxDB's line protocol for seamless storage and analysis.

## Prerequisites:
- **Shelly Devices:** Requires Shelly devices with compatible firmware supporting RPC endpoints over HTTP.
- **InfluxDB Setup:** Accessible InfluxDB instance for HTTP POST requests.
- **Shelly Scripting Environment:** Configured and operational environment for running Shelly scripts.

## How to Use:
1. **Configuration:** Set up appropriate values for `<your_influxdb_ip>`, `<your_org>`, `<your_bucket>`, and `<your_token>` within the script.
2. **Deployment:** Deploy the script to your Shelly device or any compatible environment.
3. **Networking:** Ensure network configurations allow HTTP requests to Shelly devices and the InfluxDB instance.
4. **Execution:** Run the script to initiate monitoring and integrate device status updates seamlessly into InfluxDB.

Feel free to contribute, customize, or extend this script to suit your specific monitoring and integration requirements.
