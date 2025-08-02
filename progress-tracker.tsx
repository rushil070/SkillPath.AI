/**
 * ProgressTracker Component
 * 
 * Visual progress tracking component that displays learning statistics,
 * achievements, and milestone completion. Features animated progress bars,
 * streak tracking, and motivational elements.
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Target, 
  Clock, 
  Flame, 
  Calendar, 
  BookOpen, 
  CheckCircle,
  TrendingUp,
  Award,
  Star
} from "lucide-react";

interface ProgressStats {
  totalHours: number;
  completedHours: number;
  currentStreak: number;
  longestStreak: number;
  milestonesCompleted: number;
  totalMilestones: number;
  skillLevel: string;
  weeklyGoal: number;
  weeklyProgress: number;
  achievements: Achievement[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlockedAt: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface ProgressTrackerProps {
  stats: ProgressStats;
  skillName: string;
}

export function ProgressTracker({ stats, skillName }: ProgressTrackerProps) {
  const overallProgress = (stats.completedHours / stats.totalHours) * 100;
  const milestoneProgress = (stats.milestonesCompleted / stats.totalMilestones) * 100;
  const weeklyProgress = (stats.weeklyProgress / stats.weeklyGoal) * 100;
  
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'rare': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'epic': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'legendary': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStreakMessage = (streak: number) => {
    if (streak === 0) return "Start your learning streak today!";
    if (streak < 7) return "Great start! Keep it going!";
    if (streak < 30) return "You're on fire! 🔥";
    if (streak < 100) return "Incredible dedication! 🚀";
    return "Legendary learner! 👑";
  };

  return (
    <div className="space-y-6">
      {/* Main Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-brand-600" />
            {skillName} Learning Progress
          </CardTitle>
          <CardDescription>
            Track your journey and celebrate your achievements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">
                {stats.completedHours} / {stats.totalHours} hours
              </span>
            </div>
            <Progress value={overallProgress} className="h-3" />
            <p className="text-xs text-muted-foreground mt-1">
              {overallProgress.toFixed(1)}% complete
            </p>
          </div>

          {/* Milestones Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Milestones</span>
              <span className="text-sm text-muted-foreground">
                {stats.milestonesCompleted} / {stats.totalMilestones} completed
              </span>
            </div>
            <Progress value={milestoneProgress} className="h-3" />
          </div>

          {/* Weekly Goal */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">This Week's Goal</span>
              <span className="text-sm text-muted-foreground">
                {stats.weeklyProgress} / {stats.weeklyGoal} hours
              </span>
            </div>
            <Progress value={Math.min(weeklyProgress, 100)} className="h-3" />
            {weeklyProgress >= 100 && (
              <p className="text-xs text-green-600 mt-1 font-medium">
                🎉 Weekly goal achieved!
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.currentStreak}</div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.longestStreak}</div>
            <div className="text-xs text-muted-foreground">Best Streak</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.completedHours}</div>
            <div className="text-xs text-muted-foreground">Hours Learned</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.skillLevel}</div>
            <div className="text-xs text-muted-foreground">Skill Level</div>
          </CardContent>
        </Card>
      </div>

      {/* Streak Motivation */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Flame className="w-6 h-6 text-orange-500" />
            <div>
              <h3 className="font-semibold text-orange-900">
                {getStreakMessage(stats.currentStreak)}
              </h3>
              <p className="text-sm text-orange-700">
                {stats.currentStreak > 0 
                  ? `You've been learning consistently for ${stats.currentStreak} days!`
                  : "Start learning today to begin your streak!"
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      {stats.achievements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-600" />
              Recent Achievements
            </CardTitle>
            <CardDescription>
              Celebrate your learning milestones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stats.achievements.slice(0, 4).map(achievement => (
                <div 
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 ${getRarityColor(achievement.rarity)}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{achievement.title}</h4>
                      <p className="text-xs opacity-80 mb-2">{achievement.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge className={getRarityColor(achievement.rarity)}>
                          {achievement.rarity}
                        </Badge>
                        <span className="text-xs opacity-60">
                          {achievement.unlockedAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Example usage with sample data
export function createSampleProgressStats(): ProgressStats {
  return {
    totalHours: 120,
    completedHours: 45,
    currentStreak: 7,
    longestStreak: 21,
    milestonesCompleted: 3,
    totalMilestones: 8,
    skillLevel: "Intermediate",
    weeklyGoal: 10,
    weeklyProgress: 8,
    achievements: [
      {
        id: '1',
        title: 'First Steps',
        description: 'Completed your first learning session',
        icon: <Star className="w-4 h-4" />,
        unlockedAt: new Date('2024-01-15'),
        rarity: 'common'
      },
      {
        id: '2',
        title: 'Week Warrior',
        description: 'Maintained a 7-day learning streak',
        icon: <Flame className="w-4 h-4" />,
        unlockedAt: new Date('2024-01-22'),
        rarity: 'rare'
      },
      {
        id: '3',
        title: 'Milestone Master',
        description: 'Completed 3 learning milestones',
        icon: <Trophy className="w-4 h-4" />,
        unlockedAt: new Date('2024-01-28'),
        rarity: 'epic'
      }
    ]
  };
}