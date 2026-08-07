import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import * as adminService from "@/services/admin.service";

import {
  getAdminStats,
  getPendingCreators,
  approveCreator,
  rejectCreator,
  getAllCreators,
  getAllFans,
  getMemberships,
  getPendingContent,
  approveContent,
  rejectContent,
  requestChanges,
  getReviewedContent,
  deleteUser,
  getAdminPayouts,
  getAdminPayoutStats,
  approveAdminPayout,
  declineAdminPayout,    getAdminReports, manualUpgradeMembership,
getBankTransferPayments,
approveBankTransferPayment,
rejectBankTransferPayment,
getCurrentAdminLive,getAdminLiveStats,createAdminLive,endAdminLiveSession,getAdminLive
} from "@/services/admin.service";

import { toast } from "react-toastify";
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveCreator,

    onSuccess: () => {
      toast.success("Creator approved successfully.");

      queryClient.invalidateQueries({
        queryKey: ["pending-creators"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-stats"],
      });
    },

    onError: (err) => {
      toast.error(err.message || "Failed to approve creator.");
    },
  });
}

export function useRejectCreator() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }) =>
      rejectCreator(id, reason),

    onSuccess: () => {
      toast.success("Creator rejected successfully.");

      queryClient.invalidateQueries({
        queryKey: ["pending-creators"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-stats"],
      });
    },

    onError: (err) => {
      toast.error(err.message || "Failed to reject creator.");
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

export function useAdminPayouts() {
  return useQuery({
    queryKey: ["admin-payouts"],
    queryFn:
      getAdminPayouts,

    refetchInterval: 15000,

    refetchOnWindowFocus: true,
  });
}

export function useAdminPayoutStats() {
  return useQuery({
    queryKey: [
      "admin-payout-stats",
    ],

    queryFn:
      getAdminPayoutStats,

    refetchInterval: 15000,

    refetchOnWindowFocus: true,
  });
}


export function useApproveAdminPayout() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn:
      approveAdminPayout,

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["admin-payouts"],
      });

      qc.invalidateQueries({
        queryKey: [
          "admin-payout-stats",
        ],
      });

      toast.success(
        "Payout approved."
      );
    },
  });
}

export function useDeclineAdminPayout() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn:
      declineAdminPayout,

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["admin-payouts"],
      });

      qc.invalidateQueries({
        queryKey: [
          "admin-payout-stats",
        ],
      });

      toast.success(
        "Payout declined."
      );
    },
  });
}

export function useAdminReports(range) {
  return useQuery({
    queryKey: ["admin-reports", range],

    queryFn: () => getAdminReports(range),

    staleTime: 30 * 1000,

    refetchInterval: 60 * 1000,

    refetchOnWindowFocus: true,
  });
}

export function useManualUpgradeMembership() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: manualUpgradeMembership,

    onSuccess: (data) => {
      toast.success(
        data?.message ||
          "Membership updated successfully."
      );

      queryClient.invalidateQueries({
        queryKey: ["fans"],
      });

      queryClient.invalidateQueries({
        queryKey: ["memberships"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-stats"],
      });
    },

    onError: (err) => {
      toast.error(
        err?.message ||
          "Failed to update membership."
      );
    },
  });
}



export const useBankTransferPayments = () =>
  useQuery({
    queryKey: ["admin-bank-transfer-payments"],
    queryFn:
      adminService.getBankTransferPayments,
  });

export const useApproveBankTransferPayment =
  () => {
    const qc = useQueryClient();

    return useMutation({
      mutationFn:
        adminService.approveBankTransferPayment,

      onSuccess: () => {
        toast.success(
          "Payment approved successfully."
        );

        qc.invalidateQueries({
          queryKey: [
            "admin-bank-transfer-payments",
          ],
        });
      },

      onError: (err) => {
        toast.error(
          err.message ||
            "Failed to approve payment."
        );
      },
    });
  };

export const useRejectBankTransferPayment =
  () => {
    const qc = useQueryClient();

    return useMutation({
      mutationFn:
        adminService.rejectBankTransferPayment,

      onSuccess: () => {
        toast.success(
          "Payment rejected successfully."
        );

        qc.invalidateQueries({
          queryKey: [
            "admin-bank-transfer-payments",
          ],
        });
      },

      onError: (err) => {
        toast.error(
          err.message ||
            "Failed to reject payment."
        );
      },
    });
  };

 // ======================================
// ADMIN LIVE
// ======================================

export const useAdminLive = () =>
  useQuery({
    queryKey: ["admin-live"],
    queryFn: adminService.getAdminLive,
  });

export const useCurrentAdminLive = () =>
  useQuery({
    queryKey: ["admin-live-current"],
    queryFn: adminService.getCurrentAdminLive,
    refetchInterval: 10000,
  });

export const useAdminLiveStats = () =>
  useQuery({
    queryKey: ["admin-live-stats"],
    queryFn: adminService.getAdminLiveStats,
    refetchInterval: 10000,
  });

export const useCreateAdminLive = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: adminService.createAdminLive,

    onSuccess: () => {
      toast.success("Live stream created.");

      qc.invalidateQueries({
        queryKey: ["admin-live"],
      });

      qc.invalidateQueries({
        queryKey: ["admin-live-current"],
      });

      qc.invalidateQueries({
        queryKey: ["admin-live-stats"],
      });
    },

    onError: (err) => {
      toast.error(
        err.message || "Unable to create live stream."
      );
    },
  });
};

export const useEndAdminLive = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: adminService.endAdminLive,

    onSuccess: () => {
      toast.success("Live stream ended.");

      qc.invalidateQueries({
        queryKey: ["admin-live"],
      });

      qc.invalidateQueries({
        queryKey: ["admin-live-current"],
      });

      qc.invalidateQueries({
        queryKey: ["admin-live-stats"],
      });
    },

    onError: (err) => {
      toast.error(
        err.message || "Unable to end live stream."
      );
    },
  });
};