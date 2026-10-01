import SITE_CONFIG from "@/config";
const { vhMusicApi } = SITE_CONFIG;
import { $GET, LoadStyle } from '@/utils/index'
import musicStyles from 'aplayer/dist/APlayer.min.css?url';

// 初始化音乐播放器
export default async (MusicList: any[]) => {
  const musicDOM: any = document.querySelectorAll(".vh-node.vh-vhMusic");
  if (!musicDOM.length || !vhMusicApi) return;
  // 只有含音乐的文章才下载播放器及样式。
  const [{ default: APlayer }] = await Promise.all([
    import('aplayer'),
    LoadStyle(musicStyles)
  ]);
  musicDOM.forEach(async (container: any) => {
    const { type = 'song', server = 'netease', id } = container.dataset;
    const audio = await $GET(`${vhMusicApi}?server=${server}&type=${type}&id=${id}&r=${Math.random()}`);
    const ap = new APlayer({ container, audio, lrcType: 3 });
    MusicList.push(ap);
  });
};
