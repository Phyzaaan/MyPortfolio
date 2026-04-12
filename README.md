# My Portfolio

Welcome! This is my personal portfolio website, showcasing my work as a web developer and designer. Built with modern web technologies, it features an interactive interface with sound effects, dark mode, and various sections to explore my projects and skills.

## Features

- **Interactive Sections**: Welcome, Home, About Me, Work, Contact, Comments, and Credits
- **Pop-up Windows**: Dynamic windows for different sections with smooth animations
- **Sound Effects**: Immersive audio feedback for interactions (pop-in, pop-out, transitions)
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Optimized for desktop and mobile devices
- **Lazy Loading**: Efficient loading of components for better performance
- **Contact Form**: Integrated with EmailJS for sending messages
- **Firebase Integration**: For backend services (if configured)

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React, React Icons
- **Routing**: React Router DOM
- **Backend Services**: Firebase, EmailJS
- **Virtualization**: React Window, React Virtualized Auto Sizer
- **Linting**: ESLint with TypeScript support

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/my-portfolio.git
   cd my-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in the terminal).

## Usage

- Navigate through the sections using the header or interactive elements.
- Toggle dark mode and sound effects using the controls.
- Open pop-up windows to view detailed information.
- Use the contact form to send messages.

## Build

To build the project for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Preview

To preview the production build locally:

```bash
npm run preview
```

## Linting

Run the linter to check for code quality:

```bash
npm run lint
```

## Contributing

If you'd like to contribute, please fork the repository and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Feel free to reach out via the contact section on the website or connect with me on [LinkedIn](https://linkedin.com/in/your-profile) or [GitHub](https://github.com/your-username).

---

*Built with ❤️ by Phantom*
```
([
  {
    files: ['**/*.{ts,tsx}']
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```