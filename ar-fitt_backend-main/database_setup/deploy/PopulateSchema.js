import { PrismaClient } from "@prisma/client";
import { EnvironmentVariables } from "../../infra/config/environment/EnvironmentVariables.js";

const prisma = new PrismaClient();

export class PopulateSchema {
  async insertSchema() {
    if (EnvironmentVariables.DATABASE_URL == "") {
      console.log("database URL is empty, not going to populate schema.");
      return;
    }

    await this.createSchema();
    await this.createTables();
  }

  async createSchema() {
    try {
      await prisma.$executeRaw`CREATE SCHEMA IF NOT EXISTS "public";`;
      console.log("created schema");
    } catch (error) {
      console.log("failed to create schema in database, error: ", error);
    }
  }

  async createTables() {
    try {
      await prisma.$transaction([
        prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "user" (
  "id" varchar PRIMARY KEY,
  "email" varchar UNIQUE,
  "first_name" varchar,
  "last_name" varchar,
  "phone" varchar,
  "gender" varchar,
  "dob" date,
  "is_verified" bool,
  "is_subscribed" bool,
  "is_body_scanned" bool,
  "is_face_scanned" bool,
  "role" varchar NOT NULL DEFAULT 'user',
  "created_at" timestamp,
  "modified_at" timestamp
);`,
        prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "user_body_matrix" (
  "user_id" varchar PRIMARY KEY,
  "body_matrix" varchar NOT NULL,
  "created_at" timestamp,
  "modified_at" timestamp
);`,
        prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "user_face_matrix" (
  "user_id" varchar PRIMARY KEY,
  "face_matrix" varchar NOT NULL,
  "created_at" timestamp,
  "modified_at" timestamp
);`,
        prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "user_body_image" (
  "user_id" varchar PRIMARY KEY,
  "body_image" text NOT NULL,
  "recommended_size" varchar NOT NULL DEFAULT '',
  "recommended_colors" varchar NOT NULL DEFAULT '',
  "recommended_shirts" varchar NOT NULL DEFAULT '',
  "created_at" timestamp,
  "modified_at" timestamp
);`,
        prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "user_face_image" (
  "user_id" varchar PRIMARY KEY,
  "face_image" text NOT NULL,
  "created_at" timestamp,
  "modified_at" timestamp
);`,
        prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "user_credential" (
  "user_email" varchar PRIMARY KEY,
  "password_hash" varchar NOT NULL,
  "created_at" timestamp,
  "modified_at" timestamp
);`,
        prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "user_subscription" (
  "user_id" varchar PRIMARY KEY,
  "subscription_plan_id" varchar NOT NULL,
  "subscription_id" varchar NOT NULL,
  "created_at" timestamp,
  "modified_at" timestamp
);`,
        prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "payment_service_user" (
  "user_id" varchar PRIMARY KEY,
  "payment_service_user_id" varchar NOT NULL,
  "created_at" timestamp,
  "modified_at" timestamp
);`,
        prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "inventory_category" (
  "id" varchar PRIMARY KEY,
  "name" varchar NOT NULL,
  "description" varchar,
  "type" varchar NOT NULL,
  "created_at" timestamp,
  "modified_at" timestamp
);`,
        prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "inventory_item" (
  "id" varchar PRIMARY KEY,
  "category_id" varchar NOT NULL,
  "name" varchar NOT NULL,
  "brand" varchar,
  "price" varchar,
  "currency" varchar,
  "description" varchar,
  "lens_id" varchar NOT NULL DEFAULT '',
  "gender" varchar,
  "created_at" timestamp,
  "modified_at" timestamp
);`,
        prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "inventory_item_color" (
  "id" varchar,
  "item_id" varchar,
  "color" varchar,
  "color_hex" varchar,
  "created_at" timestamp,
  "modified_at" timestamp,
  PRIMARY KEY ("id", "item_id")
);`,
        prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "inventory_item_size" (
  "id" varchar,
  "item_id" varchar,
  "size" varchar,
  "created_at" timestamp,
  "modified_at" timestamp,
  PRIMARY KEY ("id", "item_id")
);`,
        prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "inventory_item_image_url" (
  "id" varchar PRIMARY KEY,
  "item_id" varchar NOT NULL,
  "image_url" varchar NOT NULL,
  "created_at" timestamp,
  "modified_at" timestamp
);`,
        prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "inventory_item_image" (
  "id" varchar PRIMARY KEY,
  "item_id" varchar NOT NULL,
  "image" bytea,
  "created_at" timestamp,
  "modified_at" timestamp
);`,
        prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "inventory_demo_item" (
  "item_id" varchar PRIMARY KEY,
  "is_demo_item" bool NOT NULL,
  "created_at" timestamp,
  "modified_at" timestamp
);`,
        prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "inventory_demo_category" (
  "category_id" varchar PRIMARY KEY,
  "is_demo_item" bool NOT NULL,
  "created_at" timestamp,
  "modified_at" timestamp
);`,
        prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "user_otp" (
  "id" varchar,
  "user_email" varchar,
  "otp_hash" varchar NOT NULL,
  "created_at" timestamp,
  "modified_at" timestamp,
  PRIMARY KEY ("id", "user_email")
);`,
        prisma.$executeRaw`ALTER TABLE "user_body_matrix" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");`,
        prisma.$executeRaw`ALTER TABLE "user_face_matrix" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");`,
        prisma.$executeRaw`ALTER TABLE "user_body_image" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");`,
        prisma.$executeRaw`ALTER TABLE "user_face_image" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");`,
        prisma.$executeRaw`ALTER TABLE "user_credential" ADD FOREIGN KEY ("user_email") REFERENCES "user" ("email");`,
        prisma.$executeRaw`ALTER TABLE "user_subscription" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");`,
        prisma.$executeRaw`ALTER TABLE "payment_service_user" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");`,
        prisma.$executeRaw`ALTER TABLE "inventory_item" ADD FOREIGN KEY ("category_id") REFERENCES "inventory_category" ("id");`,
        prisma.$executeRaw`ALTER TABLE "inventory_item_color" ADD FOREIGN KEY ("item_id") REFERENCES "inventory_item" ("id");`,
        prisma.$executeRaw`ALTER TABLE "inventory_item_size" ADD FOREIGN KEY ("item_id") REFERENCES "inventory_item" ("id");`,
        prisma.$executeRaw`ALTER TABLE "inventory_item_image_url" ADD FOREIGN KEY ("item_id") REFERENCES "inventory_item" ("id");`,
        prisma.$executeRaw`ALTER TABLE "inventory_item_image" ADD FOREIGN KEY ("item_id") REFERENCES "inventory_item" ("id");`,
        prisma.$executeRaw`ALTER TABLE "inventory_demo_item" ADD FOREIGN KEY ("item_id") REFERENCES "inventory_item" ("id");`,
        prisma.$executeRaw`ALTER TABLE "inventory_demo_category" ADD FOREIGN KEY ("category_id") REFERENCES "inventory_category" ("id");`,
        prisma.$executeRaw`ALTER TABLE "user_otp" ADD FOREIGN KEY ("user_email") REFERENCES "user" ("email");`,
      ]);

      console.log("successfully populated schema");
    } catch (error) {
      console.log("failed to create tables in database, error: ", error);
    }
  }
}
