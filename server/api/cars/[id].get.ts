import { PrismaClient } from "@prisma/client";
import { ApiResponse, Car } from "~/types/api";

const prisma = new PrismaClient();

export default defineEventHandler(async (event): Promise<ApiResponse<Car>> => {
  try {
    const carId = getRouterParam(event, "id");

    if (!carId) {
      throw createError({
        statusCode: 400,
        statusMessage: "Car ID is required",
      });
    }

    const car = await prisma.car.findUnique({
      where: {
        id: parseInt(carId),
      },
      include: {
        user: true,
      },
    });

    if (!car) {
      throw createError({
        statusCode: 404,
        statusMessage: "Car not found",
      });
    }

    return {
      success: true,
      data: car,
    };
  } catch (error) {
    console.error("Error fetching car:", error);

    if (error instanceof Error) {
      throw error; // Re-throw HTTP errors
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
