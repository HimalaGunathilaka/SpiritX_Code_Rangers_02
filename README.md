# SpiritX Fantasy Cricket

A fantasy cricket platform for university cricket tournaments built with Next.js, TypeScript, and MongoDB.

## 🎯 Features

- **User Authentication**
  - Email/Password registration and login
  - Google OAuth integration
  - Secure password reset functionality

- **Team Management**
  - Create and manage your fantasy cricket team
  - Select players from different universities
  - Dynamic budget management system
  - Player statistics tracking
  - Captain and Vice-captain selection

- **Player Categories**
  - Batsmen
  - Bowlers
  - All-Rounders
  - Wicket Keepers

- **Live Statistics**
  - Real-time point calculations
  - Player performance tracking
  - Team rankings
  - Match statistics

- **User Dashboard**
  - Team overview
  - Budget tracking
  - Points history
  - Upcoming matches

## 🚀 Tech Stack

- **Frontend**
  - Next.js 13 (App Router)
  - TypeScript
  - Tailwind CSS
  - NextAuth.js for authentication
  - React Hot Toast for notifications

- **Backend**
  - Node.js
  - MongoDB with Mongoose
  - Next.js API Routes

- **Authentication**
  - NextAuth.js
  - Google OAuth
  - JWT tokens

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/HimalaGunathilaka/SpiritX_Code_Rangers_02.git
   cd spirit11
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with the following:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. Run the development server:
   Run admin, spirits, and bot server separately.
   ```bash
   npm run dev
   ```

## 📝 Project Structure

```
spirit11/
├── app/
│   ├── (pages)/
│   │   ├── (user)/
│   │   │   ├── create-team/
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   ├── team/
│   │   │   └── user/
│   ├── api/
│   │   ├── auth/
│   │   ├── user/
│   │   └── ...
│   ├── models/
│   │   ├── user.ts
│   │   └── player.ts
│   └── lib/
├── public/
└── ...
```

## 🎮 Usage

1. **Sign Up/Login**
   - Create an account using email/password
   - Or sign in with Google
   - Set up your team name

2. **Create Team**
   - Select players within budget constraints
   - Balance team composition
   - Choose captain and vice-captain

3. **Manage Team**
   - Track player performance
   - Make transfers
   - Monitor budget and points

4. **View Statistics**
   - Check player statistics
   - View team rankings
   - Monitor match performances

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- MongoDB team for the database
- All contributors and supporters of the project


Made with ❤️ for SpiritX Competition
