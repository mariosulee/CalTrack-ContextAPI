import Form from "./components/Form"
import { useEffect, useMemo } from "react"
import ActivityList from "./components/ActivityList"
import CalorieTracker from "./components/CalorieTracker"
import { FaRunning } from "react-icons/fa";
import { MdOutlineFastfood } from "react-icons/md";
import { useActivity } from "./hooks/useActivity"

function App() {

  const{state,dispatch}=useActivity()


  //para el Local Storage
  useEffect( () => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])


  //para que si no haya actividades no salga el botón de Rstart app
  const canRestartApp = () => useMemo(() => state.activities.length>0, [state.activities])
  return (
    <>
      <header className="bg-gray-800 py-4">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        
      
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-3xl font-black text-center md:text-left">
            <span className="text-white text-4xl">CalTrack </span>
            <span className="text-orange-500 font-bold">Calorie </span>
            <span className="text-lime-500 font-bold">Tracker</span>
          </h1>
          <p className="text-base text-white font-semibold mt-1 text-center md:text-left">
            an App by Mario Sulé
          </p>
        </div>

        
        <div className="flex items-center justify-center gap-5">
          <MdOutlineFastfood className="text-orange-500 text-4xl" />
          <FaRunning className="text-lime-500 text-4xl" />
        </div>

        
        <div className="flex justify-center md:justify-end w-full md:w-auto">
          <button
            className="bg-white hover:bg-gray-600 p-2 uppercase text-black font-black rounded-lg text-sm disabled:opacity-10"
            disabled={!canRestartApp()}
            onClick={() => dispatch({ type: 'restart-app' })}
          >
            Restart App
          </button>
        </div>
        
      </div>
    </header>






      <main>
  
       <section className=" py-15 px-5">
          <div className="max-w-4xl mx-auto">
            <Form />
          </div>
        </section>


        <section className="bg-gray-800 py-10">
          <div className="max-w-4xl mx-auto">
            <CalorieTracker/>
          </div>
        </section>


        <section className="p-10 mx-auto max-w-4xl mb-20">
          <ActivityList/>
        </section>
      </main>



      <footer className="bg-gray-800 mt-5 py-5">
        <div className="container mx-auto px-5">
          <p className="text-white text-center text-lg mt-4 font-semibold">
            CalTrack - Mario Sulé Domínguez. All rights reserved © 2025
          </p>
        </div>
      </footer>



    </>
  )
}

export default App
