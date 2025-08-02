/**
 * SkillPath AI - Home Page
 * 
 * The main interface for the intelligent learning platform. Features a compelling
 * hero section, interactive goal input form, and personalized roadmap generation.
 * Demonstrates the complete user journey from goal setting to learning path creation.
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Zap, 
  Target, 
  Clock, 
  Users, 
  Star, 
  ArrowRight, 
  BookOpen, 
  TrendingUp,
  Sparkles,
  CheckCircle,
  Play,
  Award,
  Rocket
} from "lucide-react";
import { GoalInputForm, LearningGoal } from "@/components/goal-input-form";
import { RoadmapGenerator } from "@/components/roadmap-generator";
import { ProgressTracker, createSampleProgressStats } from "@/components/progress-tracker";

type AppState = 'landing' | 'goal-input' | 'roadmap' | 'dashboard';

export default function Home() {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [learningGoal, setLearningGoal] = useState<LearningGoal | null>(null);

  const handleGetStarted = () => {
    setCurrentState('goal-input');
  };

  const handleGoalSubmit = (goal: LearningGoal) => {
    setLearningGoal(goal);
    setCurrentState('roadmap');
  };

  const handleStartLearning = () => {
    setCurrentState('dashboard');
  };

  const handleBackToStart = () => {
    setCurrentState('landing');
    setLearningGoal(null);
  };

  if (currentState === 'goal-input') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 bg-grid-pattern">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <Button 
              variant="ghost" 
              onClick={handleBackToStart}
              className="mb-4"
            >
              ← Back to Home
            </Button>
            <h1 className="text-3xl font-bold text-gradient mb-2">
              Let's Create Your Learning Path
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Answer a few questions and our AI will generate a personalized roadmap tailored to your goals, timeline, and learning style.
            </p>
          </div>
          
          <GoalInputForm 
            onSubmit={handleGoalSubmit}
            isLoading={false}
          />
        </div>
      </div>
    );
  }

  if (currentState === 'roadmap' && learningGoal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 bg-grid-pattern">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <Button 
              variant="ghost" 
              onClick={handleBackToStart}
              className="mb-4"
            >
              ← Back to Home
            </Button>
            <h1 className="text-3xl font-bold text-gradient mb-2">
              Your Personalized Learning Roadmap
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Here's your AI-generated learning path for {learningGoal.skill}. Each milestone is carefully curated based on your preferences.
            </p>
          </div>
          
          <RoadmapGenerator 
            learningGoal={learningGoal}
            onStartLearning={handleStartLearning}
          />
        </div>
      </div>
    );
  }

  if (currentState === 'dashboard' && learningGoal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 bg-grid-pattern">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <Button 
              variant="ghost" 
              onClick={handleBackToStart}
              className="mb-4"
            >
              ← Back to Home
            </Button>
            <h1 className="text-3xl font-bold text-gradient mb-2">
              Learning Dashboard
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Track your progress, maintain your streak, and celebrate your achievements as you master {learningGoal.skill}.
            </p>
          </div>
          
          <ProgressTracker 
            stats={createSampleProgressStats()}
            skillName={learningGoal.skill}
          />
        </div>
      </div>
    );
  }

  // Landing Page
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-grid-pattern">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Brand Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-brand-200 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-brand-600" />
              <span className="text-sm font-medium text-brand-700">AI-Powered Learning Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-6 leading-tight">
              From Idea to
              <br />
              <span className="text-brand-600">Expertise</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Someone wants to learn a new skill—say, JavaScript. They come to our platform, enter their goal, 
              and instantly get a <span className="font-semibold text-brand-700">personalized learning roadmap</span>. 
              No more endless searching or wasted time.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-gradient-brand hover:opacity-90 text-white px-8 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleGetStarted}
              >
                <Rocket className="w-5 h-5 mr-2" />
                Start Learning Journey
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-4 text-lg font-medium rounded-full border-2 border-brand-200 hover:border-brand-300 hover:bg-brand-50"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-600">5 min</div>
                <div className="text-sm text-slate-600">To Roadmap</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-600">AI-Powered</div>
                <div className="text-sm text-slate-600">Curation</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-600">50+</div>
                <div className="text-sm text-slate-600">Skills</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-600">Personalized</div>
                <div className="text-sm text-slate-600">Learning</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Learning Should Be as Optimized as Streaming Your Favorite Show
            </h2>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed">
              Traditional learning platforms overwhelm you with choices. We use AI to cut through the noise 
              and create the perfect learning path for your specific goals, timeline, and learning style.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="glass-effect hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Endless Searching</h3>
                  <p className="text-sm text-muted-foreground">
                    Hours wasted browsing courses without knowing which ones actually work
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-effect hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold mb-2">No Clear Path</h3>
                  <p className="text-sm text-muted-foreground">
                    Learning resources scattered across platforms with no structured progression
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-effect hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">AI Solution</h3>
                  <p className="text-sm text-muted-foreground">
                    Personalized roadmaps with curated resources tailored to your exact needs
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              The Future of Self-Education
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Intelligent, personalized, and goal-driven learning that adapts to your pace and style
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="glass-effect hover:shadow-xl transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Brain className="w-6 h-6 text-brand-600" />
                </div>
                <CardTitle>AI-Powered Curation</CardTitle>
                <CardDescription>
                  Our AI analyzes thousands of resources to find the perfect learning materials for your specific goals and learning style.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-effect hover:shadow-xl transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-brand-600" />
                </div>
                <CardTitle>Instant Roadmaps</CardTitle>
                <CardDescription>
                  Get a complete learning path in minutes, not hours. From beginner to expert, every step is planned and optimized.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-effect hover:shadow-xl transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Target className="w-6 h-6 text-brand-600" />
                </div>
                <CardTitle>Goal-Driven Learning</CardTitle>
                <CardDescription>
                  Every recommendation is tailored to your specific objectives, timeline, and current skill level.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-effect hover:shadow-xl transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 text-brand-600" />
                </div>
                <CardTitle>Progress Tracking</CardTitle>
                <CardDescription>
                  Visual progress indicators, streak tracking, and achievement systems keep you motivated and on track.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-effect hover:shadow-xl transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6 text-brand-600" />
                </div>
                <CardTitle>Curated Resources</CardTitle>
                <CardDescription>
                  Access the best courses, tutorials, and practice projects from top platforms, all in one place.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-effect hover:shadow-xl transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-brand-600" />
                </div>
                <CardTitle>Adaptive Learning</CardTitle>
                <CardDescription>
                  The platform learns from your progress and adjusts recommendations to optimize your learning efficiency.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Join Thousands of Successful Learners
            </h2>
            <p className="text-xl text-slate-600">
              See how our AI-powered platform is transforming careers and lives
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="glass-effect">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  "I went from complete beginner to landing my first developer job in just 6 months. 
                  The personalized roadmap kept me focused and motivated throughout the journey."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-brand-600">SM</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Sarah Martinez</div>
                    <div className="text-xs text-muted-foreground">Frontend Developer</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  "The AI curation is incredible. Instead of spending weeks researching courses, 
                  I got a perfect learning path in minutes. Saved me months of trial and error."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-brand-600">JC</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">James Chen</div>
                    <div className="text-xs text-muted-foreground">Data Scientist</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  "As a busy parent, I needed efficient learning. The platform's personalized approach 
                  helped me master UI/UX design in my limited free time."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-brand-600">AL</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Alex Liu</div>
                    <div className="text-xs text-muted-foreground">UX Designer</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-brand text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who've accelerated their careers with AI-powered, 
            personalized learning roadmaps. Start your journey today.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-brand-600 hover:bg-gray-50 px-8 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={handleGetStarted}
            >
              <Rocket className="w-5 h-5 mr-2" />
              Start Free Learning Path
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-brand-600 px-8 py-4 text-lg font-medium rounded-full transition-all duration-300"
            >
              <Award className="w-5 h-5 mr-2" />
              View Success Stories
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-blue-100">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>100% Free to Start</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Instant Roadmap Generation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="w-6 h-6 text-brand-400" />
            <span className="text-xl font-bold">SkillPath AI</span>
          </div>
          <p className="text-slate-400 mb-4">
            Building the future of self-education—intelligent, personalized, and goal-driven.
          </p>
          <div className="text-sm text-slate-500">
            © 2024 SkillPath AI. Powered by Step1.dev
          </div>
        </div>
      </footer>
    </div>
  );
}