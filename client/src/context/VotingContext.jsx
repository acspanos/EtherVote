import React, { useEffect, useState, useRef } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';
//npm install crypto-hash
import {sha256} from 'crypto-hash';

//npm install node-forge
import forge from 'node-forge';

export const VotingContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const votingContract= new ethers.Contract(contractAddress, contractABI, signer);

    return votingContract;
}

export const VotingProvider = ({ children }) => {

    const [ accountVoted, setAccountVoted ] = useState(false);
    const [ currentAccount, setCurrentAccount ] = useState("");
    const [ isLoading, setIsLoading ] = useState(false);
    const [ votingData, setVotingData ] = useState({candidate:'', keyword:''});
    const [ voteNum, setVoteNum ] = useState(0);
    const [ usersNum, setUsersNum ] = useState(0);
    const [ days, setDays ] = useState(0);
    const [ hours, setHours ] = useState(0);
    const [ minutes, setMinutes ] = useState(0);
    const [ seconds, setSeconds ] = useState(0);
    const [ canA, setCanA ] = useState(0);
    const [ canB, setCanB  ] = useState(0);
    const [ canC, setCanC  ] = useState(0);
    const [ voteTallyData, setVoteTallyData ] = useState({privatekey:''});

    const handleVotingChange = (e, name) => {
        setVotingData((prevState) => ({ ...prevState, [name]: e.target.value }))
    }

    const handleVoteTallyChange = (e, name) => {
        setVoteTallyData((prevState) => ({ ...prevState, [name]: e.target.value }))
    }

    const connectWallet= async () => {
        try {
            if(!ethereum) return alert('Please install Metamask');


            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            setCurrentAccount(accounts[0]);

        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    }

    const getAllVotes = async () => {
        if(!ethereum) return alert('Please install Metamask');

        const votingContract = getEthereumContract();
        let candA=0;
        let candB=0;
        let candC=0;
        const privateKeyPem=  voteTallyData.privatekey;
        console.log(privateKeyPem);
        // const privateKeyPem=` -----BEGIN RSA PRIVATE KEY-----
        //     MIIEowIBAAKCAQEAoxjIgxLBvjl4t+UF4se6DdVYwTgBQwWxjMubQgeU2J+moh49
        //     TI5XdVErncTM5mMtSBHmQsEpw/6YbjJla2TYP4nxx3JJn3Ja/WHGmC4RgsmThbnL
        //     jd81iMcsymY8AEkAkkefZ6L7kBotcTHKtUleOxQli3AZ708Q+XdBVj5+UwjSgc60
        //     DQxy2+2bLl85tFVfgpH6jxYovcv36gIWtc+a6VN6L0oI10cvM4DimWt5NG9vbtU4
        //     51BT6MW4nT7GBrmoZPBb1S7oZYSH1PY1yQ2Aa3Y/dyP0qWeHUbY9dMCqTBUVxuiV
        //     vtAq5XF4VcIALpvb7rEzAVD9ffYdw5oLEOdJbQIDAQABAoIBAQCJMBGJXz+kmIcY
        //     eAZpaYLwm+KaNFerXqCoQ6OG+QWU6UWq3DDHsnuSbQJ5JM8Ng6LVGmlLAVv2RrNF
        //     DhMNMLhNSeUb1OBkxDYRKCt6WlXUY2Y5d7zmyzgmoxLj9PbHbqCSariE3i0oWzya
        //     GD3gG6StoRaroVHPX/xxOoS03MA5argzFIqfCGiTTxRX92L/HMyV0dCVOYpl5vMS
        //     5/qj7qJpMYcCRj8wsrXUDKFOsltrH3g4dFt1ur18WdS6lMl2tDiXIwTRjFpiWaMb
        //     XBOJIzNPLqrDi9x7d5jX79FsX3VR1pyXTWahPdGAMyb7r0WBQI4Xc3EycGLpFrcn
        //     FnvADL2BAoGBAO+vDebQ9OC0YTBpRFgz2sTnpe1U/8SmzuoFAtV7qM3nWAqW4bc8
        //     gMWINFCpNwzi4Q2E4XpgCkeAb+7pr+naneCiPIWCkjyCGtKYtqJTNvDWCSzXr1XJ
        //     u8sKENifepASpApAEib+I770rezMohetqg6wdV5rK/3Wzw6EVZy3dUk9AoGBAK4z
        //     DhZETDdPy1DVYOWwOB+Hi7w0WNZ2Z70lnebsEoFeW+qyarVODIPGDh8uY2QcThYD
        //     o7iJkRj/LCCFn23mhDJ7Avz3dxpAjQ9U8GvOFAaKTKPT2r/PuSoJP1oFbVOIkJWe
        //     ShW1FuvqzExIIJlqX/ewOadwYdicAkm5YDnAAiPxAoGAFrB/pGYLiGoK+UY9zgu6
        //     ngE/1+PAAqG33Ld0uTjnlfZcg0QdQfdcSVbHfQtHxtSDcYAuyCLnVjV2YyuEF6M2
        //     Ztl02T6vEUNPvrfuMhemj83zOGeClaBvQp1FUvxl4dWh6cZ+8WoFgEIxZMVKYutx
        //     ucpCkhmbJIB9QWaNpDRJyhECgYBaVU1rzJT9ZdqYG165HU2tQ/v5Z+fdpt8a3ePp
        //     OOhLv+PIbCcbx9KDjvQJxWNzKZ5wmgiPjH76yHBYmRJYyl4pU1L0XVuc+HZtye02
        //     6lHGJnehyR25s/1gSBVbGE9eLwZTIBdo9FRjmInC0PBeviPv7KmpI4UJ77TcCE5X
        //     BDPX8QKBgBVVQ+hXpoOU984H7k1OLL6nP/CB1SFySwaF/rU2hsx4Ln6e4BCWIJqk
        //     cb0W8Ar3DSFvF7BI1nkNOKmhRQK8ooyRIGtoNEjg2XNoZyiOQzwbJbTOLtjloXwE
        //     5POhgHR8/m1411oHvrO91YitDgg4J94OuXsrMQsM9clbEXRgNvrv
        //     -----END RSA PRIVATE KEY-----`;
        
        const importedPrivateKey = forge.pki.privateKeyFromPem(privateKeyPem);
        const encryptData = await votingContract.returnEncryptedVotes();
        for(let i=0; i<encryptData.length;i++){
            console.log(encryptData[i]);;
            let decryptVote = importedPrivateKey.decrypt(encryptData[i], 'RSA-OAEP');
            console.log(decryptVote);
            if(decryptVote.includes('candidateA')){
                candA++;
            }
            if(decryptVote.includes('candidateB')){
                candB++;
            }
            if(decryptVote.includes('candidateC')){
                candC++;
            }
        }
        setCanA(candA);
        setCanB(candB);
        setCanC(candC);

    }

    const getAllUsers = async () => {
        if( !ethereum ) return alert('Please install Metamask');

        const votingContract = getEthereumContract();
        const totalUsers = await votingContract.getUserCount();
        setUsersNum(parseInt(totalUsers,10));
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

    const addVote = async () => {
        try {
            if(!ethereum) return alert("Please install Metamask!");

            const publicKeyPem=` -----BEGIN PUBLIC KEY-----
            MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoxjIgxLBvjl4t+UF4se6
            DdVYwTgBQwWxjMubQgeU2J+moh49TI5XdVErncTM5mMtSBHmQsEpw/6YbjJla2TY
            P4nxx3JJn3Ja/WHGmC4RgsmThbnLjd81iMcsymY8AEkAkkefZ6L7kBotcTHKtUle
            OxQli3AZ708Q+XdBVj5+UwjSgc60DQxy2+2bLl85tFVfgpH6jxYovcv36gIWtc+a
            6VN6L0oI10cvM4DimWt5NG9vbtU451BT6MW4nT7GBrmoZPBb1S7oZYSH1PY1yQ2A
            a3Y/dyP0qWeHUbY9dMCqTBUVxuiVvtAq5XF4VcIALpvb7rEzAVD9ffYdw5oLEOdJ
            bQIDAQAB
            -----END PUBLIC KEY-----`;

            const importedPublicKey = forge.pki.publicKeyFromPem(publicKeyPem);
        
            const keyword = votingData.keyword;

            const votingContract = getEthereumContract();
            const correctOTP = await votingContract.checkIfKeywordIsCorrect(keyword);
            const hasVoted = await votingContract.checkIfVoted();

            if(!correctOTP){
                return alert('Key incorrect or expired. Please redeem your key!');
            }
            else if(hasVoted){
                return alert('Looks like you have already voted.');
            }
            else{
                setIsLoading(true);
                const candidate = votingData.candidate+keyword;
                console.log(candidate);
                const encryptCandidate = importedPublicKey.encrypt(candidate, 'RSA-OAEP');
                console.log(encryptCandidate);

                const votingReceipt = await votingContract.Vote(encryptCandidate);

                console.log(votingReceipt);
                let justVoted = await votingContract.checkIfVoted();
                console.log('voted='+justVoted);
                while(!justVoted)
                    justVoted = await votingContract.checkIfVoted();
                setIsLoading(false);
                window.location.reload();
            }
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    }

    const calcTime = async () => {
        const dt1 = new Date();
        const dt2 = new Date("October 10, 2022 20:00:00");
        var diff =(dt2.getTime() - dt1.getTime()) / 1000;
        // diff /= 60;
        // var hours=diff/60;
        var days = parseInt(diff/(60*60*24),10);
        diff-=(days*60*60*24);
        var hours=parseInt((diff/(60*60)),10);days*24;
        diff-=(hours*60*60);
        var minut=parseInt(diff/60,10);
        setMinutes(minut);
        setHours(hours);
        setDays(days);
        //setDays(diff);
    }

    const checkIfAccountHasVoted = async () => {
        try {
            if(!ethereum) return alert("Please install Metamask!");

            const votingContract = getEthereumContract();
            const accHasVoted =  await votingContract.checkIfVoted(); 
            if(accHasVoted){
                setAccountVoted(true);
            }else{
                setAccountVoted(false);
            }
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    }

    useEffect(() => {
        checkIfAccountHasVoted();
        checkIfWalletIsConnected();
        getAllUsers();
        calcTime();
    }, []);

    return (
        <VotingContext.Provider value={{connectWallet,currentAccount, handleVotingChange,votingData,addVote,isLoading,voteNum,usersNum,minutes,hours,days,accountVoted,getAllVotes,canA,canB,canC,handleVoteTallyChange,voteTallyData}}>
            {children}
        </VotingContext.Provider>
    );
}
