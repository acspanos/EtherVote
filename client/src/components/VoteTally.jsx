import React from "react";

const VoteTally = (props) => {
    return (props.trigger) ?(
        <div className="popup"  style={{zIndex:1000}} >
            <div className="popup-inner">
                <button className="close-btn text-white cursor-pointer " onClick={() =>{props.setTrigger(false) }}>
                    x
                </button>
                <div className="text-white flex flex-col justify-start items-center text-2xl">
                   <h3> Vote tally</h3>
                </div>
                { props.children}
            </div>
        </div>
    ):"";
}


export default VoteTally;