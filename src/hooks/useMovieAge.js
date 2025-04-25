import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieAge = ({ id }) => {
  return api.get(`/movie/${id}/release_dates`);
};

export const useMovieAgeQuery = ({ id }) => {
  return useQuery({
    queryKey: ["movie-age", { id }],
    queryFn: () => fetchMovieAge({ id }),
    select: (result) => result.data.results,
  });
};
