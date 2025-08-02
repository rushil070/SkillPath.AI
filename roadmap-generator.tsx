/**
 * RoadmapGenerator Component
 * 
 * Displays a personalized learning roadmap with milestones, estimated timelines,
 * and curated resources. Features interactive progress tracking and adaptive
 * recommendations based on user preferences and learning style.
 */

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  BookOpen, 
  Video, 
  Code, 
  Trophy, 
  Target,
  ArrowRight,
  Star,
  ExternalLink
} from "lucide-react";
import { LearningGoal } from "./goal-input-form";
import { ResourceCard } from "./resource-card";

interface Milestone {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  skills: string[];
  resources: Resource[];
  completed: boolean;
}

interface Resource {
  id: string;
  title: string;
  type: 'course' | 'video' | 'article' | 'practice' | 'project';
  provider: string;
  duration: string;
  rating: number;
  url: string;
  free: boolean;
  description: string;
}

interface RoadmapGeneratorProps {
  learningGoal: LearningGoal;
  onStartLearning?: () => void;
}

export function RoadmapGenerator({ learningGoal, onStartLearning }: RoadmapGeneratorProps) {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [isGenerating, setIsGenerating] = useState(true);
  const [completedMilestones, setCompletedMilestones] = useState<Set<string>>(new Set());

  useEffect(() => {
    generateRoadmap();
  }, [learningGoal]);

  const generateRoadmap = async () => {
    setIsGenerating(true);
    
    // Simulate AI roadmap generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const generatedMilestones = createMilestonesForSkill(learningGoal.skill, learningGoal.currentLevel);
    setMilestones(generatedMilestones);
    setIsGenerating(false);
  };

  const createMilestonesForSkill = (skill: string, level: string): Milestone[] => {
    // This would typically call an AI service, but for demo we'll generate based on skill
    const baseMilestones: Milestone[] = [];
    
    if (skill.toLowerCase().includes('javascript')) {
      baseMilestones.push(
        {
          id: '1',
          title: 'JavaScript Fundamentals',
          description: 'Master variables, functions, and basic syntax',
          estimatedHours: 20,
          difficulty: 'Easy',
          skills: ['Variables', 'Functions', 'Loops', 'Conditionals'],
          completed: false,
          resources: [
            {
              id: 'js-1',
              title: 'JavaScript Basics Course',
              type: 'course',
              provider: 'freeCodeCamp',
              duration: '8 hours',
              rating: 4.8,
              url: '#',
              free: true,
              description: 'Complete introduction to JavaScript fundamentals'
            },
            {
              id: 'js-2',
              title: 'JavaScript Tutorial for Beginners',
              type: 'video',
              provider: 'YouTube',
              duration: '3 hours',
              rating: 4.7,
              url: '#',
              free: true,
              description: 'Comprehensive video tutorial covering all basics'
            }
          ]
        },
        {
          id: '2',
          title: 'DOM Manipulation',
          description: 'Learn to interact with web pages dynamically',
          estimatedHours: 15,
          difficulty: 'Medium',
          skills: ['DOM API', 'Event Handling', 'Dynamic Content'],
          completed: false,
          resources: [
            {
              id: 'dom-1',
              title: 'DOM Manipulation Masterclass',
              type: 'course',
              provider: 'Udemy',
              duration: '6 hours',
              rating: 4.6,
              url: '#',
              free: false,
              description: 'Deep dive into DOM manipulation techniques'
            }
          ]
        },
        {
          id: '3',
          title: 'Build Your First Project',
          description: 'Create a interactive web application',
          estimatedHours: 25,
          difficulty: 'Medium',
          skills: ['Project Planning', 'Code Organization', 'Debugging'],
          completed: false,
          resources: [
            {
              id: 'proj-1',
              title: 'Build a Todo App',
              type: 'project',
              provider: 'The Odin Project',
              duration: '10 hours',
              rating: 4.9,
              url: '#',
              free: true,
              description: 'Step-by-step project to build a functional todo application'
            }
          ]
        }
      );
    } else {
      // Generic milestones for other skills
      baseMilestones.push(
        {
          id: '1',
          title: `${skill} Fundamentals`,
          description: `Learn the core concepts and basics of ${skill}`,
          estimatedHours: 20,
          difficulty: 'Easy',
          skills: ['Basics', 'Core Concepts', 'Syntax'],
          completed: false,
          resources: [
            {
              id: 'gen-1',
              title: `${skill} Complete Course`,
              type: 'course',
              provider: 'Coursera',
              duration: '8 hours',
              rating: 4.5,
              url: '#',
              free: false,
              description: `Comprehensive introduction to ${skill}`
            }
          ]
        },
        {
          id: '2',
          title: 'Intermediate Concepts',
          description: `Dive deeper into advanced ${skill} topics`,
          estimatedHours: 30,
          difficulty: 'Medium',
          skills: ['Advanced Topics', 'Best Practices', 'Tools'],
          completed: false,
          resources: []
        },
        {
          id: '3',
          title: 'Real-World Application',
          description: `Apply your ${skill} knowledge to practical projects`,
          estimatedHours: 40,
          difficulty: 'Hard',
          skills: ['Project Work', 'Problem Solving', 'Portfolio'],
          completed: false,
          resources: []
        }
      );
    }
    
    return baseMilestones;
  };

  const toggleMilestone = (milestoneId: string) => {
    setCompletedMilestones(prev => {
      const newSet = new Set(prev);
      if (newSet.has(milestoneId)) {
        newSet.delete(milestoneId);
      } else {
        newSet.add(milestoneId);
      }
      return newSet;
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalHours = milestones.reduce((sum, milestone) => sum + milestone.estimatedHours, 0);
  const completedHours = milestones
    .filter(milestone => completedMilestones.has(milestone.id))
    .reduce((sum, milestone) => sum + milestone.estimatedHours, 0);
  const progressPercentage = totalHours > 0 ? (completedHours / totalHours) * 100 : 0;

  if (isGenerating) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-12 text-center">
          <div className="animate-spin w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold mb-2">Generating Your Personalized Roadmap</h3>
          <p className="text-muted-foreground">Our AI is analyzing your goals and curating the perfect learning path...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Roadmap Header */}
      <Card className="bg-gradient-brand text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl mb-2">Your {learningGoal.skill} Learning Roadmap</CardTitle>
              <CardDescription className="text-blue-100">
                Personalized path based on your {learningGoal.currentLevel} level and {learningGoal.timeframe} timeline
              </CardDescription>
            </div>
            <Trophy className="w-12 h-12 text-yellow-300" />
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress: {completedMilestones.size} of {milestones.length} milestones</span>
              <span>{completedHours} / {totalHours} hours</span>
            </div>
            <Progress value={progressPercentage} className="bg-blue-200" />
          </div>
        </CardHeader>
      </Card>

      {/* Milestones */}
      <div className="space-y-6">
        {milestones.map((milestone, index) => {
          const isCompleted = completedMilestones.has(milestone.id);
          const isNext = !isCompleted && index === 0 || 
                        (!isCompleted && index > 0 && completedMilestones.has(milestones[index - 1].id));
          
          return (
            <Card key={milestone.id} className={`transition-all ${
              isCompleted ? 'bg-green-50 border-green-200' :
              isNext ? 'ring-2 ring-brand-500 bg-brand-50' :
              'opacity-75'
            }`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleMilestone(milestone.id)}
                      className="mt-1 transition-colors"
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400 hover:text-brand-600" />
                      )}
                    </button>
                    <div>
                      <CardTitle className="text-xl mb-2">{milestone.title}</CardTitle>
                      <CardDescription className="text-base">{milestone.description}</CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyColor(milestone.difficulty)}>
                      {milestone.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {milestone.estimatedHours}h
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Skills */}
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Skills you'll learn:</h4>
                  <div className="flex flex-wrap gap-2">
                    {milestone.skills.map(skill => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                {/* Resources */}
                <div>
                  <h4 className="font-medium mb-3">Recommended Resources:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {milestone.resources.map(resource => (
                      <ResourceCard key={resource.id} resource={resource} />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Action Button */}
      <Card>
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Ready to Start Learning?</h3>
          <p className="text-muted-foreground mb-4">
            Your personalized roadmap is ready. Begin with the first milestone and track your progress.
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-brand hover:opacity-90"
            onClick={onStartLearning}
          >
            Start Learning Journey
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}