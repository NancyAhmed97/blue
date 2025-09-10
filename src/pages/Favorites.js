import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import NavbarContainer from '../components/NavbarContainer/NavbarContainer'
import Footer from '../components/Footer/Footer'
import SideBarContainer from '../components/SideBarContainer/SideBarContainer'
import MyFavoritsContainer from '../components/MyFavoritsContainer/MyFavoritsContainer'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { ApiUrl } from '../Constant/apiUrl'
import Loading from './Loading'

function Favorites() {
      const userinfo = useSelector((state) => state.auth);
  const [favouritData, setFavouritData] = useState([])
const [loading, setLoading] = useState(false)
const [refresh, setRefresh] = useState(false);

useEffect(() => {
  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${ApiUrl}/favourites`, {
        headers: {
          Authorization: `Bearer ${userinfo?.token}`,
        },
      });
      setFavouritData(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  getData();
}, [userinfo.token, refresh]);

// Call this when you add/remove favorite:
const handleRefresh = () => setRefresh(prev => !prev);

  if(loading){
return(
<Loading/>
)
  }else{
  return (
    <div>
        <NavbarContainer/>
        <Container>
            <Row>
                <Col md={3}>
                 <SideBarContainer/>
                </Col>
                <Col md={9}>
                <MyFavoritsContainer favouritData={favouritData}handleRefresh={handleRefresh}/>
                </Col>
            </Row>
        </Container>
        {/* <Container>
            <Row>
                <SideBarContainer/>
            </Row>
        </Container> */}
        <Footer/>
    </div>
  )
}
}

export default Favorites