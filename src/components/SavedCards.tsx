
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StudentData } from '@/utils/types';
import { Button } from '@/components/ui/button';
import { deleteStudentCard } from '@/utils/localStorage';
import { Download, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';
import { getTemplateComponent } from '@/utils/cardTemplates';

interface SavedCardsProps {
  cards: StudentData[];
  onDelete: (id: string) => void;
  onSelect: (card: StudentData) => void;
}

const SavedCards: React.FC<SavedCardsProps> = ({ cards, onDelete, onSelect }) => {
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  
  const handleDownload = async (card: StudentData, index: number) => {
    const cardRef = cardRefs.current[index];
    
    if (!cardRef) {
      toast.error("Cannot download card");
      return;
    }
    
    try {
      const dataUrl = await toPng(cardRef, { 
        quality: 0.95,
        pixelRatio: 2
      });
      
      saveAs(dataUrl, `${card.name.replace(/\s+/g, '_')}_ID_Card.png`);
      toast.success("ID Card downloaded successfully");
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to download ID card");
    }
  };
  
  const handleDelete = (id: string) => {
    deleteStudentCard(id);
    onDelete(id);
    toast.success("ID Card deleted");
  };
  
  if (cards.length === 0) {
    return null;
  }
  
  const Template1 = getTemplateComponent('template-1');
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-unity-primary">Saved ID Cards</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <div key={card.id} className="border rounded-lg p-3 flex flex-col">
              <div className="text-sm font-medium mb-2 truncate">{card.name}</div>
              
              <div className="relative hidden">
                <div ref={(el) => (cardRefs.current[index] = el)}>
                  <Template1 data={card} />
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground mb-3 flex justify-between">
                <span>Roll: {card.rollNumber}</span>
                <span>{card.createdAt && format(new Date(card.createdAt), 'MMM d, yyyy')}</span>
              </div>
              
              <div className="flex items-center justify-between mt-auto gap-1">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="flex-1"
                  onClick={() => onSelect(card)}
                >
                  View
                </Button>
                <Button 
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleDownload(card, index)}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-destructive hover:text-destructive" 
                  onClick={() => handleDelete(card.id!)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SavedCards;
