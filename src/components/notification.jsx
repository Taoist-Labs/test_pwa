import usePushNotifications from "../hooks/usePushNotifications";
import subscribeToPushMessages from "../utils/subscribe";

export default function Notification() {
  const { permission, handlePermission } = usePushNotifications();

  const requestPermission = async () => { 
    const permission = await handlePermission();
    console.log(permission);
  }

  return (
    <>
      <div>permission: {permission}</div>
      <div>
        <button onClick={requestPermission}>请求权限</button>
      </div>
      <div>
        <button onClick={subscribeToPushMessages}>订阅</button>
      </div>
    </>
  );
}
