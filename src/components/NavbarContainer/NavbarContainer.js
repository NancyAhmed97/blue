import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "../../assets/images/Logo-removebg-preview.png"
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import "./NavbarContainer.css"
import { useDispatch, useSelector } from 'react-redux';
import { setuserInfo } from '../../hooks/auth';
function NavbarContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const userinfo = useSelector((state) => state.auth);
  const location = useLocation();
  console.log(userinfo?.userInfo?.name); // "/properties/list"
  return (

    <Navbar expand="lg" className="bg-body-tertiary navbar_container">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt='' className='w-50' />

        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Link to="/aboutus" className={location.pathname === "/aboutus" && "active"}>عن بلو نيل</Link>

            <Link to="/properties/list" className={location.pathname === "/properties/list" && "active"}>عقارات</Link>
            <Link to="/compounds/list" className={location.pathname === "/compounds/list" && "active"}>كمبوندات</Link>
            <Link to="/contactus" className={location.pathname === "/contactus" && "active"}>تواصل معنا</Link>
            <Link to="/support" className={location.pathname === "/support" && "active"}>مساعدة</Link>


          </Nav>
          <Nav className="me-auto">
            <NavDropdown 
            className='w-50'
            title={
              <div className='d-flex'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                </svg>
                <p className='mb-0 ms-3'>{userinfo?.userInfo?.name}</p>

              </div>
            }
              id="basic-nav-dropdown">
              {!userinfo?.token ?
                <NavDropdown.Item href='/login' className='mx-0'>

                  <div className='login_container mx-0'>
                    تسجيل الدخول
                  </div>
                </NavDropdown.Item>
                :
                <>
                  <NavDropdown.Item href="/my-account" className='text-end mx-0'>
                    تعديل البيانات
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/changePassword" className='text-end mx-0'>
                    كلمة المرور

                  </NavDropdown.Item>
                  <NavDropdown.Item href="/favorites" className='text-end mx-0'>
                    مفضلتي
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item className='text-end mx-0'
                    onClick={() => {
                      dispatch(setuserInfo({
                        access_token: "",
                        user: {},
                      }));
                      navigate('/');

                    }}>
                    تسجيل الخروج
                  </NavDropdown.Item>

                </>
              }

            </NavDropdown>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

  {/* <Navbar.Brand href="/">
          <img src={logo} alt='' className='w-50' />
        </Navbar.Brand>
        <ul className='d-flex p-0'>
          <NavDropdown
            title={
              <li className='nav_item'>ابحث</li>

            }

            id="basic-nav-dropdown1"
          >
            <NavDropdown.Item href="/properties/list" className='text-end d-flex'>


              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-building" viewBox="0 0 16 16">
                <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
                <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z" />
              </svg>
              <p className='mb-0 mx-2'>
                عقارات
              </p>
            </NavDropdown.Item>
            <NavDropdown.Divider />

            <NavDropdown.Item href="/compounds/list" className='text-end d-flex'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-buildings" viewBox="0 0 16 16">
                <path d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022M6 8.694 1 10.36V15h5zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5z" />
                <path d="M2 11h1v1H2zm2 0h1v1H4zm-2 2h1v1H2zm2 0h1v1H4zm4-4h1v1H8zm2 0h1v1h-1zm-2 2h1v1H8zm2 0h1v1h-1zm2-2h1v1h-1zm0 2h1v1h-1zM8 7h1v1H8zm2 0h1v1h-1zm2 0h1v1h-1zM8 5h1v1H8zm2 0h1v1h-1zm2 0h1v1h-1zm0-2h1v1h-1z" />
              </svg>
              <p className='mb-0 mx-2'>

                كمبوندات
              </p>
            </NavDropdown.Item>

          </NavDropdown>
        </ul>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <div className='nav_item me-3 d-flex'>
              <Link className='d-flex' to={"/contactus"}>
                <div className='d-flex align-items-center'>
                  <p className='mb-0'>تواصل معنا</p>
                </div>
              </Link>
            </div>
            <div className='nav_item me-3 d-flex'>

              <Link className='d-flex' to={"/support"}>
                <div className='d-flex align-items-center'>
                  <p className='mb-0'>مساعدة ؟ </p>
                </div>
              </Link>
            </div>
            <NavDropdown title={
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>
            } id="basic-nav-dropdown">
              {!userinfo?.token ?
                <NavDropdown.Item href='/login'>

                  <div className='login_container'>
                    تسجيل الدخول
                  </div>
                </NavDropdown.Item>
                :
                <>
                  <NavDropdown.Item href="/my-account" className='text-end'>
                    تعديل البيانات
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/favorites" className='text-end'>
                    مفضلتي
                  </NavDropdown.Item>
                </>
              }
              <NavDropdown.Divider />
              {userinfo?.token &&
                <NavDropdown.Item href="/my-account" className='text-end'
                  onClick={() => {
                    dispatch(setuserInfo({
                      access_token: "",
                      user: {},
                    }));
                    navigate('/');

                  }}>
                  تسجيل الخروج
                </NavDropdown.Item>
              }
            </NavDropdown>
          </Nav>
        </Navbar.Collapse> */}
}

export default NavbarContainer;