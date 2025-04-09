
import React, { useState, useEffect } from 'react';
import StudentForm from '@/components/StudentForm';
import IDCardPreview from '@/components/IDCardPreview';
import SavedCards from '@/components/SavedCards';
import { StudentData } from '@/utils/types';
import { saveStudentCard, getStudentCards } from '@/utils/localStorage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IdCard, ListFilter, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'form' | 'preview'>('form');
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [savedCards, setSavedCards] = useState<StudentData[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('generate');

  // Load saved cards on mount
  useEffect(() => {
    setSavedCards(getStudentCards());
  }, []);

  const handleSubmit = (data: StudentData) => {
    setIsSubmitting(true);
    
    // Simulate processing time
    setTimeout(() => {
      // Save to localStorage
      const savedData = saveStudentCard(data);
      
      // Update state
      setStudentData(savedData);
      setSavedCards(getStudentCards());
      setCurrentStep('preview');
      setIsSubmitting(false);
      
      toast.success("ID Card generated successfully");
    }, 800);
  };

  const handleReset = () => {
    setCurrentStep('form');
    setStudentData(null);
  };

  const handleDeleteCard = (id: string) => {
    setSavedCards(prev => prev.filter(card => card.id !== id));
  };

  const handleSelectCard = (card: StudentData) => {
    setStudentData(card);
    setCurrentStep('preview');
    setActiveTab('generate');
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col max-w-7xl mx-auto">
      <header className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-unity-primary flex items-center gap-2">
              <IdCard className="h-8 w-8" />
              Smart ID Card Generator
            </h1>
            <p className="text-muted-foreground">
              Create, preview and download professional student ID cards
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <HelpCircle className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>About This Project</DialogTitle>
                <DialogDescription>
                  This application was created for Unity's Internship Assignment.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Features</h3>
                  <ul className="list-disc pl-5 text-sm">
                    <li>Student data collection through a comprehensive form</li>
                    <li>Two different ID card template designs</li>
                    <li>QR code generation with complete student data</li>
                    <li>Image download functionality</li>
                    <li>Local storage persistence</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium">Technologies</h3>
                  <p className="text-sm">
                    Built with React, Tailwind CSS, HTML-to-Image, QRCode.React, and more.
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>
      
      <main className="flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="generate" className="flex items-center gap-2">
              <IdCard className="h-4 w-4" />
              <span>Generate ID Card</span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <ListFilter className="h-4 w-4" />
              <span>Saved Cards ({savedCards.length})</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="generate" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {currentStep === 'form' ? (
                <StudentForm 
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                />
              ) : (
                <IDCardPreview
                  data={studentData!}
                  onReset={handleReset}
                />
              )}
              
              <div className="hidden md:block border-2 border-dashed rounded-xl p-6 bg-muted/50 border-muted text-center">
                <div className="flex flex-col justify-center items-center h-full">
                  <IdCard className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium text-unity-primary mb-2">Student ID Card</h3>
                  <p className="text-muted-foreground">
                    {currentStep === 'form' 
                      ? "Fill out the form to generate a customizable ID card"
                      : "Your generated ID card will appear here"}
                  </p>
                </div>
              </div>
            </div>
            
            {savedCards.length > 0 && currentStep === 'form' && (
              <div className="md:hidden">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setActiveTab('saved')}
                >
                  View Saved Cards ({savedCards.length})
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="saved">
            <SavedCards 
              cards={savedCards}
              onDelete={handleDeleteCard}
              onSelect={handleSelectCard}
            />
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="py-6 mt-8 text-center text-sm text-muted-foreground border-t">
        <p>Unity School Smart ID Generator &copy; 2025</p>
      </footer>
    </div>
  );
};

export default Index;
