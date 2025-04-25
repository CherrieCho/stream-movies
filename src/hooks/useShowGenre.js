import { useMovieGenreQuery } from "./useMoviegenre";

export const useShowGenre = () => {
  const { data: genreData } = useMovieGenreQuery();

  //장르id를 장르명(텍스트)로 변환시켜주는 함수
  const showGenre = (genreIDList) => {
    if (!genreData) return [];
    return genreIDList?.map((id) => {
      //genreData의 id와 해당 영화의 장르 id가 일치하는 요소(객체)를 genreData 배열에서 찾음
      const genreObj = genreData.find((genre) => genre.id === id);
      //그 중에서 장르이름 key만 리턴(장르id배열의 요소가 장르명으로 바뀜)
      return genreObj.name;
    });
  };
  return { showGenre };
};
