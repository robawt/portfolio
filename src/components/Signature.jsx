import { motion } from 'framer-motion'
import { SIGNATURE_PATH } from '../lib/signaturePath.js'

export default function Signature({ trigger = 'inView', width = 'min(50vw, 340px)', delay = 0 }) {
  const animateProps = trigger === 'mount'
    ? { initial: 'hidden', animate: 'show' }
    : { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.6 } }

  return (
    <motion.div
      {...animateProps}
      style={{ width, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <svg viewBox="0 0 1161 507" style={{ width: '100%', display: 'block', overflow: 'visible' }}>
        <g transform="translate(0,507) scale(0.1,-0.1)">
          <motion.path
            d={SIGNATURE_PATH}
            fill="none"
            stroke="var(--signal)"
            strokeWidth={26}
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{
              hidden: { pathLength: 0, opacity: 1 },
              show: { pathLength: 1, opacity: 1, transition: { duration: 1.8, ease: [0.65, 0, 0.35, 1], delay } },
            }}
          />
          <motion.path
            d={SIGNATURE_PATH}
            fill="var(--bone)"
            stroke="none"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { duration: 0.5, delay: delay + 1.5 } },
            }}
          />
        </g>
      </svg>
      <motion.div
        className="caption"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { duration: 0.5, delay: delay + 1.9 } },
        }}
        style={{ marginTop: '0.5rem', color: 'var(--steel)', textAlign: 'center' }}
      >
        — signed, for real
      </motion.div>
    </motion.div>
  )
}
