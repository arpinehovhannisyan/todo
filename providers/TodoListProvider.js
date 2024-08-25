import { useContext,createContext, useState } from 'react';
import { useQuery } from 'react-query';
import { getRequest } from '@/api';

const TodoListContext = createContext();

export default function TodoListProvider({ children }) {
const [options, setOptions] = useState({});
const [tasks,setTasks]= useState([])
const [check, setcheck] = useState([])

const {data} = useQuery ({ 
    queryKey: ['todos', options],
    cacheTime:1000,
     queryFn:async ()=>{
      const allTask = await getRequest({url: "/task", params: options})
      setTasks(allTask.data)
  } ,
}); 

  return (
    <TodoListContext.Provider value={{  tasks,setTasks, setOptions ,options,check,setcheck}} >
     {children}
    </TodoListContext.Provider>
  )
}

export function useTodoListContext() {
   return useContext(TodoListContext)
}



