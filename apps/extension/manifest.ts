import fs from "fs";
const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));

const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  name: "Hedera MetaFox",
  version: packageJson.version,
  description: packageJson.description || "",
  action: {
    default_popup: "./src/popup/index.html",
  },
  background: {
    service_worker: "./src/background/index.ts",
    type: "module",
  },
};

export default manifest;
