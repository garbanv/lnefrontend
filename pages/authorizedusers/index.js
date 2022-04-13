import React,{useState,useEffect} from 'react'
import Link from 'next/link';
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import styles from "../../styles/Home.module.css";
import AuthUserListRow from "../../components/AuthUserListRow";
import AddUserModal from "../../components/AddUserModal";
import EditAuthUserModal from "../../components/EditAuthUserModal";


export default function AuthorizedUsersIndex({data}) {
    const { user, error, isLoading } = useUser();
    const [showModal,setShowModal] = useState(false)

    const [showEditAuthUserModal,setShowEditAuthUserModal] = useState(false)
    const [selectedUser,setSelectedUser]=useState({})


  return (
    <>
    <header className="border-b">
        <div className="container mx-auto py-5  grid space-between grid-cols-2">
          <img
            src="http://nuevahope.org/wp-content/uploads/2018/01/la-nueva-2.png"
            alt=""
            width={125}
          />
          <div id="head-user" className="grid place-items-end">
            <h3 className="font-black">
              {user && user["https://lanuevatest.herokuapp.com/name"]}
            </h3>
            <h6 className="">
              {user && user["https://lanuevatest.herokuapp.com/roles"]}
            </h6>
            <Link
              href="/api/auth/logout"
              className={`${styles.btnIndexPage} inline-block  btn-index-page text-black px-5 py-2 rounded-md`}
            >
              Logout
            </Link>
          </div>
        </div>
      </header>
      <main>
          <section>
           <div className="container mx-auto"> 

           <div className="flex my-5">
              <Link href="/dashboard">
              <button className="rounded bg-gray-100 px-5 py-2 flex shadow-xl inline-block mr-1" id="myBtn">
              <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.5 12H6M6 12L12 6M6 12L12 18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              {" "}
       
              </button>
              </Link>
              <Link href="/users">
              <button className="rounded bg-gray-100 px-5 py-2 flex shadow-xl inline-block mr-1" id="myBtn">
               Users 

              {" "}
       
              </button>
              </Link>
              <button className="rounded bg-gray-100 px-5 py-2 flex shadow-xl inline-block" id="myBtn" onClick={()=>setShowModal(!showModal)}>
                <svg
                  className="mr-2"
                  width="24"
                  height="24"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 10H20M23 10H20M20 10V7M20 10V13"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 20V19C1 15.134 4.13401 12 8 12V12C11.866 12 15 15.134 15 19V20"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>{" "}
                Add authorized user
              </button>
            </div>




          <div className="dashboard-client-list">
            <h3 className="font-black text-center my-5">Authorized Users</h3>
              <div className={`${styles.dashboardClientListHeadRow} py-3 px-5`}>
                <div className="head-row font-black">
                  <p className="text-center"> User ID</p>
                </div>
                <div className="head-row font-black">
                  <p className="text-center">Name</p>
                </div>
                <div className="head-row font-black">
                  <p className="text-center">Last login</p>
                </div>
                <div className="head-row font-black">
                  <p className="text-center">Email</p>
                </div>
                <div className="head-row font-black">
                  <p className="text-center">Activated in</p>
                </div>
                
                <div className="head-row font-black">
                  <p className="text-center">Edit</p>
                </div>
                <div className="head-row font-black">
                  <p className="text-center">Delete</p>
                </div>
              </div>
            </div>
            <div className="dashboard-client-list mt-5">
     
                {data?data.map((authuser,index)=>{
                   return <AuthUserListRow 
                   authorizeduser={authuser} 
                   index={index} 
                   key={index}
                   setShowEditAuthUserModal={setShowEditAuthUserModal} 
                   showEditAuthUserModal={showEditAuthUserModal}
                   setSelectedUser={setSelectedUser}
                   />
                }):"No hay data"}
              
            </div>
          </div>
          </section>
      </main>
      {showModal &&<AddUserModal setShowModal={setShowModal} showModal={showModal}/>}
      {showEditAuthUserModal &&<EditAuthUserModal setShowEditAuthUserModal={setShowEditAuthUserModal}  showEditAuthUserModal={showEditAuthUserModal} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>}
    </>
  )
}


// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`http://lanuevatest.herokuapp.com/authorizedusers`)
    const data = await res.json()
    // Pass data to the page via props
    return { props: { data } }
  }