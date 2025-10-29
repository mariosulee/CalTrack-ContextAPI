

import type { Activity } from "../types/types"


// 0. array del tipo Activity definido en types.ts
export type ActivityState={
    activities:Activity[],
    activeId:Activity['id']
}

const localStorageActivities= ():Activity[] => {
    const activities=localStorage.getItem('activities')
    return activities ? JSON.parse(activities) // si hay algo en activities, devuelvo con para devolverlas en array
    : []  //si no hay nada en el local storage, se inicia a array vacio
}

// 1. ESTE ES EL ESTADO, QUE INICIALMENTE ES UN OBJETO SIN ACTIVIDADES QUE EL USUARIO VA METIENDO A LO LARGO DEL DIA
export const initialState:ActivityState={
    activities:localStorageActivities(),
    activeId: '' //el id de la actividad q se este presionando
}

// 2. LAS DIFERENTES ACCIONES QUE DESCRIBEN LO QUE PASA EN activityReducer
export type ActivityActions=
    { type: 'save-activity', payload: {newActivity: Activity}  } | // el payload va a ser un objeto que lo llamo newActivity y va a ser de tipo Activity
    { type: 'set-activeId', payload: {id:Activity['id']} } |
    { type: 'delete-activity', payload: {id:Activity['id']} } |
    { type: 'restart-app'} ;



//3. LA FUNCION QUE CONECTA EL ESTADO ACTUAL Y LAS ACCIONES 
export const activityReducer= ( 
    state: ActivityState=initialState,
    action: ActivityActions
    ) => {  

        //TODAS ESTAS ACCIONES SERIAN EL DISPATCH
        if(action.type==='save-activity'){            
            
            let updatedActivities:Activity[]=[] //comienza como array vacio
            
            if(state.activeId){ //compruebo si hay un id activo
                updatedActivities=state.activities.map( ac =>  //recorro las actividades y si el id de una coincide con el idactivo, 
                                                                // reemplazo esa actividad por la nueva version editada
                    ac.id===state.activeId ? action.payload.newActivity : ac // si no coincide, dejo la actividad tal cual
                )
            }else{   // si no hay activeId eso significa que estoy agregando una nueva actividad
                updatedActivities=[...state.activities, action.payload.newActivity]
            }

            return{
                ...state,  //hago siempre una copia del estado
                activities: updatedActivities, //creo un nuevo array con todas las actividades anteriores + la nueva
                activeId:''  // reiniciar cada vez q haya una nueva actividad para q no reescriba
            }        
            
        }



        if(action.type==='set-activeId'){
            return{ //devuelvo copia del state y se actualiza en activeId lo que le estoy pasando como payload
                ...state,
                activeId: action.payload.id
            }
        }



        if(action.type==='delete-activity'){
            return{
                ...state,
                activities: state.activities.filter( a => a.id !== action.payload.id)
            }
        }

        
        if(action.type==='restart-app'){
            return{
                activities:[],
                activeId:''
            }
        }

        
    return state;
}

