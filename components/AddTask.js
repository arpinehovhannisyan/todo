import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useMutation } from "react-query";
import { useState } from "react";
import { postRequest } from "@/api";
import Modal from "./modal";
import { useTodoListContext } from '@/providers/TodoListProvider';

const useAddMutation = ({ onSuccess }) => {
  return useMutation({
    mutationFn: (formPayload) => postRequest({ url: "/task", body: formPayload }),
    onSuccess
  });
};

const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  date: yup.string().required("Date is required"),
});

const formFields = [
  { name: "title", label: "Title", placeholder: "Title" },
  { name: "description", label: "Description", placeholder: "Description" },
  { name: "date", label: "Date", placeholder: "Date" },
];

const AddTask = () => {
  const { tasks, setTasks } = useTodoListContext();
  const [showModal, setShowModal] = useState(false);

  const { mutate } = useAddMutation({
    onSuccess: (data) => {
      // Assuming data is the response and data.data contains the new task
      const newData = [...tasks, data.data];
      setTasks(newData);
      setShowModal(false);
    },
    onError: (error) => {
      console.error("Error creating task:", error);
    }
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      date: "2023-08-17"
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values);
    }
  });

  return (
    <>
      <button
        className="w-[1100px] py-4 bg-green-800 cursor-pointer text-white rounded-md hover:bg-green-700"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add Task
      </button>
      {showModal && (
        <Modal
          title={<h3 className="text-3xl font-semibold">Add Task</h3>}
          visibleCloseBtn
          outsideClick
          setShowModal={setShowModal}
          showModal={showModal}
        >
          <form onSubmit={formik.handleSubmit}>
            {formFields.map((field) => (
              <TextField
                key={field.name}
                fullWidth
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                type={field.name === 'date' ? 'date' : 'text'}
                value={formik.values[field.name]}
                onChange={formik.handleChange}
                error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                helperText={formik.touched[field.name] && formik.errors[field.name]}
              />
            ))}
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              className="bg-green-800 hover:bg-green-700 text-white mt-3"
            >
              Submit
            </Button>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="button"
              className="bg-green-800 hover:bg-green-700 text-white mt-3"
              onClick={() => {
                formik.resetForm();
                setShowModal(false);
              }}
            >
              Close
            </Button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default AddTask;
