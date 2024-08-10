import React from "react";

const SignUp = (props) => {
    return (props.trigger) ?(
        <div className="popup"  style={{zIndex:1000}} >
            <div className="popup-inner">
                <button className="close-btn text-white cursor-pointer" onClick={() =>{props.setTrigger(false) }}>
                    x
                </button>
                <div className="text-white">
                   <h3> Register voter</h3>
                </div>
                { props.children}
            </div>
        </div>
    ):"";
}


export default SignUp;