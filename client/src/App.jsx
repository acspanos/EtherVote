import { useState } from 'react'
import { Footer, Loader, Navbar, Services, Voting, Welcome } from './components'

const  App = () => {
  return (
    <div className="App">
      <div className='min-h-screen'>
          <div className='gradient-bg-welcome'>
            <Navbar/>
            <Welcome/>
          </div>
          <Voting/>
          <Services/>
          <Footer/>
      </div>
    </div>
  )
}

export default App
