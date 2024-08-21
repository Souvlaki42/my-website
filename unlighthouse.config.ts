/// <reference types="unlighthouse" />
import { defineConfig } from "unlighthouse";

export default defineConfig({
  site: "https://souvlaki.me",
  scanner: {
    exclude: ["/cdn-cgi/l/*"],
    samples: 3
  }
});
