import {AnimatePresence} from 'framer-motion';
import Lenis from "@/providers/Lenis";
import Header from "@/components/Header";
import Landing from "@/components/Landing";
import { useEffect, useState } from "react";
import Preloader from '@/components/Preloader';
import Section2 from '@/components/Section2';
import { Slider } from '@/components/Slider';
// import { Crowd } from '@/effects/Crowd';
// import MouseTrail from '@/effects/MouseTrail';
// import dynamic from "next/dynamic";
// import Copy from '@/effects/Copy';
// import { ArrowDown, MousePointer } from 'lucide-react';
// import Section1 from '@/components/Section1';
// import HorizontalScrollPanel from '@/components/HorizontalScrollPanel';
// import FlipCardOnScroll from '@/components/FlipCardOnScroll';
// import Mask from '@/components/Mask';
// import SpreadCards from '@/components/SpreadCards';
// import VideoOnScroll from '@/effects/VideoOnScroll';
// import ClipedVideo from '@/components/ClipedVideo';
// import BlockXRevealText from '@/components/blockXrevealText';
// import GridColumn from '@/layout/GridColumn';
// import Section from '@/layout/Section';
// import StaticBlockXRevealText from '@/components/StaticBlockXRevealText';
// import Try from '@/components/Try';
// import IconMorph from '@/components/IconMorph';
// import CardsFlickr from '@/components/CardsFlickr';
// import ScrambleText from '@/components/ScrambleText';
// import DisplacedParagraph from '@/components/DisplacedParagraph';
// import useWindow from '@/components/useWindow';
// import TextLanding from '@/components/TextLanding';
import HorizontalTextWavy from '@/components/HorizontalTextWavy';
// import { SwipeableCards } from '@/components/SwipeableCards';
// import InertiaFlickingCard from '@/components/InertiaFlickingCard';
// import Marquee from '@/components/Marquee';
// import MarqueeX from '@/components/MarqueeX';

