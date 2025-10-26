import React, { useEffect, useState } from "react";
import blogPostsData from "../Blog/blogPosts.json";
import {
  FaCalendarAlt,
  FaUser,
  FaHeart,
  FaComment,
  FaArrowRight,
  FaTag,
  FaShare,
  FaBookOpen,
  FaSearch,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    setPosts(blogPostsData);
    setFilteredPosts(blogPostsData);
  }, []);

  // Get unique categories
  const categories = ["all", ...new Set(posts.map((post) => post.category))];

  // Filter and sort posts
  useEffect(() => {
    let result = posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

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
          return 0;
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

  // Generate fallback SVG image
  const generateFallbackImage = (title, category) => {
    const colors = {
      Safety: "3b82f6",
      Recovery: "10b981",
      Insights: "8b5cf6",
      Technology: "f59e0b",
      default: "6b7280",
    };

    const color = colors[category] || colors.default;
    const shortTitle =
      title.length > 30 ? title.substring(0, 30) + "..." : title;

    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:%23${color};stop-opacity:1" />
          <stop offset="100%" style="stop-color:%23${color}99;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(%23grad)"/>
      <rect x="20" y="20" width="360" height="260" fill="none" stroke="white" stroke-width="2" stroke-dasharray="8,4"/>
      <text x="50%" y="45%" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">${shortTitle}</text>
      <text x="50%" y="60%" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="14" opacity="0.8">${category}</text>
    </svg>`;
  };

  const handleImageError = (postId) => {
    setImageErrors((prev) => ({ ...prev, [postId]: true }));
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-2xl shadow-lg">
              <FaBookOpen className="text-white text-3xl" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            WhereIsIt Blog
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto">
            Discover helpful tips, success stories, and community updates about
            lost and found items.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <FaTag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm appearance-none"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="relative">
              <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm appearance-none"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-between items-center mb-6"
        >
          <p className="text-gray-600">
            Showing {filteredPosts.length} of {posts.length} posts
          </p>
          <div className="flex gap-2 text-sm">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
              {posts.filter((post) => post.category === "Safety").length} Safety
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium">
              {posts.filter((post) => post.category === "Recovery").length}{" "}
              Recovery
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full font-medium">
              {posts.filter((post) => post.category === "Insights").length}{" "}
              Insights
            </span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full font-medium">
              {posts.filter((post) => post.category === "Technology").length}{" "}
              Technology
            </span>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        {filteredPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-12 text-center"
          >
            <FaSearch className="text-gray-400 text-6xl mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              No Posts Found
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We couldn't find any blog posts matching your criteria. Try
              adjusting your search or filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSortBy("newest");
              }}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 font-semibold"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={
                      imageErrors[post.id]
                        ? generateFallbackImage(post.title, post.category)
                        : post.image
                    }
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={() => handleImageError(post.id)}
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        post.category === "Safety"
                          ? "bg-blue-100 text-blue-800 border border-blue-200"
                          : post.category === "Recovery"
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : post.category === "Insights"
                          ? "bg-purple-100 text-purple-800 border border-purple-200"
                          : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                      }`}
                    >
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="text-gray-400" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaUser className="text-gray-400" />
                      <span>{post.author}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Engagement Stats */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <FaHeart className="text-red-400" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaComment className="text-blue-400" />
                        <span>{post.comments}</span>
                      </div>
                    </div>

                    <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors duration-200 group/read">
                      <span>Read More</span>
                      <FaArrowRight className="group-hover/read:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Get the latest blog posts and community updates delivered directly
            to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 hover:scale-105">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
