import React, { useCallback, useEffect, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
const TWEEN_FACTOR_BASE = 0.2

const EmblaCarousel = () => {
    const options = { dragFree: true, loop: true }
const SLIDE_COUNT = 5
const slides =[
    {text:'Individual Coaching',
      url:'#',img:'/images/service01.png',y:-70,desc:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, hic harum. Laboriosam"
    }, {text:'Group Coaching',
      url:'#',img:'/images/service02.png',y:-120,desc:"Lorem, ipsum dolor sit amet consectetur adipisicing elit."
    }, {text:'Corporate Group Coaching',
      url:'#',img:'/images/service03.png',y:-170,desc:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, hic harum. Laboriosam"
    }
  ]
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const tweenFactor = useRef(0)
  const tweenNodes = useRef([])

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const setTweenNodes = useCallback((emblaApi) => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector('.embla__parallax__layer')
    })
  }, [])

  const setTweenFactor = useCallback((emblaApi) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
  }, [])

  const tweenParallax = useCallback((emblaApi, eventName) => {
    const engine = emblaApi.internalEngine()
    const scrollProgress = emblaApi.scrollProgress()
    const slidesInView = emblaApi.slidesInView()
    const isScrollEvent = eventName === 'scroll'

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress
      const slidesInSnap = engine.slideRegistry[snapIndex]

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target()

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target)

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress)
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress)
              }
            }
          })
        }

        const translate = diffToTarget * (-1 * tweenFactor.current) * 100
        const tweenNode = tweenNodes.current[slideIndex]
        tweenNode.style.transform = `translateX(${translate}%)`
      })
    })
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    setTweenNodes(emblaApi)
    setTweenFactor(emblaApi)
    tweenParallax(emblaApi)

    emblaApi
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactor)
      .on('reInit', tweenParallax)
      .on('scroll', tweenParallax)
      .on('slideFocus', tweenParallax)
  }, [emblaApi, tweenParallax])

  return (
 
    <div className="py-4 md:hidden block max-w-[48rem] embla mx-auto  bgpink-400">
      <div className="overflow-hidden bgred-400" ref={emblaRef}>
        <div className="embla__container flex ">
          {slides.map(({img,text,url,y,desc},index) => (
            <div className="embla__slide" key={index}>
              <div className="rounded-md h-full overflow-hidden">
                <div className="embla__parallax__layer relative w-full h-full flex justify-center">
                  <img
                    className=" h-[12rem] md:h-[14rem] w-full max-w-none object-cover block rounded-md flex-[0_0_calc(115%+2)] embla__slide__img  embla__parallax__img"
                    src={img}
                    alt="Your alt text"
                  />
                  <div className='bg-black/40 h-full w-full absolute top-0 left-0 z-20'/>
                   <div className=' flex flex-col justify-end p-4  bg-slate-500/50 h-full w-full absolute top-0 left-0 z-30'>
                 <h2 className='text-balance text-2xl font-semibold leading-[1] circular text-white w-10/12'>
                   {text}
                 </h2>
                 <p className='text-white mt-4 font-body 2xl leading-[1] w-[80%] text-balance'>{desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls bggreen-600">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel































































