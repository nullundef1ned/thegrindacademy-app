'use client';

import ResourceManager from "./_components/ResourceManager";
import TelegramMessageBroadcaster from "./_components/TelegramMessageBroadcaster";
import AffiliateTelegramCommunityCard from "./_components/AffiliateTelegramCommunityCard";

export default function ResourcesPage() {

  return (
    <div className='w-full h-full responsive-section space-y-6'>
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        <div className="col-span-4 flex flex-col gap-4">
          <ResourceManager />
        </div>
        <div className="col-span-3 flex flex-col gap-6">
          <TelegramMessageBroadcaster />
          <AffiliateTelegramCommunityCard />
        </div>
      </div>
    </div>
  )
}
