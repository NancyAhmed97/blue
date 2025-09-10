import React, { useState } from 'react'
import NavbarContainer from "../NavbarContainer/NavbarContainer"
import "./HeaderHome.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import { fetchZones } from '../../hooks/zones';
import { fetchCities } from '../../hooks/cities';
export default function HeaderHome() {
  const dispatch = useDispatch()
  const [selectedType, setSelectedTab] = useState("sale");
  const { list: subcategoriesList } = useSelector((state) => state.subcategories);
  const { list: countriesList } = useSelector((state) => state.countries);
  const { list: citiesList } = useSelector((state) => state.cities);
  const { list: zonesList } = useSelector((state) => state.zones);
  const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);

  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleCountryChange = (e) => {
    const countryId = e.target.value;
    setSelectedCountry(countryId);
    setSelectedCity(null);
    setSelectedZone(null); 
    if (countryId) dispatch(fetchCities(countryId));
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setSelectedCity(cityId);
    setSelectedZone(null); // Reset zone
    if (cityId) dispatch(fetchZones(cityId));
  };

  const handleZoneChange = (e) => {
    setSelectedZone(e.target.value);
  };
  const buildQueryParams = () => {
    const params = new URLSearchParams();
    if (selectedType) params.append('type', selectedType);
    if (selectedSubcategory) params.append('subcategory', selectedSubcategory);
    if (selectedCountry) params.append('country', selectedCountry);
    if (selectedCity) params.append('city', selectedCity);
    if (selectedZone) params.append('zone', selectedZone);

    return params.toString();
  };
  const handleSearch = (e) => {
    e.preventDefault();
    const queryString = buildQueryParams();
    navigate(`/properties/list?${queryString}`);

  }
  return (
    <>
      <NavbarContainer />
      <div className="header_home_container">

        <div className='d-flex justify-content-center align-items-center'>
          <div className="header_home_content">
            <h1>عقار احلامك .... بخطوات بسيطة</h1>
            <p>ابحث عن منزلك المثالي بسهولة !</p>

            <div className="tabs_container">
              <button
                className={`tab ${selectedType === "sale" ? "active" : ""}`}
                onClick={() => handleTabClick("sale")}
                type="button"
              >
                بيع
              </button>
              <button
                className={`tab ${selectedType === "rent" ? "active" : ""}`}
                onClick={() => handleTabClick("rent")}
                type="button"
              >
                إيجار
              </button>
            </div>



            <form className="search_form">
              {/* <input type="text" placeholder="نوع العقار" /> */}
              <Container fluid>
                <Row>
                  <Col md={6}>
                    <select className="form-select form-select-sm py-2 mt-2" aria-label=".form-select-sm example"
                                          value={selectedSubcategory || ""}
                      onChange={(e) => setSelectedSubcategory(e.target.value)}

                    >
                      <option selected>نوع العقار</option>
                      {subcategoriesList.map((item) => {
                        return (
                          <option value={item?.id}>{item?.title}</option>

                        )
                      })}
                    </select>

                  </Col>
                  <Col md={6}>
                    <select className="form-select form-select-sm py-2 mt-2" aria-label=".form-select-sm example py-4"
                      value={selectedCountry || ""}
                      onChange={handleCountryChange}

                    >
                      <option selected>البلد</option>
                      {countriesList.map((item) => {
                        return (
                          <option value={item?.id}>{item?.title}</option>

                        )
                      })}</select>

                  </Col>
                  <Col md={6}>
                    <select className="form-select form-select-sm py-2 mt-2" aria-label=".form-select-sm example "
                      value={selectedCity || ""}
                      onChange={handleCityChange}
                      disabled={!selectedCountry}

                    >
                      <option selected>المحافظة</option>
                      {citiesList.map((item) => {
                        return (
                          <option value={item?.id}>{item?.title}</option>

                        )
                      })}</select>

                  </Col>
                  <Col md={6}>
                    <select className="form-select form-select-sm py-2 mt-2" aria-label=".form-select-sm example py-4"
                      value={selectedZone || ""}
                      onChange={handleZoneChange}
                      disabled={!selectedCity}

                    >
                      <option selected>المنطقة</option>
                      {zonesList.map((item) => {
                        return (
                          <option value={item?.id}>{item?.title}</option>

                        )
                      })}</select>

                  </Col>

                </Row>
              </Container>
              <button type="submit" onClick={handleSearch}>بحث</button>
            </form>
          </div>
        </div>
      </div>
    </>

  )
}
