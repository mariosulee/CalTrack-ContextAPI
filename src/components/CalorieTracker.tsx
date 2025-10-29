import { useMemo } from "react"
import { useActivity } from "../hooks/useActivity"

export default function CalorieTracker(){

    //ACTUALIZACION CONTEXTAPI
    const{state}=useActivity()

    //renombramiento ACTUALIZACION CONTEXTAPI
    const{activities}=state




    //contadores
    const caloriesConsumed=useMemo( () => 
        activities.reduce( (total, act) => act.category===1 ? total+act.calories : total , 0) // el 0 es el valor inicial de la funcion reduce 

    , [activities])  // array de dependencias de useMemo


    const caloriesBurned=useMemo( () => 
        activities.reduce( (total, act) => act.category===2 ? total+act.calories : total, 0)
    , [activities])


    const caloriesTotal=useMemo( () =>
        caloriesConsumed-caloriesBurned
    , [activities])


    return(
        <>
            <h2 className="text-4xl font-black text-white text-center">Calories Overview</h2>

            <div className="flex flex-row flex-wrap items-center justify-between gap-5 mt-5 px-4 md:px-20">
  
                <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center mt-3">
                    <span className="font-black text-3xl md:text-6xl text-orange-500">{caloriesConsumed}</span>
                    <span className="text-sm md:text-base">Cal consumed</span>
                </p>

                <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center mt-3">
                    <span className="font-black text-3xl md:text-6xl text-lime-500">{caloriesBurned}</span>
                    <span className="text-sm md:text-base">Cal burned</span>
                </p>

                <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center mt-3">
                    <span className="font-black text-3xl md:text-6xl text-white">{caloriesTotal}</span>
                    <span className="text-sm md:text-base">Balance</span>
                </p>

            </div>

        
        
        
        </>
    )
}