import Pusher from "pusher-js";
Pusher.logToConsole = true;

var pusher = new Pusher("3bea5a662197689cf849", {
  cluster: "eu",
});

var channel = pusher.subscribe("notifications");
channel.bind("new-notification", function (data) {
  app.messages.push(JSON.stringify(data));
});
