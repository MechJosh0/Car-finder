import { useQuery } from "@tanstack/vue-query";
import type { PaginationState } from "@tanstack/vue-table";

export default (pagination: Ref<PaginationState>) => {
  return useQuery({
    queryKey: ["cars", pagination],
    queryFn: () =>
      $fetch(`/api/cars`, {
        params: {
          page: pagination.value.pageIndex + 1,
          limit: pagination.value.pageSize,
        },
      }),
  });
};
