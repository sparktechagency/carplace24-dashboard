import { api } from "../api/baseApi";

const dashboardSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    generalStats: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/admin/count-summary",
        };
      },
    }),

    revenueStats: builder.query({
      query: () => {
        return {
          method: "GET",
          url: `admin/revenue-statistics`,
        };
      },
    }),

    userStatistics: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/admin/user-statistics  ",
        };
      },
    }),

    totalSubscribers: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/admin/totalSubscriber",
        };
      },
    }),
  }),
});

export const {
  useGeneralStatsQuery,
  useRevenueStatsQuery,
  useUserStatisticsQuery,
  useTotalSubscribersQuery,
} = dashboardSlice;
