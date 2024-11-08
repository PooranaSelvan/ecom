import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

// BASE_URL athula enoda https://localhost:5000 port la run aagura server ooda url
const baseQuery = fetchBaseQuery({
    baseUrl:BASE_URL,
    credentials: 'include'
});


export const apiSlice = createApi({
    baseQuery: baseQuery,
    endpoints: (builder) => ({}), // ithukulla namma endpoints aa push panna porom dynamic aa
});