import { baseApi } from "../../api/baseApi";

const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (projectInfo) => ({
        url: "/task",
        method: "POST",
        body: projectInfo,
      }),
      invalidatesTags: ["Tasks"],
    }),
    getTask: builder.query({
      query: () => ({
        url: "/task",
        method: "GET",
      }),
      providesTags: ["Tasks"],
    }),
  }),
});

export const { useCreateTaskMutation } = taskApi;
