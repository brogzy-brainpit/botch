'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useScroll, useTransform,motion } from 'framer-motion'
import gsap from 'gsap'

function MouseWrapper({children,active, index,setModal,modal,cursor,className}) {
    
    
    
      const modalContainer = useRef(null);
      const cursorLabel = useRef(null);
    
      let xMoveContainer = useRef(null);
      let yMoveContainer = useRef(null);
      let xMoveCursor = useRef(null);
      let yMoveCursor = useRef(null);
      let xMoveCursorLabel = useRef(null);
      let yMoveCursorLabel = useRef(null);
    
      useEffect( () => {
        //Move Container
        xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {duration: 0.8, ease: "power3"})
        yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {duration: 0.8, ease: "power3"})
        //Move cursor
        xMoveCursor.current = gsap.quickTo(cursor.current, "left", {duration: 0.5, ease: "power3"})
        yMoveCursor.current = gsap.quickTo(cursor.current, "top", {duration: 0.5, ease: "power3"})
        //Move cursor label
        xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {duration: 0.45, ease: "power3"})
        yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {duration: 0.45, ease: "power3"})
      }, [])
    
      const moveItems = (x, y) => {
        xMoveContainer.current(x)
        yMoveContainer.current(y)
        xMoveCursor.current(x)
        yMoveCursor.current(y)
        xMoveCursorLabel.current(x)
        yMoveCursorLabel.current(y)
      }
      const manageModal = (active, index, x, y) => {
        moveItems(x, y)
        setModal({active, index})
      }
  return (
<div onMouseMove={(e) => {moveItems(e.clientX, e.clientY)}} onMouseEnter={(e) => {manageModal(true, index, e.clientX, e.clientY)}} onMouseLeave={(e) => {manageModal(false, index, e.clientX, e.clientY)}} className={className}>
{children}


</div>
  )
}

export default MouseWrapper