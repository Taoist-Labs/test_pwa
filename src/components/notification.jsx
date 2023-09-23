import usePushNotifications from "../hooks/usePushNotifications";
import subscribeToPushMessages from "../utils/subscribe";

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  console.log("beforeinstallprompt Event fired", e);
  deferredPrompt = e;
});

export default function Notification() {
  const { permission, handlePermission } = usePushNotifications();

  console.log("deferredPrompt:", deferredPrompt);

  const installApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        deferredPrompt = null;
      }
    }
  };

  return (
    <>
      <div>permission: {permission}</div>
      <div>
        <button onClick={handlePermission}>请求权限</button>
      </div>
      <div>
        <button onClick={subscribeToPushMessages}>订阅</button>
      </div>
      <div>
        <button onClick={installApp}>安装</button>
      </div>
    </>
  );
}
