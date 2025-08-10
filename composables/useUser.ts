import { useQuery } from "@tanstack/vue-query";

export default (userId: ComputedRef<number | null>) => {
  return useQuery({
    queryKey: ["user", userId.value],
    queryFn: () => $fetch(`/api/users/${userId.value}`),
  });
};
