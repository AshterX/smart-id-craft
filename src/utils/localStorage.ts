
import { StudentData } from "./types";

const STORAGE_KEY = "unity-student-cards";

export const saveStudentCard = (data: StudentData): StudentData => {
  const cards = getStudentCards();
  
  // Generate a unique ID and add timestamp
  const newCard = {
    ...data,
    id: `card-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    createdAt: new Date().toISOString(),
  };
  
  // Add to the beginning of the array (newest first)
  cards.unshift(newCard);
  
  // Save to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  
  return newCard;
};

export const getStudentCards = (): StudentData[] => {
  const cards = localStorage.getItem(STORAGE_KEY);
  return cards ? JSON.parse(cards) : [];
};

export const deleteStudentCard = (id: string): void => {
  const cards = getStudentCards();
  const updatedCards = cards.filter(card => card.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCards));
};
