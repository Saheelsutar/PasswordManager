import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {

  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])
  
  const getPassword=async() => {
  let req=await fetch("https://backend-optw.onrender.com/")
  let passwords=await req.json()
  setpasswordArray((passwords))
  }
  
  useEffect(() => {
    getPassword()
   
  }, [])


  const showPassword = () => {
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png"
      passwordRef.current.type = 'password';

    } else {
      ref.current.src = "icons/eyecross.png"
      passwordRef.current.type = 'text';
    }

  }
  const savePassword = async() => {
    if(form.site.length>3 && form.username.length>3 && form.password.length>3){

      //this if loop is for edit function
      if(form.type ==='click'){
         await fetch("http://localhost:3000/",{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id: form.id}),
      });
      }

      
     
      setpasswordArray([...passwordArray, {...form,id:uuidv4()}])
      await fetch("https://backend-optw.onrender.com",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...form,id:uuidv4()}),
      });

      setform({ site: "", username: "", password: "" })
      toast('Password saved!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }else{
      toast('Error: ⚠️Password not saved', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    

  }
  const deletePassword =  async(id) => {
    let c=confirm("Do you really want to delete this password?")
    if(c){
      setpasswordArray(passwordArray.filter(item=>item.id!==id))
      await fetch("http://localhost:3000/",{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id}),
      });
      // localStorage.setItem("password", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
      toast('Password deleted!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

  }
  const editPassword = (type,id) => {
   setform({...passwordArray.filter(item=>item.id===id)[0],id: id,type: type})//populate the data on the respective input
   setpasswordArray((passwordArray.filter(item=>item.id!==id)))

  }
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }
  const copyText = (text) => {
    toast('Copied to Clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text)
  }


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute top-0 z-[-2] h-screen w-full bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,255,100,0.1)_0,rgba(0,255,100,0.05)_50%,rgba(0,255,100,0)_100%)]"></div>

      <div className="md:mycontainer max-w-4xl min-h-[82.5vh]">
        <div className='text-center font-extrabold text-2xl'>
          <span className='text-green-500 '>&lt;</span>
          Pass
          <span className='text-green-500 '>OP/&gt;</span>
        </div>
        <p className='font-bold text-center text-green-500'>Your Own Password Manager</p>
        <div className='text-white flex items-center flex-col p-4 gap-8'>
          <input placeholder='Enter website url' className='w-full rounded-full border border-green-500 text-black p-4 py-1' type="text" value={form.site} name='site' id='site' onChange={handleChange} />
          <div className="flex md:flex-row flex-col w-full gap-3">
            <input placeholder='Enter username' className='w-full rounded-full border border-green-500 text-black p-4 py-1' type="text" value={form.username} name='username' id='username' onChange={handleChange} />
            <div className="relative">
              <input ref={passwordRef} placeholder='Enter password' className='rounded-full border w-full border-green-500 text-black p-4 py-1' type="password" value={form.password} id='password' name='password' onChange={handleChange} />
              <span onClick={showPassword} className="text-black absolute top-2 right-2 cursor-pointer"><img ref={ref} src="icons/eye.png" width={20} alt="" srcSet="" /></span>
            </div>
          </div>
          <button onClick={savePassword} className='flex text-black font-semibold justify-center items-center gap-2 bg-green-400 rounded-2xl w-fit px-2 hover:bg-green-300 border border-green-900'>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover">
            </lord-icon>
            Save</button>
        </div>
        <div className="passwords">
          <h2 className='font-bold py-4 text-2xl'>Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
            <thead className=' bg-green-800 text-white'>
              <tr>
                <th className='py-2'>Site</th>
                <th className='py-2'>Username</th>
                <th className='py-2'>Password</th>
                <th className='py-2'>Actions</th>
              </tr>
            </thead>
            <tbody className='bg-green-100'>
              {passwordArray.map((item, index) => {
                return <tr key={index}>
                  <td className='text-center py-2 border border-white'>
                    <div className='flex justify-center items-center gap-2'>
                      <a href={item.site} target='_blank'>{item.site}</a>
                      <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" >
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='text-center py-2 border border-white'>
                    <div className='flex justify-center items-center gap-2'>
                      <span>{item.username}</span>
                      <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" >
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='text-center py-2 border border-white'>
                    <div className='flex justify-center items-center gap-2'>
                      <span>{"*".repeat(item.password.length)}</span>
                      <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" >
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='text-center py-2 border border-white'>
                    <div className="flex gap-4 p-2 justify-center">
                      <span className='cursor-pointer' onClick={(e)=>{editPassword(e.type,item.id)}}>
                        <lord-icon
                          src="https://cdn.lordicon.com/gwlusjdu.json"
                          trigger="hover"
                          style={{ "width": "25px", "height": "25px" }}>
                        </lord-icon>
                      </span>
                      <span className='cursor-pointer'onClick={()=>{deletePassword(item.id)}}> <lord-icon
                        src="https://cdn.lordicon.com/skkahier.json"
                        trigger="hover"
                        style={{ "width": "25px", "height": "25px" }}
                      >
                      </lord-icon></span>
                    </div>
                  </td>
                </tr>
              })}


            </tbody>
          </table>}
        </div>

      </div>
    </>
  )
}

export default Manager
