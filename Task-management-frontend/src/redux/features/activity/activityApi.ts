import { baseApi } from "../../api/baseApi";

const activityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getActivity: builder.query({
      query: () => ({
        url: "/activity",
        method: "GET",
      }),
      providesTags: ["Activity"],
    }),
  }),
});

export const { useGetActivityQuery } = activityApi;
