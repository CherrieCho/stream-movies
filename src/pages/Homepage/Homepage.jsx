import React from 'react'
import Banner from './components/banner/Banner'
import PopularMovieSlide from './components/popularMovieSlide/PopularMovieSlide'
import UpcomingMovieSlide from './components/upcomingMovieSlide/UpcomingMovieSlide'
import TopRatedMovieSlide from './components/topRatedMovieSlide/TopRatedMovieSlide'

const Homepage = () => {
  return (
    <div>
      <div><Banner/></div>
      <div><PopularMovieSlide/></div>
      <div><UpcomingMovieSlide/></div>
      <div><TopRatedMovieSlide/></div>
    </div>
  )
}

export default Homepage