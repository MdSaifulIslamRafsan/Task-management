import { baseApi } from "../../api/baseApi";

const reassignmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    autoReassignTasks: builder.mutation({
      query: () => ({
        url: "/reassignment/auto-reassign",
        method: "POST",
      }),
      invalidatesTags: ["Tasks", "Teams", "Activity", "Dashboard"],
    }),
  }),
});

export const { useAutoReassignTasksMutation } = reassignmentApi;
