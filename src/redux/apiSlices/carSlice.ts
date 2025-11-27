import { api } from "../api/baseApi";

const carSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    cars: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/car",
        };
      },
    }),

    getCarsById: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/car/${id}`,
        };
      },
    }),
  }),
});

export const { useCarsQuery, useGetCarsByIdQuery } = carSlice;
