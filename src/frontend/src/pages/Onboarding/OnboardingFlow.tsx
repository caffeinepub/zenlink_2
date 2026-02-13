import { useState } from 'react';
import { useCreateOrUpdateProfile, useSaveCallerUserProfile, useGetCallerUserProfile } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, Check } from 'lucide-react';
import { toast } from 'sonner';
import AvatarPicker from '../../components/zen/AvatarPicker';
import type { UserProfile } from '../../backend';

const INTERESTS_OPTIONS = [
  'Mental Health', 'Personal Growth', 'Communication', 'Relationships',
  'Career', 'Creativity', 'Mindfulness', 'Confidence', 'Anxiety', 'Discipline'
];

const GROWTH_GOALS = [
  'Improve Confidence', 'Overcome Anxiety', 'Build Discipline',
  'Heal After Failure', 'Enhance Communication', 'Develop Empathy',
  'Manage Stress', 'Build Resilience'
];

export default function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [username, setUsername] = useState('');
  const [usernameWarning, setUsernameWarning] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [interests, setInterests] = useState<string[]>([]);
  const [growthGoals, setGrowthGoals] = useState<string[]>([]);
  const [bio, setBio] = useState('');
  const [mbtiSkipped, setMbtiSkipped] = useState(false);
  const [mbtiVisible, setMbtiVisible] = useState(true);

  const createProfile = useCreateOrUpdateProfile();
  const saveProfile = useSaveCallerUserProfile();
  const { refetch } = useGetCallerUserProfile();

  const totalSteps = 6;
  const progress = (step / totalSteps) * 100;

  const validateUsername = (value: string) => {
    const trimmed = value.trim();
    
    // Check for obvious real name patterns
    const hasMultipleCapitals = (trimmed.match(/[A-Z]/g) || []).length >= 2;
    const hasSpace = trimmed.includes(' ');
    const seemsLikeName = hasMultipleCapitals && hasSpace;
    
    if (seemsLikeName) {
      setUsernameWarning('⚠️ This looks like a real name. Please use an anonymous username.');
      return false;
    }
    
    setUsernameWarning('');
    return true;
  };

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    validateUsername(value);
  };

  const toggleInterest = (interest: string) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const toggleGoal = (goal: string) => {
    setGrowthGoals(prev =>
      prev.includes(goal)
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const handleNext = async () => {
    if (step === 1 && !termsAccepted) {
      toast.error('Please accept the Terms & Conditions to continue');
      return;
    }

    if (step === 2) {
      if (!username.trim()) {
        toast.error('Please enter a username');
        return;
      }
      if (!validateUsername(username)) {
        toast.error('Please choose a more anonymous username');
        return;
      }
    }

    if (step === totalSteps) {
      await handleComplete();
    } else {
      setStep(step + 1);
    }
  };

  const handleComplete = async () => {
    try {
      // Create initial profile
      const profile = await createProfile.mutateAsync({
        username: username.trim(),
        avatar: selectedAvatar,
        isAnonymous: true
      });

      // Update with additional details
      const updatedProfile: UserProfile = {
        ...profile,
        interests,
        growthGoals,
        bio: bio.trim(),
        mbti: mbtiSkipped ? undefined : profile.mbti
      };

      await saveProfile.mutateAsync(updatedProfile);
      await refetch();
      
      toast.success('Welcome to ZENLINK! 🌟');
    } catch (error: any) {
      toast.error(error.message || 'Failed to complete onboarding');
    }
  };

  return (
    <div className="min-h-screen zen-gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Step {step} of {totalSteps}
          </p>
        </div>

        {/* Content Card */}
        <div className="glass-card rounded-3xl p-8 md:p-12 space-y-6 animate-fade-in">
          {/* Step 1: Terms */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold">Welcome to ZENLINK</h2>
                <p className="text-muted-foreground">Let's create your anonymous profile</p>
              </div>

              <div className="glass-card rounded-xl p-6 space-y-4 max-h-64 overflow-y-auto">
                <h3 className="font-semibold">Terms & Conditions</h3>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>By using ZENLINK, you agree to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Maintain anonymity and respect others' privacy</li>
                    <li>Engage with empathy and emotional maturity</li>
                    <li>Not share personal identifying information</li>
                    <li>Report harmful behavior or content</li>
                    <li>Use the platform for personal growth, not therapy</li>
                  </ul>
                  <p className="pt-2">
                    ZENLINK is a peer support platform. If you're experiencing a mental health crisis, 
                    please contact a professional helpline.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                />
                <label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                  I have read and accept the Terms & Conditions
                </label>
              </div>
            </div>
          )}

          {/* Step 2: Username */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold">Choose Your Identity</h2>
                <p className="text-muted-foreground">Pick an anonymous username</p>
              </div>

              <div className="space-y-4">
                <div className="glass-card rounded-xl p-4 flex items-start gap-3 bg-amber-500/10 border-amber-500/30">
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-amber-400">Important: Stay Anonymous</p>
                    <p className="text-amber-300/80 mt-1">
                      Do not use your real name. Choose a creative, anonymous username that doesn't reveal your identity.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Anonymous Username</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => handleUsernameChange(e.target.value)}
                    placeholder="e.g., MoonWalker, SilentThoughts, ZenSeeker"
                    className="text-lg"
                  />
                  {usernameWarning && (
                    <p className="text-sm text-amber-400 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {usernameWarning}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Avatar */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold">Choose Your Avatar</h2>
                <p className="text-muted-foreground">Pick a symbolic representation</p>
              </div>

              <AvatarPicker selected={selectedAvatar} onSelect={setSelectedAvatar} />
            </div>
          )}

          {/* Step 4: Interests */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold">Your Interests</h2>
                <p className="text-muted-foreground">Select topics that matter to you</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {INTERESTS_OPTIONS.map((interest) => (
                  <Badge
                    key={interest}
                    variant={interests.includes(interest) ? 'default' : 'outline'}
                    className="cursor-pointer px-4 py-2 zen-transition hover:scale-105"
                    onClick={() => toggleInterest(interest)}
                  >
                    {interests.includes(interest) && <Check className="w-3 h-3 mr-1" />}
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Growth Goals */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold">Growth Goals</h2>
                <p className="text-muted-foreground">What do you want to work on?</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {GROWTH_GOALS.map((goal) => (
                  <Badge
                    key={goal}
                    variant={growthGoals.includes(goal) ? 'default' : 'outline'}
                    className="cursor-pointer px-4 py-2 zen-transition hover:scale-105"
                    onClick={() => toggleGoal(goal)}
                  >
                    {growthGoals.includes(goal) && <Check className="w-3 h-3 mr-1" />}
                    {goal}
                  </Badge>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Your Perspective (Optional)</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Share a bit about your journey or what brings you here..."
                  rows={4}
                  maxLength={300}
                />
                <p className="text-xs text-muted-foreground text-right">{bio.length}/300</p>
              </div>
            </div>
          )}

          {/* Step 6: MBTI */}
          {step === 6 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold">Personality Test</h2>
                <p className="text-muted-foreground">Optional: Take the MBTI test later</p>
              </div>

              <div className="glass-card rounded-xl p-6 space-y-4">
                <p className="text-sm text-muted-foreground">
                  The MBTI personality test helps us match you with compatible users and circles. 
                  You can take it now or skip and complete it later from your profile.
                </p>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="mbti-visible"
                    checked={mbtiVisible}
                    onCheckedChange={(checked) => setMbtiVisible(checked as boolean)}
                  />
                  <label htmlFor="mbti-visible" className="text-sm cursor-pointer">
                    Show my MBTI type to others (you can change this later)
                  </label>
                </div>
              </div>

              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => setMbtiSkipped(true)}
                  className="mr-2"
                >
                  Skip for Now
                </Button>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-6">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                disabled={createProfile.isPending || saveProfile.isPending}
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={createProfile.isPending || saveProfile.isPending}
              className="ml-auto"
            >
              {createProfile.isPending || saveProfile.isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Setting up...
                </>
              ) : step === totalSteps ? (
                'Complete Setup'
              ) : (
                'Continue'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

