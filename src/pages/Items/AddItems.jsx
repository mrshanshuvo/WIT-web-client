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
  const [categories, setCategories] = useState([
    "Electronics",
    "Documents",
    "Jewelry",
    "Clothing",
    "Pets",
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 mb-4"
          >
            <FaArrowLeft className="text-sm" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Report {formData.postType === "lost" ? "Lost" : "Found"} Item
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Help reunite items with their owners by providing detailed
            information
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Post Type and Category Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Post Type */}
                <div className="form-group">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                      <FaTag className="text-blue-500" />
                      Post Type <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, postType: "lost" }))
                      }
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        formData.postType === "lost"
                          ? "border-red-500 bg-red-50 text-red-700 shadow-md"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-lg font-semibold">Lost Item</div>
                        <div className="text-sm opacity-75">
                          I lost something
                        </div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, postType: "found" }))
                      }
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        formData.postType === "found"
                          ? "border-green-500 bg-green-50 text-green-700 shadow-md"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-lg font-semibold">Found Item</div>
                        <div className="text-sm opacity-75">
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
                      <FaTag className="text-blue-500" />
                      Category <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm ${
                      errors.category
                        ? "border-red-300"
                        : "border-gray-200 focus:border-blue-500"
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
                      <FaCheckCircle className="text-xs" />
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
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm ${
                    errors.title
                      ? "border-red-300"
                      : "border-gray-200 focus:border-blue-500"
                  }`}
                  placeholder="Brief description of the item (e.g., 'Black iPhone 13 Pro')"
                />
                {errors.title && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <FaCheckCircle className="text-xs" />
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
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm ${
                    errors.description
                      ? "border-red-300"
                      : "border-gray-200 focus:border-blue-500"
                  }`}
                  placeholder="Detailed description of the item (color, brand, distinguishing features, contents, etc.)"
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <FaCheckCircle className="text-xs" />
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
                      <FaMapMarkerAlt className="text-blue-500" />
                      Location <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm ${
                      errors.location
                        ? "border-red-300"
                        : "border-gray-200 focus:border-blue-500"
                    }`}
                    placeholder="Where was it lost/found? (e.g., 'Central Park, Main Street')"
                  />
                  {errors.location && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <FaCheckCircle className="text-xs" />
                      {errors.location}
                    </p>
                  )}
                </div>

                {/* Date */}
                <div className="form-group">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                      <FaCalendarAlt className="text-blue-500" />
                      Date <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <div className="relative">
                    <DatePicker
                      selected={formData.date}
                      onChange={handleDateChange}
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm ${
                        errors.date
                          ? "border-red-300"
                          : "border-gray-200 focus:border-blue-500"
                      }`}
                      maxDate={new Date()}
                      showYearDropdown
                      dropdownMode="select"
                      dateFormat="MMMM d, yyyy"
                    />
                    <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  </div>
                </div>
              </div>

              {/* Image URL and Preview */}
              <div className="form-group">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                    <FaCamera className="text-blue-500" />
                    Image URL <span className="text-red-500">*</span>
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="url"
                    name="thumbnail"
                    value={formData.thumbnail}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm ${
                      errors.thumbnail
                        ? "border-red-300"
                        : "border-gray-200 focus:border-blue-500"
                    }`}
                    placeholder="https://example.com/image.jpg"
                  />
                  <FaUpload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                </div>
                {errors.thumbnail && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <FaCheckCircle className="text-xs" />
                    {errors.thumbnail}
                  </p>
                )}

                {/* Image Preview */}
                {formData.thumbnail && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Image Preview:
                    </p>
                    <div className="relative border-2 border-dashed border-gray-300 rounded-2xl overflow-hidden bg-gray-50">
                      <img
                        src={formData.thumbnail}
                        alt="Preview"
                        className="w-full h-48 sm:h-64 object-contain"
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                      />
                      {!imageLoaded && formData.thumbnail && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="loading loading-spinner text-blue-500"></div>
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
                      <FaUser className="text-blue-500" />
                      Your Name <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm ${
                        errors.contactName
                          ? "border-red-300"
                          : "border-gray-200 focus:border-blue-500"
                      }`}
                    />
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  </div>
                  {errors.contactName && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <FaCheckCircle className="text-xs" />
                      {errors.contactName}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                      <FaEnvelope className="text-blue-500" />
                      Your Email <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm ${
                        errors.contactEmail
                          ? "border-red-300"
                          : "border-gray-200 focus:border-blue-500"
                      }`}
                    />
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  </div>
                  {errors.contactEmail && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <FaCheckCircle className="text-xs" />
                      {errors.contactEmail}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-6 py-3 border-2 border-gray-300 rounded-xl text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 border border-transparent rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="loading loading-spinner loading-sm"></span>
                      Submitting...
                    </span>
                  ) : (
                    `Post ${
                      formData.postType === "lost" ? "Lost" : "Found"
                    } Item`
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItems;
