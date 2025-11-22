import { baseApi } from "../../api/baseApi";

const teamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTeam: builder.mutation({
      query: (teamInfo) => ({
        url: "/team",
        method: "POST",
        body: teamInfo,
      }),
      invalidatesTags: ["Teams"],
    }),
    addTeamMember: builder.mutation({
      query: (teamMemberInfo) => ({
        url: "/member",
        method: "POST",
        body: teamMemberInfo,
      }),
      invalidatesTags: ["Teams"],
    }),
    getTeams: builder.query({
      query: () => ({
        url: "/team",
        method: "GET",
      }),
      providesTags: ["Teams"],
    }),
    getMembers : builder.query({
      query: () => ({
        url: `/member`,
        method: "GET",
      }),
      providesTags: ["Teams"],
    }),
    getTeamsByProjectId: builder.query({
      query: (projectId) => ({
        url: `/team/${projectId}`,
        method: "GET",
      }),
      providesTags: ["Teams"],
    }),
  }),
});

export const {
  useCreateTeamMutation,
  useAddTeamMemberMutation,
  useGetTeamsQuery,
  useGetTeamsByProjectIdQuery,
  useGetMembersQuery,
} = teamApi;
