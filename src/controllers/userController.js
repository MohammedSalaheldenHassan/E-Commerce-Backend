
import {prisma} from '../config/db.js';

export const getProfile = async (req, res) => {
    const userId = req.user.id;
    try{
        const profile = await prisma.user.findUnique({
            where:{
                id: userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            }
        });
        if(!profile){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: profile
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const updateProfile = async (req, res) => {
    const {newName, newEmail} = req.body;
    const userId = req.user.id;
    try{
        const checkEmail = await prisma.user.findUnique({
            where: {email: newEmail}
        });
        if(checkEmail && checkEmail.id !== userId){
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }
        const update = await prisma.user.update({
            where:{
                id: userId
            },
            data: {
                name: newName,
                email: newEmail
            }
        });
        return res.status(200).json({
            success: true,
            message: "Information updated successfully",
            data: update
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const deleteProfile = async (req, res) => {
    const userId = req.user.id;
    try{
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const removeAccount = await prisma.user.delete({
            where: {
                id: userId
            }
        });
        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const changePassword = async (req, res) => {
    const {currentPassword, newPassword} = req.body;
    const userId = req.user.id;
    try{
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        if(newPassword.length < 8){
            return res.status(400).json({
                success:false,
                message:"Password must be at least 8 characters"
            });
        }
        const isSamePassword  = await bcrypt.compare(currentPassword,user.password);
        if(isSamePassword ){
            return res.status(401).json({
                success: false,
                message: "New password must be different from current password"
            });
        }
        const isNewPasswordSame   = await bcrypt.compare(newPassword,user.password);
        if(isNewPasswordSame ){
            return res.status(401).json({
                success: false,
                message: "New password must be different from current password"
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword,salt);
        const updatePassword = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                password: hashPassword
            }
        });
        return res.status(200).json({
            success: true,
            message: "Password updated successfully"
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}
