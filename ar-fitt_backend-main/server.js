import fs from 'fs';
import https from 'https';

import express from "express";
import cors from "cors";
import { EnvironmentVariables } from "./infra/config/environment/EnvironmentVariables.js";
import { CommonConstants } from "./infra/utils/common/Constants.js";
import { userController } from "./frameworks/user/index.js";
import { subscriptionPlanController } from "./frameworks/subscription_plan/index.js";
import { paymentController } from "./frameworks/payment/index.js";
import { userFaceMatrixController } from "./frameworks/user_face_matrix/index.js";
import { userBodyMatrixController } from "./frameworks/user_body_matrix/index.js";
import { authorizationServiceController } from "./frameworks/authorization_service/index.js";
import { userBodyImageController } from "./frameworks/user_body_image/index.js";
import { userFaceImageController } from "./frameworks/user_face_image/index.js";
import { inventoryCategoryController } from "./frameworks/inventory_category/index.js";
import { inventoryItemController } from "./frameworks/inventory_item/index.js";
import { guestUserController } from "./frameworks/guest_user/index.js";
import { AdminUserController } from "./adapters/express/controllers/AdminUserController.js";
import { AdminProductController } from "./adapters/express/controllers/AdminProductController.js";
import { AdminCategoryController } from "./adapters/express/controllers/AdminCategoryController.js";
import { AdminAuthController } from "./adapters/express/controllers/AdminAuthController.js";
import { PopulateSchema } from "./database_setup/deploy/PopulateSchema.js";
import { PopulateData } from "./database_setup/deploy/PopulateData.js";

// populating db schema
try {
  console.log("Populating database schema...");
  const populateSchema = new PopulateSchema();
  await populateSchema.insertSchema();
  console.log("Database schema populated successfully");
} catch (error) {
  console.error("Error populating database schema:", error);
}

// populating data into db
try {
  console.log("Populating database data...");
  const populateData = new PopulateData();
  await populateData.insertData();
  console.log("Database data populated successfully");
} catch (error) {
  console.error("Error populating database data:", error);
}

// Initialize admin controllers
const adminAuthController = new AdminAuthController();
const adminUserController = new AdminUserController();
const adminProductController = new AdminProductController();
const adminCategoryController = new AdminCategoryController();

const app = express();

const corsOptions = {
  origin: EnvironmentVariables.ALLOWED_ORIGIN_URL || "http://localhost:3000",
  exposedHeaders: [CommonConstants.ACCESS_TOKEN, CommonConstants.REFRESH_TOKEN],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
};
app.use(cors(corsOptions));

// need to register it befoe express.json registeration otherwise stripe webhook validation fails
// express.json changes the stripe webhook request body
app.use(paymentController.createExpressController());
app.use(userBodyImageController.createExpressController());
app.use(userFaceImageController.createExpressController());

app.use(express.json());

// Serve static files from product_images directory
app.use('/product_images', express.static('product_images'));
app.use('/downloads', express.static('downloads'));


app.use(userController.createExpressController());
app.use(subscriptionPlanController.createExpressController());
app.use(userFaceMatrixController.createExpressController());
app.use(userBodyMatrixController.createExpressController());
app.use(authorizationServiceController.createExpressController());
app.use(inventoryCategoryController.createExpressController());
app.use(inventoryItemController.createExpressController());
app.use(guestUserController.createExpressController());

// Admin authentication routes (separate from user auth)
app.use(adminAuthController.createExpressController());

// Admin routes (these will be protected by admin middleware)
app.use(adminUserController.createExpressController());
app.use(adminProductController.createExpressController());
app.use(adminCategoryController.createExpressController());

const port = EnvironmentVariables.EXPRESS_APP_PORT;

app.listen(port, () => console.log(`Server is listening on port ${port}`));

//SERVER
// const sslOptions = {
//   key: fs.readFileSync('/etc/letsencrypt/live/arfitt.com/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/arfitt.com/fullchain.pem')
// };

// https.createServer(sslOptions, app).listen(port, '0.0.0.0', () => {
//   console.log(`🔐 HTTPS server is listening on port ${port}`);
// });
