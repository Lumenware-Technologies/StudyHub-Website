/**
 * Generate js/config.js from environment variables at build time.
 * Used by Vercel during deployment.
 *
 * Set these in Vercel Project Settings → Environment Variables:
 *   UE_FORMS_API_KEY
 *   UE_FORMS_BASE_URL
 *   UE_FORMS_SDK_URL
 *   UE_FORMS_ENV
 */
const fs = require("fs");
const path = require("path");

const config = {
  UE_FORMS_API_KEY: process.env.UE_FORMS_API_KEY || "",
  UE_FORMS_BASE_URL:
    process.env.UE_FORMS_BASE_URL || "https://app.useeducator.com/api/v1",
  UE_FORMS_SDK_URL:
    process.env.UE_FORMS_SDK_URL || "https://app.useeducator.com/sdk/forms.js",
  UE_FORMS_ENV: process.env.UE_FORMS_ENV || "prod",
};

const output = `/**
 * Environment configuration — auto-generated at build time.
 * Do NOT edit manually. Set values in Vercel Environment Variables.
 */
const ENV = ${JSON.stringify(config, null, 2)};
`;

const outPath = path.join(__dirname, "..", "js", "config.js");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, output, "utf-8");

console.log("✅ js/config.js generated with env:", config.UE_FORMS_ENV);
