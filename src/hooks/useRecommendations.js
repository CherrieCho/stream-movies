import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieRecommend = ({ id }) => {
  return api.get(`/movie/${id}/recommendations?language=ko-KR`);
};

export const useRecommendationsQuery = ({ id }) => {
  return useQuery({
    queryKey: ["similar-movies", { id }],
    queryFn: () => fetchMovieRecommend({ id }),
    select: (result) => result.data,
  });
};
