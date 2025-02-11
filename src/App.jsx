import Footer from "./components/Footer"
import Manager from "./components/Manager"
import Navbar from "./components/Navbar"


function App() {

  return (
    <>
      <Navbar />
      <div className=" bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,255,100,0.1)_0,rgba(0,255,100,0.05)_50%,rgba(0,255,100,0)_100%)]">
      <Manager />
      </div>
      <Footer />
    </>
  )
}

export default App
