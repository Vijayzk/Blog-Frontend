import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Cookies from 'js-cookie';
import axios from 'axios';

const Blogs = () => {

  const jwtToken = Cookies.get('jwt');
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState();
  const [searchText, setSearchText] = useState('');
  const [loader, setLoader] = useState(false);
  const [postLoader,setPostLoader] = useState(false);

  const getPosts = async () => {
    setPostLoader(true)
    const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/post/`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
    if (response.data.posts) {
      setPosts(response.data.posts)
      setPostLoader(false);
    }

  };


  const handleSearch = async (e) => {
    e.preventDefault();
    setLoader(true)
    if (!searchText) {
      setLoader(false)
      getPosts();
      return;
    }

    const data = {
      name: searchText
    }

    const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/post/search`, data, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      }
    })
    setPosts(response.data.post);
    setLoader(false);
  }


  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Navbar />

      <div className='max-w-screen-2xl container p-4 lg:pl-18'>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-center mt-10 text-3xl lg:text-5xl'>All your posted <span className='text-green-500 font-bold'>blogs</span> are shown here !!</h1>
          <p className='text-center  mt-8 lg:w-1/2'>Ready to inspire, inform, or entertain? Write your thoughts, stories, or expertise and connect with readers across the globe. Whether it's a personal experience or a professional insight, your blog starts here.</p>
          <form className='flex lg:flex-row flex-col justify-center items-center mt-8' onSubmit={handleSearch}>
            <label className="floating-label">
              <span className=''>Search for blog</span>
              <input type="text" placeholder="Search for blog" className="input lg:input-md w-80 lg:w-96" value={searchText} onChange={e => setSearchText(e.target.value)} />
            </label>
            <button className='btn btn-md w-1/2 lg:w-1/4 mt-6 lg:mt-0 rounded-md lg:ml-4 bg-black hover:text-gray-200 text-white'>{loader ? <span className="loading loading-spinner loading-md" /> : `Search`}</button>
          </form>
        </div>


        <div className='mt-10 lg:mt-20 lg:px-10 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-10'>
          {
            posts.length > 0 ? posts.map((post, index) => (

              <div key={post.id} className="bg-base-200 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-400 px-4 cursor-pointer pb-4" onClick={() => { document.getElementById('my_modal_3').showModal(), setData(post) }}>
                <img className="w-full h-48 object-cover pt-4" src={post.imageUrl} alt='Post Image' />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
                  <p className="text-gray-600 mt-2 text-sm text-wrap h-56 md:h-30 lg:h-56">{post.description.slice(0, 400)}<span className='text-blue-500 underline'> read more</span></p>
                  <div className="flex flex-row justify-between">
                    <div className="mt-4 flex flex-col text-sm text-gray-500">
                      <span>Created At :-<span className="font-medium text-gray-700">{new Date(post.created_at).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                      })}</span></span>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              postLoader ?
                <span className="fixed left-1/2 loading loading-dots loading-xl"></span>
                :
                <div className='absolute left-20 md:left-90 lg:left-1/3 pb-10 mt-4'>
                  <div className="flex flex-col justify-center items-center space-y-2">
                    <h1 className='lg:text-3xl text-xl'>No blogs found.</h1>
                    <img src="/NoPost.jpg" alt="" className='lg:w-100 w-50' />
                  </div>
                </div>

            )
          }

          {/* Blog Details */}
          <dialog id='my_modal_3' className='fixed top-50 lg:top-20 left-10 md:left-1/6 lg:left-1/3 rounded-4xl px-10'>
            <div className='flex flex-row justify-center w-[240px] md:w-[460px] lg:w-[500px] h-[440px] lg:h-[460px] bg-white rounded-4xl px-5 lg:mb-10'>
              <div className='flex flex-col mt-10 lg:mt-16 space-y-6 lg:mx-0 mx-6'>
                <div className='flex flex-row justify-between'>
                  <h1 className='lg:text-2xl text-lg text-[#030229] font-bold'>{data?.title}</h1>
                </div>
                <div className='flex flex-col justify-center items-center space-y-4'>
                  <div className='flex'>
                    <img className='h-40' src={data?.imageUrl} alt="" />
                  </div>
                  <div className='flex max-h-40 overflow-y-auto'>
                    <p className='text-sm text-gray-500'>{data?.description}</p>
                  </div>
                </div>
              </div>

            </div>
            <form method='dialog'>
              <button className="absolute top-2 lg:top-5 left-4 lg:left-2 text-gray-400 hover:text-gray-600 text-2xl font-bold lg:m-4 cursor-pointer" onClick={() => { setData() }}>
                &times;
              </button>
            </form>
          </dialog>
        </div>
      </div>
      

    </>
  )
}

export default Blogs
