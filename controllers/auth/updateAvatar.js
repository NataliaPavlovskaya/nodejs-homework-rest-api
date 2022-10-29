const fs = require("fs/promises")
const path = require("path")
const Jimp = require("jimp");

const {User} = require("../../models/user")

const avatarsDir = path.join(__dirname, "../../", "public", "avatars")

const updateAvatar = async(req, res)=> {
    try {
        const {_id} = req.user;
        const {path: tempUpload, originalname} = req.file;
        const extention = originalname.split(".").pop();
        const filename = `${_id}.${extention}`;
        const resultUpload = path.join(avatarsDir, filename);
        const image = await Jimp.read(tempUpload);
        image.resize(250, 250).quality(60).writeAsync(tempUpload);
        await fs.rename(tempUpload, resultUpload);
        const avatarURL = path.join("avatars", filename);
        await User.findByIdAndUpdate(_id, {avatarURL});
        res.json({
            avatarURL,
        });
    }catch (error) {
        console.log(error)
    }
}
module.exports = updateAvatar;



// Jimp.read("avatars", filename)
//   .then(filename => {
//     return filename
//       .resize(250, 250) // resize
//       .quality(60) // set JPEG quality
//       .greyscale() // set greyscale
//       .write('lena-small-bw.jpg'); // save
//   })
//   .catch(err => {
//     console.error(err);
//   });
// // await fs.unlink(tempUpload);