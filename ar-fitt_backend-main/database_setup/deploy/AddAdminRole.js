import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

const prisma = new PrismaClient();

export class AddAdminRole {
  async addRoleColumn() {
    try {
      console.log("Adding role column to user table...");
      
      // Add role column to user table
      await prisma.$executeRaw`
        ALTER TABLE "user" 
        ADD COLUMN IF NOT EXISTS "role" TEXT DEFAULT 'user'
      `;
      
      console.log("Role column added successfully!");
      
      // Update existing users to have 'user' role
      await prisma.$executeRaw`
        UPDATE "user" 
        SET "role" = 'user' 
        WHERE "role" IS NULL
      `;
      
      console.log("Existing users updated with 'user' role!");
      
      return true;
    } catch (error) {
      console.error("Error adding role column:", error);
      return false;
    }
  }

  async createAdminUser() {
    try {
      console.log("Creating admin user...");
      
      // Check if admin user already exists
      const existingAdmin = await prisma.user.findFirst({
        where: {
          email: "admin@arfitt.com"
        }
      });

      if (existingAdmin) {
        // Update existing user to admin role
        await prisma.user.update({
          where: { id: existingAdmin.id },
          data: { role: "admin" }
        });
        
        // Check if credentials exist, if not create them
        const existingCreds = await prisma.user_credential.findUnique({
          where: { user_email: "admin@arfitt.com" }
        });
        
        if (!existingCreds) {
          const hashedPassword = crypto.createHash("sha1").update("admin123").digest("hex");
          await prisma.user_credential.create({
            data: {
              user_email: "admin@arfitt.com",
              password_hash: hashedPassword,
              created_at: new Date(),
              modified_at: new Date()
            }
          });
          console.log("Admin credentials created!");
        } else {
          // Update existing credentials with correct hash
          const hashedPassword = crypto.createHash("sha1").update("admin123").digest("hex");
          await prisma.user_credential.update({
            where: { user_email: "admin@arfitt.com" },
            data: {
              password_hash: hashedPassword,
              modified_at: new Date()
            }
          });
          console.log("Admin credentials updated!");
        }
        
        console.log("Existing user updated to admin role!");
        return true;
      }

      // Create new admin user
      const adminUser = await prisma.user.create({
        data: {
          id: uuidv4(),
          email: "admin@arfitt.com",
          first_name: "Admin",
          last_name: "User",
          phone: "123-456-7890",
          gender: "male",
          dob: new Date("1990-01-01"),
          is_verified: true,
          is_subscribed: true,
          is_body_scanned: false,
          is_face_scanned: false,
          created_at: new Date(),
          modified_at: new Date(),
          role: "admin"
        }
      });

      // Create admin credentials
      const hashedPassword = crypto.createHash("sha1").update("admin123").digest("hex");
      await prisma.user_credential.create({
        data: {
          user_email: "admin@arfitt.com",
          password_hash: hashedPassword,
          created_at: new Date(),
          modified_at: new Date()
        }
      });

      console.log("Admin user created successfully!");
      console.log("Admin email: admin@arfitt.com");
      console.log("Admin password: admin123");
      console.log("Admin ID:", adminUser.id);
      
      return true;
    } catch (error) {
      console.error("Error creating admin user:", error);
      return false;
    }
  }

  async execute() {
    console.log("Starting admin role setup...");
    
    const roleAdded = await this.addRoleColumn();
    if (!roleAdded) {
      console.error("Failed to add role column");
      return;
    }

    const adminCreated = await this.createAdminUser();
    if (!adminCreated) {
      console.error("Failed to create admin user");
      return;
    }

    console.log("Admin role setup completed successfully!");
  }
}

// Run the script
const addAdminRole = new AddAdminRole();
addAdminRole.execute()
  .then(() => {
    console.log("Setup completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Setup failed:", error);
    process.exit(1);
  });
