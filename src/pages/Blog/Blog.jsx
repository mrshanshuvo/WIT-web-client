import React, { useEffect, useState } from "react";
import blogPostsData from "./blogPosts.json";
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
} from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Initialize with data
  useEffect(() => {
    if (blogPostsData && Array.isArray(blogPostsData)) {
      setPosts(blogPostsData);
      setFilteredPosts(blogPostsData);
    }
    setIsLoading(false);
  }, []);

  // Calculate active filters
  useEffect(() => {
    const activeCount =
      (selectedCategory !== "all" ? 1 : 0) +
      (searchTerm ? 1 : 0) +
      (sortBy !== "newest" ? 1 : 0);
    setActiveFiltersCount(activeCount);
  }, [selectedCategory, searchTerm, sortBy]);

  // Filter and sort posts
  useEffect(() => {
    if (posts.length === 0) return;

    let result = [...posts];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(term) ||
          post.excerpt.toLowerCase().includes(term) ||
          post.author.toLowerCase().includes(term)
      );
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      result = result.filter((post) => post.category === selectedCategory);
    }

    // Sort posts
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get unique categories
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-emerald-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-500 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg font-medium">
            Loading blog posts...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-80 h-80 bg-emerald-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-200 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full mb-8 border border-emerald-200">
            <FaNewspaper className="text-emerald-600 text-lg" />
            <span className="font-bold text-emerald-800">WhereIsIt Blog</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-emerald-700 to-teal-800 bg-clip-text text-transparent mb-6">
            Discover & Learn
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Helpful tips, success stories, and community updates about lost and
            found items.
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-emerald-100 p-6 mb-8"
        >
          {/* Search Input */}
          <div className="relative mb-6 group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg group-hover:text-emerald-500 transition-colors duration-300" />
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-5 py-4 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm text-gray-800 placeholder-gray-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors"
              >
                <FaTimes />
              </button>
            )}
          </div>

          {/* Filter Header */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 font-bold rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <FaFilter className="text-lg" />
              <span>
                Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </span>
              {showFilters ? <FaCaretUp /> : <FaCaretDown />}
            </button>

            <div className="hidden lg:block">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FaFilter className="text-emerald-600" />
                Filter Posts
              </h3>
            </div>

            {/* Sort By */}
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-600 font-medium">
                Sort by:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-emerald-200 rounded-lg bg-white/50 backdrop-blur-sm text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-200"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          {/* Filters */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block transition-all duration-300`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="form-group">
                <label className="block mb-3 font-bold text-gray-700 items-center gap-2">
                  <FaTag className="text-emerald-600" />
                  Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {categories.map((category) => {
                    if (category === "all") return null;
                    const Icon = getCategoryIcon(category);
                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-medium transition-all duration-300 ${
                          selectedCategory === category
                            ? `bg-gradient-to-r ${getCategoryColor(
                                category
                              )} text-white border-transparent shadow-lg`
                            : "bg-white text-gray-700 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50"
                        }`}
                      >
                        <Icon className="text-sm" />
                        <span>{category}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="form-group">
                <label className="block mb-3 font-bold text-gray-700 items-center gap-2">
                  <FaSortAmountDown className="text-emerald-600" />
                  Sort Options
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSortBy("newest")}
                    className={`px-4 py-3 rounded-xl border-2 font-medium transition-all duration-300 ${
                      sortBy === "newest"
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-transparent shadow-lg"
                        : "bg-white text-gray-700 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50"
                    }`}
                  >
                    Newest
                  </button>
                  <button
                    onClick={() => setSortBy("oldest")}
                    className={`px-4 py-3 rounded-xl border-2 font-medium transition-all duration-300 ${
                      sortBy === "oldest"
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-transparent shadow-lg"
                        : "bg-white text-gray-700 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50"
                    }`}
                  >
                    Oldest
                  </button>
                  <button
                    onClick={() => setSortBy("popular")}
                    className={`px-4 py-3 rounded-xl border-2 font-medium transition-all duration-300 ${
                      sortBy === "popular"
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-transparent shadow-lg"
                        : "bg-white text-gray-700 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50"
                    }`}
                  >
                    Popular
                  </button>
                  <button
                    onClick={resetFilters}
                    className="px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 font-medium rounded-xl border-2 border-gray-200 hover:shadow-lg transition-all duration-300"
                  >
                    Reset All
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-emerald-100">
            {selectedCategory !== "all" && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 text-sm font-medium rounded-full border border-emerald-200">
                <FaTag className="text-xs" />
                {selectedCategory}
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="ml-1 hover:text-emerald-900"
                >
                  ×
                </button>
              </span>
            )}
            {sortBy !== "newest" && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 text-sm font-medium rounded-full border border-gray-200">
                <FaSortAmountDown className="text-xs" />
                {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                <button
                  onClick={() => setSortBy("newest")}
                  className="ml-1 hover:text-gray-900"
                >
                  ×
                </button>
              </span>
            )}
            {searchTerm && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 text-sm font-medium rounded-full border border-gray-200">
                <FaSearch className="text-xs" />"{searchTerm}"
                <button
                  onClick={() => setSearchTerm("")}
                  className="ml-1 hover:text-gray-900"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </motion.div>

        {/* Results Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
        >
          <div className="text-gray-600 font-medium">
            Showing{" "}
            <span className="text-emerald-700 font-bold">
              {filteredPosts.length}
            </span>{" "}
            of <span className="font-bold">{posts.length}</span> posts
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.slice(1).map((category) => {
              const Icon = getCategoryIcon(category);
              const count = posts.filter(
                (post) => post.category === category
              ).length;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-xl border transition-all duration-300 ${
                    selectedCategory === category
                      ? `bg-gradient-to-r ${getCategoryColor(
                          category
                        )} text-white border-transparent shadow-lg`
                      : "bg-white text-gray-700 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50"
                  }`}
                >
                  <Icon className="text-xs" />
                  <span>{category}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-xs ${
                      selectedCategory === category
                        ? "bg-white/20"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        {filteredPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-emerald-100 p-16 text-center"
          >
            <FaSearch className="text-gray-400 text-7xl mx-auto mb-8" />
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              No Posts Found
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
              {searchTerm || selectedCategory !== "all" || sortBy !== "newest"
                ? "Try adjusting your search or filters"
                : "No blog posts available yet"}
            </p>
            {(searchTerm ||
              selectedCategory !== "all" ||
              sortBy !== "newest") && (
              <button
                onClick={resetFilters}
                className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <FaTimes className="text-lg" />
                Reset All Filters
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.map((post) => {
              const CategoryIcon = getCategoryIcon(post.category);
              const categoryColor = getCategoryColor(post.category);
              return (
                <motion.article
                  key={post.id}
                  variants={itemVariants}
                  className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-emerald-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                >
                  {/* Image */}
                  <div className="h-48 relative overflow-hidden">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentElement.className =
                            "h-48 bg-gradient-to-r from-emerald-100 to-teal-100 flex items-center justify-center";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-emerald-100 to-teal-100">
                        <FaBookOpen className="text-emerald-400 text-5xl" />
                      </div>
                    )}
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r ${categoryColor} text-white border border-white/20 shadow-lg`}
                      >
                        <CategoryIcon className="text-xs" />
                        {post.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-emerald-50 rounded-lg">
                          <FaCalendarAlt className="text-emerald-600 text-xs" />
                        </div>
                        <span className="font-medium">
                          {formatDate(post.date)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-emerald-50 rounded-lg">
                          <FaUser className="text-emerald-600 text-xs" />
                        </div>
                        <span className="font-medium">{post.author}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-emerald-700 transition-colors duration-200 cursor-pointer">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Engagement Stats */}
                    <div className="flex justify-between items-center pt-4 border-t border-emerald-100">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2 text-red-500">
                          <div className="p-1.5 bg-red-50 rounded-lg">
                            <FaHeart className="text-xs" />
                          </div>
                          <span className="font-medium">{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-2 text-blue-500">
                          <div className="p-1.5 bg-blue-50 rounded-lg">
                            <FaComment className="text-xs" />
                          </div>
                          <span className="font-medium">{post.comments}</span>
                        </div>
                      </div>

                      <button className="group/read flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-bold text-sm transition-colors duration-200">
                        <span>Read More</span>
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
  );
};

export default Blog;
