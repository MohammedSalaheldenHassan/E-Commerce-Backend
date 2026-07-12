
import { prisma } from "../config/db.js";

// this function for adding product into the cart 
export const addToCart = async (req, res) => {
    const { product_id, quantity } = req.body;
    const userId = req.user.id;
    try {
        // to cheack if they are user or not
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }
        // to cheack if the user has a products in his cart 
        const product = await prisma.product.findUnique({
            where: {
                id: product_id
            }
        });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }
        
        let cart = await prisma.cart.findUnique({
            where:{user_id: userId}
        });
        if(!cart){
            cart = await prisma.cart.create({
                data:{
                    user_id : userId
                }
            })
        }
        const existingCartItem = await prisma.cartItems.findFirst({
            where:{
                cart_id: cart.id,
                product_id: product_id
            }
        })
        let cartItem;
        if (existingCartItem) {
            cart = await prisma.cartItems.update({
                where: {
                    id: existingCartItem.id
                },
                data: {
                    quantity: existingCartItem.quantity + quantity
                }
            });
        } else {
            cart = await prisma.cartItems.create({
                data: {
                    user_id: userId,
                    cart_id: cart.id,
                    product_id,
                    quantity
                }
            });
        }
        res.status(201).json({
            success: true,
            message: "Product added to cart successfully.",
            data: cart
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });
    }
};


// this function to call all product in the cart
export const getCart = async(req,res) => {
    const userId = req.user.id;

    try{
    const user = await prisma.user.findUnique({
        where:{id : userId}
    })
    if(!user){
        res.status(404).json({
            message: "User not found please login "
        })
    }

    const cart = await prisma.cart.findUnique({
        where:{user_id: userId},
        include:{
            items:{
                include:{
                    product: true,
                }
            }
        }
    });
    if(!cart || cart.items.length === 0){
        return res.status(400).json({
            message: "Cart is empty",
            data: []
        })
    }

    const total = cart.items.reduce((sum,item) => {return sum + number(item.product.price) * item.quantity;},0);
    res.status(200).json({
        success: true,
        date: cart.items,
        total
    })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message: "enternal error"
        })
    }
}

// to update the quantity for any product that in the cart
export const updateCartItem = async(req,res) => {
    const {cartItemId} = req.params;
    const {quantity} = req.body;
    try{
        const item = await prisma.cartItems.findUnique({
            where: {
                id: cartItemId,
            }
        });
        if(!item){
            return res.status(404).json({
                message: "Item not found"
            });
        }
        const product = await prisma.product.findUnique({
            where: {
                id: item.product_id,
            }
        });
        if(!product){
            return res.status(404).json({
                message: "Product not found"
            })
        }
        if(quantity <= 0){
            return res.status(400).json({
                message: "Quantity must be greater than zero"
            })
        }
        if(quantity > product.stock){
            return res.status(400).json({
                message: "Not enough stock available"
            });
        }
        const updateItem = await prisma.cartItems.update({
            where:{
                id: cartItemId
            },
            data:{
                quantity
            }
        });
        res.status(200).json({
            success: true,
            message: "Cart item updated successfully",
            data: updateItem
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

// to delete one item from the cart item
export const removeCartItem = async(req,res) => {
    const {deletedItem} = req.params;
    try{
        const item = await prisma.cartItems.findUnique({
            where:{
                id: deletedItem,
            }
        });
        if(!item){
            return res.status(404).json({
                message: "No item found"
            });
        }
        const removeItem = await prisma.cartItems.delete({
            where:{
                id: deletedItem
            }
        });
        res.status(200).json({
            success: true,
            message: "Cart item deleted successfully",
            data: removeItem
        });
    }catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

// to clear the cart from the items
export const cleanCart = async(req,res) => {
    const userId = req.user.id;
    try{
        const cart = await prisma.cart.findUnique({
            where: {
                user_id: userId
            }
        });
        if(!cart){
            return res.status(404).json({
                message: "Cart Not Found"
            });
        }
        await prisma.cartItems.deleteMany({
            where:{
                id: cart.id
            }
        });
        return res.status(200).json({
            success: true,
            message: "Cart cleared successfully",
            deletedItems: result.count
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}
