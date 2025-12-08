import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { auth } from "../../firebase/firebase.config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";
import { axiosInstance } from "../../api/api";
import {
  FaArrowLeft,
  FaSave,
  FaTimes,
  FaImage,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTag,
  FaUser,
  FaEnvelope,
  FaEdit,
  FaCheckCircle,
  FaExclamationTriangle,
  FaBox,
} from "react-icons/fa";

const UpdateItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [submitting, setSubmitting] = useState(false);
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

  const [formData, setFormData] = useState({
    postType: "lost",
    title: "",
    description: "",
    category: "",
    location: "",
    date: "",
    thumbnail: "",
    contactName: "",
    contactEmail: "",
    status: "not-recovered",
  });

  const [imageLoaded, setImageLoaded] = useState(false);

  // Fetch item using TanStack Query
  const { isLoading, isError, error } = useQuery({
    queryKey: ["item", id],
    queryFn: async () => {
      const user = auth.currentUser;
      if (!user) throw new Error("Please sign in to edit items");
      const token = await user.getIdToken();

      const res = await axiosInstance.get(`/inventory/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: (data) => {
      setFormData({
        postType: data.postType,
        title: data.title,
        description: data.description,
        category: data.category,
        location: data.location,
        date: data.date.split("T")[0],
        thumbnail: data.thumbnail,
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        status: data.status || "not-recovered",
      });
    },
    staleTime: 1000 * 60 * 5,
  });

  const mutation = useMutation({
    mutationFn: async (payload) => {
      const user = auth.currentUser;
      if (!user) throw new Error("Please sign in to update items");
      const token = await user.getIdToken();

      const res = await axiosInstance.patch(`/inventory/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("🎉 Item updated successfully!");
      queryClient.invalidateQueries(["item", id]);
      queryClient.invalidateQueries(["my-items"]);
      navigate("/my-items");
    },
    onError: (err) => {
      console.error("Update failed:", err);
      toast.error(`❌ ${err.message || "Failed to update item"}`);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      date: new Date(formData.date).toISOString(),
      status: formData.status || "not-recovered",
    };
    setSubmitting(true);
    mutation.mutate(payload, {
      onSettled: () => setSubmitting(false),
    });
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = (e) => {
    setImageLoaded(false);
    e.target.src =
      "https://via.placeholder.com/400x300?text=Image+Not+Available";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <LoadingSpinner className="mt-8" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ErrorMessage message={error.message} className="mt-8" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-800 transition-colors duration-200 mb-4 group"
          >
            <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back to My Items</span>
          </button>
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 rounded-2xl shadow-lg">
              <FaEdit className="text-white text-3xl" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-700 to-teal-800 bg-clip-text text-transparent mb-4">
            Update Item
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Modify your item details to help others find or identify it better
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Post Type and Status Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Post Type */}
                <div className="form-group">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                      <FaTag className="text-emerald-600" />
                      Item Type <span className="text-red-500">*</span>
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
                        <div className="text-xs text-gray-500 mt-1">
                          You lost this
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
                        <div className="text-xs text-gray-500 mt-1">
                          You found this
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Status */}
                <div className="form-group">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                      <FaCheckCircle className="text-emerald-600" />
                      Status <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:border-emerald-300"
                  >
                    <option value="not-recovered">Not Recovered</option>
                    <option value="recovered">Recovered</option>
                  </select>
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
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:border-emerald-300"
                  placeholder="Brief description of the item"
                />
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
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:border-emerald-300"
                  placeholder="Detailed description of the item (color, brand, distinguishing features, etc.)"
                />
              </div>

              {/* Category and Location Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:border-emerald-300"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

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
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:border-emerald-300"
                    placeholder="Where was it lost/found?"
                  />
                </div>
              </div>

              {/* Date and Image URL Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Date */}
                <div className="form-group">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                      <FaCalendarAlt className="text-emerald-600" />
                      Date <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:border-emerald-300"
                  />
                </div>

                {/* Thumbnail */}
                <div className="form-group">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                      <FaImage className="text-emerald-600" />
                      Image URL
                    </span>
                  </label>
                  <input
                    type="url"
                    name="thumbnail"
                    value={formData.thumbnail}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:border-emerald-300"
                  />
                </div>
              </div>

              {/* Image Preview */}
              {formData.thumbnail && (
                <div className="form-group">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                      <FaImage className="text-emerald-600" />
                      Image Preview
                    </span>
                  </label>
                  <div className="relative border-2 border-dashed border-emerald-200 rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50">
                    <img
                      src={formData.thumbnail}
                      alt="Preview"
                      className="w-full h-64 object-contain"
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

              {/* Contact Info (read-only) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                      <FaUser className="text-emerald-600" />
                      Your Name
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      readOnly
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 cursor-not-allowed"
                    />
                    <FaEdit className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                      <FaEnvelope className="text-emerald-600" />
                      Your Email
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      readOnly
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 cursor-not-allowed"
                    />
                    <FaEdit className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
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
                  disabled={submitting}
                  className="group flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-sm font-semibold hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
                      Updating...
                    </span>
                  ) : (
                    <>
                      <FaSave className="text-lg group-hover:animate-bounce" />
                      Update Item
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-full border border-emerald-200">
            <FaBox className="text-emerald-600 text-sm" />
            <span className="text-sm text-emerald-700">
              All fields marked with <span className="text-red-500">*</span> are
              required
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateItem;
