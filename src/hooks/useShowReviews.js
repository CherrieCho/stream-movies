import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieReviews = ({ id }) => {
  return api.get(`/movie/${id}/reviews`);
};

export const useShowReviewsQuery = ({ id }) => {
  return useQuery({
    queryKey: ["similar-movies", { id }],
    queryFn: () => fetchMovieReviews({ id }),
    select: (result) => result.data,
  });
};
