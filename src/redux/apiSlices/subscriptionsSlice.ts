import { api } from "../api/baseApi";

const subscriptionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubscribers: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/subscription/all",
        };
      },
    }),

    getAllPackages: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/package",
        };
      },
      providesTags: ["Packages"],
    }),

    createPackage: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/package",
          body: data,
        };
      },
      invalidatesTags: ["Packages"],
    }),

    updatePackage: builder.mutation({
      query: ({ data, id }) => {
        return {
          method: "PATCH",
          url: `/package/${id}`,
          body: data,
        };
      },
      invalidatesTags: ["Packages"],
    }),
  }),
});

export const {
  useGetAllSubscribersQuery,
  useGetAllPackagesQuery,
  useCreatePackageMutation,
  useUpdatePackageMutation,
} = subscriptionsApi;
