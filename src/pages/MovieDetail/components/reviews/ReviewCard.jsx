import React, { useEffect, useRef, useState } from 'react'
import "./ReviewCard.style.css";

const ReviewCard = ({key, author, content}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const [isMeasured, setIsMeasured] = useState(false)
  const contentRef = useRef(null)

  //리뷰 5줄 넘으면 넘침상태로 변경
  useEffect(() => {
    if (contentRef.current) {
      const lineHeight = parseFloat(window.getComputedStyle(contentRef.current).lineHeight)
      const maxHeight = lineHeight * 4
      const scrollHeight = contentRef.current.scrollHeight

      if (scrollHeight > maxHeight) {
        setIsOverflowing(true)
      }
      setIsMeasured(true)
    }
  }, [content])

  //더보기 버튼 클릭시 닫기로 바뀜(vice versa)
  const handleOpenClick = () =>{
    setIsOpen((prev) => !prev);
  }

  return (
    <div>
      <div className='review-card'>
        <div>{author}</div>
        <div><p ref={contentRef} className={isOpen ? 'expanded' : isMeasured ? 'clamped' : ''}>{content}</p></div>
        {isOverflowing && (
        <div className="more-button">
          <button onClick={handleOpenClick}>
            {isOpen ? "닫기" : "더보기"}
          </button>
        </div>
      )}
      </div>
    </div>
  )
}

export default ReviewCard