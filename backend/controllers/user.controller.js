import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import PDFDocument from "pdfkit";
import fs from "fs";
import ConnectionRequest from "../models/connections.model.js";



const convertUserDataToPDF = async (userData) => {
    const doc = new PDFDocument();

    const outputPath = crypto.randomBytes(32).toString("hex") + ".pdf"; // Generate random PDF name
    const stream = fs.createWriteStream("uploads/" + outputPath);

    doc.pipe(stream);

    // ---------- IMAGE PATH ----------
    let imagePath = "uploads/default.jpg";

    if (userData.userId.profilePicture) {
        const possiblePath = "uploads/" + userData.userId.profilePicture;

        if (fs.existsSync(possiblePath)) {
            imagePath = possiblePath;
        }
    }

    doc.image(imagePath, {
        fit: [150, 150],
        align: "center",
        valign: "center"
    });

    doc.moveDown();

    // ---------- USER BASIC INFO ----------
    doc.fontSize(20).text(`Name: ${userData.userId.name}`, { align: "center" });

    doc.moveDown(0.5);
    doc.fontSize(14).text(`Username: ${userData.userId.username}`, { align: "center" });

    doc.moveDown(0.5);
    doc.fontSize(14).text(`Email: ${userData.userId.email}`, { align: "center" });

    doc.moveDown();

    // ---------- PROFILE INFO ----------
    doc.fontSize(14).text(`Bio: ${userData.bio || "N/A"}`);
    doc.fontSize(14).text(`Current Position: ${userData.currentPosition || "N/A"}`);
    doc.fontSize(14).text(`Skills: ${userData.skills || "N/A"}`);

    doc.moveDown();

    // ---------- WORK EXPERIENCE ----------
    doc.fontSize(16).text("Past Work Experience", { underline: true });

    if (userData.pastWork && userData.pastWork.length > 0) {

        userData.pastWork.forEach((work) => {

            doc.moveDown(0.5);
            doc.fontSize(14).text(`Company Name: ${work.companyName || "N/A"}`);
            doc.fontSize(14).text(`Position: ${work.position || "N/A"}`);
            doc.fontSize(14).text(`Experience: ${work.experience || "N/A"}`);
            doc.fontSize(14).text(`Years: ${work.years || "N/A"}`);

        });

    } else {
        doc.fontSize(14).text("No work experience added.");
    }

    doc.end();

    return outputPath;
};

export const register = async (req, res) => {
    try {
        const { name, email, password, username } = req.body;
        if (!name || !email || !password || !username) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({
            email
        })

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);     //  Hash the password before saving to the database
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            username
        });
        await newUser.save();

        const profile = new Profile({
            userId: newUser._id,
        });

        await profile.save();
        return res.json({ message: "User created successfully" });

    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}


