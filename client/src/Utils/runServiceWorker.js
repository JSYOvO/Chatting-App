import { determineAppServerKey } from "./determineAppServerKey";

export function runServiceWorker() {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker.register("./serviceworker.js").then((response) => {
                console.log("Success: ", response.scope);

                return response.pushManager.getSubscription()
                    .then((subs) => {
                        return response.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: determineAppServerKey(),
                        })
                    }
                    );
            })
                .catch((err) => console.log("Failure: ", err));
        });
    }
}
