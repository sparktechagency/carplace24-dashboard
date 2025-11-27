import { api } from "../api/baseApi";

const publicSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAboutUs: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/rule/about",
        };
      },
      providesTags: ["AboutUs"],
    }),

    updateAboutUs: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/rule/about",
          body: data,
        };
      },
      invalidatesTags: ["AboutUs"],
    }),

    getPrivacyPolicy: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/rule/privacy-policy",
        };
      },
      providesTags: ["PrivacyPolicy"],
    }),

    updatePrivacyPolicy: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/rule/privacy-policy",
          body: data,
        };
      },
      invalidatesTags: ["PrivacyPolicy"],
    }),

    getTermsAndConditions: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/rule/terms-and-conditions",
        };
      },
      providesTags: ["TermsAndConditions"],
    }),

    updateTermsAndConditions: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/rule/terms-and-conditions",
          body: data,
        };
      },
      invalidatesTags: ["TermsAndConditions"],
    }),

    //faq
    getFaq: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/faq",
        };
      },
      providesTags: ["Faq"],
    }),

    createFaq: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/faq",
          body: data,
        };
      },
      invalidatesTags: ["Faq"],
    }),

    updateFaq: builder.mutation({
      query: (data) => {
        return {
          method: "PATCH",
          url: `/faq/${data._id}`,
          body: data,
        };
      },
      invalidatesTags: ["Faq"],
    }),

    deleteFaq: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/faq/${id}`,
        };
      },
      invalidatesTags: ["Faq"],
    }),
  }),
});

export const {
  // AboutUs
  useGetAboutUsQuery,
  useUpdateAboutUsMutation,

  // PrivacyPolicy
  useGetPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,

  // TermsAndConditions
  useGetTermsAndConditionsQuery,
  useUpdateTermsAndConditionsMutation,

  // Faq
  useGetFaqQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = publicSlice;
