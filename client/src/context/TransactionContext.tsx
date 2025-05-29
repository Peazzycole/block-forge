import React, { useEffect, useState, type ReactNode } from "react";

import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export interface TransactionFormData {
    addressTo: string;
    amount: string;
    keyword: string;
    message: string;
}

export interface Transaction {
    receiver: string;
    sender: string;
    timestamp: string;
    message: string;
    keyword: string;
    amount: number;
}

export interface TransactionContextType {
    currentAccount: string;
    formData: TransactionFormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
    isLoading: boolean;
    transactionCount: string | number;
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
    sendTransaction: () => Promise<void>;
    transactions: Transaction[];
}


// eslint-disable-next-line react-refresh/only-export-components
export const TransactionContext = React.createContext<TransactionContextType>({
    currentAccount: "",
    formData: {
        addressTo: "",
        amount: "",
        keyword: "",
        message: "",
    },
    handleChange: () => { },
    isLoading: false,
    transactionCount: 0,
    connectWallet: async () => { },
    disconnectWallet: async () => { },
    sendTransaction: async () => { },
    transactions: [],
});

// @ts-expect-error no error
const { ethereum } = window;

const createEthereumContract = async () => {
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const transactionContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
    );

    return transactionContract;
};

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
    const [currentAccount, setCurrentAccount] = React.useState("");
    const [formData, setFormData] = useState({
        addressTo: "",
        amount: "",
        keyword: "",
        message: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(0);
    const [transactions, setTransactions] = useState<Transaction[]>([]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");
            const accounts = await ethereum.request({ method: "eth_accounts" });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                getAllTransactions();
            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.error("Error connecting wallet:", error);

            throw new Error("No Ethereum object found. Please install MetaMask.");
        }
    };

    const getAllTransactions = async () => {
        try {
            if (ethereum) {
                const transactionsContract = await createEthereumContract();

                const availableTransactions = await transactionsContract.getAllTransactions();

                const structuredTransactions = availableTransactions.map((transaction: Transaction) => ({
                    receiver: transaction.receiver,
                    sender: transaction.sender,
                    timestamp: new Date(Number(transaction.timestamp) * 1000).toLocaleString(),
                    message: transaction.message,
                    keyword: transaction.keyword,
                    amount: parseInt(ethers.toBeHex(transaction.amount)) / (10 ** 18)
                }));

                console.log(structuredTransactions);

                setTransactions(structuredTransactions);
            } else {
                console.log("Ethereum is not present");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const connectWallet = async () => {
        if (!ethereum) return alert("Please install MetaMask.");
        try {
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.error("Error connecting wallet:", error);

            throw new Error("No Ethereum object found. Please install MetaMask.");
        }
    };

    const disconnectWallet = async () => {
        setCurrentAccount("");
        setTransactions([]);
        setTransactionCount(0);
    };

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = await createEthereumContract();
            if (!transactionContract) return;

            const parsedAmount = ethers.parseEther(amount);

            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: "0x5208", // 21000 Gwei
                    value: ethers.toBeHex(parsedAmount),
                }],
            });

            const transactionHash = await transactionContract.addToBlockchain(
                addressTo,
                parsedAmount,
                keyword,
                message
            );

            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            setFormData({
                addressTo: "",
                amount: "",
                keyword: "",
                message: "",
            })
            console.log(`Success - ${transactionHash.hash}`);
            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(Number(transactionCount));

        } catch (error) {
            console.error("Error connecting wallet:", error);

            throw new Error("No Ethereum object found. Please install MetaMask.");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getAllTransactions()
    }, [transactionCount, currentAccount]);



    return (
        <TransactionContext.Provider
            value={{
                currentAccount,
                formData,
                handleChange,
                isLoading,
                transactionCount,
                connectWallet,
                disconnectWallet,
                sendTransaction,
                transactions
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
}