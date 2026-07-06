import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import RotatingMark from './components/RotatingMark.jsx'
import Moments from './components/Moments.jsx'
import Index from './components/Index.jsx'
import Interlude from './components/Interlude.jsx'
import Ambition from './components/Ambition.jsx'
import Contact from './components/Contact.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import BlobReveal from './components/BlobReveal.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import useLenis from './lib/useLenis.js'

export default function App() {
  useLenis()

  return (
    <>
      <BlobReveal />
      <ScrollProgress />
      <CustomCursor />
      <Nav />
      <Hero />
      <RotatingMark />
      <Moments />
      <Index />
      <Interlude />
      <Ambition />
      <Contact />
    </>
  )
}
