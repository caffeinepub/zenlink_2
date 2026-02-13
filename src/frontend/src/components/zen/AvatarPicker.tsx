import { useState } from 'react';
import { Check } from 'lucide-react';

interface AvatarPickerProps {
  selected: number;
  onSelect: (index: number) => void;
}

export default function AvatarPicker({ selected, onSelect }: AvatarPickerProps) {
  const avatarCount = 12;

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
      {Array.from({ length: avatarCount }, (_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={`
            relative aspect-square rounded-2xl overflow-hidden zen-transition
            ${selected === i ? 'ring-4 ring-primary scale-105' : 'ring-2 ring-border hover:ring-primary/50'}
          `}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(/assets/generated/zenlink-avatars-sheet.dim_2048x2048.png)`,
              backgroundPosition: `${(i % 4) * 33.33}% ${Math.floor(i / 4) * 33.33}%`,
              backgroundSize: '400%'
            }}
          />
          {selected === i && (
            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}

