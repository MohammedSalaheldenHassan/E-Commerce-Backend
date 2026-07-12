import {prisma} from '../config/db.js'

export const authorize = (...roles) => {
    return async (req, res, next) => {
        try {
            const user = await prisma.user.findUnique({
                where: { id: req.user.id },
                select: { role: true },
            });

            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                });
            }

            if (!roles.includes(user.role)) {
                return res.status(403).json({
                    message: "Access denied.",
                });
            }

            next();
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    };
};