import { Loader } from "../components"

import { AiFillPlayCircle } from "react-icons/ai"
import { SiEthereum } from "react-icons/si"
import { BsInfoCircle } from "react-icons/bs"
import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";

type InputProps = {
    placeholder: string;
    name: string;
    type: string;
    value: string | number;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
};

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }: InputProps) => (
    <input
        placeholder={placeholder}
        name={name}
        type={type}
        value={value}
        onChange={(e) => handleChange(e, name)}
        step="0.0001"
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
);


export default function Welcome() {
    const { connectWallet, currentAccount, formData, handleChange, sendTransaction, isLoading } = useContext(TransactionContext)


    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        const { addressTo, amount, keyword, message } = formData;

        e.preventDefault();

        if (!addressTo || !amount || !keyword || !message) return;

        sendTransaction();
    }

    const handleConnectAndDisconnectWallet = () => {
        if (!currentAccount) {
            connectWallet();
        } else {
            return
        }
    }

    return (
        <div className="flex w-full justify-center items-center max-w-[1440px] mx-auto" id="exchange">
            <div className="flex w-full mf:flex-row flex-col items-start justify-between my:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start flex-col">
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                        Send Crypto <br /> Across the World
                    </h1>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                        Explore the crypto world. Buy and sell cryptocurrencies easily on Krypto.
                    </p>
                    <button
                        type="button"
                        onClick={handleConnectAndDisconnectWallet}
                        className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd] transition">
                        <AiFillPlayCircle className="text-white mr-2" />
                        <p className="text-white text-base font-semibold">
                            {currentAccount ? "Connected" : "Connect Wallet"}
                        </p>
                    </button>
                    <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                        <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
                            Reliability
                        </div>
                        <div className={`${companyCommonStyles}`}>
                            Security
                        </div>
                        <div className={`rounded-tr-2xl ${companyCommonStyles}`}>
                            Ethereum
                        </div>
                        <div className={`rounded-bl-2xl ${companyCommonStyles}`}>
                            WEB 3.0
                        </div>
                        <div className={`${companyCommonStyles}`}>
                            Low fees
                        </div>
                        <div className={`rounded-br-2xl ${companyCommonStyles}`}>
                            Blockchain
                        </div>
                    </div>
                </div>

                <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
                    <div className="p-3 justify-end items-start flex flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
                        <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                    <SiEthereum fontSize={21} color="#fff" />
                                </div>
                                <BsInfoCircle fontSize={17} color="#fff" />
                            </div>
                            <div>
                                <p className="text-white font-light text-sm">
                                    {shortenAddress(currentAccount)}
                                </p>
                                <p className="text-white font-semibold text-lg mt-1">
                                    Ethereum
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 sm:w-96 lg:w-[60%] w-full flex flex-col justify-start items-center blue-glassmorphism">
                        <Input placeholder="Address To" name="addressTo" type="text" value={formData.addressTo} handleChange={handleChange} />
                        <Input placeholder="Amount (ETH)" name="amount" type="number" value={formData.amount} handleChange={handleChange} />
                        <Input placeholder="Keyword (Gif)" name="keyword" type="text" value={formData.keyword} handleChange={handleChange} />
                        <Input placeholder="Enter Message" name="message" type="text" value={formData.message} handleChange={handleChange} />
                        <div className="h-[1px] w-full bg-gray-400 my-2"></div>

                        {isLoading ?
                            <Loader />
                            :
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="w-full mt-2 border-[1px] p-2 border-[#3d4f7c] bg-[#2952e3] text-white rounded-full cursor-pointer hover:bg-[#2546bd] transition">
                                Send Now
                            </button>}
                    </div>
                </div>
            </div>
        </div>
    )
}
