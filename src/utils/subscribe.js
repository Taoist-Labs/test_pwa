async function subscribeToPushMessages() {
  console.log("~~~");
  console.log("~~~111", navigator.serviceWorker);

  const serviceWorkerRegistration = await navigator.serviceWorker.ready;
  console.log("~~~serviceWorkerRegistration", serviceWorkerRegistration);

  // Check if the user has an existing subscription
  let pushSubscription = "";
  //   serviceWorkerRegistration.pushManager.getSubscription();
  // console.log("11112222pushSubscription:", pushSubscription);
  // if (pushSubscription) {
  //   console.log("The user is already subscribed to push notifications");
  //   console.log("hhh:", await pushSubscription);

  //   return;
  // }

  try {
    // Subscribe the user to push notifications
    pushSubscription = await serviceWorkerRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        "BCxVf3jwF_BUdJSuyZFiDuOjNAZ6Y-mnXrBg-nj8zYa1M-yyBwJ9_F9ZK37X73eCZPFb4o5lr7L2yIaiIaNF0MY"
      ),
    });
    const subscription = await pushSubscription;
    const data = subscription.toJSON();
    // const endpoint = subscription.endpoint;
    // const key = subscription.getKey("p256dh");
    // const auth = subscription.getKey("auth");
    console.log("data", data);
    console.log("sub", JSON.stringify(data));
    // console.log("endpoint", endpoint);
    // console.log("key", key);
    // console.log("auth", auth);
    // fetch("https://192.168.31.59:3001/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json;charset=utf-8",
    //   },
    //   body: JSON.stringify(data),
    // });
  } catch (err) {
    // The subscription wasn't successful.
    console.log("Error", err);
  }
}

// Utility function for browser interoperability
function urlBase64ToUint8Array(base64String) {
  var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  // eslint-disable-next-line
  var base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default subscribeToPushMessages;
