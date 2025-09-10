import React, { useState } from 'react';
import "./FilterContainer.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchCities } from '../../hooks/cities';
import { fetchZones } from '../../hooks/zones';

function FilterContainer({ type }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
const allParams = React.useMemo(
  () => Object.fromEntries(searchParams.entries()),
  [searchParams])

  console.log(allParams);
  const { list: countriesList } = useSelector((state) => state.countries);
  const { list: citiesList } = useSelector((state) => state.cities);
  const { list: zonesList } = useSelector((state) => state.zones);
  const { list: subcategoriesList } = useSelector((state) => state.subcategories);

  // State for selected filters
  const [selectedCountryId, setSelectedCountryId] = useState(Number(allParams?.country));
  const [selectedCityId, setSelectedCityId] = useState(Number(allParams?.city));
  const [selectedZoneId, setSelectedZoneId] = useState(Number(allParams?.zone));
  const [selectedType, setSelectedType] = useState(allParams?.type);
  const [selectedPayment, setSelectedPayment] = useState(Number(allParams?.payment));
  const [selectedSubcategory, setSelectedSubcategory] = useState(Number(allParams?.subcategory));
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [areaFrom, setAreaFrom] = useState('');
  const [areaTo, setAreaTo] = useState('');

  const countries = countriesList.map(({ id, title }) => ({ id, title }));
  const cities = citiesList.map(({ id, title }) => ({ id, title }));
  const zones = zonesList.map(({ id, title }) => ({ id, title }));
  const subcategories = subcategoriesList.map(({ id, title }) => ({ id, title }));

  // Define filter sections dynamically
  const filterItems = type === "properties"
    ? [
        { title: "", Options: subcategories },
        { title: "نوع العقار", Options: [{ id: "sale", title: "بيع" }, { id: "rent", title: "إيجار" }] },
        { title: "خيارات الدفع", Options: [{ id: 0, title: "نقداً" }, { id: 1, title: "تقسيط" }, { id: 2, title: "نقداً وتقسيط" }] },
        { title: "البلد", Options: countries },
        { title: "المحافظة", Options: cities },
                { title: "المنطقة", Options: zones }

      ]
    : [
        { title: "البلد", Options: countries },
        { title: "المحافظة", Options: cities },
        { title: "المنطقة", Options: zones }
      ];

  const handleCountryChange = (id) => {
    setSelectedCountryId(id);
    setSelectedCityId(null);
    setSelectedZoneId(null);
    dispatch(fetchCities(id));
  };

  const handleCityChange = (id) => {
    setSelectedCityId(id);
    setSelectedZoneId(null);
    dispatch(fetchZones(id));
  };

  const buildQueryParams = () => {
    const params = new URLSearchParams();
    if (selectedCountryId) params.append('country', selectedCountryId);
    if (selectedCityId) params.append('city', selectedCityId);
    if (selectedZoneId) params.append('zone', selectedZoneId);
    if (type === "properties") {
     if (selectedSubcategory) params.append('subcategory', selectedSubcategory);
      if (selectedType) params.append('type', selectedType);
      if (selectedPayment !== null) params.append('payment', selectedPayment);
      if (priceFrom) params.append('price_from', priceFrom);
      if (priceTo) params.append('price_to', priceTo);
      if (areaFrom) params.append('area_from', areaFrom);
      if (areaTo) params.append('area_to', areaTo);
    }
    return params.toString();
  };

  const handleSearch = () => {
    const queryString = buildQueryParams();
    navigate(`/${type === "properties" ? "properties" : "compounds"}/list?${queryString}`);
  };

  const handleReset = () => {
    setSelectedCountryId(null);
    setSelectedCityId(null);
    setSelectedZoneId(null);
    setSelectedType(null);
    setSelectedPayment(null);
    setSelectedSubcategory(null);
    setPriceFrom('');
    setPriceTo('');
    setAreaFrom('');
    setAreaTo('');
    navigate(`/${type === "properties" ? "properties" : "compounds"}/list`);
  };

  return (
    <div className="filter_container left_section_container">
      <p className="title">التصفيات</p>
      <div className="filter_box">
        {filterItems.map((item, index) => (
          <div className="my-3" key={index}>
            {item.title && <p className="title">{item.title}</p>}
            {item.Options.map((option) => {
              const inputId = `${item.title}-${option.id}`;
              return (
                <div className="form-check" key={inputId}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name={item.title || `filter-${index}`}
                    id={inputId}
                    checked={
                      item.title === "نوع العقار"
                        ? selectedType === option.id
                        : item.title === "خيارات الدفع"
                        ? selectedPayment === option.id
                        : item.title === "البلد"
                        ? selectedCountryId === option.id
                        : item.title === "المحافظة"
                        ? selectedCityId === option.id
                        : item.title === "المنطقة"
                        ? selectedZoneId === option.id
                        : selectedSubcategory === option.id
                    }
                    onChange={() => {
                      if (item.title === "نوع العقار") setSelectedType(option.id);
                      else if (item.title === "خيارات الدفع") setSelectedPayment(option.id);
                      else if (item.title === "البلد") handleCountryChange(option.id);
                      else if (item.title === "المحافظة") handleCityChange(option.id);
                      else if (item.title === "المنطقة") setSelectedZoneId(option.id);
else {
  setSelectedSubcategory(option.id);
  setSelectedPayment(null); // إعادة ضبط الدفع لما أختار تصنيف فرعي
}                    }}
                  />
                  <label className="form-check-label" htmlFor={inputId}>
                    {option.title}
                  </label>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* السعر والمساحة (إذا كان type = properties) */}
      {type === "properties" && (
        <>
          {/* <div className="my-3">
            <label className="title">السعر</label>
            <div className="d-flex mt-2 justify-content-between">
              <input
                className="form-control"
                placeholder="من"
                style={{ width: "40%" }}
                value={priceFrom}
                onChange={(e) => setPriceFrom(e.target.value)}
              />
              <input
                className="form-control"
                placeholder="إلى"
                style={{ width: "40%" }}
                value={priceTo}
                onChange={(e) => setPriceTo(e.target.value)}
              />
            </div>
          </div> */}

          {/* <div className="my-3">
            <label className="title">المساحة</label>
            <div className="d-flex mt-2 justify-content-between">
              <input
                className="form-control"
                placeholder="من"
                style={{ width: "40%" }}
                value={areaFrom}
                onChange={(e) => setAreaFrom(e.target.value)}
              />
              <input
                className="form-control"
                placeholder="إلى"
                style={{ width: "40%" }}
                value={areaTo}
                onChange={(e) => setAreaTo(e.target.value)}
              />
            </div>
          </div> */}
        </>
      )}

      <div className="d-flex">
        <div className="rest_btn" onClick={handleReset}>إعادة ضبط</div>
        <div className="search_btn px-4" onClick={handleSearch}>بحث</div>
      </div>
    </div>
  );
}

export default FilterContainer;
