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
import { approveContent, deleteUser, getPendingContent, getReviewedContent, rejectContent, requestChanges } from "../services/admin.service";

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


export function useDeleteUser() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: deleteUser,

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["fans"],
            });

            queryClient.invalidateQueries({
                queryKey: ["all-creators"],
            });

            queryClient.invalidateQueries({
                queryKey: ["admin-stats"],
            });

        },

    });

}

export function usePendingContent() {

    return useQuery({

        queryKey:["pending-content"],

        queryFn:getPendingContent,

    });

}

export function useApproveContent(){

    const qc = useQueryClient();

    return useMutation({

        mutationFn: approveContent,

        onSuccess:()=>{

            qc.invalidateQueries({
                queryKey:["pending-content"],
            });

            qc.invalidateQueries({
                queryKey:["admin-stats"],
            });

        }

    });

}
export function useRejectContent(){

    const qc = useQueryClient();

    return useMutation({

        mutationFn: rejectContent,

        onSuccess:()=>{

            qc.invalidateQueries({
                queryKey:["pending-content"],
            });

            qc.invalidateQueries({
                queryKey:["admin-stats"],
            });

        }

    });

}

export function useRequestChanges(){

    const qc = useQueryClient();

    return useMutation({

        mutationFn: requestChanges,

        onSuccess:()=>{

            qc.invalidateQueries({
                queryKey:["pending-content"],
            });

            qc.invalidateQueries({
                queryKey:["admin-stats"],
            });

        }

    });

}



export function useReviewedContent() {
  return useQuery({
    queryKey: ["reviewed-content"],
    queryFn: getReviewedContent,
  });
}