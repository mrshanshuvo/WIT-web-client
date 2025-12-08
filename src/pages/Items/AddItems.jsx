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
  FaArrowLeft,
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

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = (e) => {
    setImageLoaded(false);
    e.target.src =
      "https://via.placeholder.com/400x300?text=Image+Not+Available";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="group inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-800 transition-colors duration-200 mb-4"
          >
            <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back</span>
          </button>
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 rounded-2xl shadow-lg">
              <FaPlus className="text-white text-3xl" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-700 to-teal-800 bg-clip-text text-transparent">
            Report {formData.postType === "lost" ? "Lost" : "Found"} Item
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Help reunite items with their owners by providing detailed
            information
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Post Type and Category Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Post Type */}
                <div className="form-group">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                      <FaTag className="text-emerald-600" />
                      Post Type <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, postType: "lost" }))
                      }
                      className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                        formData.postType === "lost"
                          ? "border-emerald-500 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 shadow-md"
                          : "border-gray-200 bg-white text-gray-600 hover:border-emerald-300"
                      }`}
                    >
                      <div className="text-center">
                        <FaExclamationTriangle className="text-lg mx-auto mb-2" />
                        <div className="text-sm font-semibold">Lost Item</div>
                        <div className="text-xs opacity-75">
                          I lost something
                        </div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, postType: "found" }))
                      }
                      className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                        formData.postType === "found"
                          ? "border-teal-500 bg-gradient-to-r from-teal-50 to-emerald-50 text-teal-700 shadow-md"
                          : "border-gray-200 bg-white text-gray-600 hover:border-teal-300"
                      }`}
                    >
                      <div className="text-center">
                        <FaCheckCircle className="text-lg mx-auto mb-2" />
                        <div className="text-sm font-semibold">Found Item</div>
                        <div className="text-xs opacity-75">
                          I found something
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Category */}
                <div className="form-group">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                      <FaTag className="text-emerald-600" />
                      Category <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:border-emerald-300 ${
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
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <FaExclamationTriangle className="text-xs" />
                      {errors.category}
                    </p>
                  )}
                </div>
              </div>

              {/* Title */}
              <div className="form-group">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Item Title <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:border-emerald-300 ${
                    errors.title
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-emerald-500"
                  }`}
                  placeholder="Brief description of the item (e.g., 'Black iPhone 13 Pro')"
                />
                {errors.title && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <FaExclamationTriangle className="text-xs" />
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="form-group">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Description <span className="text-red-500">*</span>
                  </span>
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:border-emerald-300 ${
                    errors.description
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-emerald-500"
                  }`}
                  placeholder="Detailed description of the item (color, brand, distinguishing features, contents, etc.)"
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <FaExclamationTriangle className="text-xs" />
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Location and Date Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Location */}
                <div className="form-group">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-emerald-600" />
                      Location <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:border-emerald-300 ${
                      errors.location
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-emerald-500"
                    }`}
                    placeholder="Where was it lost/found? (e.g., 'Central Park, Main Street')"
                  />
                  {errors.location && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <FaExclamationTriangle className="text-xs" />
                      {errors.location}
                    </p>
                  )}
                </div>

                {/* Date */}
                <div className="form-group">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                      <FaCalendarAlt className="text-emerald-600" />
                      Date <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <div className="relative">
                    <DatePicker
                      selected={formData.date}
                      onChange={handleDateChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:border-emerald-300 ${
                        errors.date
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-emerald-500"
                      }`}
                      maxDate={new Date()}
                      showYearDropdown
                      dropdownMode="select"
                      dateFormat="MMMM d, yyyy"
                    />
                    <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  </div>
                </div>
              </div>

              {/* Image URL and Preview */}
              <div className="form-group">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
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
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:border-emerald-300 ${
                      errors.thumbnail
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-emerald-500"
                    }`}
                    placeholder="https://example.com/image.jpg"
                  />
                  <FaUpload className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-400 text-sm" />
                </div>
                {errors.thumbnail && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <FaExclamationTriangle className="text-xs" />
                    {errors.thumbnail}
                  </p>
                )}

                {/* Image Preview */}
                {formData.thumbnail && (
                  <div className="mt-6">
                    <div className="flex items-center gap-2 mb-2">
                      <FaCamera className="text-emerald-600" />
                      <p className="text-sm font-medium text-gray-700">
                        Image Preview:
                      </p>
                    </div>
                    <div className="relative border-2 border-dashed border-emerald-200 rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50">
                      <img
                        src={formData.thumbnail}
                        alt="Preview"
                        className="w-full h-48 sm:h-64 object-contain"
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                      />
                      {!imageLoaded && formData.thumbnail && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-emerald-500"></div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
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
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:border-emerald-300 ${
                        errors.contactName
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-emerald-500"
                      }`}
                    />
                    <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-400 text-sm" />
                  </div>
                  {errors.contactName && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <FaExclamationTriangle className="text-xs" />
                      {errors.contactName}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
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
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:border-emerald-300 ${
                        errors.contactEmail
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-emerald-500"
                      }`}
                    />
                    <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-400 text-sm" />
                  </div>
                  {errors.contactEmail && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <FaExclamationTriangle className="text-xs" />
                      {errors.contactEmail}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-emerald-100">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="group flex items-center justify-center gap-2 px-6 py-3 border-2 border-emerald-300 rounded-xl text-sm font-semibold text-emerald-700 bg-white hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-200 hover:scale-105"
                >
                  <FaTimes className="text-lg group-hover:rotate-90 transition-transform duration-200" />
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-sm font-semibold hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
                      Submitting...
                    </span>
                  ) : (
                    <>
                      <FaPlus className="text-lg group-hover:rotate-180 transition-transform duration-200" />
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
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-full border border-emerald-200">
            <FaBox className="text-emerald-600 text-sm" />
            <span className="text-sm text-emerald-700 font-medium">
              All fields marked with <span className="text-red-500">*</span> are
              required
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItems;
