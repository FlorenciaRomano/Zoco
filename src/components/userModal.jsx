import React from 'react';

const UserModal = ({ onClose, title, children }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-black opacity-50 absolute inset-0"></div>
            <div className="bg-white rounded-lg z-10 p-1 max-w-2xl w-full overflow-y-auto" style={{ maxHeight: '80vh' }}>
                
                <div className='flex' onClick={onClose}>
                <h2 className="text-2xl font-bold mb-4 text-center">
                    {title}
                </h2>
                
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
                </div>
            {/* <div className="bg-white rounded-lg shadow-lg z-10 p-6 max-w-2xl w-full overflow-y-auto" style={{ maxHeight: '80vh' }}>
                <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2> */}
                {children}
            </div>
        </div>
    );
};

export default UserModal;
