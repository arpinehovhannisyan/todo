import { useEffect, useState } from "react";

import { Children } from "react";


function Modal({ showModal, setShowModal, outsideClick, children, visibleCloseBtn,title}) {
  

    const handleOutsideClick = (e) => {
        if(outsideClick && e.target === e.currentTarget) setShowModal(false)
    }

    return showModal ? 
        (<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        
        <div 
            onClick={handleOutsideClick }
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" >
                
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
          <div className="flex justify-between w-[700px]">
           {title}
           {visibleCloseBtn && <button onClick={() => {
              setShowModal(false)
            }}>x</button>}
          </div>
        </div>
        <div className="relative p-6 flex-auto">
            {children}
        </div>
      </div>
    </div>

            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>

        </div>)
         : null;
s}


export default Modal;