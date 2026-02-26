import { api } from "../api/baseApi";

export interface Blog {
  _id: string;
  title: string;
  type: string;
  description: string;
  tags: string[];
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Banner {
  _id: string;
  image: string;
}

const blogSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query<{ data: Blog[] }, void>({
      query: () => {
        return {
          method: "GET",
          url: "/blog",
        };
      },
      providesTags: ["Blogs"],
    }),

    createBlog: builder.mutation<any, FormData>({
      query: (formData) => {
        return {
          method: "POST",
          url: "/blog",
          body: formData,
        };
      },
      invalidatesTags: ["Blogs"],
    }),

    updateBlog: builder.mutation<any, { id: string; formData: FormData }>({
      query: ({ id, formData }) => {
        return {
          method: "PATCH",
          url: `/blog/${id}`,
          body: formData,
        };
      },
      invalidatesTags: ["Blogs"],
    }),

    deleteBlog: builder.mutation<any, string>({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/blog/${id}`,
        };
      },
      invalidatesTags: ["Blogs"],
    }),

    //banner-management

    getAllBanners: builder.query<{ data: Banner[] }, void>({
      query: () => {
        return {
          method: "GET",
          url: "/banner",
        };
      },
      providesTags: ["Banners"],
    }),

    createBanner: builder.mutation<any, FormData>({
      query: (formData) => {
        return {
          method: "POST",
          url: "/banner",
          body: formData,
        };
      },
      invalidatesTags: ["Banners"],
    }),

    deleteBanner: builder.mutation<any, string>({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/banner/${id}`,
        };
      },
      invalidatesTags: ["Banners"],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,

  //banner
  useGetAllBannersQuery,
  useCreateBannerMutation,
  useDeleteBannerMutation,
} = blogSlice;
