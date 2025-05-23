import { useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import Cookies from 'js-cookie';
import SuccessToast from './Toast/SuccessToast';
import ErrorToast from './Toast/ErrorToast';

const PostBlog = () => {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [aiText, setAiText] = useState('')
  const [loader, setLoader] = useState(false)
  const [submitLoader, setSubmitLoader] = useState(false);
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');

  const jwtToken = Cookies.get('jwt');

  const generateDescripton = async () => {
    //console.log(aiText)
    setLoader(true)
    if (aiText === '') {
      setDescription('')
      setLoader(false)
      return;
    }
    const response = await axios({
      url: `${import.meta.env.VITE_AI_URL}`,
      method: 'post',
      data: {
        "contents": [
          {
            "parts": [
              {
                "text": `${aiText}`
              }
            ]
          }
        ]
      }
    });
    //console.log(response['data']['candidates'][0]['content']['parts'][0]['text'])
    if (response) {
      setDescription(response['data']['candidates'][0]['content']['parts'][0]['text'])
      setLoader(false)
    }
    setAiText('')
  }

  const handleSubmit = async (e) => {
    setSubmitLoader(true)
    e.preventDefault()

    if (!title && !description) {
      setSubmitLoader(false)
      setError('Enter details for posting.')
      setTimeout(() => {
        setError('')
      }, 2000)
      return;
    }

    if (!title) {
      setSubmitLoader(false)
      setError('Enter title for posting.')
      setTimeout(() => {
        setError('')
      }, 2000)
      return;
    }

     if (!description) {
      setSubmitLoader(false)
      setError('Enter description for posting.')
      setTimeout(() => {
        setError('')
      }, 2000)
      return;
    }


    try {
      const data = {
        title: title,
        description: description,
        file: image
      }
      console.log(data);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/post/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${jwtToken}`,
        }
      })
      if (response.data.error) {
        console.log(response.data);
        setSubmitLoader(false);
        setError(response.data.error);
        setTimeout(() => {
          setError('')
        }, 2000)
        return;
      }
      if (response.data) {
        console.log(response.data)
        setTitle('')
        setDescription('')
        setImage()
        setSubmitLoader(false)
        setToast(`Blog Posted successfully.`)
        setTimeout(() => {
          setToast('')
        }, 2000)
      }

    } catch (error) {
      console.log(error)
      setSubmitLoader(false)
    }

  }

  return (
    <>
      <Navbar />
      {toast && <SuccessToast message={toast} />}
      {error && <ErrorToast message={error} />}
      <div className='max-w-screen-2xl container p-4 lg:px-14'>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-center mt-10 text-2xl lg:text-5xl'>Start posting your <span className='text-green-500 font-bold'>blogs</span> here !!</h1>
          <p className='text-center text-xs lg:text-lg mt-8 lg:w-1/2'>Sharing fresh insights and ideas! This blog post dives into [topic], offering valuable tips and perspectives to keep you informed and inspired. Check it out and join the conversation—let us know your thoughts! 🚀</p>
        </div>
        <form className="rounded-2xl shadow-lg bg-base-300 mt-10 lg:mt-20 space-y-3 lg:space-y-5 flex flex-col px-10 pb-10 lg:mb-10" onSubmit={handleSubmit}>
          <h1 className='text-center mt-6 mb-16 text-xl lg:text-3xl underline'>Enter your <span className='font-bold text-green-500 underline'>blog</span> details here</h1>
          <h1 className='lg:text-lg'>Enter your title:</h1>
          <input
            type="text"
            placeholder="Enter your title here"
            className="input lg:input-md w-full "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <h1 className='lg:text-lg'>Enter your description:</h1>
          <div>
            <textarea
              className="textarea lg:textarea-md w-full h-82"
              placeholder="Description" value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className='btn btn-sm lg:btn-md mt-4 btn-primary p-4 text-gray-300 hover:text-white' onClick={() => document.getElementById('my_modal_2').showModal()}>{!loader ? 'Generate using AI ' : <span className="loading loading-ring loading-lg px-4" />} </div>
          </div>
          <h1 className="lg:text-lg">Choose your image:</h1>
          <fieldset className="fieldset">
            <input
              type="file"
              className="file-input"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <label className="fieldset-label">Max size 2MB</label>
          </fieldset>
          <button className='btn btn-md lg:btn-lg bg-black text-gray-300 text-sm lg:text-lg hover:text-white rounded-lg' type='submit'>{submitLoader ? <span className="loading loading-spinner loading-md" /> : `Submit`}</button>
        </form>
      </div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box flex flex-col">
          <h1 className='text-center text-primary font-bold text-lg underline'>Generate using AI</h1>
          <h3 className="mt-4">Enter topic to generate your description :-</h3>
          <input
            type="text"
            placeholder="Enter your topic"
            className="input mt-6 w-full"
            value={aiText}
            onChange={(e) => setAiText(e.target.value)}
          />
          <form method="dialog" className="modal-action">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <button className="btn btn-md btn-primary" type='submit' onClick={generateDescripton}>Generate</button>
          </form>
        </div>

      </dialog>
    </>
  )
}

export default PostBlog
