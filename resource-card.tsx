/**
 * ResourceCard Component
 * 
 * Displays individual learning resources with ratings, duration, pricing,
 * and provider information. Features consistent styling and interactive
 * elements for resource engagement tracking.
 */

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ExternalLink, 
  Star, 
  Clock, 
  BookOpen, 
  Video, 
  FileText, 
  Code, 
  Folder,
  DollarSign
} from "lucide-react";

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

interface ResourceCardProps {
  resource: Resource;
  onResourceClick?: (resource: Resource) => void;
}

export function ResourceCard({ resource, onResourceClick }: ResourceCardProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return <BookOpen className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'article': return <FileText className="w-4 h-4" />;
      case 'practice': return <Code className="w-4 h-4" />;
      case 'project': return <Folder className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course': return 'bg-blue-100 text-blue-800';
      case 'video': return 'bg-red-100 text-red-800';
      case 'article': return 'bg-green-100 text-green-800';
      case 'practice': return 'bg-purple-100 text-purple-800';
      case 'project': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleClick = () => {
    if (onResourceClick) {
      onResourceClick(resource);
    } else {
      // Open in new tab
      window.open(resource.url, '_blank');
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-3 h-3 fill-yellow-400/50 text-yellow-400" />
      );
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />
      );
    }
    
    return stars;
  };

  return (
    <Card className="transition-all hover:shadow-md hover:scale-105 cursor-pointer group">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded ${getTypeColor(resource.type)}`}>
              {getTypeIcon(resource.type)}
            </div>
            <Badge className={getTypeColor(resource.type)}>
              {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
            </Badge>
          </div>
          
          <div className="flex items-center gap-1">
            {resource.free ? (
              <Badge variant="outline" className="text-green-600 border-green-600">
                Free
              </Badge>
            ) : (
              <Badge variant="outline" className="text-orange-600 border-orange-600">
                <DollarSign className="w-3 h-3 mr-1" />
                Paid
              </Badge>
            )}
          </div>
        </div>
        
        <h4 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-brand-600 transition-colors">
          {resource.title}
        </h4>
        
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {resource.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <span className="font-medium">{resource.provider}</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {resource.duration}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {renderStars(resource.rating)}
            <span className="text-xs text-muted-foreground ml-1">
              {resource.rating.toFixed(1)}
            </span>
          </div>
          
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={handleClick}
            className="text-brand-600 hover:text-brand-700 hover:bg-brand-50 p-1 h-auto"
          >
            <ExternalLink className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}