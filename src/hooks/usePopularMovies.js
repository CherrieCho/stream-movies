import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchPopularMovies = () => {
  return api.get(`/movie/popular?language=ko-KR`);
};

export const usePopularMoviesQuery = () => {
  return useQuery({
    queryKey: ["popular-movie"],
    queryFn: fetchPopularMovies,
    select: (result) => result.data,
  });
};
