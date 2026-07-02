import { createClient } from "honox/client";

console.log("[CLIENT] Client.ts loaded, calling createClient");
const client = createClient();
console.log("[CLIENT] createClient completed", client);
