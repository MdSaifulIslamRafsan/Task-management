import { baseApi } from "../../api/baseApi";

const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (projectInfo) => ({
        url: "/project",
        method: "POST",
        body: projectInfo,
      }),
      invalidatesTags: ["Projects"],
    }),
    getProjects: builder.query({
      query: () => ({
        url: "/project",
        method: "GET",
      }),
      providesTags: ["Projects"],
    }),
  }),
});

export const { useCreateProjectMutation, useGetProjectsQuery } = projectApi;
