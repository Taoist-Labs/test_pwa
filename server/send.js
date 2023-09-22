import webPush from "web-push";

const sub = {
  endpoint:
    "https://web.push.apple.com/QEC-6S8UwuAliq8L1dttDaBYTWU8obATJ0yirVIo1xtMStkSDdXf6OTjGYD4T35ocharP1K-uNXxj2mngVDAQ1QkRqjWOi_B4IQ19kshQ1TpjvNxr7zKt_0IaqpEs5xxKuoUY1k4p3d691CldUL2zqUYhQ6G7RzYJtJuBzvm9TQ",
  keys: {
    p256dh:
      "BEd4KsYrzXwcJnBFCwX_nP_rbziqGpupwYhMOaW9VnZ3HUnPp1SvyuK4NPvXvTuFbe13u7TMQq3ExgGW9R5wqS8",
    auth: "WHJV7_Gl2vO3PxMY_W9hQg",
  },
};

const sub1 = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/crUceRSaQMs:APA91bFdAk536Hbno-XzwZERo-3ChKWWY2U8QqQuZ336YYxfntFhVBCTmVXjEI5nISUD8RDwC5vC_HUThMnGxsekm0d-ifD1PEuMVIZyVDgOU3HnwVCEsiBzPfu3Woc3v2-CvDk9MTXB",
  expirationTime: null,
  keys: {
    p256dh:
      "BGmtTIaxaBQPc6ft7RTfQLttYKdkJEgRx2DSTQyHf-tiyyjHRQ6h3ZVNyb5jffEKdjB29-9MYHYjytXAPg6R-0A",
    auth: "MBqmt48n-HxWACPAZPVQQw",
  },
};

const { publicKey, privateKey } = {
  publicKey:
    "BCxVf3jwF_BUdJSuyZFiDuOjNAZ6Y-mnXrBg-nj8zYa1M-yyBwJ9_F9ZK37X73eCZPFb4o5lr7L2yIaiIaNF0MY",
  privateKey: "4hU-cZepr-AW16GGS4NQI7OUJlyXd_PJVDq1cjicVg0",
};

webPush.setVapidDetails("mailto:mmmpolar888@gmail.com", publicKey, privateKey);

const payload = JSON.stringify({
  payload: "Hello World!",
  actions: [],
  // tag: "/test_pwa/#/message",  // web上可用但是iOS上无效
  tag: "https://taoist-labs.github.io/test_pwa/#/message",
});
const options = {
  proxy: "http://127.0.0.1:7890",
};

webPush.sendNotification(sub2, payload, options);
