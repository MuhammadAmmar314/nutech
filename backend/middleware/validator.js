import { check } from "express-validator";


export const insertValidator = () => {
    return [
        check('product_name').notEmpty().withMessage('product name is required'),
        check('buy_price').notEmpty().withMessage('buy price is required'),
        check('sell_price').notEmpty().withMessage('sell price is required'),
        check('stock').notEmpty().withMessage('stock is required')
    ]
}