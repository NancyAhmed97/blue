import React, { useEffect } from 'react'
import "./SideBarContainer.css"
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ApiUrl } from '../../Constant/apiUrl';
import { setuserInfo } from '../../hooks/auth';
function SideBarContainer() {
      const userinfo = useSelector((state) => state.auth);
  const location = useLocation();
  const path = location.pathname; // e.g., "/my-account"
const dispatch=useDispatch()
  const lastSegment = path.split('/').filter(Boolean).pop(); // => "my-account"
    useEffect(() => {
    const getData=async()=>{
          try {
    const res = await axios.post(`${ApiUrl}/client/auth/me`,{}, {
      headers: {
        Authorization: `Bearer ${userinfo?.token}`,
      },
    });
    console.log(res.data.data);
          dispatch(
            setuserInfo({
              access_token: userinfo?.token,
              user: res.data.data
            })
          );


  } catch (error) {
    console.log(error);
  }
    }
    getData()
    }, [])
  return (
    <div className='sidebar_container left_section_container'>
        <div  className='d-flex justify-content-center align-items-center flex-column mb-4'>
          {userinfo?.userInfo?.image!==null?
                  <div className='image_container'>

        <img src={userinfo?.userInfo?.image}alt=''className="profile-preview w-100 h-100 rounded-circle" />
        </div>
        :
        <div className='image_container'>
<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
</svg>
          </div>
        }
        <div className='d-flex'>
          <p className='px-1'>{userinfo?.userInfo?.name}</p>
          {userinfo?.userInfo?.is_verified==1&&
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="green" class="bi bi-patch-check-fill" viewBox="0 0 16 16">
  <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
</svg>
          
          }
          </div>
            <p className='mb-0 email'>{userinfo?.userInfo?.email}</p>
            <p className='mb-0 phone'>{userinfo?.userInfo?.phone}</p>

        </div>
        <ul>
          <li>
            <Link  to="/my-account"className={lastSegment=="my-account"?'active w-100 py-2 px-3 ':"w-100 py-2 px-3"}>تعديل البيانات</Link>
          </li>
                   <li>
                   <Link  className={lastSegment=="changePassword"?'active w-100 py-2 px-3':"w-100 py-2 px-3"} to="/changePassword">
                   كلمة المرور
                   </Link>
          </li>
              <li>
              <Link  className={lastSegment=="favorites"?'active w-100 py-2 px-3':"w-100 py-2 px-3"} to="/favorites">مفضلتي</Link>
          </li>
              <li>
              <Link  className={lastSegment=="UserSubscribtion"?'active w-100 py-2 px-3':"w-100 py-2 px-3"} to="/UserSubscribtion">خطة الاشتراك</Link>
          </li>
              <li>
              <Link  className={lastSegment=="Mycontact"?'active w-100 py-2 px-3':"w-100 py-2 px-3"} to="/Mycontact">عقارات التي تم التواصل معاها</Link>
          </li>
  
              {/* <li>
                   <Link  className={lastSegment=="notifications"?'active w-100 py-2 px-3':"w-100 py-2 px-3"} to="/notifications">اشعاراتي</Link>
          </li>
              <li>
                   <Link  className={lastSegment=="my_listings"?'active w-100 py-2 px-3':"w-100 py-2 px-3"} to="/my_listings">عقاراتي</Link>
          </li> */}
                 <li>
                   <Link  className={lastSegment=="my_listings"?'active w-100 py-2 px-3':"w-100 py-2 px-3"} to="/my_listings">عقاراتي</Link>
          </li>
  
        </ul>
    </div>
  )
}

export default SideBarContainer