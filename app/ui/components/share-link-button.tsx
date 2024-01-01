'use client';

import { LinkIcon } from '@heroicons/react/20/solid';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';

export const ShareLinkButton = () => {
  const path = usePathname();
  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}${path}`);
    toast('Link copied to clipboard');
  };

  return (
    <button
      className=" flex items-center text-blue-600 hover:text-blue-800  py-2 px-3 rounded border border-blue-600 hover:border-blue-800"
      onClick={handleShare}
    >
      Share Link
      <LinkIcon className="inline-block w-4 h-4 ml-2" />
    </button>
  );
};
