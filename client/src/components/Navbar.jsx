import React, {useContext} from 'react';
import { useState } from 'react';
import { SignIn } from "./";
import { SignUp } from "./";
import { HowToVote } from "./";
import { VerifyUser } from './';
import { GetVotes } from './';
import { LoginContext } from '../context/LoginContext';
import {sha256} from 'crypto-hash';
import { VotingContext } from '../context/VotingContext';
import { VoteTally } from './';

const NavbarItem = ({ title, classProps }) => {
    return (
        <li className={`mx-4 cursor-pointer ${classProps}`}>
            {title}
        </li>
    );
}

const Input = ({placeholder, name, type, value, handleChange}) => (
    <input
    placeholder={placeholder}
    type={type}
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-1 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
);


const Navbar = () => {

    const { currentAccount,signInData,checkUser,handleSignInChange, isLoading, signUpData, addUser, handleSignUpChange,loggedUser } = useContext(LoginContext);
    const {getAllVotes,canA,canB,canC,handleVoteTallyChange,voteTallyData} = useContext(VotingContext)
    const errors = {
        userNotFound: "User Not Found",
        successLog: "Success"
      };

    const [errorMessages, setErrorMessages] = useState({});

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
        <div className="w-full flex md:justify-center justify-between items-center p-4 ">{errorMessages.message}</div>
  );
    const [showAdditionalData, setShowAdditionalData] = useState(false);
    //const [toggleMenu, setToggleMenu] = useState(false);
    const [loginPopup, setLoginPopup] = useState(false);
    const [signUpPopup, setSignUpPopup] = useState(false);
    const [voteTallyPopUp, setVoteTallyPopUp] = useState(false);
    const [howToVotePopUp, setHowToVotePopUp] = useState(false);
    const [getVotesPopUp, setGetVotesPopUp] = useState(false);

    const handleSignUp = async (e) => {

        const firstname = await sha256(signUpData.firstname);
        const lastname = await sha256(signUpData.lastname);
        const fathersname = await sha256(signUpData.fathersname);
        const phone = await sha256(signUpData.phone);
        const birthday = await sha256(signUpData.birthday);
        const id = await sha256(signUpData.id);
        
        e.preventDefault();

        const nullInput = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

        if(firstname===nullInput || lastname===nullInput || fathersname===nullInput || phone===nullInput ||birthday===nullInput || id===nullInput) {
            alert('Please fill the form!');
        }else{
            addUser();
        }
    }

    const handleVoteTally = async (e) => {

        // const privatekey = voteTallyData.privatekey;
        // console.log(privatekey);
        //e.preventDefault();

        //setVoteTallyPopUp(true);
        getAllVotes();
    }

    const handleSignIn = async (e) => {
        const firstname = await sha256(signInData.firstname);
        const lastname = await sha256(signInData.lastname);
        const fathersname = await sha256(signInData.fathersname);
        const phone = await sha256(signInData.phone);
        const birthday = await sha256(signInData.birthday);
        const id = await sha256(signInData.id);

        e.preventDefault();

        const nullInput = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

        if(firstname===nullInput || lastname===nullInput || fathersname===nullInput || phone===nullInput ||birthday===nullInput || id===nullInput) {
            alert('Please fill the form!');
        }else{
            await checkUser();

            if(loggedUser.stat == false)
            setErrorMessages({ name: "userNotFound", message: errors.userNotFound });
            else
            setErrorMessages({ name: "successLog", message: errors.successLog });
        }
    }
    const openGetVotesPopUp = () => {
        setGetVotesPopUp(true);
        getAllVotes();
      };
      
    
    return(
        <nav className="w-full flex md:justify-center justify-between items-center p-4">
            <div id="logo" className=" text-white text-3xl w-32 md:flex-[0.5] flex-initial justify-center items-center">
                EtherVoting
            </div>
            <ul className="text-white md:flex hidden list-non flex-row justify-between items-center flex-initial">
                <button className="mx-4 cursor-pointer" onClick={() => setHowToVotePopUp(true)}>
                    How to Vote
                </button>
                <HowToVote trigger={howToVotePopUp} setTrigger={setHowToVotePopUp}>
                </HowToVote>
                <button className="mx-4 cursor-pointer" >
                    Candidates
                </button>
                <button className="mx-4 cursor-pointer" >
                    Contact us
                </button>
                <button className="bg-transparent py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#a9a9a9]" onClick={() => setLoginPopup(true)}>
                    Receive OTP
                </button>
                <SignIn trigger={loginPopup} setTrigger={setLoginPopup}>
                    <div className='p-5 sm:w-96 w-full flex flex-col justify-start items-center '>
                        <Input placeholder="First Name" name="firstname" type="text" handleChange={handleSignInChange}/>
                        <Input placeholder="Last Name" name="lastname" type="text"  handleChange={handleSignInChange}/>
                        <Input placeholder="Fathers Name" name="fathersname" type="text"  handleChange={handleSignInChange}/>
                        <Input placeholder="Phone" name="phone" type="tel" handleChange={handleSignInChange}/>
                        <Input placeholder="Birth Date" name="birthday" type="date" handleChange={handleSignInChange}/>
                        <Input placeholder="Identity Number" name="id"  type="text"  handleChange={handleSignInChange}/>
                    </div>
                    {renderErrorMessage("userNotFound")}
                    {renderErrorMessage("successLog")}
                    <div className="h-[1px] w-full bg-gray-400 my-2"/>
                    {isLoading? (
                            <VerifyUser />
                        ):(
                            <button type ="button" onClick={handleSignIn} className="text-white  w-full mt-2 border-[2px] p-2 border-[#a9a9a9] rounded-full cursor-pointer">
                                Sign In                                            
                            </button>
                        )}
                </SignIn>
                <button className="bg-[#000000] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#a9a9a9]" onClick={() => setSignUpPopup(true)}>
                    Sign up
                </button>
                <SignUp trigger={signUpPopup} setTrigger={setSignUpPopup}>
                    <div className='p-5 sm:w-96 w-full flex flex-col justify-start items-center '>
                        {/* new */}
                        <Input placeholder="Address" name="address" type="text" handleChange={handleSignUpChange}/>
                        <Input placeholder="First name" name="firstname" type="text" handleChange={handleSignUpChange}/>
                        <Input placeholder="Last Name" name="lastname" type="text" handleChange={handleSignUpChange}/>
                        <Input placeholder="Fathers Name" name="fathersname" type="text"  handleChange={handleSignUpChange}/>
                        <Input placeholder="Phone" name="phone" type="tel" handleChange={handleSignUpChange}/>
                        <Input placeholder="Birth Date" name="birthday" type="date" handleChange={handleSignUpChange}/>
                        <Input placeholder="Identity Number" name="id"  type="text" handleChange={handleSignUpChange}/>
                    </div>
                    <div className="h-[1px] w-full bg-gray-400 my-2"/>
                    {isLoading ? (
                            <VerifyUser />
                        ):(
                            <button type ="button" onClick={handleSignUp} className="text-white  w-full mt-2 border-[2px] p-2 border-[#2546bd] rounded-full cursor-pointer">
                                Sign Up                                               
                            </button>
                        )}
                </SignUp>
                <button className="bg-[#000000] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#a9a9a9]" onClick={() => setVoteTallyPopUp(true)}>
                    Vote Tally
                </button>
                <VoteTally trigger={voteTallyPopUp} setTrigger={setGetVotesPopUp}>
                    <div className='p-5 sm:w-96 w-full flex flex-col justify-start items-center '>
                        <Input placeholder="PrivateKey" name="privatekey" type="text" handleChange={handleVoteTallyChange}/>
                    </div>
                    <div className="h-[1px] w-full bg-gray-400 my-2"/>
                    {isLoading ?  (
                             <VerifyUser />
                        ):!showAdditionalData && (
                            <button
                                type="button"
                                onClick={() => {
                                handleVoteTally();
                                setShowAdditionalData(true);
                                }}
                                className="text-white w-full mt-2 border-[2px] p-2 border-[#2546bd] rounded-full cursor-pointer"
                            >
                                Tally Votes
                            </button>
                            )}
                        {showAdditionalData && (
                                <ol className='p-5 sm:w-96 w-full flex flex-col justify-start items-center font-light font-semibold  '>
                                <li>Candidate A: {canA.toString()} votes.</li>
                                <li> Candidate B: {canB.toString()} votes.</li>
                                <li>Candidate C: {canC.toString()} votes.</li>
                                </ol>
                        )}
                </VoteTally>
                <button className="bg-[#000000] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#a9a9a9]" onClick={openGetVotesPopUp}>
                    Get Votes
                </button>
                <GetVotes trigger={getVotesPopUp} setTrigger={setGetVotesPopUp}>
                    <ol className='p-5 sm:w-96 w-full flex flex-col justify-start items-center font-light font-semibold  '>
                    <li>Candidate A: {canA.toString()} votes.</li>
                    <li> Candidate B: {canB.toString()} votes.</li>
                    <li>Candidate C: {canC.toString()} votes.</li>
                    </ol>
                </GetVotes>
            </ul>
        </nav>
    );
}

export default Navbar;