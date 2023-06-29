
const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?'
import { createContext, useEffect } from "react"
import { useContext } from "react"
import {SEARCH_BAR,
    REMOVE_STORY,
    HANDEL_BUTTON,
    SET_LOADING,
    SET_STORIES
} from "./actions"
import { useReducer } from "react"

const AppContext= createContext()
const initialState={
    isLoading:true,
    hits:[],
    nbPages:0,
    page:0,
    query:"javascript"
}
const reducer=(state,action)=>{
   switch (action.type) {
    case SET_LOADING:
        return{...state,isLoading:true}
   case SET_STORIES:
    return{
        ...state,
        isLoading:false,
        hits:action.payload.hits,
        nbPages:action.payload.nbPages
    }
    case REMOVE_STORY:
        return {
            ...state,
            hits:state.hits.filter((remove)=> remove.objectID !== action.payload)
        }
    case SEARCH_BAR:
        return{
            ...state,
            query:action.payload,
            page:0,
        }  
    case HANDEL_BUTTON:
        if(action.payload==="inc"){
           let nextPage= state.page +1
           if(nextPage >state.nbPages -1){
            nextPage=0;
           }
           return{...state,page:nextPage}
        }

        if(action.payload==="dec"){
            let previewPage = state.page -1
            if(previewPage <0){
                previewPage =state.nbPages -1
            }
            return{
                ...state,page:previewPage
            }
        }
    default:
        throw new Error(`the erroe ${action.type} action type`)
   }
}
const AppProvider=({children})=>{
    
    const [state,dispatch]=useReducer(reducer,initialState)

    const fetchData=async(url)=>{
        dispatch({type:SET_LOADING});
        try {
            const response= await fetch(url)
            const data = await response.json()
            dispatch({type:SET_STORIES,payload:{
                hits:data.hits,
                nbPages:data.nbPages
            }})

        } catch (error) {
            console.log(error);         
        }
    }

    const removeStory=(id)=>{
        dispatch({type:REMOVE_STORY,payload:id})
    }

    const searchItem=(query)=>{
        dispatch({type:SEARCH_BAR,payload:query})
    }
    const handelPage=(value)=>{
        dispatch({type:HANDEL_BUTTON,payload:value})
    }
    useEffect(()=>{
        fetchData(`${API_ENDPOINT}&query=${state.query}&page=${state.page}`)
    },[state.query,state.page])
    return (
        <AppContext.Provider value={{...state,removeStory,searchItem,handelPage}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext=()=>{
    return useContext(AppContext)
}

export {AppContext,AppProvider}