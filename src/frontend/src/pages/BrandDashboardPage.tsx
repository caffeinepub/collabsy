import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useBrowseCreators, useGetBrandDashboardStats, useCreateCollaborationRequest } from '../hooks/useQueries';
import { CreatorProfile } from '../backend';
import { Loader2, Search, TrendingUp, DollarSign, Users, Filter, Mail, Phone, QrCode, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { SiInstagram, SiYoutube, SiTiktok, SiX, SiFacebook } from 'react-icons/si';
import { formatUSD } from '../utils/currency';

export default function BrandDashboardPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const [filters, setFilters] = useState({
    platform: '',
    minFollowers: '',
    maxFollowers: '',
    minPrice: '',
    maxPrice: '',
    category: '',
  });

  const [selectedCreator, setSelectedCreator] = useState<CreatorProfile | null>(null);
  const [campaignDetails, setCampaignDetails] = useState('');
  const [showCollabDialog, setShowCollabDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  const { data: stats, isLoading: statsLoading } = useGetBrandDashboardStats();
  const { data: creators, isLoading: creatorsLoading, refetch } = useBrowseCreators(filters);
  const createCollab = useCreateCollaborationRequest();

  useEffect(() => {
    if (!identity) {
      navigate({ to: '/login' });
    }
  }, [identity, navigate]);

  const handleSearch = () => {
    refetch();
  };

  const handleCollabRequest = async () => {
    if (!selectedCreator) return;

    try {
      await createCollab.mutateAsync({
        creatorId: selectedCreator.id,
        campaignDetails,
      });
      toast.success('Collaboration request sent successfully!');
      setShowCollabDialog(false);
      setShowPaymentDialog(true);
    } catch (error: any) {
      toast.error(error.message || 'Failed to send collaboration request');
    }
  };

  const handlePaymentComplete = () => {
    setShowPaymentDialog(false);
    setCampaignDetails('');
    setSelectedCreator(null);
    toast.success('Payment information displayed. Please complete the payment via UPI.');
  };

  if (statsLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Brand Dashboard</h1>
          <p className="text-muted-foreground">Manage your campaigns and discover creators</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
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
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.completedCampaigns.toString() || '0'}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatUSD(stats?.totalSpend || 0n)}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Find Creators
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Platform</Label>
                <Select
                  value={filters.platform}
                  onValueChange={(value) => setFilters({ ...filters, platform: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All platforms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All platforms</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Min Followers</Label>
                <Input
                  type="number"
                  placeholder="e.g., 10000"
                  value={filters.minFollowers}
                  onChange={(e) => setFilters({ ...filters, minFollowers: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Max Followers</Label>
                <Input
                  type="number"
                  placeholder="e.g., 100000"
                  value={filters.maxFollowers}
                  onChange={(e) => setFilters({ ...filters, maxFollowers: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Min Price ($)</Label>
                <Input
                  type="number"
                  placeholder="e.g., 100"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Max Price ($)</Label>
                <Input
                  type="number"
                  placeholder="e.g., 1000"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={filters.category}
                  onValueChange={(value) => setFilters({ ...filters, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All categories</SelectItem>
                    <SelectItem value="fashion">Fashion & Beauty</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="food">Food & Cooking</SelectItem>
                    <SelectItem value="fitness">Health & Fitness</SelectItem>
                    <SelectItem value="travel">Travel & Adventure</SelectItem>
                    <SelectItem value="gaming">Gaming</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleSearch} className="w-full md:w-auto">
              <Search className="mr-2 h-4 w-4" />
              Search Creators
            </Button>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-2xl font-bold mb-4">Available Creators</h2>
          {creatorsLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : creators && creators.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {creators.map((creator) => {
                const profileImageUrl = creator.profilePicture?.getDirectURL();
                return (
                  <Card key={creator.id.toString()} className="hover:border-primary transition-colors">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={profileImageUrl} alt={creator.fullName} />
                          <AvatarFallback>
                            {creator.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base truncate">{creator.fullName}</CardTitle>
                          <Badge className="mt-1">{creator.category}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Instagram:</span>
                          <span className="font-medium">{creator.instagramFollowers.toString()} followers</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">YouTube:</span>
                          <span className="font-medium">{creator.youtubeSubscribers.toString()} subscribers</span>
                        </div>
                        {creator.tiktokFollowers && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">TikTok:</span>
                            <span className="font-medium">{creator.tiktokFollowers.toString()} followers</span>
                          </div>
                        )}
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        {creator.socialMediaLinks.instagram && (
                          <a
                            href={creator.socialMediaLinks.instagram.startsWith('http') ? creator.socialMediaLinks.instagram : `https://instagram.com/${creator.socialMediaLinks.instagram.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs hover:text-primary transition-colors"
                          >
                            <SiInstagram className="h-3 w-3" />
                            <span className="truncate">{creator.socialMediaLinks.instagram}</span>
                            <ExternalLink className="h-3 w-3 ml-auto flex-shrink-0" />
                          </a>
                        )}
                        {creator.socialMediaLinks.youtube && (
                          <a
                            href={creator.socialMediaLinks.youtube.startsWith('http') ? creator.socialMediaLinks.youtube : `https://youtube.com/${creator.socialMediaLinks.youtube.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs hover:text-primary transition-colors"
                          >
                            <SiYoutube className="h-3 w-3" />
                            <span className="truncate">{creator.socialMediaLinks.youtube}</span>
                            <ExternalLink className="h-3 w-3 ml-auto flex-shrink-0" />
                          </a>
                        )}
                        {creator.socialMediaLinks.tiktok && (
                          <a
                            href={creator.socialMediaLinks.tiktok.startsWith('http') ? creator.socialMediaLinks.tiktok : `https://tiktok.com/@${creator.socialMediaLinks.tiktok.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs hover:text-primary transition-colors"
                          >
                            <SiTiktok className="h-3 w-3" />
                            <span className="truncate">{creator.socialMediaLinks.tiktok}</span>
                            <ExternalLink className="h-3 w-3 ml-auto flex-shrink-0" />
                          </a>
                        )}
                      </div>

                      <Separator />

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="h-4 w-4 flex-shrink-0" />
                          <a href={`mailto:${creator.email}`} className="hover:text-primary transition-colors truncate">
                            {creator.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="h-4 w-4 flex-shrink-0" />
                          <a href={`tel:${creator.phoneNumber}`} className="hover:text-primary transition-colors">
                            {creator.phoneNumber}
                          </a>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Reel:</span>
                          <span className="font-medium">{formatUSD(creator.pricingReel)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Post:</span>
                          <span className="font-medium">{formatUSD(creator.pricingPost)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Video:</span>
                          <span className="font-medium">{formatUSD(creator.pricingVideo)}</span>
                        </div>
                      </div>

                      <Button
                        onClick={() => {
                          setSelectedCreator(creator);
                          setShowCollabDialog(true);
                        }}
                        className="w-full"
                      >
                        Send Collaboration Request
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No creators found. Try adjusting your filters.
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Dialog open={showCollabDialog} onOpenChange={setShowCollabDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Collaboration Request</DialogTitle>
            <DialogDescription>
              Send a collaboration request to {selectedCreator?.fullName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Campaign Details</Label>
              <Textarea
                placeholder="Describe your campaign, deliverables, timeline, and any other relevant details..."
                value={campaignDetails}
                onChange={(e) => setCampaignDetails(e.target.value)}
                rows={6}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowCollabDialog(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCollabRequest}
                disabled={createCollab.isPending || !campaignDetails}
                className="flex-1"
              >
                {createCollab.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Request & Proceed to Payment'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              UPI Payment Gateway
            </DialogTitle>
            <DialogDescription>
              Scan the QR code to complete your payment via UPI
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg">
              <img
                src="/assets/WhatsApp Image 2026-01-30 at 4.23.01 PM.jpeg"
                alt="UPI Payment QR Code"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="space-y-2 text-center">
              <p className="text-sm font-medium">UPI ID</p>
              <p className="text-lg font-bold text-primary">dhruvlawaniya555-1@okaxis</p>
              <p className="text-xs text-muted-foreground">
                Scan the QR code with any UPI app to complete the payment
              </p>
            </div>
            <Separator />
            <div className="space-y-2">
              <p className="text-sm font-medium">Payment Instructions:</p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>Open any UPI app (Google Pay, PhonePe, Paytm, etc.)</li>
                <li>Scan the QR code above</li>
                <li>Enter the agreed amount</li>
                <li>Complete the payment</li>
                <li>Save the transaction ID for your records</li>
              </ul>
            </div>
            <Button onClick={handlePaymentComplete} className="w-full">
              I've Completed the Payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
