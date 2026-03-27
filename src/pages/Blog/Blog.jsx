import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../api/api";
import {
  FaCalendarAlt,
  FaUser,
  FaHeart,
  FaComment,
  FaArrowRight,
  FaTag,
  FaSearch,
  FaBookOpen,
  FaFilter,
  FaTimes,
  FaCaretDown,
  FaCaretUp,
  FaNewspaper,
  FaShieldAlt,
  FaChartLine,
  FaLightbulb,
  FaCog,
  FaSortAmountDown,
  FaListUl,
  FaHome,
  FaSyncAlt,
} from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useActionMenu } from "../../hooks/useActionMenu";

const CustomSelect = ({ value, options, onChange, name, disabled = false }) => {
  const { isOpen, toggleMenu, closeMenu, menuRef } = useActionMenu();
  const selectedOption = options.find((o) => o.value === value) || options[0];

  return (
    <div className="relative w-full" ref={menuRef}>
      <button
        type="button"
        onClick={toggleMenu}
        disabled={disabled}
        className={`w-full px-3 py-2.5 text-left border rounded-lg text-sm bg-white/60 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 flex justify-between items-center ${disabled ? "opacity-50 cursor-not-allowed border-gray-200" : "border-emerald-200 hover:border-emerald-300"
          }`}
      >
        <span className="truncate pr-4">{selectedOption?.label}</span>
        {isOpen ? <FaCaretUp className="text-emerald-600 flex-shrink-0" /> : <FaCaretDown className="text-gray-400 flex-shrink-0" />}
      </button>

      {isOpen && !disabled && (
        <ul className="absolute z-[100] w-full mt-1.5 bg-white border border-emerald-100 rounded-xl shadow-2xl overflow-hidden text-sm max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                onClick={() => {
                  onChange({ target: { name, value: opt.value } });
                  closeMenu();
                }}
                className={`w-full text-left px-4 py-3 transition-colors ${value === opt.value
                  ? "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-800 font-bold border-l-2 border-emerald-500"
                  : "text-gray-700 hover:bg-emerald-50 border-l-2 border-transparent"
                  }`}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosInstance.get("/blogs");
        if (res.data && Array.isArray(res.data)) {
          setPosts(res.data);
          setFilteredPosts(res.data);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const activeCount =
      (selectedCategory !== "all" ? 1 : 0) +
      (searchTerm ? 1 : 0) +
      (sortBy !== "newest" ? 1 : 0);
    setActiveFiltersCount(activeCount);
  }, [selectedCategory, searchTerm, sortBy]);

  useEffect(() => {
    if (posts.length === 0) return;

    let result = [...posts];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(term) ||
          post.excerpt.toLowerCase().includes(term) ||
          post.author.toLowerCase().includes(term)
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((post) => post.category === selectedCategory);
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date) - new Date(a.date);
        case "oldest":
          return new Date(a.date) - new Date(b.date);
        case "popular":
          return b.likes + b.comments - (a.likes + a.comments);
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

    setFilteredPosts(result);
  }, [posts, searchTerm, selectedCategory, sortBy]);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const categories = ["all", ...new Set(posts.map((post) => post.category))];

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Safety":
        return FaShieldAlt;
      case "Recovery":
        return FaChartLine;
      case "Insights":
        return FaLightbulb;
      case "Technology":
        return FaCog;
      default:
        return FaTag;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Safety":
        return "from-emerald-500 to-teal-500";
      case "Recovery":
        return "from-blue-500 to-cyan-500";
      case "Insights":
        return "from-purple-500 to-pink-500";
      case "Technology":
        return "from-orange-500 to-yellow-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortBy("newest");
    setShowFilters(false);
  };

  const handleManualFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "sortBy") setSortBy(value);
    if (name === "category") setSelectedCategory(value);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { y: 18, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.45 },
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-emerald-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-emerald-500 mx-auto mb-4" />
          <p className="text-gray-600 text-base font-medium">
            Loading blog posts...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-8 px-4 sm:px-6 lg:px-8 relative">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-16 left-10 w-64 h-64 bg-emerald-200 rounded-full blur-3xl" />
        <div className="absolute bottom-16 right-10 w-72 h-72 bg-teal-200 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 relative z-10 items-start">
        {/* Sidebar: Search + Filters */}
        <div className="w-full lg:w-1/4 lg:sticky lg:top-8 flex-shrink-0 z-20">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-emerald-100 p-4 sm:p-5">
            {/* Search Bar */}
            <div className="relative mb-4 group">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm group-hover:text-emerald-500 transition-colors duration-200" />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-9 py-3 border border-emerald-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-200 bg-white/60 text-sm text-gray-800 placeholder-gray-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            {/* Filter Header */}
            <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 text-sm font-semibold rounded-lg hover:shadow-md transition-all duration-200"
              >
                <FaFilter className="text-sm" />
                <span>
                  Filters{activeFiltersCount > 0 && ` (${activeFiltersCount})`}
                </span>
                {showFilters ? <FaCaretUp /> : <FaCaretDown />}
              </button>

              <div className="hidden lg:flex items-center gap-2 text-sm font-semibold text-gray-900">
                <FaFilter className="text-emerald-600" />
                <span>Filter posts</span>
              </div>
            </div>

            {/* Filter Section */}
            <div
              className={`${showFilters ? "block" : "hidden"
                } lg:block transition-all duration-200`}
            >
              <div className="flex flex-col gap-4 mb-4">
                {/* Sort By */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    <span className="inline-flex items-center gap-2">
                      <FaListUl className="text-emerald-600" />
                      Sort by
                    </span>
                  </label>
                  <CustomSelect
                    name="sortBy"
                    value={sortBy}
                    onChange={handleManualFilterChange}
                    options={[
                      { value: "newest", label: "Newest first" },
                      { value: "oldest", label: "Oldest first" },
                      { value: "popular", label: "Most popular" }
                    ]}
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    <span className="inline-flex items-center gap-2">
                      <FaTag className="text-emerald-600" />
                      Category
                    </span>
                  </label>
                  <CustomSelect
                    name="category"
                    value={selectedCategory}
                    onChange={handleManualFilterChange}
                    options={[
                      { value: "all", label: "All categories" },
                      ...categories.filter(c => c !== "all").map(c => ({ value: c, label: c }))
                    ]}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    <span className="inline-flex items-center gap-2">
                      <FaHome className="text-emerald-600" />
                      Actions
                    </span>
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={resetFilters}
                      className="flex-1 px-3 py-2.5 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 text-sm font-semibold rounded-lg hover:shadow-md transition-all duration-200 border border-gray-200"
                    >
                      Reset all
                    </button>
                    <button
                      onClick={() => {
                        setIsLoading(true);
                        axiosInstance.get("/blogs").then(res => {
                          if (res.data && Array.isArray(res.data)) {
                            setPosts(res.data);
                            setFilteredPosts(res.data);
                          }
                          setIsLoading(false);
                        });
                      }}
                      className="px-3 py-2.5 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-lg hover:shadow-md transition-all duration-200 border border-emerald-200 flex items-center justify-center"
                    >
                      <FaSyncAlt className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-between items-center pt-3 border-t border-emerald-100 text-xs sm:text-sm">
              <div className="text-gray-600 font-medium">
                <span className="text-emerald-700 font-bold">
                  {filteredPosts.length}
                </span>{" "}
                of <span className="font-bold">{posts.length}</span> posts
              </div>
            </div>
          </div>
        </div>

        {/* Main Content: Results */}
        <div className="w-full lg:w-3/4 flex-1">

        {/* Blog Posts Grid */}
        {filteredPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-emerald-100 p-10 text-center"
          >
            <FaSearch className="text-gray-300 text-5xl mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No posts found
            </h3>
            <p className="text-gray-600 mb-4 max-w-md mx-auto text-sm">
              {searchTerm || selectedCategory !== "all" || sortBy !== "newest"
                ? "Try adjusting your search or filters."
                : "No blog posts are available yet."}
            </p>
            {(searchTerm ||
              selectedCategory !== "all" ||
              sortBy !== "newest") && (
                <button
                  onClick={resetFilters}
                  className="group inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-bold rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                >
                  <FaTimes className="text-sm" />
                  Reset all filters
                </button>
              )}
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filteredPosts.map((post) => {
              const CategoryIcon = getCategoryIcon(post.category);
              const categoryColor = getCategoryColor(post.category);
              return (
                <motion.article
                  key={post.id}
                  variants={itemVariants}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-emerald-100 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group"
                >
                  {/* Image */}
                  <div className="h-40 relative overflow-hidden">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentElement.className =
                            "h-40 bg-gradient-to-r from-emerald-100 to-teal-100 flex items-center justify-center";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-emerald-100 to-teal-100">
                        <FaBookOpen className="text-emerald-400 text-4xl" />
                      </div>
                    )}
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold bg-gradient-to-r ${categoryColor} text-white border border-white/20 shadow-md`}
                      >
                        <CategoryIcon className="text-xs" />
                        {post.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Meta */}
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1.5">
                        <div className="p-1.5 bg-emerald-50 rounded-md">
                          <FaCalendarAlt className="text-emerald-600 text-[10px]" />
                        </div>
                        <span className="font-medium">
                          {formatDate(post.date)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="p-1.5 bg-emerald-50 rounded-md">
                          <FaUser className="text-emerald-600 text-[10px]" />
                        </div>
                        <span className="font-medium">{post.author}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-700 transition-colors duration-200 cursor-pointer">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Engagement */}
                    <div className="flex justify-between items-center pt-3 border-t border-emerald-100">
                      <div className="flex items-center gap-3 text-xs">
                        <div className="flex items-center gap-1.5 text-red-500">
                          <div className="p-1.5 bg-red-50 rounded-md">
                            <FaHeart className="text-[10px]" />
                          </div>
                          <span className="font-medium">{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-blue-500">
                          <div className="p-1.5 bg-blue-50 rounded-md">
                            <FaComment className="text-[10px]" />
                          </div>
                          <span className="font-medium">{post.comments}</span>
                        </div>
                      </div>

                      <button className="group/read flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-bold text-xs sm:text-sm transition-colors duration-200">
                        <span>Read more</span>
                        <FaArrowRight className="group-hover/read:translate-x-1 transition-transform duration-200" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
