import { Link } from 'react-router-dom';
import Navbar from './Navbar'
import { useSelector } from 'react-redux'

const Home = () => {

    const user = useSelector((state) => state.user.user);

    return (
        <>
            <Navbar />
            <div className="lg:carousel w-full h-screen  hidden">
                <div id="slide1" className="carousel-item relative w-full h-screen">
                    <div
                        className="hero min-h-screen"
                        style={{
                            backgroundImage: `url(${`/bg-1.jpg`})`,
                        }}
                    >
                        <div className="hero-overlay"></div>
                        <div className="flex flex-col space-y-8 px-30 justify-center items-center pt-10">
                            <h1 className='text-5xl text-white'>Start posting. Inspire the world, one blog at a time.</h1>
                            <p className='text-gray-300 text-wrap text-center text-lg'>Everyone has a story to tell—what’s yours? Whether it's personal insights, expert knowledge, or passionate opinions, blogging is your space to be heard. Start writing today and let your words make an impact.Blogging is more than writing—it’s about building connections, sparking ideas, and inspiring others. Join a community of creators and turn your thoughts into something powerful. Your blog could be the spark someone needs.You don’t need to be a professional writer to start a blog. You just need a voice and something to say. Create your own corner of the internet, grow your audience, and let your passion speak louder than ever.</p>
                            <button className='btn btn-primary w-40'>{ user? <Link to='/postblog'>Start Posting</Link> : <Link to='/signup'>Start Posting</Link> }</button>
                        </div>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full h-screen">
                    <div
                        className="hero min-h-screen"
                        style={{
                            backgroundImage: `url(${`/bg-2.jpg`})`,
                        }}
                    >
                        <div className="hero-overlay"></div>
                        <div className="flex flex-col space-y-10 px-30 justify-center items-center">
                            <h1 className='text-5xl text-white'>Create. Post. Influence.</h1>
                            <p className='text-gray-300 text-wrap w-full text-2xl'>Blogging is more than writing—it’s about building connections, sparking ideas, and inspiring others. Join a community of creators and turn your thoughts into something powerful. Your blog could be the spark someone needs.</p>
                            <button className='btn btn-primary w-40'>{ user? <Link to='/postblog'>Start Posting</Link> : <Link to='/signup'>Start Posting</Link> }</button>
                        </div>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full h-screen">
                    <div
                        className="hero min-h-screen"
                        style={{
                            backgroundImage: `url(${`/bg-3.jpg`})`,
                        }}
                    >
                        <div className="hero-overlay"></div>
                        <div className="flex flex-col space-y-10 px-30 justify-center items-center">
                            <h1 className='text-5xl text-white'>Got something to share? Start your blog now!</h1>
                            <p className='text-gray-300 text-wrap w-full text-2xl'>You don’t need to be a professional writer to start a blog. You just need a voice and something to say. Create your own corner of the internet, grow your audience, and let your passion speak louder than ever.</p>
                            <button className='btn btn-primary w-40'>{ user? <Link to='/postblog'>Start Posting</Link> : <Link to='/signup'>Start Posting</Link> }</button>
                        </div>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>
            <div className='flex flex-col space-y-10 lg:hidden px-10 pt-4 mb-10'>
                <div className='flex justify-center items-center'>
                    <img src="/blogimg.png" alt="" />
                </div>
                <div className='flex flex-col space-y-6'>
                    <h1 className='text-3xl text-wrap text-center'>Got something to share? Start your <span className='text-green-500'>blog</span> now!</h1>
                    <div className='flex flex-col justify-center items-center space-y-5 text-gray-400 text-wrap text-center'>
                        <p>You don’t need to be a professional writer to start a blog. You just need a voice and something to say. Create your own corner of the internet, grow your audience, and let your passion speak louder than ever.</p>
                        <button className='btn btn-sm w-30 btn-primary'>{ user? <Link to='/postblog'>Start Posting</Link> : <Link to='/signup'>Start Posting</Link> }</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
