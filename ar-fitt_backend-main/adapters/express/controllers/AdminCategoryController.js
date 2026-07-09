import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { APIResponse } from "../../../infra/utils/api_response/APIResponse.js";
import { APIResponseMessage } from "../../../infra/utils/api_response/APIResponseMessage.js";
import { APIResponseConstants } from "../../../infra/utils/api_response/APIResponseConstants.js";
import { CommonConstants } from "../../../infra/utils/common/Constants.js";
import { AdminAuthMiddleware } from "../../../middleware/admin_auth/AdminAuthMiddleware.js";
import express from "express";

const prisma = new PrismaClient();

export class AdminCategoryController {
  constructor() {
    this.adminAuthMiddleware = new AdminAuthMiddleware();
  }

  createExpressController() {
    const router = express.Router();

    // Get all categories
    router.get(
      "/admin/categories",
      // this.adminAuthMiddleware.verifyAdminToken.bind(this.adminAuthMiddleware),
      async (req, res) => {
        try {
          const categories = await prisma.inventory_category.findMany({
            orderBy: {
              created_at: 'desc'
            }
          });

          res.status(200).json({
            status: CommonConstants.SUCCESS_STATUS,
            data: categories,
            message: "Categories retrieved successfully"
          });
        } catch (error) {
          console.error("Error fetching categories:", error);
          res.status(500).json({
            status: CommonConstants.FAILURE_STATUS,
            message: "Internal server error"
          });
        }
      }
    );

    // Get category by ID
    router.get(
      "/admin/categories/:id",
      this.adminAuthMiddleware.verifyAdminToken.bind(this.adminAuthMiddleware),
      async (req, res) => {
        try {
          const { id } = req.params;
          const category = await prisma.inventory_category.findUnique({
            where: { id }
          });

          if (!category) {
            return res.status(404).json({
              status: CommonConstants.FAILURE_STATUS,
              message: "Category not found"
            });
          }

          res.status(200).json({
            status: CommonConstants.SUCCESS_STATUS,
            data: category,
            message: "Category retrieved successfully"
          });
        } catch (error) {
          console.error("Error fetching category:", error);
          res.status(500).json({
            status: CommonConstants.FAILURE_STATUS,
            message: "Internal server error"
          });
        }
      }
    );

    // Create new category
    router.post(
      "/admin/categories",
      this.adminAuthMiddleware.verifyAdminToken.bind(this.adminAuthMiddleware),
      async (req, res) => {
        try {
          const { name, description, type } = req.body;

                     const newCategory = await prisma.inventory_category.create({
             data: {
               id: uuidv4(),
              name,
              description,
              type,
              created_at: new Date(),
              modified_at: new Date()
            }
          });

          res.status(201).json({
            status: CommonConstants.SUCCESS_STATUS,
            data: newCategory,
            message: "Category created successfully"
          });
        } catch (error) {
          console.error("Error creating category:", error);
          res.status(500).json({
            status: CommonConstants.FAILURE_STATUS,
            message: "Internal server error"
          });
        }
      }
    );

    // Update category
    router.put(
      "/admin/categories/:id",
      this.adminAuthMiddleware.verifyAdminToken.bind(this.adminAuthMiddleware),
      async (req, res) => {
        try {
          const { id } = req.params;
          const { name, description, type } = req.body;

          const updatedCategory = await prisma.inventory_category.update({
            where: { id },
            data: {
              name,
              description,
              type,
              modified_at: new Date()
            }
          });

          res.status(200).json({
            status: CommonConstants.SUCCESS_STATUS,
            data: updatedCategory,
            message: "Category updated successfully"
          });
        } catch (error) {
          console.error("Error updating category:", error);
          res.status(500).json({
            status: CommonConstants.FAILURE_STATUS,
            message: "Internal server error"
          });
        }
      }
    );

    // Delete category (cascades to delete all products and related data)
    router.delete(
      "/admin/categories/:id",
      this.adminAuthMiddleware.verifyAdminToken.bind(this.adminAuthMiddleware),
      async (req, res) => {
        try {
          const { id } = req.params;
          
          // Check if category exists
          const existingCategory = await prisma.inventory_category.findUnique({
            where: { id }
          });

          if (!existingCategory) {
            return res.status(404).json({
              status: CommonConstants.FAILURE_STATUS,
              message: "Category not found"
            });
          }

          // Get all products in this category
          const productsInCategory = await prisma.inventory_item.findMany({
            where: { category_id: id },
            select: { id: true }
          });

          const productIds = productsInCategory.map(p => p.id);

          // Delete all related product data if there are products
          if (productIds.length > 0) {
            // Delete product colors
            await prisma.inventory_item_color.deleteMany({
              where: { item_id: { in: productIds } }
            });

            // Delete product sizes
            await prisma.inventory_item_size.deleteMany({
              where: { item_id: { in: productIds } }
            });

            // Delete product images (binary)
            await prisma.inventory_item_image.deleteMany({
              where: { item_id: { in: productIds } }
            });

            // Delete product image URLs
            await prisma.inventory_item_image_url.deleteMany({
              where: { item_id: { in: productIds } }
            });

            // Delete demo item records
            await prisma.inventory_demo_item.deleteMany({
              where: { item_id: { in: productIds } }
            });

            // Delete all products in this category
            await prisma.inventory_item.deleteMany({
              where: { category_id: id }
            });
          }

          // Delete related demo category record if exists
          await prisma.inventory_demo_category.deleteMany({
            where: { category_id: id }
          });

          // Delete the category
          await prisma.inventory_category.delete({
            where: { id }
          });

          res.status(200).json({
            status: CommonConstants.SUCCESS_STATUS,
            message: "Category and all associated products deleted successfully"
          });
        } catch (error) {
          console.error("Error deleting category:", error);
          res.status(500).json({
            status: CommonConstants.FAILURE_STATUS,
            message: "Internal server error"
          });
        }
      }
    );

    return router;
  }
}
