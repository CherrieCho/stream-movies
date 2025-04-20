//슬라이더 반응형 설정
export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 8,
  },
  desktop: {
    breakpoint: { max: 3000, min: 2200 },
    items: 8,
  },
  desktop2: {
    breakpoint: { max: 2200, min: 1700 },
    items: 6,
  },
  desktop3: {
    breakpoint: { max: 1700, min: 1450 },
    items: 5,
  },
  desktop4: {
    breakpoint: { max: 1450, min: 1200 },
    items: 4,
  },
  desktop5: {
    breakpoint: { max: 1200, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 720 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 720, min: 0 },
    items: 1,
  },
};
