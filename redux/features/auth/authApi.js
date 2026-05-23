import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setUser } from "./authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: "include",
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ["Auth"],

  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ phone, password, userType }) => ({
        url: "/auth/login",
        method: "POST",
        body: {
          phone,
          password,
          userType,
        },
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          const user = data?.data?.user || data?.data || null;

          if (user) {
            dispatch(setUser(user));
          }
        } catch {
          dispatch(logout());
        }
      },

      invalidatesTags: ["Auth"],
    }),

    getMe: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          const user = data?.data?.user || data?.data || null;

          if (user) {
            dispatch(setUser(user));
          }
        } catch {
          dispatch(logout());
        }
      },

      providesTags: ["Auth"],
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          dispatch(logout());
        }
      },

      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetMeQuery,
  useLogoutUserMutation,
} = authApi;