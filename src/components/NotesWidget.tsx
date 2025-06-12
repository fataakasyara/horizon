
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { StickyNote, Save, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Note {
  id: string;
  content: string;
  timestamp: string;
  color: string;
}

export const NotesWidget = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState('');
  const [selectedColor, setSelectedColor] = useState('yellow');

  const colors = [
    { name: 'yellow', class: 'bg-yellow-100 border-yellow-300', textClass: 'text-yellow-800' },
    { name: 'blue', class: 'bg-blue-100 border-blue-300', textClass: 'text-blue-800' },
    { name: 'green', class: 'bg-green-100 border-green-300', textClass: 'text-green-800' },
    { name: 'purple', class: 'bg-purple-100 border-purple-300', textClass: 'text-purple-800' },
    { name: 'pink', class: 'bg-pink-100 border-pink-300', textClass: 'text-pink-800' },
  ];

  useEffect(() => {
    const savedNotes = localStorage.getItem('quick-notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('quick-notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (currentNote.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        content: currentNote.trim(),
        timestamp: new Date().toISOString(),
        color: selectedColor
      };
      setNotes([note, ...notes]);
      setCurrentNote('');
    }
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const getColorClasses = (colorName: string) => {
    return colors.find(c => c.name === colorName) || colors[0];
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit',
      day: '2-digit',
      month: 'short'
    });
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <StickyNote className="h-5 w-5 text-horizon-purple-600" />
          Quick Notes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Textarea
            placeholder="Tulis catatan cepat..."
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
            className="min-h-20 resize-none rounded-xl border-gray-200"
          />
          
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {colors.map(color => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${color.class} ${
                    selectedColor === color.name ? 'ring-2 ring-horizon-purple-400 scale-110' : 'hover:scale-105'
                  }`}
                />
              ))}
            </div>
            
            <Button
              onClick={addNote}
              disabled={!currentNote.trim()}
              size="sm"
              className="bg-gradient-to-r from-horizon-purple-500 to-horizon-yellow-500 hover:from-horizon-purple-600 hover:to-horizon-yellow-600 text-white rounded-full px-4"
            >
              <Plus className="h-4 w-4 mr-1" />
              Simpan
            </Button>
          </div>
        </div>

        <div className="max-h-60 overflow-y-auto space-y-2">
          {notes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <StickyNote className="h-12 w-12 mx-auto mb-2 opacity-30" />
              <p className="text-sm">Belum ada catatan</p>
            </div>
          ) : (
            notes.map(note => {
              const colorClasses = getColorClasses(note.color);
              return (
                <div
                  key={note.id}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${colorClasses.class}`}
                >
                  <p className={`text-sm whitespace-pre-wrap ${colorClasses.textClass}`}>
                    {note.content}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className={`text-xs opacity-70 ${colorClasses.textClass}`}>
                      {formatTime(note.timestamp)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteNote(note.id)}
                      className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full"
                    >
                      ×
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};
