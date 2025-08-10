import { PrismaClient } from "@prisma/client";
import type { PaginatedResponse, Car } from "~/types/api";
import { clamp } from "~/utils/helpers";

const prisma = new PrismaClient();

export default defineEventHandler(
  async (event): Promise<PaginatedResponse<Car[]>> => {
    try {
      const query = getQuery(event);

      // Parse query parameters
      const page = clamp(query.page as string, { min: 1, defaultValue: 1 });
      const limit = clamp(query.limit as string, {
        min: 1,
        max: 50000, // lol
        defaultValue: 25,
      });
      const search = query.search as string;
      const sortBy = (query.sortBy as string) || "id";
      const sortOrder = (query.sortOrder as string) === "asc" ? "asc" : "desc";

      const skip = (page - 1) * limit;

      // Build where clause for search
      const where = search
        ? {
            OR: [
              { make: { contains: search, mode: "insensitive" as const } },
              { model: { contains: search, mode: "insensitive" as const } },
            ],
          }
        : {};

      // Validate sortBy field (security)
      const allowedSortFields = ["id", "make", "model"];
      const validSortBy = allowedSortFields.includes(sortBy) ? sortBy : "id";

      // Get cars and total count in parallel
      const cars = await prisma.car.findMany({
        where,
        orderBy: { [validSortBy]: sortOrder },
        skip,
        take: limit,
        select: {
          id: true,
          make: true,
          model: true,
        },
      });

      const totalCount = await prisma.car.count({ where });

      // Calculate pagination metadata
      const totalPages = Math.ceil(totalCount / limit);
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;

      return {
        success: true,
        data: cars,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          hasNextPage,
          hasPrevPage,
          limit,
        },
      };
    } catch (error) {
      console.error("Error fetching cars:", error);

      throw createError({
        statusCode: 500,
        statusMessage: "Failed to fetch cars",
      });
    }
  },
);
