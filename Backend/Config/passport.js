import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../Models/User.js'; 

dotenv.config(); // Load environment variables from .env file

// Debugging - Log environment variables (remove in production)
//console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);
//console.log("Google Callback URL: /auth/google/callback");

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
      callbackURL: "http://localhost:5000/auth/google/callback", // Must match Google Cloud settings
    },
    async (accessToken, refreshToken, profile, done) => {
      try{
        // Check if user exists in DB or create new
      let user = await User.findOne({ googleId: profile.id });
      
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          username: profile.username,
          email: profile.emails[0].value,
          role: 'user', // Default role, adjust as needed
        });
        await user.save(); 
      }
      
      return done(null, user); // Attaches user to req.user
      }
      catch{
        //return done(error, null);
      }    
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