'use client';
import Projects from '@/components/list/projects';

const MyWorks = () => {
    return (
        <div className='w-full mx-auto'>
            <div className="text-3xl font-bold text-center mb-10">
            👩🏻‍💻 <span className='bg-linear-to-b from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent'>My Works</span> 
            </div>
            <div className='w-[90%] mx-auto'>
                <Projects/>
            </div>
        </div>
    )
}

export default MyWorks;