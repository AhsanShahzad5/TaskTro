import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import IntroPageMidSection from '../components/IntroPageMidSection'

const IntroductionPage = () => {
  return (
    <>

      <Navbar title="Tasktro" />
      <IntroPageMidSection/>
      <Footer title="Tasktro" />
    </>
  )
}

export default IntroductionPage