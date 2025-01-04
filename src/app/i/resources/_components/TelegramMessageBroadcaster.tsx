import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'
import { useFetchAdminCourses } from '../../courses/_apis/useFetchAdminCourses';
import clsx from 'clsx';
import IconifyIcon from '@/components/IconifyIcon';
import { Button } from '@/components/ui/button';
import Card from '@/components/Card';

export default function TelegramMessageBroadcaster() {

  const [message, setMessage] = useState<string>('');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const { data: coursesData } = useFetchAdminCourses({ limit: 1000 });

  const toggleCourseSelection = (courseId: string) => {
    setSelectedCourses((prev) => {
      if (prev.includes(courseId)) {
        return prev.filter((id) => id !== courseId);
      }
      return [...prev, courseId];
    });
  }

  const toggleAllSelection = () => {
    setSelectedCourses((prev) => {
      if (prev.length === coursesData?.result?.length) {
        return [];
      }
      return coursesData?.result?.map((course) => course.id) || [];
    })
  }

  const isDisabled = selectedCourses.length === 0 || !message;

  return (
    <Card className="flex flex-col gap-4 h-max">
      <p className="font-medium">Telegram Message Broadcast</p>
      <div className="flex justify-between items-center">
        <p className="font-medium text-xs">Select Channels</p>
        <p className="text-xs text-accent cursor-pointer" onClick={toggleAllSelection}>
          {selectedCourses.length === coursesData?.result?.length ? "Unselect all" : "Select all"}
        </p>
      </div>
      <div className="flex items-center flex-wrap gap-4">
        {coursesData?.result?.map((course) => (
          <div key={course.id} onClick={() => toggleCourseSelection(course.id)}
            className={clsx("flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#B0CAFF1A] cursor-pointer", selectedCourses.includes(course.id) && "bg-primary/20")}>
            <p className="text-sm">{course.name}</p>
            {selectedCourses.includes(course.id) && (
              <IconifyIcon icon="ri:check-fill" className="text-lg flex items-center" />
            )}
          </div>
        ))}
      </div>
      <Textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button size="sm" className="w-full" disabled={isDisabled}>Send</Button>
    </Card>
  )
}
