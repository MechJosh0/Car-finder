import { PrismaClient } from "@prisma/client";
import type { PaginatedResponse, User } from "~/types/api";
import { clamp } from "~/utils/helpers";

const prisma = new PrismaClient();

export default defineEventHandler(
  async (event): Promise<PaginatedResponse<User[]>> => {
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
              { email: { contains: search, mode: "insensitive" as const } },
              { name: { contains: search, mode: "insensitive" as const } },
            ],
          }
        : {};

      // Validate sortBy field (security)
      const allowedSortFields = ["id", "email", "name"];
      const validSortBy = allowedSortFields.includes(sortBy) ? sortBy : "id";

      // Get users and total count in parallel
      const users = await prisma.user.findMany({
        where,
        orderBy: { [validSortBy]: sortOrder },
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          full_name: true,
        },
      });

      const totalCount = await prisma.user.count({ where });

      // Calculate pagination metadata
      const totalPages = Math.ceil(totalCount / limit);
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;

      return {
        success: true,
        data: users,
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
      console.error("Error fetching users:", error);

      throw createError({
        statusCode: 500,
        statusMessage: "Failed to fetch users",
      });
    }
  },
);
