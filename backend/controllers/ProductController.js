import { validationResult } from "express-validator";
import fs from "fs";
import path from "path";
import Product from "../models/ProductModel.js";

export const getProducts = async(req,res)=>{
    try {
        const response = await Product.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getProductById = async(req,res)=>{
    try {
        const response = await Product.findOne({
            where : {
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveProduct = (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            errors : errors.array()
        });
    }
    
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const product_image = req.files.product_image;
    const fileSize = product_image.data.length;
    const ext = path.extname(product_image.name);
    const fileName = product_image.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg'];

    const product_name = req.body.product_name;
    const buy_price = req.body.buy_price;
    const sell_price = req.body.sell_price;
    const stock = req.body.stock;
    
    //validation for image
    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
    if(fileSize > 100000) return res.status(422).json({msg: "Image must be less than 100KB"});

    product_image.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Product.create({
                product_image: fileName,
                product_name: product_name,
                url: url,
                buy_price: buy_price,
                sell_price: sell_price,
                stock: stock
            });
            res.status(201).json({msg:"Product Created Successfully"});
        } catch (error) {
            console.log(error.message);
        }
    })
}

export const updateProduct = async(req,res)=>{
    const product = await Product.findOne({
        where : {
            id : req.params.id
        }
    });
    if(!product) return res.status(404).json({msg:"No Data Found"});
    let fileName = "";
    if(req.files === null){
        fileName = Product.product_image;
    } else{
        const product_image = req.files.product_image;
        const fileSize = product_image.data.length;
        const ext = path.extname(product_image.name);
        fileName = product_image.md5 + ext;
        const allowedType = ['.png', '.jpg'];

        //validation for image
        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
        if(fileSize > 100000) return res.status(422).json({msg: "Image must be less than 100KB"});

        //delete old image on local
        const filepath = `./public/images/${product.product_image}`;
        fs.unlinkSync(filepath);

        //update image and store the image on local
        product_image.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        })
    }
    const product_name = req.body.product_name;
    const buy_price = req.body.buy_price;
    const sell_price = req.body.sell_price;
    const stock = req.body.stock;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    try {
        await Product.update({
            product_image: fileName,
            product_name: product_name,
            url: url,
            buy_price: buy_price,
            sell_price: sell_price,
            stock: stock
        },{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg:"Product Updated Successfully"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteProduct = async(req,res)=>{
    const product = await Product.findOne({
        where : {
            id : req.params.id
        }
    });
    if(!product) return res.status(404).json({msg:"No Data Found"});
    try {
        const filepath = `./public/images/${product.product_image}`;
        fs.unlinkSync(filepath);
        await Product.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg:"Product Deleted Successfully"});
    } catch (error) {
        console.log(error.message);
    }
}