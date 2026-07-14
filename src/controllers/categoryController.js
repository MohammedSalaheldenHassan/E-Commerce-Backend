
import { prisma } from "../config/db.js";

export const createCategory = async(req,res) => {
    const {image_url, name} = req.body;
    try{
        const findCategory = await prisma.category.findUnique({
            where: {
                name: name
            }
        })
        if(findCategory){
            return res.status(409).json({
                message: "Category already exists",
            });
        }
        const newCategory = await prisma.category.create({
            data: {
                image_url,
                name
            }
        });
        return res.status(201).json({
            success: true,
            message: "Category Created Successfully",
            data: newCategory
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const getcategory = async(req, res) =>{
    try{
        const categories = await prisma.category.findMany();
        if(categories.length === 0){
            return res.status(404).json({
                message: "No category found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Categories fetched successfully",
            data: categories
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const getCategoryById = async (req,res) =>{
    const {categoryId} = req.params;
    try{
        const categoryById = await prisma.category.findUnique({
            where:{id: categoryId}
        });
        if(!categoryById){
            return res.status(404).json({
                message: "Category not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Category fetched successfully",
            data: categoryById,
            
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

export const updateCategory = async(req,res) =>{
    const { image_url, name} = req.body;
    const {categoryId} = req.params;
    try{
        const findCategory = await prisma.category.findUnique({
            where: {id: categoryId}
        })
        if(!findCategory){
            return res.status(404).json({
                message: "Category not found"
            });
        }
        const categoryUpdate = await prisma.category.update({
            where: {id: categoryId},
            data:{
                image_url,
                name
            }
        })
        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: categoryUpdate
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const deleteCategory = async(req,res) => {
    const { categoryId } = req.params;
    try{
        const findCategory = await prisma.category.findUnique({
            where: {
                id: categoryId
            }
        });
        if(!findCategory){
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }
        const removeCategory = await prisma.category.delete({
            where: {
                id: categoryId
            }
        });
        return res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            data: removeCategory
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}