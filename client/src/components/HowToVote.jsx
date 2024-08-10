import React from "react";

const HowToVote = (props) => {
    return (props.trigger) ?(
        <div className="popup"  style={{zIndex:1000}} >
            <div className="popup-inner">
                <button className="close-btn text-white cursor-pointer" onClick={() =>{props.setTrigger(false) }}>
                    x
                </button>
                <h1 className="text-center text-2xl mt-5 text-white py-1">To vote you have to follow these steps:</h1>
                        <ol type="1" className="text-left mt-5 text-white font-light ">
                        <li>1. Connect to your Metamask. ( Click on connect Wallet button )</li>
                        <li>2. Click on Receive OTP.</li>
                        <li>3. Fill the form with your personal data.</li>
                        <li>4. Receive the one time password to your phone</li>
                        <li>5. Fill the voting form with the one time password received.</li>
                        <li>6. Select candidate to submit your vote.</li>
                        <li>7. Click on "Submit Vote".</li>
                        </ol>  
            </div>
        </div>
    ):"";
}


export default HowToVote;