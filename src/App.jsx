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
import SectionDivider from './components/SectionDivider.jsx'
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
      <SectionDivider index={2} label="The mark" accent="blue" />
      <RotatingMark />
      <SectionDivider index={3} label="Moments" accent="signal" />
      <Moments />
      <SectionDivider index={4} label="The work" accent="blue" />
      <Index />
      <SectionDivider index={5} label="Interlude" accent="signal" />
      <Interlude />
      <SectionDivider index={6} label="Ambition" accent="blue" />
      <Ambition />
      <SectionDivider index={7} label="Get in touch" accent="signal" />
      <Contact />
    </>
  )
}
