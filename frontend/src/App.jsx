import { Outlet } from "react-router-dom"
import Header from "./components/Header"


function App() {

  return (
    <>
      <Header />
      <div className="container mx-auto">
        <Outlet />
      </div>
    </>
  )
}

export default App
