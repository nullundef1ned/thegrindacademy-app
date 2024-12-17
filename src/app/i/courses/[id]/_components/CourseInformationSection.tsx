import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import Card from '@/components/Card';

export default function CourseInformationSection() {
  const [isEditing, setIsEditing] = useState(false);

  const startEditing = () => setIsEditing(true);

  return (
    <div className='space-y-4'>
      <div className="flex justify-between">
        <h2 className="text-lg font-medium">Course Information</h2>
        <Button size="sm" variant="outline" onClick={startEditing}>
          Edit
        </Button>
      </div>
      <Card>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">Course Name</p>
          <p className="text-sm">Course Name</p>
        </div>
      </Card>
    </div>
  )
}
