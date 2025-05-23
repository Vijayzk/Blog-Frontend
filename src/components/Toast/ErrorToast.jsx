import { MdError } from "react-icons/md";

const ErrorToast = ({message}) => {
    return (
        <div className={`sticky top-30 left-10 transition-all duration-400 opacity-100 w-1/3`}>
            <div className={`min-w-52 bg-white border border-gray-200 shadow-2xl rounded-md after:w-[5px] after:h-full after:bg-red-500 after:absolute after:left-0 after:top-0 after:rounded-lg`}>
                <div className="flex items-center gap-3 py-2 px-4">
                    <div className={`flex items-center justify-center rounded-full bg-red-50`}>
                        <MdError size={38} className='text-xl text-red-500' />
                    </div>
                    <p className='text-sm text-red-500'>{message}</p>
                </div>
            </div>
        </div>
    )
}

export default ErrorToast
