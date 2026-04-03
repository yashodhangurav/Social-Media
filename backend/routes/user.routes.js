import { Router } from "express";
import { register, login, uploadProfilePicture, updateUserProfile, getUserAndProfile, updateProfileData, getAllUserProfiles, downloadProfile, sentConnectionRequest, getMyConnectionRequests, whatAreMyConnections, acceptConnectionRequest } from "../controllers/user.controller.js";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({                //it is basically a storage to store the file in the disk and it has two parameters one is destination and another is filename, when we need to small data we use such type of storage and when we need to store large data we use memory storage
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.route("/upload_profile_picture").post(upload.single("profile_picture"), uploadProfilePicture);

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update_profile").post(updateUserProfile);
router.route("/get_user_and_profile").get(getUserAndProfile);

router.route("/update_profile_data").post(updateProfileData)
router.route("/get_all_users").get(getAllUserProfiles);
router.route("/user/download_resume").get(downloadProfile);
router.route("/user/send_connection_request").post(sentConnectionRequest);
router.route("/user/my_connection_requests").get(getMyConnectionRequests);
router.route("/user/what_are_my_connections").get(whatAreMyConnections);
router.route("/user/accept_connection_request").post(acceptConnectionRequest);


export default router;