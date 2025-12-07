export const moviesApi = createApi({
    reducerPath: "moviesApi",

    baseQuery: fetchBaseQuery({
        baseUrl: "https://full-movie-site-backend-xyz.onrender.com/api/",
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
        }),
    }),
});
