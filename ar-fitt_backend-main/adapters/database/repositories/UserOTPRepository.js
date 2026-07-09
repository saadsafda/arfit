import { PrismaClient } from "@prisma/client";
import { UserOTP } from "../../../entities/UserOTP.js";

const prisma = new PrismaClient();

export class UserOTPRepository {
  async createUserOTP(userOTP) {
    try {
      await prisma.user_otp.create({
        data: {
          id: userOTP.getID(),
          user_email: userOTP.getEmail(),
          otp_hash: userOTP.getOTPHash(),
          created_at: userOTP.getCreatedAt(),
          modified_at: userOTP.getModifiedAt(),
        },
      });
    } catch (error) {
      console.log("failed to save user otp into db, error: ", error);
      return error;
    }
    return null;
  }

  async getUserOTPByEmail(email) {
    try {
      const result = await prisma.user_otp.findFirst({
        where: {
          user_email: email,
        },
        orderBy: {
          created_at: "desc",
        },
      });

      if (!result) {
        return [null, null];
      }
      return [
        new UserOTP(
          result.id,
          result.user_email,
          result.otp_hash,
          result.created_at,
          result.modified_at
        ),
        null,
      ];
    } catch (error) {
      console.log("failed to read user otp from db, error: ", error);
      return [null, error];
    }
  }
}
