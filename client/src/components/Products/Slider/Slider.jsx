import React, {useState} from 'react'
import './styles.css'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { bluePants, blueShoes, blueJersey } from '../../../assets';

const Slider = () => {

  const slides = [
    { image: blueJersey, title: "blue jersey" },
    { image: bluePants, title: "blue pants" },
    { image: blueShoes, title: "blue shoes" },
  ]

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  }

  return (
    <div className='slider'>
      
      <div onClick={goToPrevious}><KeyboardArrowLeftIcon fontSize='large' /></div>

      <div className='slides-images'>
        <img src={slides[currentIndex].image} width='400px' />
      </div>

      <div onClick={goToNext}><KeyboardArrowRightIcon fontSize='large' /></div>
      
    
    </div>
  )
}

export default Slider