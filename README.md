I'll create a comprehensive README for the Horizon Event Scheduler repository based on the codebase context provided.



# Horizon Event Scheduler

A modern Progressive Web Application (PWA) for event management with countdown timers, offline capabilities, and mobile-first design. [1](#0-0) 

## Features

### 🎯 Core Functionality
- **Event Management**: Create, edit, and delete events with detailed information [2](#0-1) 
- **Real-time Countdown**: Live countdown timers for upcoming events [3](#0-2) 
- **Smart Notifications**: Browser-based event reminders with customizable timing [4](#0-3) 
- **Category Organization**: Organize events by categories (Meeting, Personal, Work, Social, Health, Education, Other) [5](#0-4) 

### 📱 Progressive Web App
- **Offline Mode**: Full functionality without internet connection [6](#0-5) 
- **Installable**: Add to home screen on mobile and desktop devices [7](#0-6) 
- **Native Experience**: Standalone app mode with custom theming [8](#0-7) 
- **Cross-Platform**: Works on Android, iOS, and desktop browsers [9](#0-8) 

### 🎨 Modern UI/UX
- **Mobile-First Design**: Responsive interface optimized for all screen sizes [10](#0-9) 
- **Custom Theme**: Purple and yellow gradient design system [11](#0-10) 
- **Interactive Components**: Smooth animations and hover effects [12](#0-11) 
- **Quick Actions**: Dashboard utilities for common tasks [13](#0-12) 

## Technology Stack [14](#0-13) 

- **Frontend**: React 18.3.1 with TypeScript 5.5.3
- **Build Tool**: Vite 5.4.1
- **UI Framework**: Radix UI + shadcn/ui components
- **Styling**: Tailwind CSS 3.4.11 with custom design system
- **Routing**: React Router DOM 6.26.2
- **Icons**: Lucide React 0.462.0
- **Data Storage**: localStorage with custom React hooks
- **PWA**: Service Worker + Web App Manifest

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/fataakasyara/horizon.git
cd horizon
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## Project Structure [15](#0-14) 

```
src/
├── components/          # Reusable UI components
│   ├── EventCard.tsx   # Event display component
│   ├── EventForm.tsx   # Event creation/editing form
│   ├── QuickActions.tsx # Dashboard action buttons
│   └── ui/             # shadcn/ui components
├── pages/              # Application pages
│   ├── Dashboard.tsx   # Main event management interface
│   ├── Index.tsx       # Landing page
│   └── MobileDownload.tsx # PWA installation guide
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
└── App.tsx            # Main application component
```

## Usage

### Adding Events
1. Click the "+" button or use Quick Actions to add a new event [16](#0-15) 
2. Fill in event details including title, date, time, location, and category
3. Enable notifications if desired with custom timing options [17](#0-16) 
4. Save the event to see it in your dashboard

### Managing Events
- **View**: Events are displayed as cards with countdown timers [18](#0-17) 
- **Edit**: Click the edit button on any event card
- **Delete**: Click the delete button with confirmation prompt [19](#0-18) 
- **Filter**: Use search and category filters to find specific events [20](#0-19) 

### Installing as PWA
The app can be installed on mobile devices and desktops:
- **Android**: Use Chrome's "Add to Home Screen" option
- **iOS**: Use Safari's Share menu → "Add to Home Screen"
- **Desktop**: Look for the install prompt in supported browsers

## Data Management

The application uses localStorage for client-side data persistence: [21](#0-20) 

- Events are stored in `horizon-events` key
- Data exports are available in JSON format
- Automatic backup and restore functionality

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support and questions, visit the [Mobile Download page](src/pages/MobileDownload.tsx) for installation help or contact the development team.

---


## Notes

This README is based on the current codebase structure and features. The application implements a comprehensive event management system with modern PWA capabilities, focusing on offline functionality and mobile-first design. The custom Horizon theme uses purple and yellow gradients throughout the interface, and the component architecture follows React best practices with TypeScript for type safety.

Wiki pages you might want to explore:
- [Horizon Event Scheduler Overview (fataakasyara/horizon)](/wiki/fataakasyara/horizon#1)
- [Progressive Web App Features (fataakasyara/horizon)](/wiki/fataakasyara/horizon#2.1)
- [Core UI Components (fataakasyara/horizon)](/wiki/fataakasyara/horizon#4)
