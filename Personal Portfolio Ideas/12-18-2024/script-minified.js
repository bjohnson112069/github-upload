import*as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.169.0/three.module.min.js';function loadContent(){const scrollDown=document.querySelector('.scroll-down--icon')
const header=document.querySelector('header');const navbar=document.querySelector('#navbar');const openNavbar=document.querySelector('#open-navbar-button');const closeNavbar=document.querySelector('#close-navbar-button');const overlay=document.querySelector('.overlay');const media=window.matchMedia('(width <= 780px)');const navLinks=document.querySelectorAll('.nav__link');const moreButtons=document.querySelectorAll('.view-more-button');const textContainer=document.querySelector('#textContainer');const images=document.querySelectorAll(".img__fade");const skillCards=document.querySelectorAll('.skills__card');const isTouchDevice=matchMedia('(hover: none) and (pointer: coarse)').matches;let imageIndex=0;let isMobile=!1;let easeFactor=0.02;let scene,camera,renderer,planeMesh;let mousePosition={x:0.5,y:0.5};let targetMousePosition={x:0.5,y:0.5};let prevPosition={x:0.5,y:0.5};const vertexShader=`
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;const fragmentShader=`
        varying vec2 vUv;
        uniform sampler2D u_texture;
        uniform vec2 u_mouse;
        uniform vec2 u_prevMouse;

        void main() {
            // Divide the UV by the grid size for correct sampling
            vec2 gridUV = floor(vUv * vec2(40.0, 40.0)) / vec2(40.0, 40.0); 

            // Find the center of each pixel
            vec2 centerOfPixel = gridUV + vec2(1.0/40.0, 1.0/40.0);

            // Calculate the mouse movement direction
            vec2 mouseDirection = u_mouse - u_prevMouse;

            // Calculate the direction from the center of the pixel to the mouse
            vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
            float pixelDistanceToMouse = length(pixelToMouseDirection);

            // Apply a smoothstep to adjust the strength based on distance
            float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);

            // Calculate the UV offset based on mouse direction and strength
            vec2 uvOffset = strength * -mouseDirection * 0.3;
            vec2 uv = vUv - uvOffset;

            // Sample the texture and output the color
            vec4 color = texture(u_texture, uv);
            gl_FragColor = color;
        }
    `;function handleScrollDownLinkClick(){document.documentElement.style.setProperty('--scroll-padding',`0px`)}
function openSidebar(){navbar.classList.add('show');openNavbar.setAttribute('aria-expanded','true');navbar.removeAttribute('inert','')}
function closeSidebar(){navbar.classList.remove('show');openNavbar.setAttribute('aria-expanded','false');navbar.setAttribute('inert','')}
function updateNavbar(e){isMobile=e.matches;isMobile?navbar.setAttribute('inert',''):navbar.removeAttribute('inert','')}
function handleNavLinkClick(){if(isMobile)closeSidebar();navLinks.forEach(link=>link===this?link.classList.add('nav__link--active'):link.classList.remove('nav__link--active'));document.documentElement.style.setProperty('--scroll-padding',`${header.offsetHeight - 1}px`)}
function handleViewMoreClick(){const span=this.querySelector('span');this.classList.toggle('expanded');span.textContent=this.matches('.expanded')?'View Less':'View More'}
function handleSkillsCardHover(e){if(e.type==='mouseenter'){this.classList.add('skills__card--active')}
if(e.type==='mouseleave'){skillCards.forEach(card=>card.classList.remove('skills__card--active'))}}
function handleSkillsCardClick(e){skillCards.forEach(card=>{if(card.id===this.id){card.classList.toggle('skills__card--active')}else{card.classList.remove('skills__card--active')}})}
function createTextTexture(text,font,size,color,fontWeight="100"){const canvas=document.createElement('canvas');const ctx=canvas.getContext('2d');const canvasWidth=window.innerWidth;const canvasHeight=window.innerHeight;canvas.width=canvasWidth;canvas.height=canvasHeight;ctx.fillStyle=color||'#ffffff';ctx.clearRect(0,0,canvas.width,canvas.height);ctx.fillRect(0,0,canvas.width,canvas.height);const fontSize=size||Math.floor(canvasWidth*0.1);const fontFamily=font||'Oswald';const fontStr=`${fontWeight} ${fontSize}px "${fontFamily}"`;ctx.font=fontStr;ctx.fillStyle="#2b2b2b";ctx.textAlign='center';ctx.textBaseline='middle';ctx.imageSmoothingEnabled=!0;ctx.imageSmoothingQuality='high';const textMetrics=ctx.measureText(text);const textWidth=textMetrics.width;const scaleFactor=Math.min(1,(canvasWidth*0.8)/textWidth);const aspectCorrection=canvasWidth/canvasHeight;ctx.setTransform(scaleFactor,0,0,scaleFactor/aspectCorrection,canvasWidth/2,canvasHeight/2);ctx.strokeStyle='#2b2b2b';ctx.lineWidth=fontSize*0.005;for(let i=0;i<3;i++){ctx.strokeText(text,0,0)}
ctx.fillText(text,0,0);const texture=new THREE.CanvasTexture(canvas);return texture}
function initializeScene(texture){scene=new THREE.Scene();const aspectRatio=window.innerWidth/window.innerHeight;const containerRect=textContainer.getBoundingClientRect();camera=new THREE.OrthographicCamera(-1,1,1/aspectRatio,-1/aspectRatio,0.1,1000);camera.position.z=1;let shaderUniforms={u_mouse:{type:"v2",value:new THREE.Vector2()},u_prevMouse:{type:"v2",value:new THREE.Vector2()},u_texture:{type:"t",value:texture},};planeMesh=new THREE.Mesh(new THREE.PlaneGeometry(2,2),new THREE.ShaderMaterial({uniforms:shaderUniforms,vertexShader,fragmentShader,}));scene.add(planeMesh);renderer=new THREE.WebGLRenderer({antialias:!0});renderer.setClearColor(0xffffff,1);renderer.setSize(containerRect.width,containerRect.height);renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));textContainer.appendChild(renderer.domElement)}
function reloadTexture(){const newTexture=createTextTexture('BRIAN JOHNSON','Oswald',null,'#ffffff','700');planeMesh.material.uniforms.u_texture.value=newTexture}
function animateScene(){requestAnimationFrame(animateScene);mousePosition.x+=(targetMousePosition.x-mousePosition.x)*easeFactor;mousePosition.y+=(targetMousePosition.y-mousePosition.y)*easeFactor;planeMesh.material.uniforms.u_mouse.value.set(mousePosition.x,1.0-mousePosition.y);planeMesh.material.uniforms.u_prevMouse.value.set(prevPosition.x,1.0-prevPosition.y);renderer.render(scene,camera)}
function handleMouseMove(e){easeFactor=0.04;let rect=textContainer.getBoundingClientRect();prevPosition={...targetMousePosition};targetMousePosition.x=(e.clientX-rect.left)/rect.width;targetMousePosition.y=(e.clientY-rect.top)/rect.height}
function handleMouseEnter(e){easeFactor=0.02;let rect=textContainer.getBoundingClientRect();mousePosition.x=targetMousePosition.x=(e.clientX-rect.left)/rect.width;mousePosition.y=targetMousePosition.y=(e.clientY-rect.top)/rect.height}
function handleMouseLeave(e){easeFactor=0.02;targetMousePosition={...prevPosition}}
function onWindowResize(){const aspectRatio=window.innerWidth/window.innerHeight;const containerRect=textContainer.getBoundingClientRect();camera.left=-1;camera.right=1;camera.top=1/aspectRatio;camera.bottom=-1/aspectRatio;camera.updateProjectionMatrix();renderer.setSize(containerRect.width,containerRect.height);reloadTexture()}
function swapImages(){images[imageIndex].classList.remove("active");imageIndex=(imageIndex+1)%images.length;images[imageIndex].classList.add("active")}
document.fonts.load('400 16px Oswald').then(()=>{initializeScene(createTextTexture('BRIAN JOHNSON','Oswald',null,'#ffffff','700'));animateScene();textContainer.addEventListener('mousemove',handleMouseMove);textContainer.addEventListener('mouseenter',handleMouseEnter);textContainer.addEventListener('mouseleave',handleMouseLeave);window.addEventListener('resize',onWindowResize,!1)});updateNavbar(media);images[imageIndex].classList.add('active');setInterval(swapImages,4000);const contactForm=document.getElementById('contactForm');const formInputs=contactForm.querySelectorAll('.form__input');const patterns={name:/^[a-zA-Z\s]{2,50}$/,email:/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,phone:/^(\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/,message:/^[\s\S]{10,500}$/};const errorMessages={name:'Please enter a valid name (2-50 letters)',email:'Please enter a valid email address',phone:'Please enter a valid phone number',message:'Please enter a message between 10-500 characters'};function validateInput(input){const inputName=input.name;const inputValue=input.value.trim();const errorElement=document.getElementById(`${inputName}Error`);if(inputName==='phone'&&inputValue===''){return!0}
const isValid=patterns[inputName].test(inputValue);if(isValid){input.classList.remove('error');input.classList.add('success');errorElement.classList.remove('show')}else{input.classList.remove('success');input.classList.add('error');errorElement.textContent=errorMessages[inputName];errorElement.classList.add('show')}
return isValid}
formInputs.forEach(input=>{input.addEventListener('input',()=>{validateInput(input)});input.addEventListener('blur',()=>{validateInput(input)})});contactForm.addEventListener('submit',(e)=>{e.preventDefault();let isValid=!0;formInputs.forEach(input=>{if(!validateInput(input)){isValid=!1}});if(isValid){console.log('Form is valid, ready to submit!');const locationField=document.querySelector("#location");const base=window.location.origin;if(locationField){locationField.value=base}
const thanksRedirect=document.querySelector('input[name="_next"]');const failureRedirect=document.querySelector('input[name="_failure"]');if(thanksRedirect){thanksRedirect.value=`${base}/thank-you.html`}
if(failureRedirect){failureRedirect.value=`${base}/failure.html`}
contactForm.submit();contactForm.reset();formInputs.forEach(input=>{input.classList.remove('success','error')})}});openNavbar.addEventListener('click',openSidebar);closeNavbar.addEventListener('click',closeSidebar);overlay.addEventListener('click',closeSidebar);media.addEventListener('change',(e)=>updateNavbar(e));scrollDown.addEventListener('click',handleScrollDownLinkClick);navLinks.forEach(link=>link.addEventListener('click',handleNavLinkClick));moreButtons.forEach(button=>button.addEventListener('click',handleViewMoreClick));skillCards.forEach(card=>{if(isTouchDevice){card.addEventListener('click',handleSkillsCardClick)}else{card.addEventListener('mouseenter',handleSkillsCardHover);card.addEventListener('mouseleave',handleSkillsCardHover)}})}
window.addEventListener('DOMContentLoaded',loadContent)