import { CART_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getCart: builder.query({
            query: () => ({
                // Specify the URL to fetch the cart data from
                url: CART_URL,
                // Use credentials with 'include' to send cookies with the request
                credentials: 'include',
            }),
            // Tags to invalidate or refetch related queries
            providesTags: ['Cart'],
        }),

        addToCart: builder.mutation({
            query: ({ productId, qty }) => ({
                // Specify the URL for the add to cart request
                url: CART_URL,
                method: "POST",
                // Include the product ID and quantity in the request body
                body: { productId, qty },
            }),
            // Invalidate the 'Cart' tag to refetch cart data after the mutation
            invalidatesTags: ['Cart'],
        }),

        removeFromCart: builder.mutation({
            query: ({ productId }) => ({
                // Specify the URL for removing an item from the cart
                url: CART_URL,
                method: "DELETE",
                // Include the product ID in the request body for removal
                body: { productId },
            }),
            // Invalidate the 'Cart' tag to refetch cart data after the mutation
            invalidatesTags: ['Cart'],
        }),

        updateCart: builder.mutation({
            query: ({ productId, qty }) => ({
                // Specify the URL for updating cart item quantity
                url: CART_URL,
                method: "PUT",
                // Include the product ID and updated quantity in the request body
                body: { productId, qty },
            }),
            // Invalidate the 'Cart' tag to refetch cart data after the mutation
            invalidatesTags: ['Cart'],
        }),
    }),
});

export const { useGetCartQuery, useAddToCartMutation, useRemoveFromCartMutation, useUpdateCartMutation } = cartApiSlice;
