import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import helmet from "helmet";
import morgan from "morgan";

//models import
import KPI from "./models/KPI.js";
import Product from "./models/Product.js";
import Transaction from "./models/Transaction.js";

import { kpis, products, transactions } from "./data/data.js";

//routes
import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/products.js";
import transactionsRoutes from "./routes/transactions.js";


//configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());

//routes
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transactions", transactionsRoutes);

//set up database
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then( async () => {
    app.listen(PORT, () => console.log(`server running at port: ${PORT}`))
    //await mongoose.connection.db.dropDatabase();
    //KPI.insertMany(kpis);
    //Product.insertMany(products);
    //Transaction.insertMany(transactions)
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});