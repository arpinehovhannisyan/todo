import { useTodoListContext } from "@/providers/TodoListProvider";
import { useRef } from "react";

const StatusInput = () => {
    const { setOptions } = useTodoListContext()
   

    const statusRef = useRef({
       
    })

    function handleChange(e){
     const name = e.target.name
     statusRef.current[name] = !statusRef.current[name]
     
        setOptions((options)=>{
            const {status , ...rest} = options
            if(!statusRef.current.done || !statusRef.current.active  ){
                if(statusRef.current.done){
                    return {
                        ...rest,status:'done'
                    }
                }
                if(statusRef.current.active){
                    return {
                        ...rest,status:'active'
                    }
                }
            }
         
           
            return rest
        })
     
    }

    return (
        <div className=" ml-32 w-[300px] text-center">
            <p>Status</p>
            <label >
                Active <input type="checkbox" name='active'  onChange={handleChange} className=" ml-3" />
            </label>
            <label>
                Done <input type="checkbox" name = 'done' onChange={handleChange} />
            </label>
        </div>
    );
}

export default StatusInput;