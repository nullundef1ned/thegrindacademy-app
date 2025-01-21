import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import Card from '@/components/Card';
import { useModal } from '@/providers/modal.provider';
import CourseSelectorModal from './CourseSelectorModal';
import { IAdminCourse } from '@/interfaces/course';
import { clsx } from 'clsx';
import IconifyIcon from '@/components/IconifyIcon';
import { Switch } from '@/components/ui/switch';
import useAdminMutations from '../../_module/admin.mutations';
import notificationUtil from '@/utils/notification.util';

export default function TelegramMessageBroadcaster() {
  const [message, setMessage] = useState<string>('');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<IAdminCourse[]>([]);

  const { showModal } = useModal();
  const { sendTelegramMessageMutation } = useAdminMutations();

  const toggleSelectAll = () => {
    if (!selectAll) setSelectedCourses([]);
    setSelectAll(!selectAll);
  }

  const removeCourse = (course: IAdminCourse) => {
    setSelectedCourses(selectedCourses.filter((c) => c.id !== course.id));
  }

  const openCourseSelectorModal = () => {
    if (selectAll) return;
    showModal(<CourseSelectorModal selectedCourses={selectedCourses} setSelectedCourses={setSelectedCourses} />);
  }

  const handleSend = () => {
    sendTelegramMessageMutation.mutate({ courseIds: selectedCourses.map((c) => c.id), message }, {
      onSuccess: () => {
        notificationUtil.success('Message sent successfully');
        setMessage('');
        setSelectedCourses([]);
        setSelectAll(false);
      }
    });
  }

  const isDisabled = selectedCourses.length === 0 || !message;

  return (
    <Card className="flex flex-col gap-4 h-max">
      <p className="font-medium">Telegram Message Broadcast</p>
      <div className="flex justify-between items-center">
        <p onClick={openCourseSelectorModal}
          className={clsx("font-medium text-xs", selectAll ? "text-accent/20 cursor-not-allowed" : "cursor-pointer text-accent")}>
          Select Courses <span className="text-xs text-accent/50"> {selectedCourses.length > 0 && `(${selectedCourses.length} selected)`}</span>
        </p>
        <div className="flex items-center gap-2">
          <Switch checked={selectAll} onCheckedChange={toggleSelectAll} />
          <p className="text-xs">Select all</p>
        </div>
      </div>
      {selectedCourses.length > 0 && (
        <div className="grid grid-cols-2 gap-4 overflow-y-auto max-h-40">
          {selectedCourses?.map((course) => (
            <div
              key={course.id}
              onClick={() => removeCourse(course)}
              className={clsx("flex items-start justify-between gap-2 px-2.5 py-1.5 rounded bg-[#B0CAFF1A] cursor-pointer")}>
              <p className="text-xs truncate">{course.name}</p>
              <IconifyIcon icon="ri:close-fill" className="text-lg flex items-center" />
            </div>
          ))}
        </div>
      )}
      <Textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button loading={sendTelegramMessageMutation.isPending} size="sm" className="w-full" disabled={isDisabled} onClick={handleSend}>Send</Button>
    </Card>
  )
}
