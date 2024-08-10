import React, { useEffect, useState, useRef } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';
//npm install crypto-hash
import {sha256} from 'crypto-hash';



export const LoginContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const LoginContract= new ethers.Contract(contractAddress, contractABI, signer);

    return LoginContract;
}


export const LoginProvider = ({ children }) => {
    const [ currentAccount, setCurrentAccount ] = useState("");
    const [signInData, setSignInData ] = useState({firstname:'', lastname:'',fathersname: '', phone:'',birthday: '', id:''});
    const [ signUpData, setSignUpData ] = useState({firstname:'', lastname:'',fathersname: '', phone:'',birthday: '', id:''});
    const [ isLoading, setIsLoading ] = useState(false);
    const [userCount,setUserCount] = useState(localStorage.getItem('userCount'));
    //const [logged, setLogged] = useState(false);
    const loggedUser = {
        stat: localStorage.getItem('stat')
    };

    const handleSignInChange = (e, name) => {
        setSignInData((prevState) => ({ ...prevState, [name]: e.target.value }))
    }

    const handleSignUpChange = (e, name) => {
        setSignUpData((prevState) => ({ ...prevState, [name]: e.target.value }))
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if(!ethereum) return alert("Please install Metamask!");

            const accounts = await ethereum.request({method: 'eth_accounts'});
            
            if(accounts.length){
                setCurrentAccount(accounts[0]);
            }else{
                console.log('No accounts found!')
            }   
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    }

    const addUser = async () => {
        try {
            if(!ethereum) return alert('Please install Metamask');

            //get the data from the form
            //new
            const address = signUpData.address;
            //new end
            const firstname = await sha256(signUpData.firstname);
            const lastname = await sha256(signUpData.lastname);
            const fathersname = await sha256(signUpData.fathersname);
            const phone = await sha256(signUpData.phone);
            const birthday = await sha256(signUpData.birthday);
            const id = await sha256(signUpData.id);
            
            const root1 = await sha256(firstname+lastname);
            const root2= await sha256(fathersname+phone);
            const root3= await sha256(birthday+id);
            const root4= await sha256(root1+root2);
            const auth = await sha256 (root4+root3);
            const LoginContract = getEthereumContract();
            
            const exists= await LoginContract.checkIfUserExists(auth);
            console.log(address);
            if(exists) return alert('User already registered');
            
            //new: add address
            console.log(auth);
            const usersHash = await LoginContract.addUser(auth, address);
            
            setIsLoading(true);
            console.log('Adding user');
            await usersHash.wait();
            setIsLoading(false);
            console.log(`Success on adding user - ${usersHash.hash}`);

            window.location.reload();

        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    }

    const checkUser = async () => {
        try {   
            if(!ethereum) return alert('Please install Metamask');

            const realPhone = signInData.phone;
            const firstname = await sha256(signInData.firstname);
            const lastname = await sha256(signInData.lastname);
            const fathersname = await sha256(signInData.fathersname);
            const phone = await sha256(signInData.phone);
            const birthday = await sha256(signInData.birthday);
            const id = await sha256(signInData.id);
            
            const root1 = await sha256(firstname+lastname);
            const root2= await sha256(fathersname+phone);
            const root3= await sha256(birthday+id);
            const root4= await sha256(root1+root2);
            const auth = await sha256 (root4+root3);

            const LoginContract = getEthereumContract();
            setIsLoading(true);

            const userExists = await LoginContract.checkIfUserExists( auth );
            const hasVoted = await LoginContract.checkIfVoted();
            
            if(userExists && !hasVoted){
                const otp = Math.random().toString(36).substring(2,10);

                console.log(otp);

                const result = await LoginContract.logUser(auth, otp);
                
                console.log('Checking otp')
                let correctOTP = await LoginContract.checkIfKeywordIsCorrect(otp);
                const accountSid = import.meta.env.VITE_REACT_ACCOUNT_SID;
                const authToken = import.meta.env.VITE_REACT_AUTH_TOKEN;
               const from = '+15416955168';
               const to = 'get the phone from the form';
               const body = 'Welcome to Ether Voting. This is your otp:'+otp;
            //TWILIO SMS 
               fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
                   method: 'POST',
                   headers: {
                   'Content-Type': 'application/x-www-form-urlencoded',
                   'Authorization': `Basic ${btoa(`${accountSid}:${authToken}`)}`
                   },
                   body: `From=${encodeURIComponent(from)}&To=${encodeURIComponent(to)}&Body=${encodeURIComponent(body)}`
               })
               .then(response => {
                   if (response.ok) {
                   console.log('Message sent successfully!');
                   } else {
                   throw new Error('Error sending message');
                   }
               })
               .catch(error => {
                   console.error('Error:', error);
               });
                while(!correctOTP){
                    correctOTP = await LoginContract.checkIfKeywordIsCorrect(otp);
                }
                setIsLoading(false);
                // var w = 500;
                // var h = 400;

                // if (typeof window !== 'undefined') {
                //  var w=500;
                //  var h=400;
                //  var left = (screen.width/2)-(w/2);
                //  var top = (screen.height/2)-(h/2);
                //  var myWindow = window.open("", "MsgWindow", 'toolbar=no, location=no, resizable=yes, directories=no, status=no, menubar=no, scrollbars=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
                // //  myWindow.document.body.style.background = '#000000';
                //  myWindow.document.write(`<p>Only 1 step left to cast your vote!</p><p>Please copy your one time transaction keyword.</p><p>Your One Time Password is:</p><p>${otp}</p>`);
                // window.location.reload();
                // }
                window.location.reload();
            }
            else if(!userExists){
                setIsLoading(false);
                loggedUser.stat=false;
                console.log('User does not exist!');
            }else if(hasVoted){
                setIsLoading(false);
                loggedUser.stat=true;
                console.log('User has already voted');
            }
            
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    }
        
    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <LoginContext.Provider value={{ currentAccount , checkUser , signInData,handleSignInChange, isLoading, signUpData, addUser, handleSignUpChange,loggedUser}}>
            {children}
        </LoginContext.Provider>
    );
}
