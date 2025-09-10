// import React, { useEffect, useRef, useState } from 'react'
// import { Col, Container, Row } from 'react-bootstrap';
// import CustomInput from "../CustomInput/CustomInput";
// import CustomBtn from "../CustomBtn/CustomBtn";
// import { toast } from 'react-toastify';
// import "./AddPropertyContainer.css"
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { fetchCompounds } from '../../hooks/components';
// import { addproperties } from '../../hooks/properties';
// import LocationMarker from '../../LocationMarker';
// import Select from 'react-select'
// import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// import { fetchCities } from '../../hooks/cities';
// import { fetchZonesByCityId } from '../../hooks/Locations';

// function AddPropertyContainer() {
//   const fileInputRef = useRef();

//   const { list } = useSelector((state) => state.compounds);
//   const { list: propertiesList,loading:propertiesLoading } = useSelector((state) => state.properties);
//   const { list: subCategoriesList, loading: subCategoriesLoading } = useSelector((state) => state.subcategories);
//   const [loading, setLoading] = useState('')


//   const customCompounds = list.map(c => ({
//     value: c.id,
//     label: c.title
//   }))
//   const customSubCategories = subCategoriesList.map(c => ({
//     value: c.id,
//     label: c.title
//   }))

//     const { list: countriesList } = useSelector((state) => state.countries);
//     const { list: citiesList } = useSelector((state) => state.cities);
//     const { list: zonesList } = useSelector((state) => state.zones);
//     const zones = useSelector((state) => state.zones);

//   console.log(zones,"citiesLissdjfjsdft");
  

//   const [countriesOptions, setCountriesOptions] = useState(null);
//   const [citiesOptions, setCitiesOptions] = useState(null);
//   const [zoneOptions, setZonesOptions] = useState(null);

//   const [latLng, setLatLng] = useState(null);
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const item = propertiesList && propertiesList.filter((item) => item.id == id)

//   const userinfo = useSelector((state) => state.auth);
//   const [formDataState, setFormDataState] = useState({
//     description: item[0]?.description,
//     sub_category_id: item[0]?.sub_category?.id,
//     compound_id:item[0]?.compound_id,
//     country_id: item[0]?.country_id,
//     city_id: item[0]?.city_id,
//     zone_id:item[0]?.zone_id,
//     address: item[0]?.address,
//     price: item[0]?.price,
//     area: item[0]?.area,
//     floor: item[0]?.floor,
//     age: item[0]?.age,
//     bedrooms: item[0]?.bedrooms,
//     bathrooms: item[0]?.bathrooms,
//     is_installment: item[0]?.is_installment,
//     whatsapp: item[0]?.whatsapp,
//     phone: item[0]?.phone,
//     listing_type: item[0]?.listing_type,
//     lat: latLng?.lat ? latLng?.lat : item[0]?.lat,
//     long: latLng?.lng ? latLng?.lng : item[0]?.long,
//     delivery_date:item[0]?.delivery_date

//   });
//   const [selectedImages, setSelectedImages] = useState(
//     Array.isArray(item) && item[0]?.images ? item[0].images : []
//   );
//   const [newImages, setNewImages] = useState([]);

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);

//     const imagePreviews = files.map((file) => ({
//       file,
//       image: URL.createObjectURL(file),
//     }));

//     setSelectedImages((prev) => [...prev, ...imagePreviews]);
//     setNewImages((prev) => [...prev, ...imagePreviews]);
//   };
//   useEffect(() => {
//     const getData = async () => {

//       const countriesOptions = countriesList.map(c => ({
//         value: c.id,
//         label: c.title
//       }))
//       setCountriesOptions(countriesOptions)
//       const citiesOptions = citiesList.map(c => ({
//         value: c.id,
//         label: c.title
//       }))
//       setCitiesOptions(citiesOptions)
//       const zoneOptions = zonesList.map(c => ({
//         value: c.id,
//         label: c.title
//       }))
//       setZonesOptions(zoneOptions)
//       if (latLng) {
//         setFormDataState((prev) => ({
//           ...prev,
//           lat: latLng?.lat,
//           long: latLng?.lng
//         }));
//       }


