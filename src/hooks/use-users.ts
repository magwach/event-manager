import { getUserProfile } from "@/lib/actions/users";
import { useQueries, useQuery } from "@tanstack/react-query";

export function useGetUserProfile() {
  const result = useQuery({
    queryFn: getUserProfile,
    queryKey: ["getUserProfile"],
  });
  return result;
}
