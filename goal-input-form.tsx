/**
 * GoalInputForm Component
 * 
 * A smart, multi-step form that captures user learning goals, current skill level,
 * desired timeframe, and learning preferences. Features progressive disclosure
 * and intelligent validation to create personalized learning roadmaps.
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Target, User, Zap, ArrowRight, ArrowLeft } from "lucide-react";

interface GoalInputFormProps {
  onSubmit: (data: LearningGoal) => void;
  isLoading?: boolean;
}

export interface LearningGoal {
  skill: string;
  currentLevel: string;
  timeframe: string;
  hoursPerWeek: number;
  learningStyle: string[];
  specificGoals: string;
  motivation: string;
}

const SKILLS = [
  "JavaScript", "Python", "React", "Node.js", "TypeScript", "Machine Learning",
  "Data Science", "UI/UX Design", "Digital Marketing", "Product Management",
  "DevOps", "Cybersecurity", "Mobile Development", "Game Development"
];

const LEARNING_STYLES = [
  { id: "visual", label: "Visual Learning", icon: "👁️" },
  { id: "hands-on", label: "Hands-on Practice", icon: "🛠️" },
  { id: "reading", label: "Reading & Documentation", icon: "📚" },
  { id: "video", label: "Video Tutorials", icon: "🎥" },
  { id: "interactive", label: "Interactive Courses", icon: "💻" },
  { id: "community", label: "Community Learning", icon: "👥" }
];

export function GoalInputForm({ onSubmit, isLoading = false }: GoalInputFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<LearningGoal>>({});
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    const completeData: LearningGoal = {
      skill: formData.skill || "",
      currentLevel: formData.currentLevel || "",
      timeframe: formData.timeframe || "",
      hoursPerWeek: formData.hoursPerWeek || 5,
      learningStyle: selectedStyles,
      specificGoals: formData.specificGoals || "",
      motivation: formData.motivation || ""
    };
    onSubmit(completeData);
  };

  const toggleLearningStyle = (styleId: string) => {
    setSelectedStyles(prev => 
      prev.includes(styleId) 
        ? prev.filter(id => id !== styleId)
        : [...prev, styleId]
    );
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return formData.skill && formData.currentLevel;
      case 2: return formData.timeframe && formData.hoursPerWeek;
      case 3: return selectedStyles.length > 0;
      case 4: return formData.specificGoals;
      default: return false;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto glass-effect">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Target className="w-6 h-6 text-brand-600" />
          <CardTitle className="text-2xl font-bold">Create Your Learning Path</CardTitle>
        </div>
        <CardDescription>
          Step {step} of {totalSteps}: Let's personalize your learning journey
        </CardDescription>
        <Progress value={progress} className="mt-4" />
      </CardHeader>

      <CardContent className="space-y-6">
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">What do you want to learn?</h3>
              <p className="text-muted-foreground">Choose your target skill and current level</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="skill">Target Skill</Label>
                <Select value={formData.skill} onValueChange={(value) => setFormData({...formData, skill: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a skill to learn" />
                  </SelectTrigger>
                  <SelectContent>
                    {SKILLS.map(skill => (
                      <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="level">Current Level</Label>
                <Select value={formData.currentLevel} onValueChange={(value) => setFormData({...formData, currentLevel: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="How would you rate your current level?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="complete-beginner">Complete Beginner</SelectItem>
                    <SelectItem value="some-exposure">Some Exposure</SelectItem>
                    <SelectItem value="basic">Basic Knowledge</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <Clock className="w-12 h-12 text-brand-600 mx-auto mb-2" />
              <h3 className="text-lg font-semibold mb-2">Time Commitment</h3>
              <p className="text-muted-foreground">How much time can you dedicate to learning?</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="timeframe">Target Timeframe</Label>
                <Select value={formData.timeframe} onValueChange={(value) => setFormData({...formData, timeframe: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="When do you want to achieve your goal?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-month">1 Month</SelectItem>
                    <SelectItem value="3-months">3 Months</SelectItem>
                    <SelectItem value="6-months">6 Months</SelectItem>
                    <SelectItem value="1-year">1 Year</SelectItem>
                    <SelectItem value="flexible">Flexible Timeline</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="hours">Hours per Week</Label>
                <Input
                  type="number"
                  min="1"
                  max="40"
                  value={formData.hoursPerWeek || ""}
                  onChange={(e) => setFormData({...formData, hoursPerWeek: parseInt(e.target.value) || 0})}
                  placeholder="How many hours per week?"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <User className="w-12 h-12 text-brand-600 mx-auto mb-2" />
              <h3 className="text-lg font-semibold mb-2">Learning Style</h3>
              <p className="text-muted-foreground">How do you learn best? (Select all that apply)</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {LEARNING_STYLES.map(style => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => toggleLearningStyle(style.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedStyles.includes(style.id)
                      ? 'border-brand-500 bg-brand-50 text-brand-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{style.icon}</div>
                  <div className="font-medium text-sm">{style.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div className="text-center">
              <Zap className="w-12 h-12 text-brand-600 mx-auto mb-2" />
              <h3 className="text-lg font-semibold mb-2">Your Goals</h3>
              <p className="text-muted-foreground">Tell us more about what you want to achieve</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="goals">Specific Goals</Label>
                <Textarea
                  value={formData.specificGoals || ""}
                  onChange={(e) => setFormData({...formData, specificGoals: e.target.value})}
                  placeholder="What specific outcomes do you want? (e.g., build a portfolio website, get a job, start a side project)"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="motivation">Motivation (Optional)</Label>
                <Textarea
                  value={formData.motivation || ""}
                  onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                  placeholder="What's driving you to learn this skill?"
                  rows={2}
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!isStepValid() || isLoading}
            className="flex items-center gap-2 bg-gradient-brand hover:opacity-90"
          >
            {step === totalSteps ? (
              isLoading ? "Generating..." : "Generate Roadmap"
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}