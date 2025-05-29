import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import useFetch from "../../hooks/useFetch";
import Loader from "./Loader";

type TransactionsCardProps = {
    receiver: string;
    sender: string;
    timestamp: string;
    message?: string;
    keyword: string;
    amount: number;
};

const TransactionsCard = ({ receiver, sender, timestamp, message, keyword, amount }: TransactionsCardProps) => {
    const gifUrl = useFetch(keyword);

    return (
        <div className="bg-[#1f1f22] my-4 flex flex-1 sm:min-w-[270px] sm:max-w-[400px] min-w-full flex-col p-4 rounded-xl transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(55,199,218,0.2)]">
            <div className="flex flex-col w-full mt-2 gap-2">
                <div className="text-sm text-gray-300 space-y-1">
                    <a href={`https://sepolia.etherscan.io/address/${sender}`} target="_blank" rel="noreferrer">
                        <p className="hover:underline underline-offset-4 transition duration-150 ease-in-out text-white">
                            <span className="font-semibold">From:</span> {shortenAddress(sender)}
                        </p>
                    </a>
                    <a href={`https://sepolia.etherscan.io/address/${receiver}`} target="_blank" rel="noreferrer">
                        <p className="hover:underline underline-offset-4 transition duration-150 ease-in-out text-white">
                            <span className="font-semibold">To:</span> {shortenAddress(receiver)}
                        </p>
                    </a>
                    <p><span className="font-semibold text-white">Amount:</span> {amount} ETH</p>
                    {message && <p><span className="font-semibold text-white">Message:</span> {message}</p>}
                </div>

                <div className="w-full h-56 rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
                    <img
                        src={gifUrl || "https://media.giphy.com/media/3o7aD2saq1d8z0c5s4/giphy.gif"}
                        alt="Transaction visual"
                        className="object-cover w-full h-full"
                    />
                </div>

                <div className="bg-[#111] px-5 py-2 w-max rounded-full mx-auto mt-4 shadow-inner border border-[#37c7da4d]">
                    <p className="text-[#37c7da] font-semibold text-sm">{timestamp}</p>
                </div>
            </div>
        </div>

    );
};


export default function Transactions() {
    const { transactions, currentAccount } = useContext(TransactionContext);

    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions" id="transactions">
            <div className="max-w-[1440px] mx-auto">
                <div className="flex w-full flex-col md:py-20 py-12 px-4">
                    {currentAccount ? (
                        <div className="flex flex-col gap-5">
                            <h3 className="text-white text-3xl text-center my-2">
                                Latest Transactions
                            </h3>

                            {transactions.length > 0 ? <div className="flex w-full flex-wrap justify-center items-center mt-10 gap-6">
                                {[...transactions].reverse().slice(0, 4).map((transaction, i) => (
                                    <TransactionsCard key={i} {...transaction} />
                                ))}
                            </div> :
                                <Loader />
                            }
                        </div>

                    ) : (
                        <h3 className="text-white text-3xl text-center my-2">
                            Connect your account to see the latest transactions
                        </h3>
                    )}

                </div>
            </div>
        </div>
    )
}
