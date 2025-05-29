
export default function Footer() {
    return (
        <div className=" gradient-bg-footer ">
            <div className="max-w-[1440px] mx-auto">
                <div className="w-full flex justify-between items-center flex-col p-4 pb-5">
                    <div className="w-full flex sm:flex-row flex-col justify-start items-start my-4">
                        <div className="flex justify-center items-center">
                            <img src="/logo.png" alt="logo" className="w-32" />
                        </div>
                    </div>

                    <div className="flex justify-center items-center flex-col mt-5">
                        <p className="text-white text-sm text-center">Discover the future of decentralized innovation with us</p>
                        <p className="text-white text-sm text-center font-medium mt-2">Empowering communities, one block at a time</p>
                    </div>

                    <div className="w-full h-[0.25px] bg-gray-400 mt-5 " />

                    <div className="w-full flex justify-between items-center mt-3">
                        <p className="text-white text-left text-xs">@Web3.0 2025</p>
                        <p className="text-white text-right text-xs">All rights reserved</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
