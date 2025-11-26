import { api } from "../api/baseApi";

const brandAndModelSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBrands: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/brand",
        };
      },
    }),

    createBrand: builder.mutation({
      query: (formData: FormData) => {
        return {
          method: "POST",
          url: "/brand",
          body: formData,
        };
      },
    }),

    updateBrand: builder.mutation({
      query: ({ id, formData }: { id: string; formData: FormData }) => {
        return {
          method: "PATCH",
          url: `/brand/${id}`,
          body: formData,
        };
      },
    }),

    deleteBrand: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/brand/${id}`,
        };
      },
    }),

    // models

    getAllModels: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/models",
        };
      },
    }),

    createModel: builder.mutation({
      query: (model: { model: string; brand: string }) => {
        return {
          method: "POST",
          url: "/models",
          body: model,
        };
      },
    }),

    updateModel: builder.mutation({
      query: ({
        id,
        model,
      }: {
        id: string;
        model: { model: string; brand: string };
      }) => {
        return {
          method: "PATCH",
          url: `/models/${id}`,
          body: model,
        };
      },
    }),

    deleteModel: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/models/${id}`,
        };
      },
    }),
  }),
});

export const {
  useGetAllBrandsQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,

  //models
  useGetAllModelsQuery,
  useCreateModelMutation,
  useUpdateModelMutation,
  useDeleteModelMutation,
} = brandAndModelSlice;
