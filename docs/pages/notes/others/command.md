# 常用命令


## git
- [git - 菜鸟教程](https://www.runoob.com/git/git-tutorial.html)
- [git - 官网](https://git-scm.com/book/zh/v2)

### 配置
| 命令                         | 描述                                      |
|------------------------------|-------------------------------------------|
| `git config --global user.name "FedJavaScript"` | 配置全局用户名    |
| `git config --global user.email "FedJavaScript@example.com"` | 配置全局邮箱  |
| `git config --list`          | 查看配置信息                              |

### 仓库管理
| 命令                         | 描述                                      |
|------------------------------|-------------------------------------------|
| `git init`                   | 初始化新仓库                              |
| `git clone <repository-url>` | 克隆远程仓库                              |

### 工作区管理
| 命令                         | 描述                                      |
|------------------------------|-------------------------------------------|
| `git status`                 | 查看工作区状态                            |
| `git status -s`              | 查看简化状态信息                          |

### 分支管理
| 命令                         | 描述                                      |
|------------------------------|-------------------------------------------|
| `git branch -v`              | 查看分支情况                              |
| `git branch <branch-name>`   | 创建新分支                                |
| `git checkout <branch-name>` | 切换分支                                  |
| `git checkout -b <branch-name>` | 创建并切换分支                          |
| `git branch -d <branch-name>` | 删除分支                                  |

### 远程仓库管理
| 命令                         | 描述                                      |
|------------------------------|-------------------------------------------|
| `git remote add origin <repository-url>` | 添加远程仓库                          |
| `git remote -v`              | 查看远程仓库                              |
| `git push origin <branch-name>` | 推送到远程                                |
| `git pull origin <branch-name>` | 拉取远程更新                              |

### 提交管理
| 命令                         | 描述                                      |
|------------------------------|-------------------------------------------|
| `git add <file-name>`        | 添加指定文件到暂存区                      |
| `git add .`                  | 添加所有更改                              |
| `git commit -m "commit message"` | 提交到本地仓库                          |
| `git commit -am "commit message"` | 添加并提交                              |
| `git merge <branch-name>`    | 合并分支                                  |
| `git rebase <branch-name>`   | 变基操作                                  |
| `git rebase --continue`      | 解决冲突后继续变基                        |
| `git revert <commit-id>`     | 创建反向提交                              |

### 暂存区管理
| 命令                         | 描述                                      |
|------------------------------|-------------------------------------------|
| `git stash`                  | 保存当前工作进度                          |
| `git stash list`             | 查看存储的工作进度                        |
| `git stash pop`              | 恢复最近的进度                            |
| `git stash clear`            | 删除所有进度                              |

### 日志查看
| 命令                         | 描述                                      |
|------------------------------|-------------------------------------------|
| `git log`                    | 查看提交日志                              |
| `git log --oneline`          | 查看简化日志                              |
| `git log --graph --pretty=oneline --abbrev-commit` | 查看图形化日志  |

### 差异查看
| 命令                         | 描述                                      |
|------------------------------|-------------------------------------------|
| `git diff`                   | 查看工作区和暂存区的差异                  |
| `git diff --staged`          | 查看暂存区和最新提交的差异                |
| `git diff <branch1> <branch2>` | 查看两个分支的差异                      |

### 撤销操作
| 命令                         | 描述                                      |
|------------------------------|-------------------------------------------|
| `git checkout -- <file-name>` | 撤销工作区的修改                          |
| `git reset HEAD <file-name>` | 撤销暂存区的修改                          |

## npm

- 官方镜像：https://registry.npmjs.org/
- ‌淘宝NPM镜像‌：https://registry.npmmirror.com
- ‌阿里云NPM镜像‌：https://npm.aliyun.com
- ‌腾讯云NPM镜像‌：https://mirrors.cloud.tencent.com/npm/
- ‌华为云NPM镜像‌：https://mirrors.huaweicloud.com/repository/npm/
- ‌网易NPM镜像‌：https://mirrors.163.com/npm/
- ‌中国科学技术大学开源镜像站‌：http://mirrors.ustc.edu.cn/npm/
- ‌清华大学开源镜像站‌：https://mirrors.tuna.tsinghua.edu.cn/npm/

| 命令                         | 描述                                      |
|------------------------------|-------------------------------------------|
| `npm init`                   | 初始化一个新的 npm 项目                   |
| `npm init -y`                | 使用默认配置初始化项目                    |
| `npm install`                | 安装项目依赖                              |
| `npm install -g <package>`   | 安装全局包                                |
| `npm install <package>`      | 安装本地包                                |
| `npm install <package> --save-dev` | 安装开发依赖                            |
| `npm install <package>@<version>` | 安装特定版本的包                        |
| `npm update <package>`       | 更新包                                    |
| `npm uninstall <package>`    | 卸载包                                    |
| `npm list`                   | 查看已安装的包                            |
| `npm list -g`                | 查看全局已安装的包                        |
| `npm start`                  | 运行项目                                  |
| `npm test`                   | 运行测试                                  |
| `npm run <script-name>`      | 运行自定义脚本                            |
| `npm config list`            | 查看 npm 配置                             |
| `npm config set <key> <value>` | 设置 npm 配置                             |
| `npm config get <key>`       | 查看特定配置                              |
| `npm config set registry <url>` | 设置镜像源                               |
| `npm login`                  | 登录 npm 账户                             |
| `npm publish`                | 发布包                                    |
| `npm info <package>`         | 查看包信息                                |