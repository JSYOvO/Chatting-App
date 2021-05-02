import { urlBase64ToUint8Array } from "./urlBase64ToUint8Array";
const HASH_KEY = "AAA-8MWvk0APA91bHsadasdasdasgt23gmsU8XL";

export function determineAppServerKey() {
    return urlBase64ToUint8Array(HASH_KEY);
}
