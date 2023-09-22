// install
self.addEventListener("install", (event) => {
  console.log("installing…");
});

// activate
self.addEventListener("activate", (event) => {
  console.log("now ready to handle fetches!");
});

// fetch
self.addEventListener("fetch", (event) => {
  console.log("now fetch!");
});

self.addEventListener("push", function (event) {
  // Retrieve the textual payload from event.data (a PushMessageData object).
  // Other formats are supported (ArrayBuffer, Blob, JSON), check out the documentation
  // on https://developer.mozilla.org/en-US/docs/Web/API/PushMessageData.
  const payload = event.data ? event.data.text() : "no payload";

  console.log("event: ", event);
  const data = JSON.parse(payload);
  console.log("event data: ", data);

  // Keep the service worker alive until the notification is created.
  event.waitUntil(
    // Show a notification with title 'ServiceWorker Cookbook' and use the payload
    // as the body.
    self.registration.showNotification("ServiceWorker Cookbook", {
      body: data.payload,
      actions: [
        {
          action: "yes",
          type: "button",
          title: "👍 Yes",
        },
        {
          action: "no",
          type: "button",
          title: "👎 No",
        },
      ],
    })
  );
});

self.addEventListener("notificationclick", function (event) {
  console.log("click event:", event);
  console.log(`action clicked: '${event?.action}'`);
  clients.openWindow("https://taoist-labs.github.io/test_pwa/#/message");
});
