import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";


const options = {

    definition: {

        openapi: "3.0.0",

        info: {

            title: "E-Commerce API",

            version: "1.0.0",

            description:
            "Complete E-Commerce REST API built with Node.js, Express, Prisma and PostgreSQL"

        },

        servers:[
            {
                url:"http://localhost:8080/",
                description:"Local server"
            }
        ]

    },

    apis:[
        "./src/routes/*.js"
    ]

};


const swaggerSpec = swaggerJsdoc(options);


export {
    swaggerUi,
    swaggerSpec
};