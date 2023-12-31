import { useEffect, useState } from "react";
import usePushNotifications from "../hooks/usePushNotifications";
import subscribeToPushMessages from "../utils/subscribe";

export default function Notification() {
  const { permission, handlePermission } = usePushNotifications();
  const [sub, setSub] = useState();
  const [value, setValue] = useState();

  useEffect(() => {
    const data = localStorage.getItem("sub");
    if (data) {
      console.log("had subscribed: ", data);
      setSub(JSON.parse(data));
    }
  }, []);

  const handleSubscribe = () => {
    subscribeToPushMessages()
      .then((sub) => {
        setSub(sub);
        localStorage.setItem("sub", JSON.stringify(sub));
      })
      .catch((err) => {
        console.error("subscribe failed", err);
      });
  };

  const sendPushMessage = (data) => {
    try {
      // fetch("http://localhost:3001/sendNotification", {
      fetch("https://test-w3g-api.weetopia.io/pwa_push/sendNotification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sub,
          payload: JSON.stringify(data),
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const pushTime = () => {
    sendPushMessage({
      title: "时间推送",
      data: {
        body: "当前时间" + new Date().toLocaleString(),
      },
    });
  };

  const pushToPage = () => {
    sendPushMessage({
      title: "新消息",
      data: {
        body: "点击进入message页面",
        data: "https://taoist-labs.github.io/test_pwa/#/message",
      },
    });
  };

  const pushCustom = () => {
    sendPushMessage({
      title: "自定义消息",
      data: {
        body: value || "未定义",
      },
    });
  };

  return (
    <>
      <div>permission: {permission}</div>
      {permission !== "granted" && (
        <div>
          <button onClick={handlePermission}>请求权限</button>
        </div>
      )}

      <div>
        {sub ? (
          <span>已订阅</span>
        ) : (
          <button onClick={handleSubscribe}>订阅</button>
        )}
      </div>
      <div>
        {sub && (
          <div>
            <p>
              <button onClick={pushTime}>推送当前时间</button>
            </p>
            <p>
              <button onClick={pushToPage}>推送message</button>
            </p>
            <p>
              <input type="text" onChange={(e) => setValue(e.target.value)} />
              <button onClick={pushCustom}>推送输入内容</button>
            </p>
          </div>
        )}
      </div>
    </>
  );
}
