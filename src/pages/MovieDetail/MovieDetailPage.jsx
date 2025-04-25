import { useMediaQuery } from 'react-responsive';
import MovieDetailWeb from "./web/MovieDetailWeb";
import MovieDetailMobile from "./mobile/MovieDetailMobile";

const MovieDetailPage = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return(
    <div>
    {isMobile ? <MovieDetailMobile /> : <MovieDetailWeb />}
    </div>
  )

};

export default MovieDetailPage;