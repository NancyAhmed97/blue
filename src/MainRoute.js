// import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Support from "./pages/Support";
import Contactus from "./pages/Contactus";
import Knowlage from "./pages/Knowlage";
import GovernmentOfCity from "./pages/GovernmentOfCity";
import EditProfile from "./pages/EditProfile";
import Favorites from "./pages/Favorites";
import Notifications from "./pages/Notifications";
import MyListings from "./pages/MyListings";
import ChangePassword from "./pages/ChangePassword";
import Compounds from "./pages/Compounds";
import Code from "./pages/Code";
import Property from "./pages/Property";
import List from "./pages/List";
import EditeProfile from "./pages/EditeProfile";
import Aboutus from "./pages/Aboutus";
import Terms from "./pages/Terms";
import ForgetPassword from "./pages/ForgetPassword";
import MySubscribtion from "./pages/MySubscribtion";
import Subscribtions from "./pages/Subscribtions";
import AddProperty from "./pages/AddProperty";
import Mycontact from "./pages/Mycontact";
import ResetPassword from "./pages/ResetPassword";
// import Error from "./pages/Error";

function MainRoute() {
//   const userinfo = useSelector((state) => state.auth?.userArray?.user);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/support" element={<Support />} />
      <Route path="/contactus" element={<Contactus />} />
      <Route path="/knowlage" element={<Knowlage />} />
      <Route path="/my-account" element={<EditProfile />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/Mycontact" element={<Mycontact />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/my_listings" element={<MyListings />} />
      <Route path="/changePassword" element={<ChangePassword />} />
      <Route path={`/neighborhood/:name`} element={<GovernmentOfCity />} />
      <Route path={`/code`} element={<Code />} />
      <Route path={`/code/:identifier`} element={<Code />} />
      <Route path={`/compound/:id`} element={<Compounds />} />
      <Route path={`/property/:id`} element={<Property />} />
      <Route path={`/properties/list`} element={<List />} />
      <Route path={`/compounds/list`} element={<List />} />
      <Route path={`/edit-profile`} element={<EditeProfile />} />
      <Route path={`/aboutus`} element={<Aboutus />} />
      <Route path={`/terms`} element={<Terms />} />
      <Route path={`/forgetPassword`} element={<ForgetPassword />} />
      <Route path={`/UserSubscribtion`} element={<MySubscribtion />} />
      <Route path={`/subscribtions`} element={<Subscribtions />} />
      <Route path={`/add-property`} element={<AddProperty />} />
      <Route path={`/reset-password`} element={<ResetPassword />} />
      {/* <Route path="/notfound" element={<Error/>} /> */}



    </Routes>


  )
}

export default MainRoute
