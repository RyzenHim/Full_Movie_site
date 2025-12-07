import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const moviesApi = createApi({
    reducerPath: "moviesApi",

    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
    }),

    tagTypes: ["Movies", "Movie", "Reviews"],

    endpoints: (builder) => ({

        getMovies: builder.query({
            query: (params) => {
                const s = new URLSearchParams(params);
                return `movies?${s.toString()}`;
            },
            providesTags: ["Movies"],
        }),

        getMovieById: builder.query({
            query: (id) => `movies/${id}`,
            providesTags: (result, error, id) => [{ type: "Movie", id }],
        }),

        searchMovies: builder.query({
            query: (text) => `movies/search?q=${text}`,
        }),

        addReview: builder.mutation({
            query: ({ id, review }) => ({
                url: `movies/${id}/review`,
                method: "POST",
                body: review,
            }),
            invalidatesTags: ["Movies", "Movie", "Reviews"],
        }),
    }),
});

export const {
    useGetMoviesQuery,
    useGetMovieByIdQuery,
    useSearchMoviesQuery,
    useAddReviewMutation,
} = moviesApi;
