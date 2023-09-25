var u = navigator.userAgent,
  isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1,
  isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
console.log("[isAndroid]:", isAndroid);
console.log("[isiOS]:", isiOS);

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  console.log("beforeinstallprompt Event fired", e);
  deferredPrompt = e;
});

export default function InstallCheck() {
  console.log("deferredPrompt:", deferredPrompt);

  const installApp = async () => {
    console.log("[installApp] deferredPrompt:", deferredPrompt);
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log("[installApp] outcome:", deferredPrompt);

      if (outcome === "accepted") {
        deferredPrompt = null;
      }
    }
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
