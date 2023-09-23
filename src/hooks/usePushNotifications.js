import { useState, useEffect } from "react";
import { askPermission } from "../utils/permission";

export default function usePushNotifications() {
  const [permission, setPermission] = useState("default");

  useEffect(() => {
    if (!window.Notification) {
      console.error("not support navigator");
      return;
    }

    const handlePermission = (permission) => {
      console.log("1-permission: ", permission);
      setPermission(permission);
    };

    Notification.requestPermission()
      .then(handlePermission)
      .catch((err) => console.error("1-permission failed", err));
  }, []);

  const handlePermission = () => {
    return askPermission()
      .then((res) => {
        console.log("you agreed permission");
        setPermission("granted");
      })
      .catch((err) => {
        console.error("you denied permission");
      });
  };

  return { handlePermission, permission };
}
