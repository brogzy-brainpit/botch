import React, { useRef, useEffect } from 'react'

function LandingVideo({ link, preLoaderOut }) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (preLoaderOut && videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [preLoaderOut])

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      className="z-[0] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur- min-w-full min-h-full w-[177.77vh] h-[100vh] object-cover"
    >
      <source src={link} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

export default LandingVideo
