import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            try {
                const sessionUser = await User.findOne({ email: session.user.email });

                if (sessionUser) {
                    session.user.id = sessionUser._id.toString();
                }

                return session;
            } catch (error) {
                console.error("Error fetching user session:", error);
                return session;
            }
        },

        async signIn({ account, profile, user, credentials }) {
            try {
                await connectToDB();

                // Check if the user already exists
                let userExists = await User.findOne({ email: profile.email });

                // If not, create a new user
                if (!userExists) {
                    // Create a new user with the provided credentials
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(/\s/g, "").toLowerCase(),
                        image: profile.picture,
                    });

                    // Fetch the newly created user
                    userExists = await User.findOne({ email: profile.email });
                }

                // Return user information
                return { email: userExists.email, username: userExists.username, image: userExists.image };
            } catch (error) {
                console.error("Error signing in:", error);
                return false;
            }
        }
    }
});

export {handler as GET ,handler as POST}
