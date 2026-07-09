import { EnvironmentVariables } from "./infra/config/environment/EnvironmentVariables.js";

console.log("Testing server configuration...");
console.log("DATABASE_URL:", EnvironmentVariables.DATABASE_URL);
console.log("JWT Secret:", EnvironmentVariables.SIGN_ACCESS_TOKEN_PRIVATE_KEY);
console.log("Server Host:", EnvironmentVariables.SERVER_HOST_URL);
console.log("Express Port:", EnvironmentVariables.EXPRESS_APP_PORT);

if (!EnvironmentVariables.DATABASE_URL) {
  console.error("DATABASE_URL is not set!");
  process.exit(1);
}

console.log("Configuration looks good!");
