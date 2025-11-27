import { api } from "../api/baseApi";

const userSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    admin: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/user?role=ADMIN",
        };
      },
    }),

    users: builder.query({
      query: () => {
        return {
          method: "GET",
          url: `/admin/user-list`,
        };
      },
      providesTags: ["Users"],
    }),

    dealers: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/admin/user-list?role=DEALER",
        };
      },
    }),

    sellers: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/admin/user-list?role=SELLER",
        };
      },
    }),

    userById: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/user/profile/${id}`,
        };
      },
    }),

    updateUserStatus: builder.mutation({
      query: ({ id }) => {
        return {
          method: "PATCH",
          url: `/user/toggle-user-lock/${id}`,
        };
      },
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useAdminQuery,
  useUsersQuery,
  useDealersQuery,
  useSellersQuery,
  useUserByIdQuery,
  useUpdateUserStatusMutation,
} = userSlice;
