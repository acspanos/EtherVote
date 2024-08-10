import React from "react";

const GetVotes = (props) => {
    return (props.trigger) ?(
        <div className="popup"  style={{zIndex:1000}} >
            <div className="popup-inner">
                <button className="close-btn text-white cursor-pointer" onClick={() =>{props.setTrigger(false) }}>
                    x
                </button>
                <div className="text-white  w-full flex flex-col justify-start items-center font-light font-semibold mt-5 text-white font-light md:w-9/12 w-11/12 text-base text-xl sm:text-3xl">
                   <h3> All votes stored</h3>
                </div>
                { props.children}
            </div>
        </div>
    ):"";
}


export default GetVotes;