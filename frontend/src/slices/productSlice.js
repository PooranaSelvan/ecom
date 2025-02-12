import {PRODUCT_URL} from "../constants";
import { apiSlice } from "./apiSlice";

// apiSlice.injectEndpoints ithu kulla namma endpoints inject panrom athu apiSlice la iruthu varuthu
export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // getProducts - itha call panna athula db la irukura ela products uhm return pannum
        getProducts: builder.query({
            query:() => ({
                // getProducts - stores the products data from the db.
                url:PRODUCT_URL
            })
        }),
        // getProductDetail - itha call panna athu req.params.id vachu id ku suit aana product aa return pannum
        getProductDetail:builder.query({
            query:(productId) => ({
                // same as above but ithula productId uhm kooda pass panrom for product page
                url:`${PRODUCT_URL}/${productId}`
            })
        }),
    })
});

// namma mela paniruka renduthayum inga export panrom [use--Query] ithkulla thaa namma export panra antha method name podanum
export const { useGetProductsQuery, useGetProductDetailQuery } = productsApiSlice;