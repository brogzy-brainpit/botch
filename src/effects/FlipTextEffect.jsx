import React from 'react'
import styles from './style.module.scss';



function FlipTextEffect({text,className=''}) {
    return (    
        <div className={styles.el}>
        <div className={styles.perspectiveText}>
            <p className={`${className} font-body text-neutral-800 capitalize`}>{text}</p>
            <p className={`${className} font-body text-neutral-800 capitalize`}>{text}</p>
        </div>
        </div>
  )
}

export default FlipTextEffect