import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    getAdminStats,
    getPendingCreators,
    approveCreator,
    rejectCreator,getAllCreators,getAllFans,
    getMemberships,
} from "@/services/admin.service";

export function useAdminStats() {
    return useQuery({
        queryKey: ["admin-stats"],
        queryFn: getAdminStats,
    });
}

export function usePendingCreators() {
    return useQuery({
        queryKey: ["pending-creators"],
        queryFn: getPendingCreators,
    });
}

export function useApproveCreator() {

    const queryClient =
        useQueryClient();

   return useMutation({

    mutationFn: approveCreator,

    onSuccess: () => {

        queryClient.invalidateQueries({
            queryKey: ["pending-creators"],
        });

        queryClient.invalidateQueries({
            queryKey: ["admin-stats"],
        });

    },

    onError: (err) => {
        console.log(err);
    },

});
}

export function useRejectCreator() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: ({
            id,
            reason,
        }) =>
            rejectCreator(
                id,
                reason
            ),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["pending-creators"],
            });

            queryClient.invalidateQueries({
                queryKey: ["admin-stats"],
            });

        },
        onError: (err) => {
        console.log(err);
    },

    });

}

export function useAllCreators() {
  return useQuery({
    queryKey: ["all-creators"],
    queryFn: getAllCreators,
  });
}


export function useMemberships() {
  return useQuery({
    queryKey: ["memberships"],
    queryFn: getMemberships,
  });
}

export function useAllFans() {
  return useQuery({
    queryKey: ["fans"],
    queryFn: getAllFans,
  });
}
