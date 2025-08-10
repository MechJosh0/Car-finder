import { useQuery } from "@tanstack/vue-query";
import type { PaginationState } from "@tanstack/vue-table";

export default (pagination: Ref<PaginationState>) => {
  console.log(pagination);
  return useQuery({
    queryKey: ["users", pagination],
    queryFn: () =>
      $fetch(`/api/users`, {
        params: {
          page: pagination.value.pageIndex + 1,
          limit: pagination.value.pageSize,
        },
      }),
  });
};
