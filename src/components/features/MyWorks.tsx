'use client';
import Maintenance from './Maintenance';

const MyWorks = () => {
    return (
        <>
                <div>
                    <div className="text-3xl font-bold text-center">
                    👩🏻‍💻 <span className='bg-linear-to-b from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent'>My Works</span> 
                    </div>
                </div>
                <p className='text-white'>
                    <Maintenance/>
                </p>
        </>
    )
}

export default MyWorks;