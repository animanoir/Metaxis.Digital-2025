'use client'

import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';

export default function Template({
  children
}: {
  children: React.ReactNode
}) {

  const pathname = usePathname();
  return (
    <motion.div
      key={pathname} // Add key prop to force remount
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
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