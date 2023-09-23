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
  // payload: {data: {}, title: ""}

  // Keep the service worker alive until the notification is created.
  event.waitUntil(
    // Show a notification with title 'ServiceWorker Cookbook' and use the payload
    // as the body.
    self.registration.showNotification(data.title || "test title", {
      ...data.data,
    })
  );
});

self.addEventListener("notificationclick", async function (event) {
  console.log("click event:", event);
  console.log("notificationt:", event.notification);
  if (event.notification.tag) {
    const client_arr = await clients.matchAll({
      type: "window",
    });
    console.log("client_arr:", client_arr);
    if (client_arr.length > 0) {
      client_arr[0].postMessage("New chat messages!");
    } else {
      clients.openWindow(event.notification.tag);
    }
  }
});
