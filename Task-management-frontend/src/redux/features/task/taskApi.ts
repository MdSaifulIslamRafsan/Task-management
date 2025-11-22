
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
    updateTask: builder.mutation({
      query: ({ taskId, ...updatedInfo }) => ({
        url: `/task/${taskId}`,
        method: "PUT",
        body: updatedInfo,
      }),
      invalidatesTags: ["Tasks", "Teams"],
    }),
    getTaskById: builder.query({
      query: (taskId) => ({
        url: `/task/${taskId}`,
        method: "GET",
      }),
      providesTags: ["Tasks"],
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useGetTaskQuery,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useGetTaskByIdQuery,
} = taskApi;
