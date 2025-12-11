import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../firebase/firebase.config";
import { axiosInstance } from "../../api/api";
import {
  FaCamera,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaEnvelope,
  FaTag,
  FaUpload,
  FaCheckCircle,
  FaExclamationTriangle,
  FaBox,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

const AddItems = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    postType: "lost",
    thumbnail: "",
    title: "",
    description: "",
    category: "",
    location: "",
    date: new Date(),
    contactName: "",
    contactEmail: "",
  });
  const [categories] = useState([
    "Electronics",
    "Documents",
    "Jewelry",
    "Clothing",
    "Accessories",
    "Bags & Wallets",
    "Keys",
    "Books",
    "Toys",
    "Other",
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      setFormData((prev) => ({
        ...prev,
        contactName: auth.currentUser.displayName || "",
        contactEmail: auth.currentUser.email || "",
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, date }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.thumbnail.trim())
      newErrors.thumbnail = "Image URL is required";
    if (!formData.contactName.trim())
      newErrors.contactName = "Contact name is required";
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = "Contact email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Email is invalid";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const token = await auth.currentUser.getIdToken();
      await axiosInstance.post(
        "/inventory",
        { ...formData, date: formData.date.toISOString() },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("🎉 Item posted successfully!", {
        position: "top-center",
        autoClose: 3000,
      });

      setFormData({
        postType: "lost",
        thumbnail: "",
        title: "",
        description: "",
        category: "",
        location: "",
        date: new Date(),
        contactName: auth.currentUser?.displayName || "",
        contactEmail: auth.currentUser?.email || "",
      });

      setTimeout(() => navigate("/lost-found-items"), 2000);
    } catch (error) {
      toast.error(`❌ Error: ${error.message}`, {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageLoad = () => setImageLoaded(true);

  const handleImageError = (e) => {
    setImageLoaded(false);
    e.target.src =
      "https://via.placeholder.com/400x300?text=Image+Not+Available";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-xl shadow-md">
              <FaPlus className="text-white text-2xl" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-700 to-teal-800 bg-clip-text text-transparent">
            Report {formData.postType === "lost" ? "Lost" : "Found"} Item
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base max-w-xl mx-auto">
            Help reunite items with their owners by providing clear details.
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-emerald-100 overflow-hidden">
          <div className="p-5 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Post Type and Category Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Post Type */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    <span className="inline-flex items-center gap-2">
                      <FaTag className="text-emerald-600" />
                      Post Type <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, postType: "lost" }))
                      }
                      className={`p-3 rounded-lg border text-sm transition-all duration-150 ${
                        formData.postType === "lost"
                          ? "border-emerald-500 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 shadow-sm"
                          : "border-gray-200 bg-white text-gray-600 hover:border-emerald-300"
                      }`}
                    >
                      <div className="text-center">
                        <FaExclamationTriangle className="text-base mx-auto mb-1" />
                        <div className="font-semibold">Lost</div>
                        <div className="text-[11px] opacity-75">
                          I lost something
                        </div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, postType: "found" }))
                      }
                      className={`p-3 rounded-lg border text-sm transition-all duration-150 ${
                        formData.postType === "found"
                          ? "border-teal-500 bg-gradient-to-r from-teal-50 to-emerald-50 text-teal-700 shadow-sm"
                          : "border-gray-200 bg-white text-gray-600 hover:border-teal-300"
                      }`}
                    >
                      <div className="text-center">
                        <FaCheckCircle className="text-base mx-auto mb-1" />
                        <div className="font-semibold">Found</div>
                        <div className="text-[11px] opacity-75">
                          I found something
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    <span className="inline-flex items-center gap-2">
                      <FaTag className="text-emerald-600" />
                      Category <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm bg-white/60 focus:ring-2 focus:ring-emerald-200 transition-all duration-150 ${
                      errors.category
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-emerald-500"
                    }`}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                      <FaExclamationTriangle className="text-[10px]" />
                      {errors.category}
                    </p>
                  )}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Item Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-3 py-2.5 border rounded-lg text-sm bg-white/60 focus:ring-2 focus:ring-emerald-200 transition-all duration-150 ${
                    errors.title
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-emerald-500"
                  }`}
                  placeholder="e.g. Black iPhone 13 Pro"
                />
                {errors.title && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <FaExclamationTriangle className="text-[10px]" />
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full px-3 py-2.5 border rounded-lg text-sm bg-white/60 focus:ring-2 focus:ring-emerald-200 transition-all duration-150 ${
                    errors.description
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-emerald-500"
                  }`}
                  placeholder="Key details (color, brand, unique marks, contents, etc.)"
                />
                {errors.description && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <FaExclamationTriangle className="text-[10px]" />
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Location and Date Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    <span className="inline-flex items-center gap-2">
                      <FaMapMarkerAlt className="text-emerald-600" />
                      Location <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm bg白/60 focus:ring-2 focus:ring-emerald-200 transition-all duration-150 ${
                      errors.location
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-emerald-500"
                    }`}
                    placeholder="e.g. Central Park, Main Street"
                  />
                  {errors.location && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                      <FaExclamationTriangle className="text-[10px]" />
                      {errors.location}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    <span className="inline-flex items-center gap-2">
                      <FaCalendarAlt className="text-emerald-600" />
                      Date <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <div className="relative">
                    <DatePicker
                      selected={formData.date}
                      onChange={handleDateChange}
                      className={`w-full px-3 py-2.5 border rounded-lg text-sm bg-white/60 focus:ring-2 focus:ring-emerald-200 transition-all duration-150 ${
                        errors.date
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-emerald-500"
                      }`}
                      maxDate={new Date()}
                      showYearDropdown
                      dropdownMode="select"
                      dateFormat="MMMM d, yyyy"
                    />
                    <FaCalendarAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                  </div>
                </div>
              </div>

              {/* Image URL and Preview */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  <span className="inline-flex items-center gap-2">
                    <FaCamera className="text-emerald-600" />
                    Image URL <span className="text-red-500">*</span>
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="url"
                    name="thumbnail"
                    value={formData.thumbnail}
                    onChange={handleChange}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm bg-white/60 focus:ring-2 focus:ring-emerald-200 transition-all duration-150 ${
                      errors.thumbnail
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-emerald-500"
                    }`}
                    placeholder="https://example.com/image.jpg"
                  />
                  <FaUpload className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400 text-xs" />
                </div>
                {errors.thumbnail && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <FaExclamationTriangle className="text-[10px]" />
                    {errors.thumbnail}
                  </p>
                )}

                {formData.thumbnail && (
                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-1">
                      <FaCamera className="text-emerald-600 text-xs" />
                      <p className="text-xs font-medium text-gray-700">
                        Image preview
                      </p>
                    </div>
                    <div className="relative border border-dashed border-emerald-200 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50">
                      <img
                        src={formData.thumbnail}
                        alt="Preview"
                        className="w-full h-40 sm:h-52 object-contain"
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                      />
                      {!imageLoaded && formData.thumbnail && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="animate-spin rounded-full h-9 w-9 border-t-2 border-b-2 border-emerald-500" />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    <span className="inline-flex items-center gap-2">
                      <FaUser className="text-emerald-600" />
                      Your Name <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      className={`w-full px-3 py-2.5 border rounded-lg text-sm bg-white/60 focus:ring-2 focus:ring-emerald-200 transition-all duration-150 ${
                        errors.contactName
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-emerald-500"
                      }`}
                    />
                    <FaUser className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400 text-xs" />
                  </div>
                  {errors.contactName && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                      <FaExclamationTriangle className="text-[10px]" />
                      {errors.contactName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    <span className="inline-flex items-center gap-2">
                      <FaEnvelope className="text-emerald-600" />
                      Your Email <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      className={`w-full px-3 py-2.5 border rounded-lg text-sm bg-white/60 focus:ring-2 focus:ring-emerald-200 transition-all duration-150 ${
                        errors.contactEmail
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-emerald-500"
                      }`}
                    />
                    <FaEnvelope className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400 text-xs" />
                  </div>
                  {errors.contactEmail && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                      <FaExclamationTriangle className="text-[10px]" />
                      {errors.contactEmail}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-emerald-100">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="group flex items-center justify-center gap-2 px-5 py-2.5 border border-emerald-300 rounded-lg text-xs sm:text-sm font-semibold text-emerald-700 bg-white hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-150"
                >
                  <FaTimes className="text-sm group-hover:rotate-90 transition-transform duration-150" />
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex items-center justify-center gap-2 px-7 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg text-xs sm:text-sm font-semibold hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 hover:scale-[1.02] shadow-md hover:shadow-lg"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white" />
                      Submitting...
                    </span>
                  ) : (
                    <>
                      <FaPlus className="text-sm group-hover:rotate-180 transition-transform duration-150" />
                      Post {formData.postType === "lost" ? "Lost" : "Found"}{" "}
                      Item
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-full border border-emerald-200">
            <FaBox className="text-emerald-600 text-sm" />
            <span className="text-xs sm:text-sm text-emerald-700 font-medium">
              Fields marked with <span className="text-red-500">*</span> are
              required.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItems;
