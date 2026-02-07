import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCreatorProfile, useGetCreatorDashboardStats, useUpdateCreatorProfile } from '../hooks/useQueries';
import { Loader2, DollarSign, TrendingUp, Users, Briefcase, Edit, Upload, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { ExternalBlob } from '../backend';
import { SiInstagram, SiYoutube, SiTiktok, SiX, SiFacebook } from 'react-icons/si';
import { ExternalLink } from 'lucide-react';
import { formatUSD } from '../utils/currency';

export default function CreatorDashboardPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: profile, isLoading: profileLoading } = useGetCreatorProfile();
  const { data: stats, isLoading: statsLoading } = useGetCreatorDashboardStats();
  const updateProfile = useUpdateCreatorProfile();

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const [editForm, setEditForm] = useState({
    fullName: '',
    phoneNumber: '',
    instagramFollowers: '',
    youtubeSubscribers: '',
    tiktokFollowers: '',
    pricingReel: '',
    pricingPost: '',
    pricingVideo: '',
    category: '',
    instagramHandle: '',
    youtubeHandle: '',
    tiktokHandle: '',
    twitterHandle: '',
    facebookHandle: '',
    otherLinks: '',
  });

  useEffect(() => {
    if (!identity) {
      navigate({ to: '/login' });
    }
  }, [identity, navigate]);

  useEffect(() => {
    if (profile) {
      setEditForm({
        fullName: profile.fullName,
        phoneNumber: profile.phoneNumber,
        instagramFollowers: profile.instagramFollowers.toString(),
        youtubeSubscribers: profile.youtubeSubscribers.toString(),
        tiktokFollowers: profile.tiktokFollowers?.toString() || '',
        pricingReel: profile.pricingReel.toString(),
        pricingPost: profile.pricingPost.toString(),
        pricingVideo: profile.pricingVideo.toString(),
        category: profile.category,
        instagramHandle: profile.socialMediaLinks.instagram || '',
        youtubeHandle: profile.socialMediaLinks.youtube || '',
        tiktokHandle: profile.socialMediaLinks.tiktok || '',
        twitterHandle: profile.socialMediaLinks.twitter || '',
        facebookHandle: profile.socialMediaLinks.facebook || '',
        otherLinks: profile.socialMediaLinks.others?.join(', ') || '',
      });
    }
  }, [profile]);

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePicture = () => {
    setProfilePicture(null);
    setProfilePicturePreview(null);
    setUploadProgress(0);
  };

  const handleUpdateProfile = async () => {
    try {
      let profilePictureBlob: ExternalBlob | null = null;

      if (profilePicture) {
        const arrayBuffer = await profilePicture.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        profilePictureBlob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
          setUploadProgress(percentage);
        });
      } else if (profile?.profilePicture) {
        profilePictureBlob = profile.profilePicture;
      }

      const otherLinksArray = editForm.otherLinks
        ? editForm.otherLinks.split(',').map(link => link.trim()).filter(link => link)
        : [];

      await updateProfile.mutateAsync({
        fullName: editForm.fullName,
        phoneNumber: editForm.phoneNumber,
        instagramFollowers: BigInt(editForm.instagramFollowers || 0),
        youtubeSubscribers: BigInt(editForm.youtubeSubscribers || 0),
        tiktokFollowers: editForm.tiktokFollowers ? BigInt(editForm.tiktokFollowers) : null,
        pricingReel: BigInt(editForm.pricingReel || 0),
        pricingPost: BigInt(editForm.pricingPost || 0),
        pricingVideo: BigInt(editForm.pricingVideo || 0),
        category: editForm.category,
        socialMediaLinks: {
          instagram: editForm.instagramHandle || undefined,
          youtube: editForm.youtubeHandle || undefined,
          tiktok: editForm.tiktokHandle || undefined,
          twitter: editForm.twitterHandle || undefined,
          facebook: editForm.facebookHandle || undefined,
          others: otherLinksArray.length > 0 ? otherLinksArray : undefined,
        },
        profilePicture: profilePictureBlob,
      });

      toast.success('Profile updated successfully!');
      setShowEditDialog(false);
      setProfilePicture(null);
      setProfilePicturePreview(null);
      setUploadProgress(0);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    }
  };

  if (profileLoading || statsLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const profileImageUrl = profile?.profilePicture?.getDirectURL();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profileImageUrl} alt={profile?.fullName} />
              <AvatarFallback className="text-lg">
                {profile?.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">Creator Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {profile?.fullName}</p>
            </div>
          </div>
          <Button onClick={() => setShowEditDialog(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalCampaigns.toString() || '0'}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.active.toString() || '0'}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.completedCampaigns.toString() || '0'}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatUSD(stats?.totalSpend || 0n)}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium">{profile?.fullName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">{profile?.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Category:</span>
                <Badge>{profile?.category}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Platform Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Instagram Followers:</span>
                <span className="font-medium">{profile?.instagramFollowers.toString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">YouTube Subscribers:</span>
                <span className="font-medium">{profile?.youtubeSubscribers.toString()}</span>
              </div>
              {profile?.tiktokFollowers && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">TikTok Followers:</span>
                  <span className="font-medium">{profile.tiktokFollowers.toString()}</span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Instagram Reel:</span>
                <span className="font-medium">{formatUSD(profile?.pricingReel || 0n)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Instagram Post:</span>
                <span className="font-medium">{formatUSD(profile?.pricingPost || 0n)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">YouTube Video:</span>
                <span className="font-medium">{formatUSD(profile?.pricingVideo || 0n)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {profile?.socialMediaLinks.instagram && (
                <a
                  href={profile.socialMediaLinks.instagram.startsWith('http') ? profile.socialMediaLinks.instagram : `https://instagram.com/${profile.socialMediaLinks.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                >
                  <SiInstagram className="h-4 w-4" />
                  <span>{profile.socialMediaLinks.instagram}</span>
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
              )}
              {profile?.socialMediaLinks.youtube && (
                <a
                  href={profile.socialMediaLinks.youtube.startsWith('http') ? profile.socialMediaLinks.youtube : `https://youtube.com/${profile.socialMediaLinks.youtube.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                >
                  <SiYoutube className="h-4 w-4" />
                  <span>{profile.socialMediaLinks.youtube}</span>
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
              )}
              {profile?.socialMediaLinks.tiktok && (
                <a
                  href={profile.socialMediaLinks.tiktok.startsWith('http') ? profile.socialMediaLinks.tiktok : `https://tiktok.com/@${profile.socialMediaLinks.tiktok.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                >
                  <SiTiktok className="h-4 w-4" />
                  <span>{profile.socialMediaLinks.tiktok}</span>
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
              )}
              {profile?.socialMediaLinks.twitter && (
                <a
                  href={profile.socialMediaLinks.twitter.startsWith('http') ? profile.socialMediaLinks.twitter : `https://x.com/${profile.socialMediaLinks.twitter.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                >
                  <SiX className="h-4 w-4" />
                  <span>{profile.socialMediaLinks.twitter}</span>
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
              )}
              {profile?.socialMediaLinks.facebook && (
                <a
                  href={profile.socialMediaLinks.facebook.startsWith('http') ? profile.socialMediaLinks.facebook : `https://facebook.com/${profile.socialMediaLinks.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                >
                  <SiFacebook className="h-4 w-4" />
                  <span>{profile.socialMediaLinks.facebook}</span>
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
              )}
              {profile?.socialMediaLinks.others && profile.socialMediaLinks.others.length > 0 && (
                <div className="space-y-2 pt-2 border-t">
                  {profile.socialMediaLinks.others.map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="truncate">{link}</span>
                    </a>
                  ))}
                </div>
              )}
              {!profile?.socialMediaLinks.instagram && !profile?.socialMediaLinks.youtube && !profile?.socialMediaLinks.tiktok && !profile?.socialMediaLinks.twitter && !profile?.socialMediaLinks.facebook && (!profile?.socialMediaLinks.others || profile.socialMediaLinks.others.length === 0) && (
                <p className="text-sm text-muted-foreground">No social media links added yet</p>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Campaign Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <p>No pending requests</p>
              <p className="text-sm mt-2">Brands will send you collaboration requests here</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>Update your profile information and social media links</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Profile Picture</Label>
              <div className="flex items-center gap-4">
                {profilePicturePreview || profileImageUrl ? (
                  <div className="relative">
                    <img
                      src={profilePicturePreview || profileImageUrl}
                      alt="Profile preview"
                      className="w-24 h-24 rounded-full object-cover border-2 border-border"
                    />
                    {profilePicturePreview && (
                      <button
                        type="button"
                        onClick={removeProfilePicture}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-border">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleProfilePictureChange}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Max 5MB. Supported: JPG, PNG, WebP
                  </p>
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <p className="text-xs text-primary mt-1">Uploading: {uploadProgress}%</p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editFullName">Full Name</Label>
                <Input
                  id="editFullName"
                  value={editForm.fullName}
                  onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editPhoneNumber">Phone Number</Label>
                <Input
                  id="editPhoneNumber"
                  value={editForm.phoneNumber}
                  onChange={(e) => setEditForm({ ...editForm, phoneNumber: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-base font-semibold">Social Media Handles</Label>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editInstagramHandle">Instagram</Label>
                <Input
                  id="editInstagramHandle"
                  placeholder="@username or URL"
                  value={editForm.instagramHandle}
                  onChange={(e) => setEditForm({ ...editForm, instagramHandle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editYoutubeHandle">YouTube</Label>
                <Input
                  id="editYoutubeHandle"
                  placeholder="@channel or URL"
                  value={editForm.youtubeHandle}
                  onChange={(e) => setEditForm({ ...editForm, youtubeHandle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editTiktokHandle">TikTok</Label>
                <Input
                  id="editTiktokHandle"
                  placeholder="@username or URL"
                  value={editForm.tiktokHandle}
                  onChange={(e) => setEditForm({ ...editForm, tiktokHandle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editTwitterHandle">Twitter/X</Label>
                <Input
                  id="editTwitterHandle"
                  placeholder="@username or URL"
                  value={editForm.twitterHandle}
                  onChange={(e) => setEditForm({ ...editForm, twitterHandle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editFacebookHandle">Facebook</Label>
                <Input
                  id="editFacebookHandle"
                  placeholder="Profile or page URL"
                  value={editForm.facebookHandle}
                  onChange={(e) => setEditForm({ ...editForm, facebookHandle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editOtherLinks">Other Links</Label>
                <Input
                  id="editOtherLinks"
                  placeholder="Comma-separated URLs"
                  value={editForm.otherLinks}
                  onChange={(e) => setEditForm({ ...editForm, otherLinks: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowEditDialog(false);
                  setProfilePicture(null);
                  setProfilePicturePreview(null);
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateProfile}
                disabled={updateProfile.isPending}
                className="flex-1"
              >
                {updateProfile.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
