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
  }),
});

export const { useCarsQuery } = carSlice;
