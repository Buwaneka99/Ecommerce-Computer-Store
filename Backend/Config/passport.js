import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../Models/User.js'; 

dotenv.config(); // Load environment variables from .env file

// Ensure required environment variables exist
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.error("❌ Missing Google OAuth environment variables!");
  process.exit(1); // Stop execution if variables are missing
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback", 
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo" // Add this line to ensure proper profile fetching
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        //console.log("Google profile:", profile); // Debug profile data
        
        // Check if user exists in DB or create new
        let user = await User.findOne({ googleId: profile.id });
        
        if (!user) {
          // Create new user with data from Google profile
          user = await User.create({
            googleId: profile.id,
            username: profile.displayName || 'Google User',
            email: profile.emails && profile.emails[0] ? profile.emails[0].value : 'noemail@example.com',
            role: 'user', // Default role
          });
        }
        
        return done(null, user);
      }
      catch (error) {
        console.error("Error in Google auth strategy:", error);
        return done(error, null);
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