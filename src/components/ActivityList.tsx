import type { Activity } from "../types/types"
import { categories } from "../data/categories"
import { useMemo } from "react"
import { PencilSquareIcon, XCircleIcon} from '@heroicons/react/24/outline'
import { useActivity } from "../hooks/useActivity"



export default function ActivityList(){
    
    //ACTUALIZACION CONTEXTAPI
    const{state,dispatch}=useActivity()
    const{activities}=state


    const categoryName=useMemo( () => 
        (cate:Activity['category']) =>
            categories.map(c => c.id===cate ? c.name : '')
    
    , [activities]) //activities es el array de dependencias
    
    
    return(
        <>
            <h2 className="mt-4 text-4xl font-bold text-slate-600 text-center">Food & Exercise</h2>

            {activities.length===0 ? <p className="text-center font-medium mt-7">no activities to show</p> : 

                //SI HAY ACTIVIDADES EN LA PROPIEDAD DEL ESTADO
                activities.map( (act) => (
                    <div key={act.id} className="px-5 py-10 bg-white mt-5 flex justify-between rounded-lg shadow ">

                            <div className="space-y-2 relative"> {/*ESTE AL LADO IZQ POR EL JUSTIFY-BETWEEN */}

                                <p className={`absolute -top-8 -left-8 px-10 py-2 text-white font-bold 
                                    ${act.category===1 ? 'bg-orange-500' : 'bg-lime-500'}`}> 
                                    {categoryName(act.category)}
                                </p>

                                <p className="text-2xl font-bold pt-5">{act.name}</p>
                            
                                <p className={`font-black text-4xl  ${act.category===1 ? 'text-orange-500' : 'text-lime-600'}`}>
                                    {act.calories} Calories
                                </p>
                            </div>

                            <div className="flex gap-5 items-center"> {/*ESTE AL LADO DCHO POR EL JUSTIFY-BETWEEN */}
                                <button onClick={ () => dispatch( {type: "set-activeId", payload: {id:act.id} } )}>
                                    <PencilSquareIcon className="h-8 w-8 text-gray-800"/>
                                </button>

                                <button onClick={ () => dispatch( {type: "delete-activity", payload: {id:act.id} } )}>
                                    <XCircleIcon className="h-8 w-8 text-red-800"/>
                                </button>


                            </div>
                    </div>

                ))}
        
        </>
    )
}

