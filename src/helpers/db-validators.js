import User from "../user/user.model.js"
import Product from "../product/product.model.js"
import Supplier from "../supplier/supplier.model.js"
import Client from "../client/client.model.js"

export const emailExists = async (email = "") => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const userExists = async (uid = " ") => {
    const existe = await User.findById(uid)
    console.log(existe)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }
}

export const nameProductExists = async (nameProduct = "") => {
    const existe = await Product.findOne({nameProduct})
    if(existe){
        throw new Error(`The product name ${nameProduct} is already registered`)
    }
}

export const emailSupplierExists = async (emailSupplier = "") => {
    const existe = await Supplier.findOne({emailSupplier})
    if(existe){
        throw new Error(`The supplier email ${emailSupplier} is already registered `)
    }
}

export const contactSupplierExists = async (contactSupplier = "") => {
    const existe = await Supplier.findOne({contactSupplier})
        if(existe){
            throw new Error(`The supplier contact ${contactSupplier} is already registered`)
    }
}

export const nameClientExists = async (nameClient = "") => {
    const existe = await Client.findOne({nameClient})
    if(existe){
        throw new Error(`The client name ${nameClient} is already registered`)
    }
}