import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

const ContactSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50">
      <div className="container mx-auto px-3 sm:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-800 to-indigo-600 bg-clip-text text-transparent">
                Get in <span className="text-indigo-600">Touch</span>
              </h2>
              <p className="text-xl text-gray-600">
                Have questions? We'd love to hear from you. Send us a message
                and we'll respond as soon as possible.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-800">Email</div>
                  <div className="text-gray-600">hello@libraryhub.com</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-800">Phone</div>
                  <div className="text-gray-600">+1 (555) 123-4567</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-800">Address</div>
                  <div className="text-gray-600">
                    123 Library Street, Book City, BC 12345
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <a
                href="#"
                className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center text-white hover:from-pink-600 hover:to-rose-700 transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xl">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
