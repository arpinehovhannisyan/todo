
const About = ()=>{
    return(
        <>
       <h1 className="text-[35px] text-center mt-5">About Project</h1>
       <div className="mx-auto w-[1040px] mt-9">
       This is a task managment tool in React, with the abilities of searching, sorting and filtering options.You can filter tasks by status(done, active), date and sort tasks according to the following points: A-Z, Z-A, Creation date oldest, Creation date newest, Completion date oldest, Completion date newest There are options for deleting tasks one by one, as well as deleting several at a time.There is an opportunity to edit the task, which is organized through the modal window. You can change the task done or active. If you enter non-existent pages on the site, you will be redirected to 404 page, which contain a message that the desired page does not exist.
       </div>
       </>
    )
}

export default  About;