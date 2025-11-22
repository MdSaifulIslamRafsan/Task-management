import { baseApi } from "../../api/baseApi";

const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (projectInfo) => ({
        url: "/task",
        method: "POST",
        body: projectInfo,
      }),
      invalidatesTags: ["Tasks", "Teams"],
    }),
    getTask: builder.query({
      query: (projectId = "") => ({
        url: "/task",
        method: "GET",
        params: projectId ? { projectId } : {},
      }),
      providesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `/task/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks", "Teams"],
    }),
  }),
});

export const { useCreateTaskMutation, useGetTaskQuery,  useDeleteTaskMutation } = taskApi;