// --------------------LOGIN------------------------
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({
            email
        })
        if (!user) {
            return res.status(404).json({ message: "user does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);    //  Compare the provided password with the hashed password in the database
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = crypto.randomBytes(32).toString("hex");    //  Generate a random token for authentication (it will reduce the friction to login again and again, )

        await User.updateOne({ _id: user._id }, { token });    //  Save the token in the database for the user

        return res.json({ message: "Login successful", token: token });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const uploadProfilePicture = async (req, res) => {

    const { token } = req.body;                   //by this token we can identify the user and then we can update the profile picture for that user

    try {
        const user = await User.findOne({ token: token });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.profilePicture = req.file.filename;    //  Update the profile picture in the database for the user

        await user.save();
        return res.json({ message: "Profile picture uploaded successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};


// ----------------------------------------UPDATE USER PROFILE------------------------

export const updateUserProfile = async (req, res) => {
    try {
        const { token, ...newUserData } = req.body;
        const user = await User.findOne({ token: token });
        const { username, email } = newUserData;

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            if (existingUser || String(existingUser._id) !== String(user._id)) {
                return res.status(400).json({ message: "Username or email already exists" });
            }
        }
        Object.assign(user, newUserData);       //  Update the user data in the database for the user

        await user.save();

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};


// ----------------------------------------GET USER AND PROFILE------------------------

export const getUserAndProfile = async (req, res) => {
    try {
        const { token } = req.body;
        const user = await User.findOne({ token: token });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userProfile = await Profile.findOne({ userId: user._id }).populate("userId", "name email username profilePicture");   //  Populate the user data in the profile data
        return res.json({ userProfile });

    } catch (error) {
        return res.status(500).json({ message: "Iternal server error" });
    }
};


// ----------------------------------UPDATE PROFILE DATA-----------------------

export const updateProfileData = async (req, res) => {
    try {
        const { token, ...newProfileData } = req.body;
        const userProfile = await User.findOne({ token: token });
        if (!userProfile) {
            return res.status(404).json({ message: "User not found" });
        }

        const profile_to_update = await Profile.findOne({ userId: userProfile._id });             //we can get the profile access only by getting the user access by token

        Object.assign(profile_to_update, newProfileData);   //  Update the profile data in the database for the user

        await profile_to_update.save();
        return res.json({ message: "Profile updated successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

// ---------------------------------GET ALL USER PROFILE-------------------------------
export const getAllUserProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find().populate("userId", "name email username profilePicture");   //  Populate the user data in the profile data
        return res.json({ profiles });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};



// ---------------------------------------------------DOWNLOAD RESUME-------------------------------------------------

export const downloadProfile = async (req, res) => {
    const userId = req.query.id;            //we can download the resume by getting the user id from the query parameters

    const userProfile = await Profile.findOne({ userId: userId }).populate("userId", "name email username profilePicture");   //  Populate the user data in the profile data

    let outputPath = await convertUserDataToPDF(userProfile);     //  Convert the user data to PDF format

    return res.json({ "message": outputPath });
}


// --------------------------CONNECTION RWQUEST----------------------

export const sentConnectionRequest = async (req, res) => {
    const { token, connectionid } = req.body;

    try {
        const user = await User.findOne({ token })


        const connectionUser = await User.findOne({ _id: connectionid });
        if (!connectionUser) {
            return res.status(404).json({ message: "Connection user not found" });
        }

        const existingRequest = await ConnectionRequest.findOne(
            {
                userId: user._id,
                connectionId: connectionUser._id
            }
        )
        if (existingRequest) {
            return res.status(400).json({ message: "Connection user not found" });
        }

        const request = new ConnectionRequest({
            userId: user._id,
            connectionId: connectionUser._id
        })

        await request.save();
        return res.json({ message: "Connection request sent successfully" });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}


// getting all our conections logic (to whom we have sent the request)

export const getMyConnectionRequests = async (req, res) => {
    try {
        const { token } = req.body;
        const user = await User.findOne({ token })
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const connections = await ConnectionRequest.find({ userId: user._id }).populate("connectionId", "name email username profilePicture");
        return res.json({ connections });
    }


    catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const whatAreMyConnections = async (req, res) => {
    const { token } = req.body;
    const user = await User.findOne({ token })
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const connections = await ConnectionRequest.find({ connectionId: user._id }).populate("userId", "name email username profilePicture");
    return res.json(connections);
}


// Accept the connection request

export const acceptConnectionRequest = async (req, res) => {
    const { token, connectionid, action_type } = req.body;
    try {
        const user = await User.findOne({ token });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const connectionUser = await User.findOne({ _id: connectionid });
        if (!connectionUser) {
            return res.status(404).json({ message: "Connection user not found" });
        }

        const connection = await ConnectionRequest.findOne({
            userId: connectionUser._id,
            connectionId: user._id
        });

        if (!connection) {
            return res.status(404).json({ message: "Connection request not found" });
        }

        if (action_type === "accept") {
            connection.status_accepted = true;
        } else {
            connection.status_accepted = false;
        }

        await connection.save();
        return res.json({ message: "Connection request updated" });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}


// -------------------------------COMMENT ON POSTS--------------------------------------

export const commentPost = async (req, res) => {
    const { token, post_id, commentBody } = req.body;
    try {
        const user = await User.findOne({ token: token });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const post = await Post.findOne({ _id: post_id });
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        const comment = new Comment({
            userId: user._id,
            postId: post._id,
            comment: commentBody
        });
        await comment.save();
        return res.json({ message: "Comment added successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}