//     }
//     getData()
//   }, [countriesList, citiesList, zonesList, latLng,dispatch])
//   useEffect(() => {
//   if (formDataState.country_id) {
//     dispatch(fetchCities(formDataState.country_id))
//   }
// }, [formDataState.country_id, dispatch])

// useEffect(() => {
//   if (formDataState.city_id) {
//     dispatch(fetchZonesByCityId(formDataState.city_id))
//   }
// }, [formDataState.city_id, dispatch])
//   const handleRemoveImage = (indexToRemove) => {
//     setSelectedImages((prevImages) =>
//       prevImages.filter((_, index) => index !== indexToRemove)
//     );
//   };
//   const is_installmentOptions = [
//     { label: "نقداً", value: 0 },
//     { label: "تقسيط", value: 1 },
//     { label: "نقداً أو تقسيط", value: 2 },


//   ]
//   const fields = [
//     // { key: "title", label: "اسم العقار", type: "text" },
//     { key: "area", label: "المساحة (m2)", type: "number" },
//     { key: "price", label: "السعر", type: "number" },
//     { key: "age", label: "عمر العقار", type: "number" },
//     { key: "floor", label: "الدور", type: "number" },
//     { key: "country_id", label: "البلد", type: "select", options: countriesOptions },
//     { key: "city_id", label: "المدينة", type: "select", options: citiesOptions },
//     { key: "zone_id", label: "المنطقة", type: "select", options: zoneOptions },
//     { key: "address", label: "العنوان", type: "text" },

//     { key: "compound_id", label: "أختار الكمبوند المناسب", type: "select", options: customCompounds },

//     { key: "sub_category_id", label: "أختار التصنيف الفرعي", type: "select", options: customSubCategories },
//     { key: "map", label: "حدد العقار علي الخريطة", type: "map" },

//     { key: "bedrooms", label: "عدد الغرف", type: "number" },
//     { key: "bathrooms", label: "عدد الحمامات", type: "number" },
//     { key: "is_installment", label: "طريقة الدفع", type: "select", options: is_installmentOptions },
//     { key: "listing_type", label: "نوع العقار", type: "select", options: [{ value: "rent", label: "إيجار" }, { value: "sale", label: "بيع" }] },
//     { key: "finishing_type", label: "التشطيب", type: "text" },
//     { key: "delivery_date", label: "تاريح الاستلام", type: "date" },
//     { key: "whatsapp", label: "واتساب", type: "text" },
//     { key: "phone", label: "هاتف", type: "text" },
//     { key: "description", label: "الوصف", type: "textarea" },

