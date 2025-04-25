import { useMediaQuery } from 'react-responsive';
import MovieDetailWeb from "./web/MovieDetailWeb";
import MovieDetailMobile from "./mobile/MovieDetailMobile";
import "./MovieDetailPage.style.css";
import Recommendation from "./components/recommendation/Recommendation";
import Reviews from "./components/reviews/Reviews";
import { useEffect, useState } from 'react';

const MovieDetailPage = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [selectedTab, setSelectedTab] = useState("비슷한 영화");

  return(
    <div>
      {isMobile ? <MovieDetailMobile /> : <MovieDetailWeb />}
      <div className='bottom-contents'>
        <div className='movie-nav'>
          <ul>
            <li><button className={`recommend ${selectedTab !== "비슷한 영화" ? "not-selected" : ""}`} onClick={() => setSelectedTab("비슷한 영화")}>비슷한 영화</button></li>
            <li><button className={selectedTab !== "리뷰" ? "not-selected" : ""}onClick={() => setSelectedTab("리뷰")}>리뷰</button></li>
          </ul>
        </div>
        <div className='nav-contents'>
          {selectedTab === "비슷한 영화" && <Recommendation />}
          {selectedTab === "리뷰" && <Reviews />}
        </div>
      </div>
    </div>

  )

};

export default MovieDetailPage;