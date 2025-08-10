import { useQuery } from "@tanstack/vue-query";

export default (carId: ComputedRef<number | null>) => {
  return useQuery({
    queryKey: ["car", carId.value],
    queryFn: () => $fetch(`/api/cars/${carId.value}`),
  });
};
