
An excersize in using Rust programming language in an IoT stack.
I started with TI CC3235SF board + TI SDK demo app for MQTT then trying to replace as many modules as possible with a Rust impl

Notes :
to run MQTT server locally
```
docker run -it -p 1883:1883 -p 9001:9001 eclipse-mosquitto
```
