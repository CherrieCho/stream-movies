import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = ({ keyword, page }) => {
  //키워드 유무에 따라 다른 api 호출하기
  return keyword
    ? api.get(`/search/movie?query=${keyword}&page=${page}&language=ko-KR`)
    : api.get(`/movie/popular?page=${page}&language=ko-KR`);
};

export const useSearchMovieQuery = ({ keyword, page }) => {
  return useQuery({
    queryKey: ["movie-search", { keyword, page }], //검색 키워드별 유니크한 쿼리키 만들어야 함(키워드별 캐싱)
    queryFn: () => fetchSearchMovie({ keyword, page }),
    select: (result) => result.data,
  });
};
