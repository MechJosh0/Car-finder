import { PrismaClient } from "@prisma/client";
import { ApiResponse, User } from "~/types/api";

const prisma = new PrismaClient();

export default defineEventHandler(async (event): Promise<ApiResponse<User>> => {
  try {
    const userId = getRouterParam(event, "id");

    if (!userId) {
      throw createError({
        statusCode: 400,
        statusMessage: "User ID is required",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: "User not found",
      });
    }

    return {
      success: true,
      data: user,
    };
  } catch (error) {
    console.error("Error fetching user:", error);

    if (error instanceof Error) {
      throw error; // Re-throw HTTP errors
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
