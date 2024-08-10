import React, { useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
import { Loader } from './';
import robot from '../../images/robotvoting.png';
import { VotingContext } from '../context/VotingContext';
const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name,type,value, handleChange }) => (
    <input
    placeholder={placeholder}
    type={type}
    value={value}
    onChange={(e) => handleChange(e,name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
);

const Select = ({placeholder, name, type, value, handleChange}) => (
    <select
    placeholder={placeholder}
    type={type}
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-1 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    >
    <option value='' hidden className='text-white dropdown-content'>---</option>
    <option value="candidateA" className='text-white dropdown-content'>Candidate A</option>
    <option value="candidateB" className='text-white dropdown-content'>Candidate B</option>
    <option value="candidateC" className='text-white dropdown-content'>Candidate C</option>    
    </select>
      
);

const Welcome = () => {
    const { connectWallet,currentAccount, handleVotingChange , votingData, addVote , isLoading, accountVoted } = useContext(VotingContext);
    //const logged  = useContext(LoginContext);

    const handleSubmit = () => {
        const cand = votingData.candidate;
        const otp = votingData.keyword;
        if(cand ==='' || !otp){
            alert('Please fill the form!')
        }
        //else if(localStorage.getItem('logged')==='false'){
        //     alert('Please sign in with your personal data.')
        // }
        else{
            addVote();
        }
    }

    return(
        <div className="flex w-full justify-center items-center">
            <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                <div className=" flex flex-1 justify-start flex-col mf:mr-60">
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                        Digital era is here <br /> Vote from your home 
                    </h1> 
                    <p className='text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base'>
                        Integrity Guaranteed <br /> Every vote counts
                    </p>
                    {!currentAccount && (
                        <button 
                            type="button"
                            onClick={connectWallet}
                            className="flex flex-row justify-center items-center my-5 bg-[#a9a9a9] p-3 rounded-full cursor-pointer hover:bg-[#000000]">
                            <p className='text-white text-base font-semibold'>
                                Connect Metamask
                            </p>
                        </button>
                    )}
                    {/* <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                        <div className={`rounded-tl-2xl ${commonStyles}`}>Authentication</div>
                        <div className={commonStyles}>Security</div>
                        <div className={`rounded-tr-2xl ${commonStyles}`}>Blockchain</div>
                        <div className={`rounded-bl-2xl ${commonStyles}`}>Security</div>
                        <div className={commonStyles}>Safety</div>
                        <div className={`rounded-br-2xl ${commonStyles}`}>Varification</div>
                    </div> */}
                    <img src={robot} alt="robot" className="w-30" />
                </div>

                <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
                    <h1 className="text-3xl sm:text-5xl text-white py-1">
                        Submit your vote:
                    </h1>

                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center bg-transparent">
                        <div className='font-semibold text-white w-full my-3 border-none'>
                        Your address:
                        </div>
                        <div className='my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism'>
                        {currentAccount}
                        </div>
                        <div className='font-semibold text-white w-full my-3 border-none'>
                        Candidates:
                        </div>
                        <Select placeholder="Candidates" name="candidate"  type="text"  handleChange={handleVotingChange}/>
                        <div className='font-semibold text-white w-full my-3 border-none'>
                        One time password:
                        </div>
                        <Input placeholder="Keyword (OTP)" name="keyword" type="text" handleChange={handleVotingChange} />
                    
                        <div className="h-[1px] w-full bg-gray-400 my-2"/>

                        { accountVoted
                        ? <button type ="button" className="text-white w-full mt-2 border-[1px] p-2 border-[#a9a9a9] rounded-full cursor-pointer">
                        Account voted
                        </button>
                        : <>
                            {isLoading
                                ?  <Loader />
                                : 
                                <button type ="button" onClick={handleSubmit} className="text-white w-full mt-2 border-[1px] p-2 border-[#a9a9a9] rounded-full cursor-pointer">
                                Submit Vote
                                </button>
                            }
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;