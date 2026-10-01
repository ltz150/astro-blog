import SITE_INFO from '@/config';
export default () => {
  const writeDom = document.querySelector('.header-main>.desc');
  if (!writeDom) return;
  const TypeWriteList: any = SITE_INFO.TypeWriteList;
  if (!Array.isArray(TypeWriteList) || !TypeWriteList.length) return writeDom.remove();
  // 手机和减少动态效果模式直接显示文案，避免首屏持续重绘。
  if (window.matchMedia('(max-width: 768px), (prefers-reduced-motion: reduce)').matches) {
    writeDom.textContent = TypeWriteList[0];
    writeDom.setAttribute('data-static', '');
    return;
  }
  let TypeWriteListIndex = 0;
  let index = 0;
  let isDeleting = false;
  // 主动画函数
  const run = () => {
    writeDom.innerHTML = TypeWriteList[TypeWriteListIndex].substring(0, index);
    // 正常打字阶段
    if (!isDeleting) {
      if (index < TypeWriteList[TypeWriteListIndex].length) {
        index++;
        setTimeout(run, 188); // 打字速度
      } else {
        // 完整展示后开始删除
        setTimeout(() => {
          isDeleting = true;
          run();
        }, 2888);
      }
    } else {
      if (index > 0) {
        index--;
        setTimeout(run, 88); // 删除速度（比打字快）
      } else {
        isDeleting = false;
        TypeWriteListIndex++;
        TypeWriteListIndex = TypeWriteListIndex % TypeWriteList.length;
        setTimeout(run, 500);
      }
    }
  }
  // 启动动画
  run();
}
