// import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';
// const SignupSchema = Yup.object().shape({
//   name: Yup.string()
//     .min(2, 'Too Short!')
//     .max(50, 'Too Long!')
//     .required('Required'),
//   surName: Yup.string()
//     .min(2, 'Too Short!')
//     .max(50, 'Too Long!')
//     .required('Required'),
//   email: Yup.string().email('Invalid email').required('Required'),
// });


// const Contact = () => {
//   return (
//     <>
//       <h1 className=" text-center text-[35px] my-10">Contact US</h1>
//       <div>

    
//           initialValues={{
//             name: '',
//             surName: '',
//             email: '',
//           }}
//           validationSchema={SignupSchema},
//           onSubmit={values => {
//             values.preventDefault()
//           }}
      
//           {({ errors, touched }) => (
//             <Form className=" w-[900px] mx-auto" onSubmit={(e) => {
//               e.preventDefault()
//             }}>
//               <Field name="name" className=" w-[900px] p-3 rounded-lg" />
//               {errors.name && touched.name ? (
//                 <div>{errors.name}</div>
//               ) : null}
//               <Field name="surName" className=" w-[900px] p-3 rounded-lg" />
//               {errors.surName && touched.surName ? (
//                 <div>{errors.surName}</div>
//               ) : null}
//               <Field name="email" type="email" className=" w-[900px] p-3 rounded-lg" />
//               {errors.email && touched.email ? <div>{errors.email}</div> : null}
//               <button type="submit" className="px-20 py-2 bg-sky-600 text-white  cursor-pointer rounded-lg ml-[355px] hover:bg-sky-500">Submit</button>
//             </Form>
//           )}
     
//       </div>
//     </>
//   )
// }
// export default Contact;

