## Free to Go 无障碍社区生活地图共建平台

理念：人人参与，共建无障碍生态

目前为一个demo，完成地图访问页面的开发（可以实现对地点的标注、搜索等）、地点信息卡片的开发、无障碍信息板块的添加等，未来会继续完善其他部分，增加权限管理，接入生活服务、国内地图的API。

用到的地图API:
* [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/guides)
* [Mapbox Search JS](https://docs.mapbox.com/mapbox-search-js/guides/)
* [Static Images API](https://docs.mapbox.com/api/maps/static-images/)

![平台主页](https://github.com/user-attachments/assets/3af9af64-ed1d-44cc-8f74-6c57314cebaf)
![地点标注](https://github.com/user-attachments/assets/db51152e-87da-4727-a1af-c776e19fb3b3)
![无障碍信息反馈模块](https://github.com/user-attachments/assets/f3eb921e-5270-42ee-b7fd-53910c2867dc)


## 本地部署 (Windows-WSL2-Ubuntu)

安装依赖:

```
npm install
```

切换到项目文件夹，启动项目:

```
cd ./demo-freetogo 
npm run dev
```
