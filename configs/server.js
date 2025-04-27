'use strict'

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import swaggerUi from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc";
import { dbConnection } from "./mongo.js"
import apiLimiter from "../src/middlewares/rate-limit-validator.js"
import authRoutes from "../src/auth/auth.routes.js"
import userRoutes from "../src/user/user.routes.js"
import productRoutes from "../src/product/product.routes.js"
import supplierRoutes from "../src/supplier/supplier.routes.js"
import clientRoutes from "../src/client/client.routes.js"
import { crearAdministrador } from "../src/user/user.controller.js"
import movementRoutes from "../src/movements/movement.routes.js"

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "BackWarehouse API Documentation",
        version: "1.0.0",
        description: "Documentación de la API para BackWarehouse",
    },
    servers: [
        {
            url: `http://localhost:${process.env.PORT || 3001}`,
            description: "Servidor local",
        },
    ],
};

const swaggerOptions = {
    swaggerDefinition,
    apis: ["./src/**/*.routes.js"], 
};// Ruta a los archivos de rutas donde se encuentran las anotaciones de Swagger};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(apiLimiter);

    // Configuración de Swagger
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

const routes = (app) => {
    app.use("/backWarehouse/v1/auth", authRoutes);
    app.use("/backWarehouse/v1/user", userRoutes);
    app.use("/backWarehouse/v1/product", productRoutes);
    app.use("/backWarehouse/v1/supplier", supplierRoutes);
    app.use("/backWarehouse/v1/client", clientRoutes);
    app.use("/backWarehouse/v1/movement", movementRoutes);
};

const conectarDB = async () => {
    try {
        await dbConnection();
        await crearAdministrador();
    } catch (err) {
        console.log(`Database connection failed: ${err}`);
        process.exit(1);
    }
};

export const initServer = () => {
    const app = express();
    try {
        middlewares(app);
        conectarDB();
        routes(app);
        app.listen(process.env.PORT);
        console.log(`Server running on port ${process.env.PORT}`);
        console.log(`Swagger docs available at http://localhost:${process.env.PORT}/api-docs`);
    } catch (err) {
        console.log(`Server init failed: ${err}`);
    }
};