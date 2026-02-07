import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { UserProfile, CreatorProfile, BrandProfile, DashboardStats, SocialMediaLinks, ExternalBlob } from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useRegisterBrand() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; email: string; industry: string }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.registerBrand(data.name, data.email, data.industry);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useRegisterCreator() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      fullName: string;
      phoneNumber: string;
      email: string;
      instagramFollowers: bigint;
      youtubeSubscribers: bigint;
      tiktokFollowers: bigint | null;
      pricingReel: bigint;
      pricingPost: bigint;
      pricingVideo: bigint;
      category: string;
      socialMediaLinks: SocialMediaLinks;
      profilePicture: ExternalBlob | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.registerCreator(
        data.fullName,
        data.phoneNumber,
        data.email,
        data.instagramFollowers,
        data.youtubeSubscribers,
        data.tiktokFollowers,
        data.pricingReel,
        data.pricingPost,
        data.pricingVideo,
        data.category,
        data.socialMediaLinks,
        data.profilePicture
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useUpdateCreatorProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      fullName: string;
      phoneNumber: string;
      instagramFollowers: bigint;
      youtubeSubscribers: bigint;
      tiktokFollowers: bigint | null;
      pricingReel: bigint;
      pricingPost: bigint;
      pricingVideo: bigint;
      category: string;
      socialMediaLinks: SocialMediaLinks;
      profilePicture: ExternalBlob | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateCreatorProfile(
        data.fullName,
        data.phoneNumber,
        data.instagramFollowers,
        data.youtubeSubscribers,
        data.tiktokFollowers,
        data.pricingReel,
        data.pricingPost,
        data.pricingVideo,
        data.category,
        data.socialMediaLinks,
        data.profilePicture
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creatorProfile'] });
    },
  });
}

export function useGetBrandProfile() {
  const { actor, isFetching } = useActor();

  return useQuery<BrandProfile>({
    queryKey: ['brandProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getBrandProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCreatorProfile() {
  const { actor, isFetching } = useActor();

  return useQuery<CreatorProfile>({
    queryKey: ['creatorProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCreatorProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBrowseCreators(filters: {
  platform: string;
  minFollowers: string;
  maxFollowers: string;
  minPrice: string;
  maxPrice: string;
  category: string;
}) {
  const { actor, isFetching } = useActor();

  return useQuery<CreatorProfile[]>({
    queryKey: ['creators', filters],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.browseCreators(
        filters.platform || null,
        filters.minFollowers ? BigInt(filters.minFollowers) : null,
        filters.maxFollowers ? BigInt(filters.maxFollowers) : null,
        filters.minPrice ? BigInt(filters.minPrice) : null,
        filters.maxPrice ? BigInt(filters.maxPrice) : null,
        filters.category || null
      );
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetBrandDashboardStats() {
  const { actor, isFetching } = useActor();

  return useQuery<DashboardStats>({
    queryKey: ['brandDashboardStats'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getBrandDashboardStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCreatorDashboardStats() {
  const { actor, isFetching } = useActor();

  return useQuery<DashboardStats>({
    queryKey: ['creatorDashboardStats'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCreatorDashboardStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateCollaborationRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { creatorId: any; campaignDetails: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createCollaborationRequest(data.creatorId, data.campaignDetails);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brandDashboardStats'] });
    },
  });
}
