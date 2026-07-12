import {prisma} from '../config/db.js';
import bcrypt from "bcryptjs";
import { generateToken } from '../utils/generateToken.js';
import { date } from 'yup';

export const createAccount = async(req,res)=>{
    const {name, email, password,role} = req.body;
    try{
        const user = await prisma.user.findUnique({
            where:{
                email: email,
            }
        });
        if(user){
            res.status(400).json({
                success: false,
                message:"email already exist"
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        
        const newAccount = await prisma.user.create({
            data:{
                name,
                email,
                password: hashPassword,
                role
            },
            
        });
        const token = generateToken(newAccount.id,res);
        res.status(200).json({
            status:"user added",
            Date:{
                newAccount:{
                    name: name,
                    email: email
                },
                token
        }
        });
    }catch(err){
        res.status(400).json(err)
    }
}


export const login = async (req,res)=>{
    const {email,password} = req.body;
    const user = await prisma.user.findUnique({
        where:{email:email}
    });
    if(!user){
        res.status(401).json({
            message:"Invalid email or password"
        });
    }

    const isInvalidPassword = await bcrypt.compare(password,user.password);
    if(!isInvalidPassword){
        res.status(401).json({
            message:"Invalid email or password"
        });
    }
    const token = generateToken(user.id,res);
    res.status(200).json({
        status:"Loged in secces",
        Date:{
            user:{
                id: user.id,
                name:user.name,
                email: email
            },
            token,
        }
    })

}

export const logout = async (req,res)=>{
    res.cookie("jwt", "",{
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({
        status: "success",
        message: "Logged out successfully"
    });
}