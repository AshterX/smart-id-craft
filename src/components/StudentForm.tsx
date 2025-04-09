
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { StudentData } from '@/utils/types';
import { User, Upload, X } from 'lucide-react';

interface StudentFormProps {
  onSubmit: (data: StudentData) => void;
  isSubmitting?: boolean;
}

const classDivOptions = [
  "Grade 1-A", "Grade 1-B", 
  "Grade 2-A", "Grade 2-B", 
  "Grade 3-A", "Grade 3-B", 
  "Grade 4-A", "Grade 4-B", 
  "Grade 5-A", "Grade 5-B"
];

const busRouteOptions = [
  "Route 1: North Campus", 
  "Route 2: East Campus", 
  "Route 3: South Campus", 
  "Route 4: West Campus",
  "Route 5: Central"
];

const allergyOptions = [
  "Nuts", "Dairy", "Eggs", "Shellfish", "Wheat", "Soy", "Fish", "Pollen"
];

const StudentForm: React.FC<StudentFormProps> = ({ onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState<StudentData>({
    name: '',
    rollNumber: '',
    classDiv: '',
    allergies: [],
    photo: null,
    rackNumber: '',
    busRouteNumber: '',
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAllergyChange = (allergy: string, checked: boolean) => {
    setFormData(prev => {
      if (checked) {
        return { ...prev, allergies: [...prev.allergies, allergy] };
      } else {
        return { ...prev, allergies: prev.allergies.filter(a => a !== allergy) };
      }
    });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Photo must be smaller than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPhotoPreview(reader.result as string);
      setFormData(prev => ({ ...prev, photo: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    setFormData(prev => ({ ...prev, photo: null }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.rollNumber || !formData.classDiv || !formData.rackNumber || !formData.busRouteNumber) {
      toast.error("Please fill all required fields");
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-unity-primary flex items-center gap-2">
          <User className="h-5 w-5" />
          Student Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              name="name"
              placeholder="Student full name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rollNumber">Roll Number *</Label>
            <Input
              id="rollNumber"
              name="rollNumber"
              placeholder="Example: U2025001"
              value={formData.rollNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="classDiv">Class & Division *</Label>
            <Select
              value={formData.classDiv}
              onValueChange={(value) => handleSelectChange("classDiv", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {classDivOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Allergies (if any)</Label>
            <div className="grid grid-cols-2 gap-2">
              {allergyOptions.map((allergy) => (
                <div key={allergy} className="flex items-center space-x-2">
                  <Checkbox
                    id={`allergy-${allergy}`}
                    checked={formData.allergies.includes(allergy)}
                    onCheckedChange={(checked) => 
                      handleAllergyChange(allergy, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`allergy-${allergy}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {allergy}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Student Photo</Label>
            <div className="flex items-start gap-4">
              <div className="w-24 h-32 border rounded-md overflow-hidden bg-muted flex items-center justify-center relative">
                {photoPreview ? (
                  <>
                    <img 
                      src={photoPreview} 
                      alt="Student" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="absolute top-1 right-1 bg-destructive text-white rounded-full p-0.5"
                      aria-label="Remove photo"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </>
                ) : (
                  <User className="h-10 w-10 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                <Label htmlFor="photo" className="cursor-pointer">
                  <div className="flex items-center gap-2 bg-muted hover:bg-muted/80 transition-colors rounded-md px-4 py-2">
                    <Upload className="h-4 w-4" />
                    <span>Upload photo</span>
                  </div>
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Max size: 2MB. Recommended: Passport size photo
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rackNumber">Rack Number *</Label>
            <Input
              id="rackNumber"
              name="rackNumber"
              placeholder="Example: R12"
              value={formData.rackNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="busRouteNumber">Bus Route *</Label>
            <Select
              value={formData.busRouteNumber}
              onValueChange={(value) => handleSelectChange("busRouteNumber", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select bus route" />
              </SelectTrigger>
              <SelectContent>
                {busRouteOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-unity-primary hover:bg-unity-secondary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Generating..." : "Generate ID Card"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default StudentForm;