//   ];
//   const handleImageContainerClick = () => {
//     fileInputRef.current.click();
//   };
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setFormDataState((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newData = { formDataState };

//     if (id) {
//       setLoading(true)
//       try {
//         const response = await axios.post(`https://nanosoft.technology/blue-nile/api/properties/${id}`, {
//           newData
//         }, {
//           headers: {
//             Authorization: `Bearer ${userinfo?.token}`

//           },
//         });
//       setLoading(false)
//         toast.success("تم التعديل بنجاح", {
//           position: "bottom-right",
//           autoClose: 3000,
//         });


//       } catch (err) {
//               setLoading(false)

//         toast.error(err || "حدث خطأ أثناء الإضافة", {
//           position: "bottom-right",
//           autoClose: 3000,
//         });
//       }
//     } else {
//       try {
// const formData = new FormData();

// Object.entries(formDataState).forEach(([key, value]) => {
//   // إذا القيمة Object وتحتوي على value يتم الإرسال فقط لهذا value
//   if (
//     typeof value === 'object' &&
//     value !== null &&
//     'value' in value &&
//     typeof value.value !== 'object'
//   ) {
//     formData.append(key, value.value);
//   } 
//   // إذا كانت القيمة null أو undefined لا ترسل
//   else if (value === null || value === undefined) {
//     return;
//   }
//   // إذا القيمة عبارة عن كائن معقد أو object لا يحتوي value → تجاهل أو قم بالمعالجة الخاصة
//   else if (typeof value === 'object') {
//     // تجاهل أو تعامل حسب الحالة
//     console.warn(`Ignored complex object for key: ${key}`, value);
//   } 
//   // إذا القيمة رقم أو نص → أرسلها كما هي
//   else {
//     formData.append(key, value);
//   }
// });
//         selectedImages.forEach((imgObj, index) => {
//           if (imgObj.file) {
//             formData.append(`images[${index}]`, imgObj.file);
//           }
//         });
//         console.log(selectedImages);
        
//           selectedImages.forEach((img, index) => {
//           formData.append(`images[${index}]`, img.file);
//         });

//         await dispatch(addproperties(formData)).unwrap();
//         toast.success("تمت إضافة العقار بنجاح", {
//           position: "bottom-right",
//           autoClose: 3000,
//         });
//       } catch (err) {
//         toast.error(err || "حدث خطأ أثناء الإضافة", {
//           position: "bottom-right",
//           autoClose: 3000,
//         });
//       }
//     }
//   };

//   return (
//     <div className='add_student_form_container'>
//  <h3 className='fw-bold mb-4'>أعلن عن عقارك</h3>
//       <form className='form_container'>
//         <Container fluid>
//           <Row>
//             {fields.map((field, index) => (
//               field?.key === "map" ?
//                 <Col md={12}>
//                   <>
//                     <MapContainer
//                       center={[30.033333, 31.233334]} // Cairo by default
//                       zoom={13}
//                       style={{ height: '400px', width: '100%' }}
//                     >
//                       <TileLayer
//                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                       />
//                       <LocationMarker setLatLng={setLatLng} />
//                     </MapContainer>

//                     {latLng && (
//                       <div style={{ marginTop: 10, marginBottom: "22px" }}>
//                         <strong>Latitude:</strong> {latLng.lat} <br />
//                         <strong>Longitude:</strong> {latLng.lng}
//                       </div>
//                     )}

//                   </>
//                 </Col>

//                 :
//                 <Col md={6} key={index} className="mb-3">
//                   <label className="form-label">{field.label}</label>

//                   {field.type === "textarea" ? (
//                     <textarea
//                       className="form-control"
//                       name={field.key}
//                       value={formDataState[field.key]}
//                       onChange={handleChange}
//                       placeholder={`ادخل ${field.label}`}
//                     />
//                   ) : field.type === "checkbox" ? (
//                     <div className="form-check">
//                       <input
//                         type="checkbox"
//                         className="form-check-input"
//                         name={field.key}
//                         checked={formDataState[field.key]}
//                         onChange={handleChange}
//                       />
//                       <label className="form-check-label">{field.label}</label>
//                     </div>
//                   ) : field.type === "select" ? (
// <Select
//   value={field.options?.find(option => option.value === formDataState[field.key])}
//   onChange={(selected) => {
//     setFormDataState((prev) => ({
//       ...prev,
//       [field.key]: selected.value,
//       ...(field.key === "country_id" ? { city_id: null, zone_id: null } : {}),
//       ...(field.key === "city_id" ? { zone_id: null } : {}),
//     }));

//     if (field.key === "country_id") {
//       dispatch(fetchCities(selected.value));
//     }

//     if (field.key === "city_id") {
//       dispatch(fetchZonesByCityId(selected.value));
//     }
//   }}
//   options={field.options}
// />


//                     // <select
//                     //   className="form-control"
//                     //   name={field.key}
//                     //   value={formDataState[field.key]}
//                     //   onChange={handleChange}
//                     // >
//                     //   {field.options.map((option, i) => (
//                     //     <option key={i} value={option}>
//                     //       {option === "sale" ? "بيع" : "إيجار"}
//                     //     </option>
//                     //   ))}
//                     // </select>
//                   ) : (
//                     <CustomInput
//                       type={field.type}
//                       name={field.key}
//                       value={formDataState[field.key]}
//                       onChange={handleChange}
//                       placeholder={`ادخل ${field.label}`}
//                     />
//                   )}
//                 </Col>
//             ))}


//             <Col md={12}>
//               <div className="mt-3">
//                 <label>{"صور العقار"}</label>

//                 <div
//                   className="image_container"
//                   onClick={handleImageContainerClick}
//                   style={{ cursor: "pointer" }}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-cloud-arrow-up-fill" viewBox="0 0 16 16">
//                     <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2m2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0z" />
//                   </svg>
//                   <p className="click_container">اضغط للتحميل</p>
//                   <input
//                     type="file"
//                     multiple
//                     accept="image/*"
//                     ref={fileInputRef}
//                     onChange={handleImageUpload}
//                     style={{ display: "none" }}
//                   />
//                 </div>

//                 <div className="d-flex flex-wrap mt-3">
//                   {selectedImages.map((img, index) => {

//                     return (
//                       <div key={index} className="position-relative m-2">
//                         <img
//                           src={id ? img?.image : img.image}
//                           alt={`preview-${index}`}
//                           style={{
//                             width: 100,
//                             height: 100,
//                             objectFit: "cover",
//                             borderRadius: 8,
//                             border: "1px solid #ccc"
//                           }}
//                         />
//                         <button
//                           type="button"
//                           onClick={() => handleRemoveImage(index)}
//                           style={{
//                             position: "absolute",
//                             top: -5,
//                             right: -5,
//                             background: "red",
//                             color: "white",
//                             border: "none",
//                             borderRadius: "50%",
//                             width: 20,
//                             height: 20,
//                             fontSize: 12,
//                             cursor: "pointer",
//                           }}
//                         >
//                           ×
//                         </button>
//                       </div>
//                     )
//                   })}
//                 </div>

//               </div>
//             </Col>
//             <Col md={12}>
//               <div className='d-flex justify-content-center mt-4 '>
//                 <div className='w-50 d-flex justify-content-center'>
//                   <CustomBtn text={loading||propertiesLoading ? "جاري التحميل......." : id ? "تعديل" : "أضافة"} disabled={loading||propertiesLoading} clickingFunction={handleSubmit} />

//                 </div>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </form>
//     </div>
//   )
// }

// export default AddPropertyContainer

import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import CustomInput from "../CustomInput/CustomInput";
import CustomBtn from "../CustomBtn/CustomBtn";
import { toast } from 'react-toastify';
import "./AddPropertyContainer.css"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { fetchCompounds } from '../../hooks/components';
import { addproperties } from '../../hooks/properties';
import LocationMarker from '../../LocationMarker';
import Select from 'react-select'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { fetchCitiesByCountryId, fetchZonesByCityId } from '../../hooks/Locations';

function AddPropertyContainer() {
  const fileInputRef = useRef();

  const { list } = useSelector((state) => state.compounds);
  const { list: propertiesList, loading: propertiesLoading } = useSelector((state) => state.properties);

 const { list: subCategoriesList, loading: subCategoriesLoading } = useSelector((state) => state.subcategories);  const [loading, setLoading] = useState('')


  const customCompounds = list.map(c => ({
    value: c.id,
    label: c.title
  }))
  const customSubCategories = subCategoriesList.map(c => ({
    value: c.id,
    label: c.title
  }))

  const {   zones } = useSelector((state) => state.Locations);
  const { list: countriesList } = useSelector((state) => state.countries);
const citiesList = useSelector((state) => state.Locations.cities);
const zonesList = useSelector((state) => state.Locations.zones);



  
  const [countriesOptions, setCountriesOptions] = useState(null);
  const [citiesOptions, setCitiesOptions] = useState(null);
  const [zoneOptions, setZonesOptions] = useState(null);

  const [latLng, setLatLng] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const item = propertiesList && propertiesList.filter((item) => item.id == id)
  const userinfo = useSelector((state) => state.auth);
  const [formDataState, setFormDataState] = useState({
    description: item[0]?.description,
    sub_category_id: item[0]?.sub_category?.id,
    compound_id: item[0]?.compound_id,
    country_id: item[0]?.country_id,
    city_id: item[0]?.city_id,
    zone_id: item[0]?.zone_id,
    address: item[0]?.address,
    price: item[0]?.price,
    area: item[0]?.area,
    floor: item[0]?.floor,
    age: item[0]?.age,
    bedrooms: item[0]?.bedrooms,
    bathrooms: item[0]?.bathrooms,
    is_installment: item[0]?.is_installment,
    whatsapp: item[0]?.whatsapp,
    phone: item[0]?.phone,
    listing_type: item[0]?.listing_type,
    lat: latLng?.lat ? latLng?.lat : item[0]?.lat,
    long: latLng?.lng ? latLng?.lng : item[0]?.long,
    delivery_date: item[0]?.delivery_date,

  });
  const [selectedImages, setSelectedImages] = useState(
    Array.isArray(item) && item[0]?.images ? item[0].images : []
  );
  const [newImages, setNewImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const imagePreviews = files.map((file) => ({
      file,
      image: URL.createObjectURL(file),
    }));

    setSelectedImages((prev) => [...prev, ...imagePreviews]);
    setNewImages((prev) => [...prev, ...imagePreviews]);
  };
  useEffect(() => {
  const countriesOptions = countriesList.map(c => ({
    value: c.id,
    label: c.title
  }));
  setCountriesOptions(countriesOptions);

  const citiesOptions = citiesList.map(c => ({
    value: c.id,
    label: c.title
  }));
  setCitiesOptions(citiesOptions);

  const zoneOptions = zones.map(c => ({
    value: c.id,
    label: c.title
  }));
  setZonesOptions(zoneOptions);

  if (latLng) {
    setFormDataState((prev) => ({
      ...prev,
      lat: latLng?.lat,
      long: latLng?.lng
    }));
  }
  setCountriesOptions(countriesList.map(c => ({ value: c.id, label: c.title })));
  setCitiesOptions(citiesList.map(c => ({ value: c.id, label: c.title })));
  setZonesOptions(
    zones && zones.length > 0
      ? zones.map(z => ({ value: z.id, label: z.title }))
      : []
  );
}, [countriesList, citiesList, zones, latLng,formDataState?.country_id]);

  // useEffect(() => {
  //   const getData = async () => {

  //     const countriesOptions = countries.map(c => ({
  //       value: c.id,
  //       label: c.title
  //     }))
  //     setCountriesOptions(countriesOptions)
  //     const citiesOptions = cities.map(c => ({
  //       value: c.id,
  //       label: c.title
  //     }))
  //     setCitiesOptions(citiesOptions)
  //     const zoneOptions = zones.map(c => ({
  //       value: c.id,
  //       label: c.title
  //     }))
  //     setZonesOptions(zoneOptions)
  //     if (latLng) {
  //       setFormDataState((prev) => ({
  //         ...prev,
  //         lat: latLng?.lat,
  //         long: latLng?.lng
  //       }));
  //     }


  //   }
  //   getData()
  // }, [formDataState?.country, formDataState?.city, latLng,dispatch])
  const handleRemoveImage = (indexToRemove) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };
  const is_installmentOptions = [
    { label: "نقداً", value: 0 },
    { label: "تقسيط", value: 1 },
    { label: "نقداً أو تقسيط", value: 2 },


  ]
  const fields = [
    // { key: "title", label: "اسم العقار", type: "text" },
    { key: "area", label: "المساحة (m2)", type: "number" },
    { key: "price", label: "السعر", type: "number" },
    { key: "age", label: "عمر العقار", type: "number" },
    { key: "floor", label: "الدور", type: "number" },
    { key: "country_id", label: "البلد", type: "select", options: countriesOptions },
    { key: "city_id", label: "المدينة", type: "select", options: citiesOptions },
    { key: "zone_id", label: "المنطقة", type: "select", options: zoneOptions },
    { key: "address", label: "العنوان", type: "text" },

    { key: "compound_id", label: "أختار الكمبوند المناسب", type: "select", options: customCompounds },

    { key: "sub_category_id", label: "أختار التصنيف الفرعي", type: "select", options: customSubCategories },
    { key: "map", label: "حدد العقار علي الخريطة", type: "map" },

    { key: "bedrooms", label: "عدد الغرف", type: "number" },
    { key: "bathrooms", label: "عدد الحمامات", type: "number" },
    { key: "is_installment", label: "طريقة الدفع", type: "select", options: is_installmentOptions },
    { key: "listing_type", label: "نوع العقار", type: "select", options: [{ value: "rent", label: "إيجار" }, { value: "sale", label: "بيع" }] },
    { key: "finishing_type", label: "التشطيب", type: "text" },
    { key: "delivery_date", label: "تاريح الاستلام", type: "date" },
    { key: "whatsapp", label: "واتساب", type: "text" },
    { key: "phone", label: "هاتف", type: "text" },
    { key: "description", label: "الوصف", type: "textarea" },

  ];
  const handleImageContainerClick = () => {
    fileInputRef.current.click();
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormDataState((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  const resizeImage = (file, maxWidth = 800, maxHeight = 800) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        let { width, height } = img;

        // الحفاظ على نسبة العرض للطول
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            resolve(new File([blob], file.name, { type: file.type }));
          },
          file.type,
          0.8 // جودة 80%
        );
      };

      img.onerror = (err) => reject(err);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newData = { formDataState };

    if (id) {
      setLoading(true)
      try {
        const response = await axios.post(`https://nanosoft.technology/blue-nile/api/admin/properties/${id}`, {
          newData
        }, {
          headers: {
            Authorization: `Bearer ${userinfo?.token}`

          },
        });
        setLoading(false)
        toast.success("تم التعديل بنجاح", {
          position: "bottom-right",
          autoClose: 3000,
        });


      } catch (err) {
        setLoading(false)

        toast.error(err || "حدث خطأ أثناء الإضافة", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } else {
      try {
        const formData = new FormData();

        Object.entries(formDataState).forEach(([key, value]) => {
          // إذا القيمة Object وتحتوي على value يتم الإرسال فقط لهذا value
          if (
            typeof value === 'object' &&
            value !== null &&
            'value' in value &&
            typeof value.value !== 'object'
          ) {
            formData.append(key, value.value);
          }
          // إذا كانت القيمة null أو undefined لا ترسل
          else if (value === null || value === undefined) {
            return;
          }
          // إذا القيمة عبارة عن كائن معقد أو object لا يحتوي value → تجاهل أو قم بالمعالجة الخاصة
          else if (typeof value === 'object') {
            // تجاهل أو تعامل حسب الحالة
            console.warn(`Ignored complex object for key: ${key}`, value);
          }
          // إذا القيمة رقم أو نص → أرسلها كما هي
          else {
            formData.append(key, value);
          }
        });
        for (const [index, img] of selectedImages.entries()) {
          if (img.file) {
            const resizedFile = await resizeImage(img.file); // ✅ Resize
            formData.append(`images[${index}]`, resizedFile);
          }
        }


        await dispatch(addproperties(formData)).unwrap();
        toast.success("تمت إضافة العقار بنجاح", {
          position: "bottom-right",
          autoClose: 3000,
        });
      } catch (err) {
        toast.error(err || "حدث خطأ أثناء الإضافة", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    }
  };
  useEffect(() => {
  if (formDataState?.country_id) {
    dispatch(fetchCitiesByCountryId(formDataState.country_id));
  }
}, [formDataState?.country_id, dispatch]);


  return (
    <div className='add_student_form_container'>

      <form className='form_container'>
        <Container fluid>
          <Row>
            {fields.map((field, index) => (
              field?.key === "map" ?
                <Col md={12}key={index}>
                  <>
                    <MapContainer
                      center={[30.033333, 31.233334]} // Cairo by default
                      zoom={13}
                      style={{ height: '400px', width: '100%' }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <LocationMarker setLatLng={setLatLng} />
                    </MapContainer>

                    {latLng && (
                      <div style={{ marginTop: 10, marginBottom: "22px" }}>
                        <strong>Latitude:</strong> {latLng.lat} <br />
                        <strong>Longitude:</strong> {latLng.lng}
                      </div>
                    )}

                  </>
                </Col>

                :
                <Col md={6} key={index} className="mb-3">
                  <label className="form-label">{field.label}</label>

                  {field.type === "textarea" ? (
                    <textarea
                      className="form-control"
                      name={field.key}
                      value={formDataState[field.key]}
                      onChange={handleChange}
                      placeholder={`ادخل ${field.label}`}
                    />
                  ) : field.type === "checkbox" ? (
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name={field.key}
                        checked={formDataState[field.key]}
                        onChange={handleChange}
                      />
                      <label className="form-check-label">{field.label}</label>
                    </div>
                  ) : field.type === "select" ? (
                    <Select
                      className="react-select-container"

                      classNamePrefix="react-select"
                      value={field.options?.find(option => option.value === formDataState[field.key])} // ✅ find selected object
                      // onChange={(selected) => {
                      //   setFormDataState((prev) => ({
                      //     ...prev,
                      //     [field.key]: selected.value, // ✅ store only the value (not whole object)
                      //   }));

                      //   if(field?.key=="country_id"){
                      //     dispatch(fetchCitiesByCountryId( selected.value));
                      //   }
                      // }}
onChange={(selected) => {
  setFormDataState((prev) => ({
    ...prev,
    [field.key]: selected.value,
    ...(field.key === "city_id" ? { zone_id: null } : {}), // reset zone_id لما المدينة تتغير
  }));

  if (field?.key === "country_id") {
    dispatch(fetchCitiesByCountryId(selected.value));
  }
  if (field?.key === "city_id") {
    dispatch(fetchZonesByCityId(selected.value))
      .unwrap()
      .then((zonesData) => {
        if (!zonesData || zonesData.length === 0) {
          setZonesOptions([]); // تفريغ الخيارات
          setFormDataState((prev) => ({ ...prev, zone_id: null })); // reset zone_id
        }
      });
  }
}}


                      options={field?.options}
                      placeholder={field.label}
                    />
                    // <select
                    //   className="form-control"
                    //   name={field.key}
                    //   value={formDataState[field.key]}
                    //   onChange={handleChange}
                    // >
                    //   {field.options.map((option, i) => (
                    //     <option key={i} value={option}>
                    //       {option === "sale" ? "بيع" : "إيجار"}
                    //     </option>
                    //   ))}
                    // </select>
                  ) : (
                    <CustomInput
                      type={field.type}
                      name={field.key}
                      value={formDataState[field.key]}
                      onChange={handleChange}
                      placeholder={`ادخل ${field.label}`}
                    />
                  )}
                </Col>
            ))}


            <Col md={12}>
              <div className="mt-3">
                <label>{"صور العقار"}</label>

                <div
                  className="image_container"
                  onClick={handleImageContainerClick}
                  style={{ cursor: "pointer" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-cloud-arrow-up-fill" viewBox="0 0 16 16">
                    <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2m2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0z" />
                  </svg>
                  <p className="click_container">اضغط للتحميل</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                </div>

                <div className="d-flex flex-wrap mt-3">
                  {selectedImages.map((img, index) => {

                    return (
                      <div key={index} className="position-relative m-2">
                        <img
                          src={id ? img?.image : img.image}
                          alt={`preview-${index}`}
                          style={{
                            width: 100,
                            height: 100,
                            objectFit: "cover",
                            borderRadius: 8,
                            border: "1px solid #ccc"
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          style={{
                            position: "absolute",
                            top: -5,
                            right: -5,
                            background: "red",
                            color: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: 20,
                            height: 20,
                            fontSize: 12,
                            cursor: "pointer",
                          }}
                        >
                          ×
                        </button>
                      </div>
                    )
                  })}
                </div>

              </div>
            </Col>
            <Col md={12}>
              <div className='d-flex justify-content-center mt-4 '>
                <div className='w-50 d-flex justify-content-center'>
                  <CustomBtn text={loading || propertiesLoading ? "جاري التحميل......." : id ? "تعديل" : "أضافة"} disabled={loading || propertiesLoading} clickingFunction={handleSubmit} />

                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </form>
    </div>
  )
}

export default AddPropertyContainer