function PageContent() {
  const {dimension}=useWindow()
   const [isLoading,setIsLoading]=useState(true)
   const [isLoading2,setIsLoading2]=useState(true)
   const [preLoaderOut,setPreLoaderOut]=useState(true)

  //  document.body.style.cursor="default"
 
  return (
    <Lenis>

    {/* <AnimatePresence  mode="sync" onExitComplete={()=>{setPreLoaderOut(true)}}>
    {isLoading &&  <Preloader key={'preloader'}/>}
     <Preloader key={'preloader'}/>
    </AnimatePresence> */}
      {/* <MarqueeX direction='down' items={[
   { type: "image", src: "/images/service01.png",bg:'orange' },
   { type: "image", src: "/images/service05.png",bg:'#F4683B' },
   { type: "image", src: "/images/service04.png",bg:'#E6FAB7' },
 ]} /> */}
 {/* <Marquee direction='down' items={[
   { type: "image", src: "/images/service01.png",bg:'orange' },
   { type: "image", src: "/images/service05.png",bg:'#F4683B' },
   { type: "image", src: "/images/service04.png",bg:'#E6FAB7' },
 ]} /> */}
 {/* <div className='w-full  flex bg-slate600 justify-center items-center  relative'>
              {[
    {title:'card 1',
      img:'/images/service02.png',
      background:'#10b981',
      color:"white",
      left:-20,
      y:0,
      offers:['offer card 1', 'offer card 2','offer card 3','offer card 4','offer card 5',]
    },
    {title:'card 2',
      img:'/images/service01.png',
      background:'rgb(46, 109, 188)',
      color:"white",
      left:10,
      y:30,

      offers:['offer card 1', 'offer card 2','offer card 3','offer card 4']
    },
    {title:'card 3',
      img:'/images/service03.png',
      background:'#9333ea',
      color:"white",
      left:-16,
      y:-10,
      offers:['offer card 1', 'offer card 2','offer card 3','offer card 4','offer card 5',]
    },
  ].map((card,i)=>{
               return (
             <InertiaFlickingCard rotate={card.left} y={card.y} key={i}
              style={{rotate:card.left,backgroundColor:card.background,y:card.y}}
               className={` ${ i!==0?'-ml-10':''} w-[9em] h-[12em] md:w-[16em] md:h-[20em]  overflow-hidden shadow-lg flex flex-col justify-center   text-white rounded-xl`}>
               <img src={card.img} className='w-full h-full object-cover'/>
               
             </InertiaFlickingCard>
     
               )
             })}
            </div> */}
    {/* done and dusted */}
    {/* done and dusted */}
    {/* done and dusted */}
    {/* <SwipeableCards/> */}
     {/* <HorizontalScrollPanel/> */}

     {/* <SpreadCards/> */}

     {/* <FlipCardOnScroll/> */}

        {/* <DisplacedParagraph splitBy='letter' radius={dimension.width>1000?100:40} className={'font-custom text-black pr-[50px] text-heading3 uppercase'} text={'the future of real estate - '}/> */}
<HorizontalTextWavy/>
      <div className='flex h-screen justify-center items-center'>
      </div>
       {/* <TextLanding preLoaderOut={true}/> */}
        {/* <ScrambleText scrambleSpeed={30}
         letters='▚ ▜ ▞ ▃ ▄ ▛ ▟ ▘▅ ▖▙ ▄ ▞ ▚ ▆ ▜ ▘▖ ▔▂' 
        letter='♫ ♚ ♠ ♬ ♛ ♪ ♜ ♠ ♫ ♝ ♪ ♞ ♫ ♟ ♠ ♞ ♛ ♠ ♡ ♚ ♣ ♤ ♥ ♦ ♫ ♬ ♪ ♩'
       lette="♚ ♛ ♜ ∱ ∬ ∯ ♝ ♞ ♟ ♠ ♡ ♣ ♤ ♥ ♦ ♫ ♬ ♪ ♩ ☯ ☠ ☢ ☣"
         lett='⩦ ⩧ ⩨ ⩩ ⩑ ⩒ ⩓ ⩔ ⩕ ⩖ ⩗ ⩘ ⩙ ⩚ ⩛ ⩜ ⩝ ⩞ ⩟ ⩠'
        className={'text-neutral-800 tracking-tighter text-left uppercase text-heading2 md:leading-[78px] lg:leading-[118px] font-custom'}/>          
         */}

         {/* <IconMorph/> */}

         {/* <Try/> */}

          {/* <Mask/> */}
          
    {/* <StaticBlockXRevealText center className='gap-4'/> */}

      {/* <BlockXRevealText
       className='gap-2'
      wordsToAnimate={
        [
        {word:'creative',backgroundColor:' #6d28d9',color:'white',borderRadius:'1rem',padding:'0px 10px'},
        {word:'designer',backgroundColor:'#047857 ',color:'white',borderRadius:'1rem',padding:'0px 10px'},   
        {word:'ideas',backgroundColor:'#a16207 ',color:'white',borderRadius:'1rem',padding:'0px 10px'},
    ]
      }
      gap='.4em'
       center text='Need a Creative web designer to collab on your next project? DM me to discuss your ideas!'/>
      */}

     {/* done and dusted */}
    {/* done and dusted */}
    {/* done and dusted */}

   {/* to be finished */}
    {/* to be finished */}
    {/* to be finished */}

         {/* <CardsFlickr/> */}

    {/* to be finished */}
    {/* to be finished */}
    {/* to be finished */}
        
    <div className='max-w-[40em h-screen text-center'>

    </div>
     <div className='max-w-[40em h-screen text-center'>

    </div>
      {/* <Header preLoaderOut={preLoaderOut}/> */}
        {/* <div className=' max-w-[30em]  p-5 text-heading2 mx-auto' >

        </div> */}
        {/* <Section>
        <GridColumn >
          <div className='col-span-3 bg-pink600 text-para'>
             <BlockXRevealText
             offset={['.4 end','center center']}
       className='gap-2'
      wordsToAnimate={[
        {word:'creative',backgroundColor:' #6d28d9',color:'white',borderRadius:'1rem',padding:'0px 10px'},
        {word:'designer',backgroundColor:'#047857 ',color:'white',borderRadius:'1rem',padding:'0px 10px'},   
        {word:'ideas',backgroundColor:'#a16207 ',color:'white',borderRadius:'1rem',padding:'0px 10px'}] }
      gap='.4em'
       text='Need a Creative web designer to collab on your next project? DM me to discuss your ideas!'/>
          </div>
          <div className='col-span-8 col-start-1 bgpurple-50 '>b</div>
          <div className='lg:col-span-5 lg:mt-[3em] bgslate-400 col-span-4 lg:col-start-7 col-start-3 text-para'>
               <BlockXRevealText
             offset={['.4 end','center center']}
       className='gap-2'
      wordsToAnimate={[
        {word:'consectetur',backgroundColor:' #db2777',color:'white',borderRadius:'1rem',padding:'0px 10px'},
        {word:'tempora',backgroundColor:'#047857 ',color:'white',borderRadius:'1rem',padding:'0px 10px'},   
        {word:'necessitatibus',backgroundColor:'#a16207 ',color:'white',borderRadius:'1rem',padding:'0px 10px'}] }
      gap='.4em'
       text='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, minus rerum! Quasi tempora enim facere aliquam consequuntur cupiditate necessitatibus ipsum magni ullam accusamus, ea iste voluptates corporis illo a impedit.'/>

          </div>
        </GridColumn>
        </Section> */}
     {/* <Section2 preLoaderOut={preLoaderOut}/> */}
      {/* <Landing setPreLoaderOut={setPreLoaderOut} preLoaderOut={preLoaderOut}/> */}
     {/* <ClipedVideo/> */}
      {/* <VideoOnScroll/> */}
{/* {!preLoaderOut && <div className='h-[1000svh]'/>}
<div className='h-screen relative text-black flex gap-4 flex-col text-[1.3em] font-body items-center justify-center'>
  <h2>code by memet_oumar </h2>
  <h2 className='text-[2.3em] leading-[1] max-w-[17em] text-center'>
    line revealing text animation, made with framer motion & splitting library </h2>
<ArrowDown className='absolute bottom-[20%] -translate-y-1/2 mt-[1em] text-black animate-bounce h-[3em] w-[3em]'/>
<div className='absolute top-[14%] left-4 -ranslate-x-1/2 -translate-y-1/2'>
  <h2>NB: I write all my codes in Next.js (react)</h2>

</div>

</div> */}
     {/* <Section1   preLoaderOut={preLoaderOut}/>
    <div className='h-screen relative text-black flex gap-4 flex-col text-[1.3em] font-body items-center justify-center'>
  <h2>follow @memet_oumar</h2>
  <h2 className='text-[2.3em] leading-[1] max-w-[17em] text-center'>
   DM me if you need the source code. its free!
   </h2>


</div> */}
      <Slider/>
     {/* <Mask/> */}
    
      {/* <Crowd/> */}
       {/* <MouseTrail>
        <section className="relative grid h-screen w-full place-content-center bg-white text-black dark:bg-black dark:text-neutral-200 antialiased">
        <h2 className="flex items-center gap-2 text-5xl font-extrabold uppercase tracking-wide transition-colors duration-500">
          <MousePointer className="w-10 h-10" />
          <Copy trigger={preLoaderOut} text={'hover me '}></Copy>
        </h2>

        <style jsx>{`
          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
            }
          }
          .animate-pulse-once {
            animation: pulse 0.5s ease-in-out;
          }
        `}</style> 
      </section>
      </MouseTrail>  */}
    </Lenis>
           
    
  );
}

export default function Home() {
  return (
    <main>
        <PageContent />
    </main>
  );
}
