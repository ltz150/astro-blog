import SITE_INFO from '@/config';

export default async (filename: string | null | undefined) => {
  if (filename) return filename;
  return SITE_INFO.Site + SITE_INFO.Cover;
};
