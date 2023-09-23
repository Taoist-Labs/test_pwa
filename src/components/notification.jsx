import { useEffect, useState } from "react";
import usePushNotifications from "../hooks/usePushNotifications";
import subscribeToPushMessages from "../utils/subscribe";

export default function Notification() {
  const { permission, handlePermission } = usePushNotifications();
  const [sub, setSub] = useState();

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
              <button>推送当前时间</button>
            </p>
            <p>
              <button>推送通知打开message页面</button>
            </p>
            <p>
              <input type="text" />
              <button>推送输入内容</button>
            </p>
          </div>
        )}
      </div>
    </>
  );
}
