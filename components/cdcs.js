// import { useState } from 'react'
// import { useTodoListContext } from '@/providers/TodoListProvider'
// import { patchRequest, putRequest } from '@/api'
// import Modal from "./modal";
// import * as yup from "yup";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import { useMutation } from "react-query";
// import { useFormik } from "formik";
// import Checkbox from '@mui/material/Checkbox';
// import { deleteRequest } from '@/api';
// { }

// const validationSchema = yup.object({
//     title: yup.string().required("Title is required"),
//     description: yup.string().required("Description is required"),
//     //  date: yup.string().required("Date is required"),
// });
// const formFields = [
//     { name: "title", label: "Title", placeholder: "Title" },
//     { name: "description", label: "Description", placeholder: "Description" },
//     //{ name: "date", label: "date", placeholder: "Descdateription" },
// ];
// const Cards = () => {
//     const [editingTask, setEditingTask] = useState(null);
//     const { tasks, setTasks } = useTodoListContext()
//     const { mutate } = useMutation({
//         mutationFn: (values) => {
//             return putRequest({
//                 url: `/task/${editingTask?._id}`,
//                 body: values,
//             });
//         },
//         onSuccess: ({ data }) => {
//             console.log({ tasks: { task: [tasks._d] } })
//             const index = tasks.findIndex((task) => task._id === editingTask._id)
//             const newTasks = [...tasks]
//             newTasks[index] = data
//             setTasks(newTasks)
//             setEditingTask(null)
//         },
//     });
//     const deleted = useMutation({
//         mutationFn: (id) => {
//             return deleteRequest({ url: `/task/${id}` })
//         },
//         onSuccess: (response) => {
//             const taskId = response.config.url.split("/").pop()
//             const newTasks = tasks.filter((task) => taskId !== task._id)

//             setTasks(newTasks)
//         },
//     })
//     const checked = useMutation({
//         mutationFn: (task) => {
//             const newStatus = task.status === 'done' ? 'active' : 'done';
//             return putRequest({ url: `/task/${task._id}`, body: { status: newStatus } })
//         },
//         onSuccess: ({ data }) => {
//             const index = tasks.findIndex((tasks) => tasks._id === data._id)
//             const newTasks = [...tasks]
//             newTasks[index] = data
//             setTasks(newTasks)
//         },
//     })

//     const patch = useMutation({
//         mutationFn: (taskIds) => {
//             return patchRequest({
//                 url: '/task',
//                 body: taskIds,
//             });
//         },
//     });
//     const handleToggleTask = (task) => {
//         const updatedTask = { ...task, checked: !task.checked };
//         patch.mutate([updatedTask._id]);


//         const handleDeleteCheckedTasks = () => {
//             const checkedTaskIds = tasks.filter((task) => task.checked).map((task) => task._id);
//             if (checkedTaskIds.length > 0) {
//                 patch.mutate(checkedTaskIds);
//             }
//         };



//         const formik = useFormik({
//             initialValues: {},
//             validationSchema,
//             onSubmit: (values) => {
//                 mutate(values, {
//                     onSuccess: () => setEditingTask(null),
//                     onError: (error) => console.error("Error creating task:", error)
//                 });
//             },
//         });
//         return (
//             <>
//                 <Modal
//                     title={(<h3 className="text-3xl font-semibold text-amber-300">Edit Task</h3>)}
//                     visibleCloseBtn
//                     outsideClick
//                     setShowModal={() => setEditingTask(null)}
//                     showModal={!!editingTask} >
//                     <form onSubmit={formik.handleSubmit}>
//                         {formFields.map((field) => (
//                             <TextField
//                                 key={field.name}
//                                 fullWidth
//                                 name={field.name}
//                                 label={field.label}
//                                 placeholder={field.placeholder}
//                                 type={field.type || "text"}
//                                 value={formik.values[field.name]}
//                                 onChange={formik.handleChange}
//                                 error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
//                                 helperText={formik.touched[field.name] && formik.errors[field.name]} />
//                         ))}
//                         <Button color="primary" variant="contained" fullWidth type="submit" className=" bg-green-800 hover:bg-green-700 text-white mt-3">
//                             Submit
//                         </Button>
//                         <Button color="primary" variant="contained" fullWidth type="button" className=" bg-green-800 hover:bg-green-700 text-white mt-3" onClick={(e) => {
//                             e.preventDefault();
//                             setEditingTask(null)
//                         }}> close</Button>
//                     </form>
//                 </Modal>
//                 <div className=" flex gap-8 w-[1300px]  mx-auto flex-wrap">
//                     {tasks?.map(task => (
//                         <div key={task._id} className=" w-[350px]  border-2 p-[20px]">
//                             <Checkbox
//                                 checked={task.checked}
//                                 onChange={() => handleToggleTask(task)}
//                             />
//                             <h1 className=' text-red-600 text-[27px]'>{task.title}</h1>
//                             <p className=' mt-8'>{task.description}</p>
//                             <p className=" mt-14 "> <span className=' italic'>Status </span> :   {task.status} </p>
//                             <p className=' '><span className=' italic'> Deadline </span>:   {task.date}</p>
//                             <div className=" flex gap-2 mt-5">
//                                 <Checkbox
//                                     checked={task.status === 'done'}
//                                     sx={{ '& .MuiSvgIcon-root': { fontSize: 37 } }}
//                                     onChange={(e) => {
//                                         e.preventDefault()
//                                         checked.mutate(task);
//                                     }} />
//                                 <button onClick={(e) => {
//                                     e.preventDefault()
//                                     formik.setValues(
//                                         {
//                                             title: task.title,
//                                             description: task.description
//                                         })
//                                     setEditingTask(task)
//                                 }}>
//                                     <img src="./img/edit.png" className=" w-8 h-8 " /></button>
//                                 <button>
//                                     <img
//                                         src="./img/delete.jpeg"
//                                         className="w-8 h-8 "
//                                         onClick={(e) => {
//                                             e.preventDefault()
//                                             deleted.mutate(task._id)
//                                         }}
//                                     />
//                                 </button>
//                                 {/* <Button
//                                     variant="contained"
//                                     color="secondary"
//                                     onClick={() => handleDeleteCheckedTasks()}
//                                     disabled={!task.checked} // Disable if no task is checked
//                                 >
//                                     Delete Checked
//                                 </Button> */}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </>
//         )
//     }
// }

//     export default Cards;
