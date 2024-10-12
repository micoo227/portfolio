import Background from "./components/Background"
import Navbar from "./components/Navbar"

function App() {
  return (
    <>
      <div className="fixed left-[2vw] right-[2vw] top-[2vw] bottom-[2vw]">
        <div className="absolute left-0 top-0 bg-black w-[1px] h-[100%]"></div>
        <div className="absolute right-0 top-0 bg-black w-[1px] h-[100%]"></div>
        <div className="absolute left-0 top-0 bg-black w-[100%] h-[1px]"></div>
        <div className="absolute left-0 bottom-0 bg-black w-[100%] h-[1px]"></div>
        <Background />
        <Navbar />
      </div>
    </>
  )
}

export default App
