# Travel Tales 🌎

A modern social blogging platform for sharing travel experiences, built with React, TypeScript, and Tailwind CSS.

![Travel Tales](https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=630&fit=crop)

## Features ✨

- **User Authentication**
  - Secure registration and login
  - Profile management with customizable bio and avatar
  - Social following system

- **Travel Blog Posts**
  - Create, edit, and delete travel stories
  - Rate destinations (1-10 scale)
  - Add location details and continent categorization
  - Upload or link destination images

- **Social Interactions**
  - Follow other travelers
  - Bookmark favorite destinations
  - View personalized feed based on follows

- **Advanced Filtering**
  - Filter by continent, rating, and user
  - Search functionality for destinations
  - Sort by latest, popular, and personal preferences

- **Responsive Design**
  - Mobile-first approach
  - Dark mode support
  - Smooth animations and transitions

## Tech Stack 🛠

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context + Custom Hooks
- **Routing**: React Router v6
- **UI Components**: Custom components with Lucide icons
- **Animations**: Framer Motion
- **API Integration**: Axios with automatic retries
- **Development**: Vite

## Getting Started 🚀

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/travel-tales.git
   cd travel-tales
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your API credentials.

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure 📁

```
src/
├── components/        # Reusable UI components
├── context/          # React Context providers
├── hooks/            # Custom React hooks
├── pages/            # Route components
├── services/         # API and external services
├── types/            # TypeScript definitions
├── utils/            # Helper functions
└── constants/        # Application constants
```

## API Integration 🔌

The application uses a RESTful API with the following endpoints:

- `/user` - User management and authentication
- `/user/:id/blogPost` - Blog post operations
- `/user/:id` - User profile operations

Full API documentation is available in `DOCUMENTATION.md`.

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Best Practices 📚

- **Component Structure**: Each component is self-contained with its styles and logic
- **Type Safety**: Comprehensive TypeScript types for all components and functions
- **Error Handling**: Robust error handling with user-friendly messages
- **Performance**: Optimized rendering with proper React hooks usage
- **Testing**: Unit tests for critical functionality

## Environment Variables 🔑

```env
VITE_API_BASE_URL=your_api_base_url
```

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- Icons by [Lucide](https://lucide.dev)
- UI inspiration from various travel platforms
- Stock photos from [Unsplash](https://unsplash.com)