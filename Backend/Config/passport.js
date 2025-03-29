import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../Models/User.js'; 

// Debugging - Log environment variables (remove in production)
console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);
console.log("Google Callback URL:", process.env.GOOGLE_CALLBACK_URL);

// Ensure required environment variables exist
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET ) {
  console.error("❌ Missing Google OAuth environment variables!");
  process.exit(1); // Stop execution if variables are missing
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback", // Must match Google Cloud settings
    },
    async (accessToken, refreshToken, profile, done) => {
      // Check if user exists in DB or create new
      let user = await User.findOne({ googleId: profile.id });
      
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          username: profile.username,
          email: profile.emails[0].value,
          role: 'user', // Default role, adjust as needed
        });
      }
      
      return done(null, user); // Attaches user to req.user
    }
  )
);

// Serialize user into session
passport.serializeUser((user, done) => done(null, user.id));

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    console.error("❌ Error deserializing user:", error);
    done(error, null);
  }
});

export default passport;