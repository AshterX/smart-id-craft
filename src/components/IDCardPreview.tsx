
import React, { useRef } from 'react';
import { StudentData, CardTemplate } from '@/utils/types';
import { getTemplateComponent } from '@/utils/cardTemplates';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';
import { Download, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface IDCardPreviewProps {
  data: StudentData;
  onReset: () => void;
}

const IDCardPreview: React.FC<IDCardPreviewProps> = ({ data, onReset }) => {
  const [template, setTemplate] = React.useState<CardTemplate>('template-1');
  const [isDownloading, setIsDownloading] = React.useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const TemplateComponent = getTemplateComponent(template);
  
  const handleDownload = async () => {
    if (!cardRef.current) return;
    
    try {
      setIsDownloading(true);
      
      const dataUrl = await toPng(cardRef.current, { 
        quality: 0.95,
        pixelRatio: 2
      });
      
      saveAs(dataUrl, `${data.name.replace(/\s+/g, '_')}_ID_Card.png`);
      toast.success("ID Card downloaded successfully");
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to download ID card");
    } finally {
      setIsDownloading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-unity-primary">ID Card Preview</CardTitle>
            <CardDescription>Preview and download the student ID card</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-3 w-3" />
            New Card
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Card Template</label>
          <Select value={template} onValueChange={(value) => setTemplate(value as CardTemplate)}>
            <SelectTrigger>
              <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="template-1">Light Theme (Classic)</SelectItem>
              <SelectItem value="template-2">Dark Theme (Modern)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex justify-center">
          <TemplateComponent data={data} cardRef={cardRef} />
        </div>
        
        <Button 
          onClick={handleDownload}
          className="w-full bg-unity-accent hover:bg-unity-accent/90 text-white"
          disabled={isDownloading}
        >
          {isDownloading ? (
            <span className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin" />
              Downloading...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download as PNG
            </span>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default IDCardPreview;
