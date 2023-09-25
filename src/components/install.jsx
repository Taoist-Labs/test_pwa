import { useEffect, useRef } from "react";

var u = navigator.userAgent,
  isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1,
  isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
console.log("[isAndroid]:", isAndroid);
console.log("[isiOS]:", isiOS);

export default function InstallCheck() {
  const deferredPrompt = useRef();

  const handleBeforeInstallPromptEvent = (event) => {
    event.preventDefault();
    deferredPrompt.current = event;
  };

  useEffect(() => {
    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPromptEvent
    );
    return function cleanup() {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPromptEvent
      );
    };
  }, []);

  const installApp = async () => {
    const current = deferredPrompt.current;
    console.log("[installApp] deferredPrompt:", current);
    if (!current) {
      return;
    }
    current
      .prompt()
      .then(() => deferredPrompt.userChoice)
      .then(({ outcome }) => {
        console.log("[installApp] outcome:", outcome);
      })
      .catch((error) => {
        console.error("[installApp] error:", error);
      });
  };
  return (
    <>
      {!window.Notification && <h3>not support notification</h3>}
      {isAndroid ? (
        <>
          <div>
            <button onClick={installApp}>安装</button>
          </div>
          <hr />
        </>
      ) : (
        <h3>iOS 需要添加到主屏幕使用</h3>
      )}
    </>
  );
}
