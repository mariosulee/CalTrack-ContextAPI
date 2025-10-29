import { createContext, type ReactNode, type Dispatch, useReducer} from "react";
import { activityReducer, initialState, type ActivityState, type ActivityActions} from "../reducers/activityReducer";


// CREACION DEL TIPO Y DEL CONTEXTO

type ActivityContextProps={
    state: ActivityState,
    dispatch: Dispatch<ActivityActions>
}

export const ActivityContext=createContext<ActivityContextProps>(null!)   //para q desaparezca el error






// CREACION DEL TIPO Y DEL PROVIDER

type ActivityProviderProps={
    children:ReactNode  //tipo generico
}


export const ActivityProvider=( {children} : ActivityProviderProps)=> {

    const[state, dispatch]=useReducer(activityReducer, initialState)

    //se devuelve el state y el dispatch para tener acceso a ambos
    return(
        <ActivityContext.Provider value={ {state, dispatch} }>
            {children}
        </ActivityContext.Provider>
    )
}