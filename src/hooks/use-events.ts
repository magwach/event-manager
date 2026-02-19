import { getAllEvents } from "@/lib/actions/events";
import { useQuery } from "@tanstack/react-query";

export function useGetAllEvents() {
  const result = useQuery({
    queryFn: getAllEvents,
    queryKey: ["getAllEvents"],
  });
  return result;
}
