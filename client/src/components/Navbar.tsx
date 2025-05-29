import { HiMenuAlt4 } from "react-icons/hi"
import { AiOutlineClose } from "react-icons/ai"
import { useContext, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";

const NavbarItem = ({ title, classprops }: { title: string; classprops?: string }) => {
    return (
        <li
            className={`mx-4 cursor-pointer ${classprops}`}
            onClick={() => {
                const section = document.getElementById(title.toLowerCase());
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }}
        >
            {title}
        </li>
    )
}

export default function Navbar() {
    const [toggleMenu, setToggleMenu] = useState(false)
    const { connectWallet, currentAccount } = useContext(TransactionContext)

    const handleConnectWallet = () => {
        if (!currentAccount) {
            connectWallet();
        }
    }


    return (
        <nav className="w-full flex justify-between items-center p-4 max-w-[1440px] mx-auto">
            <div className="justify-center items-center ">
                <img className="w-32 cursor-pointer" src="/logo.png" alt="" />
            </div>
            <ul className="text-white md:flex hidden list-none flex-row justify-between gap-4 items-center">
                {["Exchange", "Services", "Transactions"].map((item, index) => (
                    <NavbarItem key={item + index} title={item} />
                ))}
            </ul>
            <button
                className="bg-[#2952e3] flex items-center text-white font-semibold py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd] transition"
                onClick={handleConnectWallet}
            >
                {currentAccount ? shortenAddress(currentAccount) : "Connect Wallet"}
                {currentAccount && <div className="flex-1 size-2 ml-2 bg-green-500 rounded-full animate-pulse"></div>}
            </button>
            <div className="flex relative md:hidden">
                {toggleMenu ?
                    <AiOutlineClose className="text-white md:hidden cursor-pointer" fontSize={28} onClick={() => setToggleMenu(false)} />
                    :
                    <HiMenuAlt4 className="text-white md:hidden cursor-pointer" fontSize={28} onClick={() => setToggleMenu(true)} />
                }

                {/* Add the slide in animation */}
                {toggleMenu && (
                    <ul className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in">
                        <li className="text-xl w-full my-2">
                            <AiOutlineClose className="text-white md:hidden cursor-pointer" fontSize={28} onClick={() => setToggleMenu(false)} />
                        </li>
                        {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
                            <NavbarItem key={item + index} title={item} classprops="my-2 text-lg" />
                        ))}
                    </ul>
                )}

            </div>
        </nav>
    )
}
