import { useState, useEffect } from "react";
import { askPermission } from "../utils/permission";

export default function usePushNotifications() {
  const [permission, setPermission] = useState("default");

  useEffect(() => {
    const handlePermission = (permission) => {
      setPermission(permission);
    };

    Notification.requestPermission().then(handlePermission);
  }, []);

  const handlePermission = () => {
    return askPermission()
      .then((res) => {
        console.log("you agreed permission");
      })
      .catch((err) => {
        console.error("you denied permission");
      });
  };

  return { handlePermission, permission };
}
