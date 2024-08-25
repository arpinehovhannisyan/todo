import AddTask from "@/components/AddTask";
import Cards from "@/components/Cards";
import FilterInputs from "@/components/FilterInputs";
import SortButtons from "@/components/SortButtons";
import StatusInput from "@/components/StatusInput";
import { useTodoListContext } from "@/providers/TodoListProvider";

const Home = () => {
    const { setOptions } = useTodoListContext()
    return (
        <>
            <div className=" w-[1310px] mx-auto">
                <div className="w-[1310px]">
                    <div> <input onChange={
                        (e) => {
                            setOptions((options) => ({ ...options, search: e.target.value }))
                        }
                    } type="text" className="w-[1098px] my-10 p-3 " placeholder="Search" /></div>
                    <AddTask />
                    <FilterInputs />
                    <div className=" flex w-[1065px] ">
                        <SortButtons />
                        <StatusInput />
                    </div>
                </div>
            </div>
            <Cards />
        </>
    )
}

export default Home;