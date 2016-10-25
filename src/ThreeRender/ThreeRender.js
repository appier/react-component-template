import React from 'react';
const THREE = require('three');

//export globally for Projector & CanvasRenderer inject their function
window.THREE = THREE;

require('three/examples/js/renderers/Projector');
require('three/examples/js/renderers/CanvasRenderer')

const SEPARATION = 200, AMOUNTX = 50, AMOUNTY = 50;
const PI2 = Math.PI * 2;

const material = new THREE.SpriteCanvasMaterial( {
  color: 0xffffff,
  program: ( context ) => {
    context.beginPath();
    context.arc( 0, 0, 0.5, 0, PI2, true );
    context.fill();
  }
});

const ThreeRender = React.createClass({

  particles: [],
  count: 0,
  unmounted: false,

  componentDidMount() {
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    this.init();
    this.animate();
  },

  componentWillUnmount() {
    this.unmounted = true;
    window.removeEventListener('resize', this.onWindowResize);
  },

  init(){
    if(this.root){
      let particle;
      let i = 0;
      const container = document.createElement( 'div' );
      this.root.appendChild( container );
      this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
      this.camera.position.y = 300;
      this.camera.position.z = 500;

      this.scene = new THREE.Scene();

      for ( let ix = 0; ix < AMOUNTX; ix ++ ) {
        for ( let iy = 0; iy < AMOUNTY; iy ++ ) {
          particle = this.particles[ i ++ ] = new THREE.Sprite( material );
          particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
          particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
          this.scene.add( particle );
        }
      }
      this.renderer = new THREE.CanvasRenderer();
      this.renderer.setPixelRatio( window.devicePixelRatio );
      this.renderer.setSize( window.innerWidth, window.innerHeight );
      container.appendChild( this.renderer.domElement );
      window.addEventListener('resize', this.onWindowResize);
    }
  },

  onWindowResize() {
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  },

  animate() {
    if(!this.unmounted){
      requestAnimationFrame(this.animate);
      this.renderCanvans();
    }
  },

  renderCanvans() {
    let particle;
    let i = 0;
    this.camera.lookAt( this.scene.position );
    for ( let ix = 0; ix < AMOUNTX; ix ++ ) {
      for ( let iy = 0; iy < AMOUNTY; iy ++ ) {
        particle = this.particles[ i++ ];
        particle.position.y = ( Math.sin( ( ix + this.count ) * 0.3 ) * 50 ) +
          ( Math.sin( ( iy + this.count ) * 0.5 ) * 50 );
        particle.scale.x = particle.scale.y = ( Math.sin( ( ix + this.count ) * 0.3 ) + 1 ) * 4 +
          ( Math.sin( ( iy + this.count ) * 0.5 ) + 1 ) * 4;
      }
    }
    this.renderer.render( this.scene, this.camera );
    this.count += 0.1;
  },

  render(){
    const {props} = this;
    return (
      <div ref={(el)=>this.root=el}>
      </div>
    );
  }

});

export default ThreeRender;
