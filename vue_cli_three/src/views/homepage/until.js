export const Sea = function(THREE,colorsBasic){

  // 创建一个圆柱几何体
  // 参数为：顶面半径，底面半径，高度，半径分段，高度分段
  let geom = new THREE.CylinderGeometry(600,600,800,40,10)
  // 在 x 轴旋转几何体
  geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2))
  // 创建材质
  let mat = new THREE.MeshPhongMaterial({
    color:colorsBasic.blue,
    transparent:true,
    opacity:.6,
    shading:THREE.FlatShading,
  })
  // 为了在 Three.js 创建一个物体，我们必须创建网格用来组合几何体和一些材质 
  this.mesh = new THREE.Mesh(geom, mat)
  // 允许大海对象接收阴影
  this.mesh.receiveShadow = true
}

export const Cloud = function(THREE,colorsBasic){
  // 创建一个空的容器放置不同形状的云
  this.mesh = new THREE.Object3D()
  // 创建一个正方体
  // 这个形状会被复制创建云
  let geom = new THREE.BoxGeometry(20,20,20)
  // 创建材质；一个简单的白色材质就可以达到效果
  let mat = new THREE.MeshPhongMaterial({
    color:colorsBasic.white,  
  })
  // 随机多次复制几何体
  let nBlocs = 3+Math.floor(Math.random()*3)
  for (let i=0;i<nBlocs;i++ ){
    // 通过复制几何体创建网格
    let m = new THREE.Mesh(geom, mat)
    // 随机设置每个正方体的位置和旋转角度
    m.position.x = i*15
    m.position.y = Math.random()*10
    m.position.z = Math.random()*10
    m.rotation.z = Math.random()*Math.PI*2
    m.rotation.y = Math.random()*Math.PI*2
    // 随机设置正方体的大小
    let s = .1 + Math.random()*.9
    m.scale.set(s,s,s)
    // 允许每个正方体生成投影和接收阴影
    m.castShadow = true
    m.receiveShadow = true
    // 将正方体添加至开始时我们创建的容器中
    this.mesh.add(m)
  } 
}
// 定义一个天空对象
export const Sky = function(THREE,colorsBasic){
  // 创建一个空的容器
  this.mesh = new THREE.Object3D()
  // 选取若干朵云散布在天空中
  this.nClouds = 20
  // 把云均匀地散布
  // 我们需要根据统一的角度放置它们
  let stepAngle = Math.PI*2 / this.nClouds
  // 创建云对象
  for(let i=0; i<this.nClouds; i++){
    let c = new Cloud(THREE,colorsBasic)
    // 设置每朵云的旋转角度和位置
    // 因此我们使用了一点三角函数
    let a = stepAngle*i //这是云的最终角度
    let h = 750 + Math.random()*200// 这是轴的中心和云本身之间的距离
    // 三角函数！！！希望你还记得数学学过的东西 :)
    // 假如你不记得: 
    // 我们简单地把极坐标转换成笛卡坐标
    c.mesh.position.y = Math.sin(a)*h
    c.mesh.position.x = Math.cos(a)*h
    // 根据云的位置旋转它
    c.mesh.rotation.z = a + Math.PI/2
    // 为了有更好的效果，我们把云放置在场景中的随机深度位置
    c.mesh.position.z = -400-Math.random()*400
    // 而且我们为每朵云设置一个随机大小
    let s = 1+Math.random()*2
    c.mesh.scale.set(s,s,s)
    // 不要忘记将每朵云的网格添加到场景中
    this.mesh.add(c.mesh)
  }  
}

// 现在我们实例化天空对象，而且将它放置在屏幕中间稍微偏下的位置。

export const airPlane = function(THREE,colorsBasic) {
  this.mesh = new THREE.Object3D()
  // 创建机舱
  let geomCockpit = new THREE.BoxGeometry(60, 50, 50, 1, 1, 1)
  let matCockpit = new THREE.MeshPhongMaterial({
    color: colorsBasic.red,
    shading: THREE.FlatShading
  })
  let cockpit = new THREE.Mesh(geomCockpit, matCockpit)
  cockpit.castShadow = true
  cockpit.receiveShadow = true
  this.mesh.add(cockpit)
  // 创建引擎
  let geomEngine = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1)
  let matEngine = new THREE.MeshPhongMaterial({
    color: colorsBasic.white,
    shading: THREE.FlatShading
  })
  let engine = new THREE.Mesh(geomEngine, matEngine)
  engine.position.x = 40
  engine.castShadow = true
  engine.receiveShadow = true
  this.mesh.add(engine)
  // 创建机尾
  let geomTailPlane = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1)
  let matTailPlane = new THREE.MeshPhongMaterial({
    color: colorsBasic.red,
    shading: THREE.FlatShading
  })
  let tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane)
  tailPlane.position.set(-35, 25, 0)
  tailPlane.castShadow = true
  tailPlane.receiveShadow = true
  this.mesh.add(tailPlane)
  // 创建机翼
  let geomSideWing = new THREE.BoxGeometry(40, 8, 150, 1, 1, 1)
  let matSideWing = new THREE.MeshPhongMaterial({
    color: colorsBasic.red,
    shading: THREE.FlatShading
  })
  let sideWing = new THREE.Mesh(geomSideWing, matSideWing)
  sideWing.castShadow = true
  sideWing.receiveShadow = true
  this.mesh.add(sideWing)
  // 创建螺旋桨
  let geomPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1)
  let matPropeller = new THREE.MeshPhongMaterial({
    color: colorsBasic.brown,
    shading: THREE.FlatShading
  })
  this.propeller = new THREE.Mesh(geomPropeller, matPropeller)
  this.propeller.castShadow = true
  this.propeller.receiveShadow = true

  // 创建螺旋桨的桨叶
  let geomBlade = new THREE.BoxGeometry(1, 100, 20, 1, 1, 1)
  let matBlade = new THREE.MeshPhongMaterial({
    color: colorsBasic.brownDark,
    shading: THREE.FlatShading
  })

  let blade = new THREE.Mesh(geomBlade, matBlade)
  blade.position.set(8, 0, 0)
  blade.castShadow = true
  blade.receiveShadow = true
  this.propeller.add(blade)
  this.propeller.position.set(50, 0, 0)
  this.mesh.add(this.propeller)
}
