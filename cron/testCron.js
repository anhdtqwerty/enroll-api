var cron = require("node-cron");

var scheduledTask = cron.schedule(
  "5 * * * * *",
  () => {
    console.log("stopped task");
  },
  {
    scheduled: false,
  }
);

var task = cron.schedule("*/5 * * * * *", async () => {
  console.log("running a task every 5 seconds");
  strapi.services.cv.resetHourlySMS();
});

scheduledTask.start();
task.start();
