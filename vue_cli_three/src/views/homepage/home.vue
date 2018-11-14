<template>
  <div class="container" id="container">
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import * as until from './until.js'
import * as THREE from 'three'
  @Component({
    component:{
    
    },
   mounted() {
    this.init()  
    this.animate()
   },
  })

export default class Home extends Vue {
  colorsBasic = {
   red:0xf25346,    
   white:0xd8d0d1,  
   brown:0x59332e,  
   pink:0xF5986E,   
   brownDark:0x23190f,  
   blue:0x68c3c0
  }
  init(){
    this.createScene()
    this.createLights()
    this.createSea()
    this.createSky()
    this.createPlane()
    this.renderer.render(this.scene, this.camera);
  }
  createScene(){
    this.HEIGHT = window.innerHeight
    this.WIDTH = window.innerWidth
    this.scene = new THREE.Scene()
    // 在场景中添加雾的效果；样式上使用和背景一样的颜色
    this.scene.fog = new THREE.Fog(0xf7d9aa,100,950)
      // 创建相机
    this.aspectRatio = this.WIDTH / this.HEIGHT   
    this.fieldOfView = 60   
    this.nearPlane = 1  
    this.farPlane = 10000
   
   /**
   * PerspectiveCamera 透视相机
   * @param fieldOfView 视角
   * @param aspectRatio 纵横比
   * @param nearPlane 近平面
   * @param farPlane 远平面
   */
    this.camera = new THREE.PerspectiveCamera(       
    this.fieldOfView,
    this.aspectRatio,
    this.nearPlane,
    this.farPlane
    )
    // 设置相机的位置
    this.camera.position.x = 0  
    this.camera.position.z = 200    
    this.camera.position.y = 100 
    // 创建渲染器
    this.renderer = new THREE.WebGLRenderer({ 
    // 在 css 中设置背景色透明显示渐变色
      alpha: true, 
    // 开启抗锯齿，但这样会降低性能。
    // 不过，由于我们的项目基于低多边形的，那还好 :) 
      antialias: true 
    })
    //定义渲染器尺寸
    this.renderer.setSize(this.WIDTH, this.HEIGHT) 
    // 打开渲染器的阴影地图
    this.renderer.shadowMap.enabled = true 
    this.container = document.getElementById('container')
    this.container.appendChild(this.renderer.domElement)
    
    // 监听屏幕，缩放屏幕更新相机和渲染器的尺寸
    window.addEventListener('resize', this.handleWindowResize, false)
  }
  handleWindowResize(){
    // 更新渲染器的高度和宽度以及相机的纵横比
   this.HEIGHT = window.innerHeight 
   this.WIDTH = window.innerWidth           
   this.renderer.setSize(this.WIDTH, this.HEIGHT) 
   this.camera.aspect = this.WIDTH / this.HEIGHT        
   this.camera.updateProjectionMatrix()
  }
  createLights(){
// 半球光就是渐变的光；
   // 第一个参数是天空的颜色，第二个参数是地上的颜色，第三个参数是光源的强度
   this.hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9);
   // 方向光是从一个特定的方向的照射
   // 类似太阳，即所有光源是平行的
   // 第一个参数是关系颜色，第二个参数是光源强度
   this.shadowLight = new THREE.DirectionalLight(0xffffff, .9);
   // 设置光源的方向。  
   // 位置不同，方向光作用于物体的面也不同，看到的颜色也不同
   this.shadowLight.position.set(150, 350, 350);

   // 开启光源投影 
   this.shadowLight.castShadow = true;
   // 定义可见域的投射阴影
   this.shadowLight.shadow.camera.left = -400;
   this.shadowLight.shadow.camera.right = 400;
   this.shadowLight.shadow.camera.top = 400;
   this.shadowLight.shadow.camera.bottom = -400;
   this.shadowLight.shadow.camera.near = 1;
   this.shadowLight.shadow.camera.far = 1000;

   // 定义阴影的分辨率；虽然分辨率越高越好，但是需要付出更加昂贵的代价维持高性能的表现。
   this.shadowLight.shadow.mapSize.width = 2048;
   this.shadowLight.shadow.mapSize.height = 2048;

   // 为了使这些光源呈现效果，只需要将它们添加到场景中
   this.scene.add(this.hemisphereLight);  
   this.scene.add(this.shadowLight);

  }
  createPlane(){
   this.airplane = new  until.airPlane(THREE,this.colorsBasic);
   this.airplane.mesh.scale.set(.25,.25,.25);
   this.airplane.mesh.position.y = 100;
   this.scene.add(this.airplane.mesh);
  }
  createSea(){
    this.sea = new until.Sea(THREE,this.colorsBasic)
    // 在场景底部，稍微推挤一下
    this.sea.mesh.position.y = -600;
    // 添加大海的网格至场景
    this.scene.add(this.sea.mesh);
  }
  createSky(){
    this.sky = new until.Sky(THREE,this.colorsBasic);
    this.sky.mesh.position.y = -600;
    this.scene.add(this.sky.mesh);
  }


  animate(){
   this.airplane.propeller.rotation.x += 0.3;
   this.sea.mesh.rotation.z += .005;
   this.sky.mesh.rotation.z += .01;
   // 渲染场景
   this.renderer.render(this.scene, this.camera);

   // 重新调用 render() 函数
   requestAnimationFrame(this.animate);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  #container{
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: linear-gradient(#e4e0ba, #f7d9aa);
    overflow: hidden;
  }
</style>
