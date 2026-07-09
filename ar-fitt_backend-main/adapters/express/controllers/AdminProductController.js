import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { APIResponse } from "../../../infra/utils/api_response/APIResponse.js";
import { APIResponseMessage } from "../../../infra/utils/api_response/APIResponseMessage.js";
import { APIResponseConstants } from "../../../infra/utils/api_response/APIResponseConstants.js";
import { CommonConstants } from "../../../infra/utils/common/Constants.js";
import { AdminAuthMiddleware } from "../../../middleware/admin_auth/AdminAuthMiddleware.js";
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

export class AdminProductController {
  constructor() {
    this.adminAuthMiddleware = new AdminAuthMiddleware();
    
    // Configure multer for image uploads
    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        const uploadPath = 'product_images';
        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
      }
    });

    this.upload = multer({
      storage: this.storage,
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
      },
      fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
          return cb(null, true);
        } else {
          cb(new Error('Only image files are allowed!'));
        }
      }
    });
  }

  createExpressController() {
    const router = express.Router();

    // Get all products with category information
    router.get(
      "/admin/products",
      // this.adminAuthMiddleware.verifyAdminToken.bind(this.adminAuthMiddleware),
      async (req, res) => {
        try {
          const products = await prisma.inventory_item.findMany({
            include: {
              category: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  type: true
                }
              },
              colors: true,
              sizes: true,
              images: true,
              imageUrls: true
            },
            orderBy: {
              id: 'asc'
            }
          });

          res.status(200).json({
            status: CommonConstants.SUCCESS_STATUS,
            data: products,
            message: "Products retrieved successfully"
          });
        } catch (error) {
          console.error("Error fetching products:", error);
          res.status(500).json({
            status: CommonConstants.FAILURE_STATUS,
            message: "Internal server error"
          });
        }
      }
    );

    // Get product by ID
    router.get(
      "/admin/products/:id",
      this.adminAuthMiddleware.verifyAdminToken.bind(this.adminAuthMiddleware),
      async (req, res) => {
        try {
          const { id } = req.params;
          const product = await prisma.inventory_item.findUnique({
            where: { id },
            include: {
              category: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  type: true
                }
              },
              colors: true,
              sizes: true,
              images: true,
              imageUrls: true
            }
          });

          if (!product) {
            return res.status(404).json({
              status: CommonConstants.FAILURE_STATUS,
              message: "Product not found"
            });
          }

          res.status(200).json({
            status: CommonConstants.SUCCESS_STATUS,
            data: product,
            message: "Product retrieved successfully"
          });
        } catch (error) {
          console.error("Error fetching product:", error);
          res.status(500).json({
            status: CommonConstants.FAILURE_STATUS,
            message: "Internal server error"
          });
        }
      }
    );

    // Create new product
    router.post(
      "/admin/products",
      this.adminAuthMiddleware.verifyAdminToken.bind(this.adminAuthMiddleware),
      async (req, res) => {
        try {
          const { 
            categoryId, 
            name, 
            brand, 
            price, 
            currency, 
            description, 
            lensId,
            colors,
            sizes,
            imageUrls,
            gender
          } = req.body;

                     // Create the product
           const newProduct = await prisma.inventory_item.create({
             data: {
               id: uuidv4(),
              category_id: categoryId,
              name,
              brand,
              price,
              currency,
              description,
              lens_id: lensId,
              gender: gender || null
            }
          });

          // Add colors if provided
          if (colors && colors.length > 0) {
            await prisma.inventory_item_color.createMany({
              data: colors.map(color => ({
                id: uuidv4(),
                item_id: newProduct.id,
                color: color.color,
                color_hex: color.colorHex
              }))
            });
          }

          // Add sizes if provided
          if (sizes && sizes.length > 0) {
            await prisma.inventory_item_size.createMany({
              data: sizes.map(size => ({
                id: uuidv4(),
                item_id: newProduct.id,
                size
              }))
            });
          }

          // Add image URLs if provided
          if (imageUrls && imageUrls.length > 0) {
            await prisma.inventory_item_image_url.createMany({
              data: imageUrls.map(url => ({
                id: uuidv4(),
                item_id: newProduct.id,
                image_url: url
              }))
            });
          }

          // Fetch the complete product with relations
          const completeProduct = await prisma.inventory_item.findUnique({
            where: { id: newProduct.id },
            include: {
              category: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  type: true
                }
              },
              colors: true,
              sizes: true,
              images: true,
              imageUrls: true
            }
          });

          res.status(201).json({
            status: CommonConstants.SUCCESS_STATUS,
            data: completeProduct,
            message: "Product created successfully"
          });
        } catch (error) {
          console.error("Error creating product:", error);
          res.status(500).json({
            status: CommonConstants.FAILURE_STATUS,
            message: "Internal server error"
          });
        }
      }
    );

    // Update product
    router.put(
      "/admin/products/:id",
      this.adminAuthMiddleware.verifyAdminToken.bind(this.adminAuthMiddleware),
      async (req, res) => {
        try {
          const { id } = req.params;
          const { 
            categoryId, 
            name, 
            brand, 
            price, 
            currency, 
            description, 
            lensId,
            colors,
            sizes,
            imageUrls,
            gender
          } = req.body;

          // Update the product
          const updatedProduct = await prisma.inventory_item.update({
            where: { id },
            data: {
              category_id: categoryId,
              name,
              brand,
              price,
              currency,
              description,
              lens_id: lensId,
              gender: gender || null
            }
          });

          // Update colors if provided
          if (colors) {
            // Delete existing colors
            await prisma.inventory_item_color.deleteMany({
              where: { item_id: id }
            });
            
            // Add new colors
            if (colors.length > 0) {
              await prisma.inventory_item_color.createMany({
                data: colors.map(color => ({
                  id: uuidv4(),
                  item_id: id,
                  color: color.color,
                  color_hex: color.colorHex
                }))
              });
            }
          }

          // Update sizes if provided
          if (sizes) {
            // Delete existing sizes
            await prisma.inventory_item_size.deleteMany({
              where: { item_id: id }
            });
            
            // Add new sizes
            if (sizes.length > 0) {
              await prisma.inventory_item_size.createMany({
                data: sizes.map(size => ({
                  id: uuidv4(),
                  item_id: id,
                  size
                }))
              });
            }
          }

          // Update image URLs if provided
          if (imageUrls) {
            // Delete existing image URLs
            await prisma.inventory_item_image_url.deleteMany({
              where: { item_id: id }
            });
            
            // Add new image URLs
            if (imageUrls.length > 0) {
              await prisma.inventory_item_image_url.createMany({
                data: imageUrls.map(url => ({
                  id: uuidv4(),
                  item_id: id,
                  image_url: url
                }))
              });
            }
          }

          // Fetch the complete updated product
          const completeProduct = await prisma.inventory_item.findUnique({
            where: { id },
            include: {
              category: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  type: true
                }
              },
              colors: true,
              sizes: true,
              images: true,
              imageUrls: true
            }
          });

          res.status(200).json({
            status: CommonConstants.SUCCESS_STATUS,
            data: completeProduct,
            message: "Product updated successfully"
          });
        } catch (error) {
          console.error("Error updating product:", error);
          res.status(500).json({
            status: CommonConstants.FAILURE_STATUS,
            message: "Internal server error"
          });
        }
      }
    );

    // Delete product
    router.delete(
      "/admin/products/:id",
      this.adminAuthMiddleware.verifyAdminToken.bind(this.adminAuthMiddleware),
      async (req, res) => {
        try {
          const { id } = req.params;
          
          // Check if product exists
          const existingProduct = await prisma.inventory_item.findUnique({
            where: { id }
          });

          if (!existingProduct) {
            return res.status(404).json({
              status: CommonConstants.FAILURE_STATUS,
              message: "Product not found"
            });
          }

          // Delete related records first
          await prisma.inventory_item_color.deleteMany({
            where: { item_id: id }
          });

          await prisma.inventory_item_size.deleteMany({
            where: { item_id: id }
          });

          await prisma.inventory_item_image_url.deleteMany({
            where: { item_id: id }
          });

          await prisma.inventory_item_image.deleteMany({
            where: { item_id: id }
          });

          // Delete the product
          await prisma.inventory_item.delete({
            where: { id }
          });

          res.status(200).json({
            status: CommonConstants.SUCCESS_STATUS,
            message: "Product deleted successfully"
          });
        } catch (error) {
          console.error("Error deleting product:", error);
          res.status(500).json({
            status: CommonConstants.FAILURE_STATUS,
            message: "Internal server error"
          });
        }
      }
    );

    // Upload product image
    router.post(
      "/admin/products/:id/image",
      this.adminAuthMiddleware.verifyAdminToken.bind(this.adminAuthMiddleware),
      this.upload.single('image'),
      async (req, res) => {
        try {
          const { id } = req.params;
          
          if (!req.file) {
            return res.status(400).json({
              status: CommonConstants.FAILURE_STATUS,
              message: "No image file provided"
            });
          }

          // Check if product exists
          const product = await prisma.inventory_item.findUnique({
            where: { id }
          });

          if (!product) {
            // Delete the uploaded file if product doesn't exist
            fs.unlinkSync(req.file.path);
            return res.status(404).json({
              status: CommonConstants.FAILURE_STATUS,
              message: "Product not found"
            });
          }

          // Delete existing image if any
          const existingImage = await prisma.inventory_item_image_url.findFirst({
            where: { item_id: id }
          });

          if (existingImage) {
            // Delete the old file
            const oldFilePath = path.join('product_images', existingImage.image_url);
            if (fs.existsSync(oldFilePath)) {
              fs.unlinkSync(oldFilePath);
            }
            
            // Delete the database record
            await prisma.inventory_item_image_url.delete({
              where: { id: existingImage.id }
            });
          }

          // Create new image record
          const newImage = await prisma.inventory_item_image_url.create({
            data: {
              id: uuidv4(),
              item_id: id,
              image_url: req.file.filename
            }
          });

          res.status(200).json({
            status: CommonConstants.SUCCESS_STATUS,
            data: newImage,
            message: "Image uploaded successfully"
          });
        } catch (error) {
          console.error("Error uploading image:", error);
          
          // Delete the uploaded file if there was an error
          if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
          }
          
          res.status(500).json({
            status: CommonConstants.FAILURE_STATUS,
            message: "Internal server error"
          });
        }
      }
    );

    // Delete product image
    router.delete(
      "/admin/products/:id/image",
      this.adminAuthMiddleware.verifyAdminToken.bind(this.adminAuthMiddleware),
      async (req, res) => {
        try {
          const { id } = req.params;
          
          // Find the image record
          const imageRecord = await prisma.inventory_item_image_url.findFirst({
            where: { item_id: id }
          });

          if (!imageRecord) {
            return res.status(404).json({
              status: CommonConstants.FAILURE_STATUS,
              message: "Image not found"
            });
          }

          // Delete the file
          const filePath = path.join('product_images', imageRecord.image_url);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }

          // Delete the database record
          await prisma.inventory_item_image_url.delete({
            where: { id: imageRecord.id }
          });

          res.status(200).json({
            status: CommonConstants.SUCCESS_STATUS,
            message: "Image deleted successfully"
          });
        } catch (error) {
          console.error("Error deleting image:", error);
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
