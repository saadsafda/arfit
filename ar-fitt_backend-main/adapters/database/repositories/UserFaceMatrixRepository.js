import { PrismaClient } from "@prisma/client";
import { UserFaceMatrix } from "../../../entities/UserFaceMatrix.js";

const prisma = new PrismaClient();

export class UserFaceMatrixRepository {
  async createUserFaceMatrix(faceMatrix) {
    try {
      await prisma.user_face_matrix.create({
        data: {
          user_id: faceMatrix.getUserID(),
          face_matrix: faceMatrix.getFaceMatrix(),
          created_at: faceMatrix.getCreatedAt(),
          modified_at: faceMatrix.getModifiedAt(),
        },
      });
      return null;
    } catch (error) {
      console.log("failed to create face matrix in db, error: ", error);
      return error;
    }
  }

  async getUserFaceMatrixByUserID(userID) {
    try {
      const result = await prisma.user_face_matrix.findUnique({
        where: {
          user_id: userID,
        },
      });
      if (!result) {
        return [null, null];
      }
      return [
        new UserFaceMatrix(
          result.user_id,
          result.face_matrix,
          result.created_at,
          result.modified_at
        ),
        null,
      ];
    } catch (error) {
      console.log("failed to get user face matrix from db, error: ", error);
      return [null, error];
    }
  }

  async updateUserFaceMatrix(faceMatrix) {
    try {
      await prisma.user_face_matrix.update({
        where: {
          user_id: faceMatrix.getUserID(),
        },
        data: {
          face_matrix: faceMatrix.getFaceMatrix(),
          modified_at: faceMatrix.getModifiedAt(),
        },
      });
      return null;
    } catch (error) {
      console.log("failed to update user face matrix in db, error: ", error);
      return error;
    }
  }

  async deleteUserFaceMatrix(userID) {
    try {
      await prisma.user_face_matrix.delete({
        where: {
          user_id: userID,
        },
      });
      return null;
    } catch (error) {
      console.log("failed to delete user face matrix in db, error: ", error);
      return error;
    }
  }
}
