import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useRegisterBrand, useRegisterCreator } from '../hooks/useQueries';
import { toast } from 'sonner';
import { Loader2, Upload, X } from 'lucide-react';
import { ExternalBlob } from '../backend';

type UserType = 'brand' | 'creator' | null;

export default function SignUpPage() {
  const navigate = useNavigate();
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const [userType, setUserType] = useState<UserType>(null);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const registerBrand = useRegisterBrand();
  const registerCreator = useRegisterCreator();

  const [brandForm, setBrandForm] = useState({
    name: '',
    email: '',
    industry: '',
  });

  const [creatorForm, setCreatorForm] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
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

  const handleBrandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!identity) {
      setShowAuthPrompt(true);
      return;
    }

    try {
      await registerBrand.mutateAsync({
        name: brandForm.name,
        email: brandForm.email,
        industry: brandForm.industry,
      });
      toast.success('Brand account created successfully!');
      navigate({ to: '/brand-dashboard' });
    } catch (error: any) {
      toast.error(error.message || 'Failed to create brand account');
    }
  };

  const handleCreatorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!identity) {
      setShowAuthPrompt(true);
      return;
    }

    try {
      let profilePictureBlob: ExternalBlob | null = null;
      
      if (profilePicture) {
        const arrayBuffer = await profilePicture.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        profilePictureBlob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
          setUploadProgress(percentage);
        });
      }

      const otherLinksArray = creatorForm.otherLinks
        ? creatorForm.otherLinks.split(',').map(link => link.trim()).filter(link => link)
        : [];

      await registerCreator.mutateAsync({
        fullName: creatorForm.fullName,
        phoneNumber: creatorForm.phoneNumber,
        email: creatorForm.email,
        instagramFollowers: BigInt(creatorForm.instagramFollowers || 0),
        youtubeSubscribers: BigInt(creatorForm.youtubeSubscribers || 0),
        tiktokFollowers: creatorForm.tiktokFollowers ? BigInt(creatorForm.tiktokFollowers) : null,
        pricingReel: BigInt(creatorForm.pricingReel || 0),
        pricingPost: BigInt(creatorForm.pricingPost || 0),
        pricingVideo: BigInt(creatorForm.pricingVideo || 0),
        category: creatorForm.category,
        socialMediaLinks: {
          instagram: creatorForm.instagramHandle || undefined,
          youtube: creatorForm.youtubeHandle || undefined,
          tiktok: creatorForm.tiktokHandle || undefined,
          twitter: creatorForm.twitterHandle || undefined,
          facebook: creatorForm.facebookHandle || undefined,
          others: otherLinksArray.length > 0 ? otherLinksArray : undefined,
        },
        profilePicture: profilePictureBlob,
      });
      toast.success('Creator account created successfully!');
      navigate({ to: '/creator-dashboard' });
    } catch (error: any) {
      toast.error(error.message || 'Failed to create creator account');
    }
  };

  const handleLogin = async () => {
    try {
      await login();
      setShowAuthPrompt(false);
    } catch (error: any) {
      toast.error('Login failed. Please try again.');
    }
  };

  if (showAuthPrompt && !identity) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <img
              src="/assets/generated/collabsy-logo-transparent.dim_200x80.png"
              alt="Collabsy"
              className="h-12 w-auto mx-auto mb-4"
            />
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              Please login to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="w-full"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login to Continue'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!userType) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
        <div className="max-w-4xl w-full space-y-8">
          <div className="text-center space-y-4">
            <img
              src="/assets/generated/collabsy-logo-transparent.dim_200x80.png"
              alt="Collabsy"
              className="h-16 w-auto mx-auto"
            />
            <h1 className="text-3xl font-bold">Join Collabsy</h1>
            <p className="text-muted-foreground">Choose your account type to get started</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={() => setUserType('brand')}
            >
              <CardHeader>
                <CardTitle>I'm a Brand</CardTitle>
                <CardDescription>
                  Find creators and launch influencer marketing campaigns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Browse verified creators</li>
                  <li>• Manage campaigns</li>
                  <li>• Track performance</li>
                  <li>• Secure payments</li>
                </ul>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={() => setUserType('creator')}
            >
              <CardHeader>
                <CardTitle>I'm a Creator</CardTitle>
                <CardDescription>
                  Monetize your influence with brand partnerships
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Get discovered by brands</li>
                  <li>• Set your own rates</li>
                  <li>• Manage collaborations</li>
                  <li>• Track earnings</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (userType === 'brand') {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <img
              src="/assets/generated/collabsy-logo-transparent.dim_200x80.png"
              alt="Collabsy"
              className="h-12 w-auto mx-auto mb-4"
            />
            <CardTitle>Create Brand Account</CardTitle>
            <CardDescription>Enter your brand details to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleBrandSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="brandName">Brand Name</Label>
                <Input
                  id="brandName"
                  placeholder="Your Company Name"
                  value={brandForm.name}
                  onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="brand@company.com"
                  value={brandForm.email}
                  onChange={(e) => setBrandForm({ ...brandForm, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select
                  value={brandForm.industry}
                  onValueChange={(value) => setBrandForm({ ...brandForm, industry: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fashion">Fashion & Beauty</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="food">Food & Beverage</SelectItem>
                    <SelectItem value="fitness">Health & Fitness</SelectItem>
                    <SelectItem value="travel">Travel & Lifestyle</SelectItem>
                    <SelectItem value="gaming">Gaming & Entertainment</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setUserType(null)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={registerBrand.isPending}
                  className="flex-1"
                >
                  {registerBrand.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <img
            src="/assets/generated/collabsy-logo-transparent.dim_200x80.png"
            alt="Collabsy"
            className="h-12 w-auto mx-auto mb-4"
          />
          <CardTitle>Create Creator Account</CardTitle>
          <CardDescription>Share your details and start getting brand deals</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreatorSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Profile Picture (Optional)</Label>
              <div className="flex items-center gap-4">
                {profilePicturePreview ? (
                  <div className="relative">
                    <img
                      src={profilePicturePreview}
                      alt="Profile preview"
                      className="w-24 h-24 rounded-full object-cover border-2 border-border"
                    />
                    <button
                      type="button"
                      onClick={removeProfilePicture}
                      className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
                    >
                      <X className="h-4 w-4" />
                    </button>
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
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Your Name"
                  value={creatorForm.fullName}
                  onChange={(e) => setCreatorForm({ ...creatorForm, fullName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={creatorForm.phoneNumber}
                  onChange={(e) => setCreatorForm({ ...creatorForm, phoneNumber: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="creatorEmail">Email</Label>
              <Input
                id="creatorEmail"
                type="email"
                placeholder="you@example.com"
                value={creatorForm.email}
                onChange={(e) => setCreatorForm({ ...creatorForm, email: e.target.value })}
                required
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram Followers</Label>
                <Input
                  id="instagram"
                  type="number"
                  placeholder="10000"
                  value={creatorForm.instagramFollowers}
                  onChange={(e) => setCreatorForm({ ...creatorForm, instagramFollowers: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtube">YouTube Subscribers</Label>
                <Input
                  id="youtube"
                  type="number"
                  placeholder="5000"
                  value={creatorForm.youtubeSubscribers}
                  onChange={(e) => setCreatorForm({ ...creatorForm, youtubeSubscribers: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tiktok">TikTok Followers (Optional)</Label>
                <Input
                  id="tiktok"
                  type="number"
                  placeholder="20000"
                  value={creatorForm.tiktokFollowers}
                  onChange={(e) => setCreatorForm({ ...creatorForm, tiktokFollowers: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-base font-semibold">Social Media Handles (Optional)</Label>
              <p className="text-xs text-muted-foreground">Add your social media handles or profile links</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="instagramHandle">Instagram Handle/Link</Label>
                <Input
                  id="instagramHandle"
                  placeholder="@username or profile URL"
                  value={creatorForm.instagramHandle}
                  onChange={(e) => setCreatorForm({ ...creatorForm, instagramHandle: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtubeHandle">YouTube Handle/Link</Label>
                <Input
                  id="youtubeHandle"
                  placeholder="@channel or channel URL"
                  value={creatorForm.youtubeHandle}
                  onChange={(e) => setCreatorForm({ ...creatorForm, youtubeHandle: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tiktokHandle">TikTok Handle/Link</Label>
                <Input
                  id="tiktokHandle"
                  placeholder="@username or profile URL"
                  value={creatorForm.tiktokHandle}
                  onChange={(e) => setCreatorForm({ ...creatorForm, tiktokHandle: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitterHandle">Twitter/X Handle/Link</Label>
                <Input
                  id="twitterHandle"
                  placeholder="@username or profile URL"
                  value={creatorForm.twitterHandle}
                  onChange={(e) => setCreatorForm({ ...creatorForm, twitterHandle: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebookHandle">Facebook Handle/Link</Label>
                <Input
                  id="facebookHandle"
                  placeholder="Profile or page URL"
                  value={creatorForm.facebookHandle}
                  onChange={(e) => setCreatorForm({ ...creatorForm, facebookHandle: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="otherLinks">Other Links</Label>
                <Input
                  id="otherLinks"
                  placeholder="Comma-separated URLs"
                  value={creatorForm.otherLinks}
                  onChange={(e) => setCreatorForm({ ...creatorForm, otherLinks: e.target.value })}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pricingReel">Price per Reel (₹)</Label>
                <Input
                  id="pricingReel"
                  type="number"
                  placeholder="500"
                  value={creatorForm.pricingReel}
                  onChange={(e) => setCreatorForm({ ...creatorForm, pricingReel: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pricingPost">Price per Post (₹)</Label>
                <Input
                  id="pricingPost"
                  type="number"
                  placeholder="300"
                  value={creatorForm.pricingPost}
                  onChange={(e) => setCreatorForm({ ...creatorForm, pricingPost: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pricingVideo">Price per Video (₹)</Label>
                <Input
                  id="pricingVideo"
                  type="number"
                  placeholder="1000"
                  value={creatorForm.pricingVideo}
                  onChange={(e) => setCreatorForm({ ...creatorForm, pricingVideo: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category/Niche</Label>
              <Select
                value={creatorForm.category}
                onValueChange={(value) => setCreatorForm({ ...creatorForm, category: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your niche" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fashion">Fashion & Beauty</SelectItem>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="food">Food & Cooking</SelectItem>
                  <SelectItem value="fitness">Health & Fitness</SelectItem>
                  <SelectItem value="travel">Travel & Adventure</SelectItem>
                  <SelectItem value="gaming">Gaming</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setUserType(null)}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={registerCreator.isPending}
                className="flex-1"
              >
                {registerCreator.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
