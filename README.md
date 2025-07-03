# 📚 Library Management System

A modern, responsive library management system built with React, TypeScript, and Vite. This application provides a comprehensive solution for managing books, tracking borrowings, and maintaining library statistics.

## 🌐 Live Demo

**Frontend Application:** [https://minimal-library-management-system.vercel.app/](https://minimal-library-management-system.vercel.app/)

## ✨ Features

### 📖 Book Management

- **Add New Books**: Create book entries with detailed information
- **Edit Books**: Update book details including title, author, genre, ISBN, and copies
- **Delete Books**: Remove books from the library with confirmation
- **Book Search**: Search books by title, author, or ISBN
- **Genre Filtering**: Filter books by genre (Fiction, Non-Fiction, Science, History, Biography, Fantasy)
- **Pagination**: Navigate through large book collections efficiently

### 📊 Library Statistics

- **Real-time Stats**: View total books, available copies, and borrowing statistics
- **Genre Distribution**: Visual representation of books by genre
- **Availability Status**: Track which books are available for borrowing

### 🔄 Borrowing System

- **Borrow Books**: Check out books with due date tracking
- **Borrowing History**: View all borrowing records
- **Borrow Summary**: Comprehensive overview of all borrowing activities

### 🎨 User Interface

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Grid/List Views**: Toggle between different book display modes
- **Loading States**: Skeleton loaders and loading indicators
- **Toast Notifications**: Real-time feedback for user actions

### 🔧 Technical Features

- **TypeScript**: Full type safety and better development experience
- **RTK Query**: Efficient API state management with caching
- **Form Validation**: Client-side validation using Zod schemas
- **Error Handling**: Comprehensive error handling and user feedback
- **Optimistic Updates**: Immediate UI feedback for better UX

## 🛠️ Technology Stack

### Frontend

- **React 19** - Modern React wit optimistic ui update and concurrent features
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit** - State management with RTK Query
- **React Router** - Client-side routing
- **Zod** - Schema validation
- **Lucide React** - Beautiful icons
- **Sonner** - Toast notifications

### Backend Integration

- **RESTful API** - Clean API design
- **MongoDB** - NoSQL database
- **Express.js** - Node.js web framework
- **JWT Authentication** - Secure authentication system

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd minimal-library-management-system
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Environment Configuration

The application automatically detects the environment:

- **Development**: Uses local proxy to backend
- **Production**: Direct API calls to deployed backend

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── books/          # Book-related components
│   ├── layout/         # Layout components
│   └── ui/             # Base UI components
├── pages/              # Page components
│   ├── allBooks/       # Books listing page
│   ├── bookDetails/    # Book details page
│   ├── borrowSummary/  # Borrowing summary page
│   └── home/           # Home page components
├── redux/              # Redux store and API
│   └── api/            # RTK Query API configuration
├── routes/             # Application routing
├── types/              # TypeScript type definitions
├── lib/                # Utility functions
└── config/             # Configuration files
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🌟 Key Features in Detail

### Book Management

The system supports comprehensive book management with:

- **Validation**: All book data is validated using Zod schemas
- **Real-time Updates**: Changes are reflected immediately in the UI
- **Search & Filter**: Powerful search and filtering capabilities
- **Pagination**: Efficient handling of large book collections

### Responsive Design

The application is fully responsive and provides an optimal experience across all devices:

- **Mobile-first approach**
- **Adaptive layouts**
- **Touch-friendly interactions**
- **Optimized performance**

### State Management

Built with Redux Toolkit and RTK Query for:

- **Efficient caching**
- **Automatic background updates**
- **Optimistic updates**
- **Error handling**

## 🔒 Security Features

- **Input Validation**: All user inputs are validated
- **Error Boundaries**: Graceful error handling
- **Secure API Communication**: HTTPS in production
- **Data Sanitization**: Protection against XSS attacks

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Redux Toolkit](https://redux-toolkit.js.org/) - The official, opinionated, batteries-included toolset for efficient Redux development

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Built with ❤️ using modern web technologies**
