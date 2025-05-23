import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTopRatedMovies = () => {
  return api.get(`/movie/top_rated?language=ko-KR`);
};

export const useTopRatedMoviesQuery = () => {
  return useQuery({
    queryKey: ["top-rated-movie"],
    queryFn: fetchTopRatedMovies,
    select: (result) => result.data,
  });
};
