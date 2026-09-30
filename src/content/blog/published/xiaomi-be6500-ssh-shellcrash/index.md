---
title: "小米 Xiaomi BE6500 解锁 SSH 与 ShellCrash 配置笔记"
date: "2026-05-26"
updated: "2026-09-21"
id: "xiaomi-be6500-ssh-shellcrash"
categories: "路由器"
tags: ["clippings", "Xiaomi", "ShellCrash"]
cover: ""
hide: false
recommend: false
top: false
---

> 剪藏 / 本地发布测试\
> 来源：[uyez/lyq — 小米 Xiaomi BE6500 教程](https://github.com/uyez/lyq/releases/tag/be6500)。\
> 本文保留原教程与 2026-09-21 维护记录。版本、网络验证结果和负载快照均为当时的历史记录；密码、电脑路径与个人配置及备份文件名已替换为公开示例。

本教程一共分为两个教程，第一个是解锁SSH，第二个是安装ShellCrash科学上网。在小米路由器原来的固件上安装科学上网软件，不影响路由器原有的功能，并且支持全屋科学上网。BE3600和AX3000T也可以参考本教程。

## 小米路由器 BE6500 解锁SSH教程

视频教程：▶ [https://youtu.be/dlsoMDtmDHA](https://youtu.be/dlsoMDtmDHA)

### 1、Windows搜索cmd，以管理员身份运行：

```
curl -X POST http://192.168.31.1/cgi-bin/luci/;stok=xxx/api/xqsystem/start_binding -d "uid=1234&key=1234'%0Anvram%20set%20ssh_en%3D1'"
curl -X POST http://192.168.31.1/cgi-bin/luci/;stok=xxx/api/xqsystem/start_binding -d "uid=1234&key=1234'%0Anvram%20commit'"
curl -X POST http://192.168.31.1/cgi-bin/luci/;stok=xxx/api/xqsystem/start_binding -d "uid=1234&key=1234'%0Ased%20-i%20's%2Fchannel%3D.*%2Fchannel%3D%22debug%22%2Fg'%20%2Fetc%2Finit.d%2Fdropbear'"
curl -X POST http://192.168.31.1/cgi-bin/luci/;stok=xxx/api/xqsystem/start_binding -d "uid=1234&key=1234'%0A%2Fetc%2Finit.d%2Fdropbear%20start'"
```

### 2、登录路由器

工具下载： [Putty下载>>](https://github.com/uyez/lyq/releases/download/rom/putty.zip)\
通过SSH登录，用户名是：root，密码通过网站计算， [密码计算网站>>](https://miwifi.dev/ssh)\
更改SSH登录密码，执行以下指令：（用户名仍为：root，请按提示自行设置并确认你自己的密码）

```
passwd root
```

### 3、固化SSH

```
nvram set ssh_en=1
nvram set telnet_en=1
nvram set uart_en=1
nvram set boot_wait=on
nvram commit
```

永久开启SSH（重启不会关闭）

```
mkdir /data/auto_ssh && cd /data/auto_ssh
curl -O https://fastly.jsdelivr.net/gh/lemoeo/AX6S@main/auto_ssh.sh
chmod +x auto_ssh.sh

uci set firewall.auto_ssh=include
uci set firewall.auto_ssh.type='script'
uci set firewall.auto_ssh.path='/data/auto_ssh/auto_ssh.sh'
uci set firewall.auto_ssh.enabled='1'
uci commit firewall
```

## 小米路由器 BE6500 安装 ShellCrash 科学上网教程

视频教程：▶ [https://youtu.be/Z9hr7bGhA7M](https://youtu.be/Z9hr7bGhA7M)

**Clash安装源：**

```
export url='https://fastly.jsdelivr.net/gh/juewuy/ShellCrash@master' && sh -c "$(curl -kfsSl $url/install.sh)" && source /etc/profile &> /dev/null
```

**备用安装源：**

```
export url='https://gh.jwsc.eu.org/master' && sh -c "$(curl -kfsSl $url/install.sh)" && source /etc/profile &> /dev/null
```

**Clash管理地址：** [Clash 管理页面](http://192.168.31.1:9999/ui/) (如果打不开请按Ctrl+F5 刷新)

# 更换订阅地址

```
# SSH 登录，输入你自行设置的密码
ssh -oHostKeyAlgorithms=+ssh-rsa -oPubkeyAcceptedAlgorithms=+ssh-rsa root@192.168.31.1

# 重新下载安装shell脚本
export url='https://fastly.jsdelivr.net/gh/juewuy/ShellCrash@master' && sh -c "$(curl -kfsSl $url/install.sh)" && source /etc/profile &> /dev/null

#输入crash 开始配置
root@XiaoQiang:~# crash

#在线下载YAML文件失败，本地上传
scp -O \
-oHostKeyAlgorithms=+ssh-rsa \
-oPubkeyAcceptedAlgorithms=+ssh-rsa \
/path/to/example-clash.yaml \
root@192.168.31.1:/tmp/
root@192.168.31.1's password:
example-clash.yaml                                                                                                                                                                     100%  364KB   3.0MB/s   00:00


```

## 2026-09-21 管理页面无法访问的修复记录

### 故障与恢复

- 路由器原厂后台可以访问，但 TCP 22 和 9999 端口均拒绝连接。在 `/data`、`/userdisk` 等位置未找到原 ShellCrash 或 SSH 自启脚本；文件丢失的具体原因未确认。
- 使用网页登录后的有效 `stok`，按本文前面的命令恢复 SSH，并使用 `passwd root` 交互式设置你自己的 SSH 密码。网页后台管理密码和 SSH 密码是两套凭据，不能混用；不要把临时 `stok` 长期保存在文档中。
- 重新安装 ShellCrash **1.9.5beta3**，目录为 `/data/ShellCrash`；内核为 **Mihomo v1.19.28 / ARMv7**，压缩内核保存在持久存储中。
- 恢复电脑中的 `/path/to/example-clash.yaml`。另外两份同名带数字后缀的备份内容与此文件完全一致。保留了订阅原有的节点证书校验设置。
- 此固件的 Tproxy 模式未能建立完整规则，改用 **Mix 混合模式（TCP 重定向 + UDP TUN）**。已验证 `utun` 和对应转发规则正常。
- 安装本地网页面板，地址仍为 [ShellCrash 管理页面](http://192.168.31.1:9999/ui/)。选择并保存了可用的「香港 01」节点。
- 已写入 SSH 恢复及 ShellCrash 自启动配置：`/data/shellcrash_init.sh`、`firewall.ShellCrash` 和 `/etc/rc.d/S99shellcrash`。已验证 ShellCrash 服务重启；本次没有重启整台路由器，整机重启后的恢复尚未实测。

### 备份与空间处理

在使用 ShellCrash 自带清理功能前，将固件历史配置备份、日志和相关原配置归档到电脑，随后清理安装所需空间。清理脚本会停用向闪存定期写入日志和历史配置备份的对应任务。

本机备份目录（示例）：`/path/to/router-backup`

- `example-router-backup.tar.gz`：清理前的固件历史备份、日志、定时任务及原防火墙配置。
- `example-shellcrash-backup.tar.gz`：恢复后的 ShellCrash 配置、节点文件及自启动配置。此压缩包含凭据，只应保存在自己的设备上。

### 验证及负载快照

- 管理页面和本地 JS/CSS 资源返回 HTTP 200，内核 API 正常。
- 经 `192.168.31.1:7890` 显式代理访问 Google 返回 HTTP 204。
- 通过 Wi-Fi 网卡直接访问、由路由器透明代理转发，也返回 HTTP 204。
- 香港 01 节点测试延迟约 49 ms；节点延迟会随网络情况变化。
- `23:18` 的快照：4 核 CPU，1/5/15 分钟负载约 **0.20 / 0.56 / 0.84**；可用内存约 **106 MB**，代理进程实际驻留内存约 **42 MB**；持久存储 `/data` 使用约 **76%**、剩余约 **4.3 MB**。这是轻量联网验证期间的快照，并非满速压力测试。
- 原厂只读 `squashfs` 根分区显示 100% 是镜像布局；检查可写空间时应看 `/data` 和 `/tmp`。

### 下次排查与重启服务

先确认网页后台是否在线，以及 SSH 能否登录。登录 SSH 后：

```sh
# 查看运行状态和资源
uptime
free
df -h /data /tmp
pidof CrashCore
tail -30 /tmp/ShellCrash/ShellCrash.log

# 重新启动 ShellCrash，不重启整台路由器
/data/ShellCrash/start.sh restart
sleep 10

# 验证管理 API
curl -s http://127.0.0.1:9999/version

# 进入交互式管理
crash
```

若 SSH 的 22 端口再次关闭，需要重新登录小米网页后台取得有效 `stok`，再执行前文的 SSH 恢复步骤。若只有 9999 不通，应先检查日志和服务状态，再判断是否需要重装。
