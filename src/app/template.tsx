'use client'

import { motion } from 'motion/react';

export default function Template({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: "tween",
        ease: [0.4, 0, 0.2, 1],
        duration: 0.5
      }}
    // drag={true}
    >
      {children}
    </motion.div>
  )
}