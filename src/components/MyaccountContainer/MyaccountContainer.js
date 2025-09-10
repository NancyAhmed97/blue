import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MyaccountContainer.css";
import { setuserInfo } from "../../hooks/auth";
import { toast } from "react-toastify";

function MyaccountContainer() {
  const userinfo = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null); // For hidden file input
  const [loading, setLoading] = useState(false)
  const nationalIdFileRef = useRef(null);

  const handleNationalIdClick = () => {
    nationalIdFileRef.current.click();
  };
  const [formData, setFormData] = useState({
    name: userinfo?.userInfo?.name || "",
    email: userinfo?.userInfo?.email || "",
    phone: userinfo?.userInfo?.phone || "",
    national_id: userinfo?.userInfo?.national_id || "",
    password: "",
    image: null,
    national_id_image: null
  });
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  // تغيير صورة البطاقة
  const handleNationalIdImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      national_id_image: e.target.files[0]
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("national_id", formData.national_id);
    if (formData.password) {
      data.append("password", formData.password);
    }
    if (formData.image) {
      data.append("image", formData.image);
    }
    if (formData.national_id_image) {
      data.append("national_id_image", formData.national_id_image);
    }
    // اطبع كل القيم للتأكد
    for (let [key, value] of data.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      setLoading(true)

      const res = await axios.post(
        "https://nanosoft.technology/blue-nile/api/client/update-profile",
        data,
        {
          headers: {
            Authorization: `Bearer ${userinfo?.token}`,
            "Content-Type": "multipart/form-data",
          }
        }
      );

      dispatch(
        setuserInfo({
          access_token: userinfo?.token,
          user: res.data.data
        })
      );

      toast.success("تم التغيير بنجاح", {
        position: "bottom-right",
        autoClose: 3000
      });
      setLoading(false)

    } catch (error) {
      console.error(error);
      setLoading(false)

      toast.error(Object.values(error.response.data.errors)[0][0], {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="edit-profile-container section_container">
      <h2 className="section_title mb-4">تعديل الملف الشخصي</h2>

      {/* Show current profile image */}
      <div className="profile-image-container d-flex justify-content-center" onClick={handleImageClick} style={{ cursor: "pointer" }}>
        {formData.image ? (
          <div className="image_container">

            <img src={URL.createObjectURL(formData.image)} alt="preview" className="profile-preview w-100 h-100 rounded-circle" />
          </div>
        ) : userinfo?.userInfo?.image ? (
          <div className="image_container">

            <img src={userinfo.userInfo.image} alt="profile" className="profile-preview w-100 h-100 rounded-circle" />
          </div>
        ) : (
          <div className="image_container">
            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
            </svg>
          </div>
        )}
      </div>

      {/* ✅ Hidden file input */}
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleProfileImageChange}
      />

      <form onSubmit={handleSubmit} className="edit-profile-form">
        <div className="form-group">
          <label>الاسم</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>البريد الإلكتروني</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>رقم الهاتف</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>رقم البطاقة</label>
          <input
            type="text"
            name="national_id"
            value={formData.national_id}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password with show/hide toggle */}
        <div className="form-group password-group">
          <label>كلمة المرور </label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="كلمة المرور"
            />
            <button
              className="show-password-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ?
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                </svg>
                : <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                  <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                  <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                </svg>
              }
            </button>
          </div>
        </div>
        <label>صورة البطاقة (لتوثيق حسابك)</label>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={nationalIdFileRef}
          onChange={handleNationalIdImageChange}
        />
        <div className="profile-image-container d-flex justify-content-center" onClick={handleNationalIdClick} style={{ cursor: "pointer" }}>
          {formData.national_id_image ? (
            <div className="image_container_id">

              <img src={URL.createObjectURL(formData.national_id_image)} alt="preview" className="profile-preview w-100 h-100 rounded-circle image_container_id_container" />
            </div>
          ) : userinfo?.userInfo?.national_id_image ? (
            <div className="image_container_id">

              <img src={userinfo.userInfo.national_id_image} alt="profile" className="profile-preview w-100 h-100 rounded-circle image_container_id_container" />
            </div>
          ) : (
            <div className="image_container_id">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-camera-fill" viewBox="0 0 16 16">
                <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0" />
              </svg>
            </div>
          )}
        </div>
        <button type='submit' className={loading ? 'disable_change_btn' : 'save-btn '} disabled={loading}>
          حفظ التعديلات
        </button>
      </form>
    </div>
  );
}

export default MyaccountContainer;
