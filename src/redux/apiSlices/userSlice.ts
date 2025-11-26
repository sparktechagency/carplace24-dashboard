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
    }),

    dealers: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/admin/user-list?role=DEALER",
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
  }),
});

export const {
  useAdminQuery,
  useUsersQuery,
  useDealersQuery,
  useUserByIdQuery,
} = userSlice;
