import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { formatPhoneNumberIntl, isValidPhoneNumber } from "react-phone-number-input"
import notificationUtil from "./notification.util";

const formatPhoneNumber = (phoneNumber: string): string => {
  if (!isValidPhoneNumber(phoneNumber)) {
    return ''
  }

  return formatPhoneNumberIntl(phoneNumber).replace(' ', '-').replaceAll(' ', '')
}

const formatDate = (date: string): string => {
  const dateTime = new Date(date);
  return Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(dateTime);
}

const formatTime = (date: string): string => {
  const dateTime = new Date(date);
  return Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(dateTime);
}

const convertToNumber = (value: string | number): number => {
  return typeof value == 'string' ? parseFloat(value) : value;
}

const convertTimeToMinutesAndSeconds = (time: number): string => {
  const minutes = Math.floor(time / 60) || 0;
  const seconds = Math.floor(time % 60) || 0;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

const getTimeDelta = (date: string) => {
  const pastTime = new Date(date);
  const now = new Date();
  const delta = now.getTime() - pastTime.getTime();
  const seconds = Math.floor(delta / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return "a few moments ago";
  } else if (minutes < 2) {
    return "1 minute ago";
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 2) {
    return "1 hour ago";
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 2) {
    return "1 day ago";
  } else if (days < 30) {
    return `${days} days ago`;
  } else if (months < 2) {
    return "1 month ago";
  } else if (months < 12) {
    return `${months} months ago`;
  } else if (years < 2) {
    return "A year ago";
  } else {
    return `${years} years ago`;
  }
}

const getTimeTo = (date: string): string => {
  const now = new Date();
  const futureTime = new Date(date);
  const delta = futureTime.getTime() - now.getTime();
  const seconds = Math.floor(delta / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years} years`;
  }
  if (months > 0) {
    return `${months} months`;
  }
  if (days > 0) {
    return `${days} days`;
  }
  return `${hours} hours`;
}

const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const downloadFile = async (url: string, filename: string) => {
  try {
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    anchor.remove();
  } catch (error) {
    notificationUtil.error('Failed to download file');
    throw error;
  }
}

const extractTelegramChannelId = (url: string) => {
  const telegramURLParts = url.split('/');
  const origin = telegramURLParts[2];
  const version = telegramURLParts[3].toLowerCase();
  const id = telegramURLParts[4];

  if (origin !== 'web.telegram.org') return null;

  const telegramChannelId = version?.toLowerCase() === 'a'
    ? id.split('#')[1]
    : version?.toLowerCase() === 'k'
      ? `-100${id.split('#-')[1]}`
      : url;

  return telegramChannelId;
}

const normalizeBytes = (bytes: number): string => {
  const tb = bytes / 1024 / 1024 / 1024 / 1024;
  const gb = bytes / 1024 / 1024 / 1024;
  const mb = bytes / 1024 / 1024;

  if (tb >= 1) {
    return `${tb.toFixed(2)} TB`;
  }
  if (gb >= 1) {
    return `${gb.toFixed(2)} GB`;
  }
  return `${mb.toFixed(2)} MB`;
}

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

const helperUtil = { formatPhoneNumber, getTimeDelta, getTimeTo, formatDate, formatTime, convertTimeToMinutesAndSeconds, convertToNumber, capitalize, downloadFile, extractTelegramChannelId, normalizeBytes }

export default helperUtil