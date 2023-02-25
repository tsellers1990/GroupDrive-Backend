const mqtt = require("mqtt");
const options = {
  // Clean session
  clean: process.env.MQTT_CLEAN_SESSION,
  connectTimeout: process.env.MQTT_CONNECT_TIMEOUT,
  // Auth
  clientId: process.env.MQTT_CLIENT_ID,
  //On the backend this should be assigned via an env varriable, on the front end this is being generateed dynamically based off username of the user
  username: process.env.MQTT_CLIENT_USER,
  password: process.env.MQTT_CLIENT_PASSWORD,
};
const client = mqtt.connect(process.env.MQTT_BROKER, options);
client.on("connect", function () {
  console.log("Connected");
  client.subscribe("test", function (err) {
    if (!err) {
      client.publish("test", "Hello mqtt");
    }
  });
});

client.on("message", function (topic, message) {
  // message is Buffer
  console.log(message.toString());
  client.end();
});
