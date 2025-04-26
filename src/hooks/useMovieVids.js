import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieVids = ({ id }) => {
  return api.get(`/movie/${id}/videos`);
};

export const useVideoQuery = ({ id }) => {
  return useQuery({
    queryKey: ["movie-video", { id }],
    queryFn: () => fetchMovieVids({ id }),
    select: (result) => result.data,
  });
};
