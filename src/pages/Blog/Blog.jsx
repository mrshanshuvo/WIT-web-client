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

  useEffect(() => {
    if (blogPostsData && Array.isArray(blogPostsData)) {
      setPosts(blogPostsData);
      setFilteredPosts(blogPostsData);
    }
    setIsLoading(false);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-16 left-10 w-64 h-64 bg-emerald-200 rounded-full blur-3xl" />
        <div className="absolute bottom-16 right-10 w-72 h-72 bg-teal-200 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full mb-3 border border-emerald-200">
            <FaNewspaper className="text-emerald-600 text-base" />
            <span className="font-semibold text-emerald-800 text-sm">
              WhereIsIt Blog
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-emerald-700 to-teal-800 bg-clip-text text-transparent mb-2">
            Discover &amp; learn
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Tips, stories, and updates about lost and found items in your
            community.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-emerald-100 p-5 mb-6"
        >
          {/* Search Input */}
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

            {/* Sort By */}
            <div className="flex items-center gap-2 text-sm">
              <label className="text-gray-600 font-medium">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-emerald-200 rounded-lg bg-white/60 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-200"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="popular">Most popular</option>
              </select>
            </div>
          </div>

          {/* Filters */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block transition-all duration-200`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  <span className="inline-flex items-center gap-2">
                    <FaTag className="text-emerald-600" />
                    Category
                  </span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {categories.map((category) => {
                    if (category === "all") return null;
                    const Icon = getCategoryIcon(category);
                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border text-xs sm:text-sm font-medium transition-all duration-200 ${
                          selectedCategory === category
                            ? `bg-gradient-to-r ${getCategoryColor(
                                category
                              )} text-white border-transparent shadow-md`
                            : "bg-white text-gray-700 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50"
                        }`}
                      >
                        <Icon className="text-xs" />
                        <span>{category}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  <span className="inline-flex items-center gap-2">
                    <FaSortAmountDown className="text-emerald-600" />
                    Sort options
                  </span>
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setSortBy("newest")}
                    className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                      sortBy === "newest"
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-transparent shadow-md"
                        : "bg-white text-gray-700 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50"
                    }`}
                  >
                    Newest
                  </button>
                  <button
                    onClick={() => setSortBy("oldest")}
                    className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                      sortBy === "oldest"
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-transparent shadow-md"
                        : "bg-white text-gray-700 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50"
                    }`}
                  >
                    Oldest
                  </button>
                  <button
                    onClick={() => setSortBy("popular")}
                    className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                      sortBy === "popular"
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-transparent shadow-md"
                        : "bg-white text-gray-700 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50"
                    }`}
                  >
                    Popular
                  </button>
                  <button
                    onClick={resetFilters}
                    className="px-3 py-2 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200"
                  >
                    Reset all
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2 pt-3 border-t border-emerald-100 text-xs sm:text-sm">
            {selectedCategory !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 font-medium rounded-full border border-emerald-200">
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
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 font-medium rounded-full border border-gray-200">
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
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 font-medium rounded-full border border-gray-200">
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
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3 text-sm"
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
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg border transition-all duration-200 ${
                    selectedCategory === category
                      ? `bg-gradient-to-r ${getCategoryColor(
                          category
                        )} text-white border-transparent shadow-md`
                      : "bg-white text-gray-700 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50"
                  }`}
                >
                  <Icon className="text-xs" />
                  <span>{category}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[11px] ${
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
  );
};

export default Blog;
