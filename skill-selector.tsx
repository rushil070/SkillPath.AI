/**
 * SkillSelector Component
 * 
 * An interactive skill selection interface that allows users to browse
 * and select from popular learning categories. Features visual icons,
 * difficulty indicators, and estimated learning times.
 */

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Code, 
  Palette, 
  BarChart3, 
  Smartphone, 
  Shield, 
  Gamepad2, 
  Megaphone, 
  Users, 
  Search,
  Clock,
  TrendingUp
} from "lucide-react";

interface Skill {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  popularity: number;
  description: string;
}

interface SkillSelectorProps {
  onSkillSelect: (skill: Skill) => void;
  selectedSkill?: string;
}

const SKILLS: Skill[] = [
  {
    id: "javascript",
    name: "JavaScript",
    category: "Programming",
    icon: <Code className="w-6 h-6" />,
    difficulty: "Beginner",
    estimatedTime: "3-6 months",
    popularity: 95,
    description: "The language of the web - essential for modern development"
  },
  {
    id: "python",
    name: "Python",
    category: "Programming",
    icon: <Code className="w-6 h-6" />,
    difficulty: "Beginner",
    estimatedTime: "2-4 months",
    popularity: 92,
    description: "Versatile language perfect for beginners and data science"
  },
  {
    id: "react",
    name: "React",
    category: "Frontend",
    icon: <Code className="w-6 h-6" />,
    difficulty: "Intermediate",
    estimatedTime: "4-8 months",
    popularity: 88,
    description: "Build modern, interactive user interfaces"
  },
  {
    id: "ui-ux-design",
    name: "UI/UX Design",
    category: "Design",
    icon: <Palette className="w-6 h-6" />,
    difficulty: "Beginner",
    estimatedTime: "3-6 months",
    popularity: 85,
    description: "Create beautiful, user-friendly digital experiences"
  },
  {
    id: "data-science",
    name: "Data Science",
    category: "Analytics",
    icon: <BarChart3 className="w-6 h-6" />,
    difficulty: "Intermediate",
    estimatedTime: "6-12 months",
    popularity: 82,
    description: "Extract insights from data to drive business decisions"
  },
  {
    id: "mobile-development",
    name: "Mobile Development",
    category: "Development",
    icon: <Smartphone className="w-6 h-6" />,
    difficulty: "Intermediate",
    estimatedTime: "4-8 months",
    popularity: 78,
    description: "Build native and cross-platform mobile applications"
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    category: "Security",
    icon: <Shield className="w-6 h-6" />,
    difficulty: "Advanced",
    estimatedTime: "8-12 months",
    popularity: 75,
    description: "Protect systems and data from digital threats"
  },
  {
    id: "game-development",
    name: "Game Development",
    category: "Development",
    icon: <Gamepad2 className="w-6 h-6" />,
    difficulty: "Intermediate",
    estimatedTime: "6-12 months",
    popularity: 72,
    description: "Create engaging games and interactive experiences"
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    category: "Marketing",
    icon: <Megaphone className="w-6 h-6" />,
    difficulty: "Beginner",
    estimatedTime: "2-4 months",
    popularity: 80,
    description: "Grow businesses through online marketing strategies"
  },
  {
    id: "product-management",
    name: "Product Management",
    category: "Business",
    icon: <Users className="w-6 h-6" />,
    difficulty: "Intermediate",
    estimatedTime: "4-6 months",
    popularity: 70,
    description: "Lead product development from concept to launch"
  }
];

const CATEGORIES = [...new Set(SKILLS.map(skill => skill.category))];

export function SkillSelector({ onSkillSelect, selectedSkill }: SkillSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredSkills = SKILLS.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            All Categories
          </Button>
          {CATEGORIES.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map(skill => (
          <Card 
            key={skill.id}
            className={`cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
              selectedSkill === skill.id 
                ? 'ring-2 ring-brand-500 bg-brand-50' 
                : 'hover:border-brand-300'
            }`}
            onClick={() => onSkillSelect(skill)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-100 rounded-lg text-brand-600">
                    {skill.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{skill.name}</h3>
                    <p className="text-sm text-muted-foreground">{skill.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="w-3 h-3" />
                  {skill.popularity}%
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                {skill.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className={getDifficultyColor(skill.difficulty)}>
                    {skill.difficulty}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {skill.estimatedTime}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No skills found</h3>
          <p className="text-gray-500">Try adjusting your search or category filter</p>
        </div>
      )}
    </div>
  );
}