import React from "react";
import logo from "../../assets/logo.svg";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-gray-300 pt-10 pb-6 px-4 sm:px-6 md:px-8 relative overflow-hidden">
      {/* Background decoration (slightly smaller) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-8 left-1/4 w-48 h-48 bg-emerald-500 rounded-full blur-3xl" />
        <div className="absolute bottom-8 right-1/4 w-56 h-56 bg-teal-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <img
                  src={logo}
                  alt="WhereIsIt Logo"
                  className="w-12 h-12 object-contain filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  WhereIsIt
                </span>
                <span className="text-[11px] text-gray-400 font-medium tracking-wide">
                  Reuniting Lost Items
                </span>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed text-xs">
              Connecting people with their lost belongings through community,
              technology, and trust since 2023.
            </p>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-900/30 to-teal-900/30 flex items-center justify-center">
                  <FaMapMarkerAlt className="text-emerald-400 text-sm" />
                </div>
                <div>
                  <p className="font-medium text-gray-300 text-sm">
                    Our Location
                  </p>
                  <p className="text-gray-400">
                    123 Finder St, Lost City, LC 12345
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-900/30 to-teal-900/30 flex items-center justify-center">
                  <FaEnvelope className="text-emerald-400 text-sm" />
                </div>
                <div>
                  <p className="font-medium text-gray-300 text-sm">Email Us</p>
                  <p className="text-gray-400">help@whereisit.app</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-900/30 to-teal-900/30 flex items-center justify-center">
                  <FaPhoneAlt className="text-emerald-400 text-sm" />
                </div>
                <div>
                  <p className="font-medium text-gray-300 text-sm">Call Us</p>
                  <p className="text-gray-400">(123) 456-7890</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-emerald-900/30 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { text: "Home", href: "/" },
                { text: "Lost Items", href: "/lost-items" },
                { text: "Found Items", href: "/found-items" },
                { text: "Report Item", href: "/report-item" },
                { text: "Recovered Items", href: "/recovered-items" },
                { text: "Blog", href: "/blog" },
              ].map((link) => (
                <li key={link.text}>
                  <a
                    href={link.href}
                    className="group flex items-center text-gray-400 hover:text-emerald-300 transition-all duration-200"
                  >
                    <span className="w-1.5 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.text}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-emerald-900/30 inline-block">
              Support
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { text: "FAQ", href: "/faq" },
                { text: "Safety Tips", href: "/safety-tips" },
                { text: "Contact Us", href: "/contact" },
                { text: "Feedback", href: "/feedback" },
                { text: "How It Works", href: "/how-it-works" },
                { text: "Community Forum", href: "/forum" },
              ].map((link) => (
                <li key={link.text}>
                  <a
                    href={link.href}
                    className="group flex items-center text-gray-400 hover:text-emerald-300 transition-all duration-200"
                  >
                    <span className="w-1.5 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.text}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-emerald-900/30 inline-block">
              Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { text: "Terms of Service", href: "/terms" },
                { text: "Privacy Policy", href: "/privacy" },
                { text: "Cookie Policy", href: "/cookie-policy" },
                { text: "Community Guidelines", href: "/community-guidelines" },
                { text: "Data Protection", href: "/data-protection" },
                { text: "Report Abuse", href: "/report-abuse" },
              ].map((link) => (
                <li key={link.text}>
                  <a
                    href={link.href}
                    className="group flex items-center text-gray-400 hover:text-emerald-300 transition-all duration-200"
                  >
                    <span className="w-1.5 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.text}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-emerald-900/30 my-6" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Social Media */}
          <div className="flex items-center gap-3">
            <div className="text-gray-400 font-medium text-xs sm:text-sm">
              Connect with us:
            </div>
            <div className="flex gap-2.5">
              {[
                {
                  icon: FaFacebookF,
                  label: "Facebook",
                  color: "hover:text-blue-500",
                  href: "https://facebook.com",
                },
                {
                  icon: FaTwitter,
                  label: "Twitter",
                  color: "hover:text-blue-400",
                  href: "https://twitter.com",
                },
                {
                  icon: FaLinkedinIn,
                  label: "LinkedIn",
                  color: "hover:text-blue-600",
                  href: "https://linkedin.com",
                },
                {
                  icon: FaInstagram,
                  label: "Instagram",
                  color: "hover:text-pink-500",
                  href: "https://instagram.com",
                },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-9 h-9 rounded-lg bg-gray-800/50 border border-emerald-900/30 flex items-center justify-center text-base transition-all duration-200 hover:scale-110 hover:bg-gray-800/80 hover:border-emerald-900/50 ${social.color}`}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Tagline */}
          <p className="text-xs sm:text-sm text-gray-400 text-center md:text-right max-w-md">
            Built for communities and organizations that care about getting
            every lost item back where it belongs.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-4 border-t border-emerald-900/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-center text-xs sm:text-sm">
            <p className="text-gray-500">
              © {currentYear} WhereIsIt. All rights reserved.
            </p>
            <p className="text-gray-500">
              Designed with ❤️ for reuniting lost items worldwide
            </p>
            <div className="flex items-center gap-4">
              <a
                href="/sitemap"
                className="text-gray-500 hover:text-emerald-300 transition"
              >
                Sitemap
              </a>
              <a
                href="/accessibility"
                className="text-gray-500 hover:text-emerald-300 transition"
              >
                Accessibility
              </a>
              <a
                href="/status"
                className="text-gray-500 hover:text-emerald-300 transition"
              >
                System Status
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
