import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import RotatingMark from './components/RotatingMark.jsx'
import Marquee from './components/Marquee.jsx'
import Moments from './components/Moments.jsx'
import Index from './components/Index.jsx'
import Interlude from './components/Interlude.jsx'
import Ambition from './components/Ambition.jsx'
import Guestbook from './components/Guestbook.jsx'
import Contact from './components/Contact.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import BlobReveal from './components/BlobReveal.jsx'
import ScanlineOverlay from './components/ScanlineOverlay.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import useLenis from './lib/useLenis.js'

export default function App() {
  useLenis()

  return (
    <>
      <BlobReveal />
      <ScanlineOverlay />
      <ScrollProgress />
      <CustomCursor />
      <Nav />
      <Hero />
      <RotatingMark />
      <Marquee />
      <Moments />
      <Guestbook />
      <Index />
      <Interlude />
      <Marquee
        bg="var(--blue)"
        fg="var(--bone)"
        reverse
        customItems={['ALWAYS BUILDING SOMETHING', 'SCROLL FOR MORE', 'THANKS FOR STOPPING BY', 'HIT COUNTER GOES UP EVERY REFRESH (KIDDING)']}
      />
      <Ambition />
      <Contact />
    </>
  )
}
