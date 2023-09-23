import express from "express";
import cors from "cors";
import webPush from "web-push";
import fs from "fs";
import * as https from "https";
import {LocalStorage} from "node-localstorage";


// let p256dh, auth, endpoint;
// 
// let sub;

const initWebPush = (app, route) => {
  app.get(route, function (req, res) {
    res.send("hi");
  });
  app.get(route + "vapidPublicKey", function (req, res) {
    res.send(publicKey);
  });

  // app.post(route + "register", function (req, res) {
  //   console.log("body: ", req.body);
  //   sub = req.body;
  //   // endpoint = req.body.endpoint;
  //   // p256dh = req.body.p256dh;
  //   // auth = req.body.auth;
  //   res.status(200).json({
  //     msg: `ok,  ${JSON.stringify(sub)}`,
  //   });
  // });

  app.post(route + "sendNotification", function (req, res) {
    const sub = req.body.sub;
    // sub = req.body;
    // const subscription = req.body.subscription;
    const payload = req.body.payload;
    const options = {
      TTL: req.body.ttl,
      proxy: "http://127.0.0.1:7890",
    };

    // setTimeout(function () {
      webPush
        .sendNotification(sub, payload, options)
        .then(function () {
          res.status(201).json({ a: "b" });
        })
        .catch(function (error) {
          console.log(error);
          res.status(500).json({ c: "d" });
        });
    // }, 1000);
  });

  const LocalData = new LocalStorage('./data');
  app.post("/connect",function (req, res){

    console.log("body: ", req.body);
    const{id,address} = req.body;
    LocalData.setItem(id,address);
    res.status(200).json({ success:true });
  });

  app.get("/getAddress",function (req, res){
    const{id}= req.query;
    console.log(req.query);
    let address = LocalData.getItem(id);
    res.status(200).json({ address });
  });
};






const app = express();
const port = 3001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { publicKey, privateKey } = {
  publicKey:
    "BCxVf3jwF_BUdJSuyZFiDuOjNAZ6Y-mnXrBg-nj8zYa1M-yyBwJ9_F9ZK37X73eCZPFb4o5lr7L2yIaiIaNF0MY",
  privateKey: "4hU-cZepr-AW16GGS4NQI7OUJlyXd_PJVDq1cjicVg0",
};
console.log("publicKey: ", publicKey);
console.log("privateKey: ", privateKey);
webPush.setVapidDetails("mailto:mmmpolar888@gmail.com", publicKey, privateKey);

initWebPush(app, "/");

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});


// var key = fs.readFileSync('server.key');
// var cert = fs.readFileSync('server.crt');
//
// var options = {
//   key: key,
//   cert: cert
// };
// Run static server
// var https = require('https');
// https.createServer(options, app).listen(3001);

// app.listen(port, () => {
//   console.log(`app is listening on port ${port}`);
// });
