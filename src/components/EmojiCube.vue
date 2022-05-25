<template>
  <div class="cube-root">
    <div class="cube">
      <div class="card more more_pro"><a style="background-repeat: repeat" v-bind:href="jumpUrl"><h2>emoji</h2>
        <p class="core">
          <i v-for="item in dataset.classification" :key="item.labelEn" :id="item.icon"></i>
        </p>
        <p class="data">Completion: {{ progressRate + "%" }}</p>
      </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EmojiCube",
  props: {
    jumpUrl:{
      type: String,
      default: "/"
    },
    dataset:{},
    progressRate:0.0
  }
}
</script>

<style scoped>
*, ::after, ::before {
  box-sizing: border-box;
}

p {
  margin-top: 0;
  margin-bottom: 1rem;
}

.cube {
  position: relative;
  width: 100%;
  min-width: 0;
  -ms-flex-preferred-size: 0;
  flex-basis: 0;
  -ms-flex-positive: 1;
  flex-grow: 1;
  max-width: 100%;
}

a {
  color: #007bff;
  -webkit-tap-highlight-color: transparent;
}

h2 {
  margin-bottom: .5rem;
  font-weight: 500;
  line-height: 1.2;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  outline: 0;
}

:focus {
  outline: 0;
}

a:focus, a:hover, a:visited {
  text-decoration: none;
  outline: 0;
}

a {
  color: #3f4257;
  text-decoration: none;
  background-color: transparent;
}

a:hover {
  color: #3b99ff;
}

.more_pro .core i[id]::before {
  font-family: "Apple Color Emoji", "Segoe UI Emoji", NotoColorEmoji, "Segoe UI Symbol", "Android Emoji", EmojiSymbols;
  content: attr(id);
  display: block;
  font-size: inherit;
  line-height: inherit;
  white-space: nowrap;
  letter-spacing: 10px;
}

.card > a {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 190px;
  overflow: hidden;
  border-radius: 5px;
}

.card > a > h2 {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  font-size: 18px;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-transform: uppercase;
  z-index: 1;
}

.card > a > p.core {
  font-size: 80px;
  transition: .33s;
  font-family: "Apple Color Emoji", "Segoe UI Emoji", NotoColorEmoji, "Segoe UI Symbol", "Android Emoji", EmojiSymbols;
}

.card > a > p.data {
  position: absolute;
  bottom: 18px;
  left: 16px;
  margin: 0;
  color: #4485ed;
  font-size: 12px;
  background-color: #fff;
  padding: 3px 6px;
  border-radius: 50px;
  min-width: 1.5rem;
  text-align: center;
}

.card.more_pro > a {
  perspective: 1000px;
  background-image: radial-gradient(rgba(255, 255, 255, .3) 15%, rgba(0, 0, 0, 0) 16%), linear-gradient(to left, #4485ed, #f74881);
  background-size: 5px 5px, 100% 100%;
}

.cube-root [class^=cube] .card.more_pro > a > p.core {
  transform-style: PRESERVE-3D;
  text-shadow: none;
  width: 80px;
  height: 80px;
  position: relative;
  transform: rotateX(-35deg) rotateY(45deg) rotate(0);
  animation: cubespin 10s linear infinite;
}

.card.more_pro > a > p.core i {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: block;
  font-style: normal;
  font-size: 32px;
  line-height: 80px;
  border-radius: 0;
  text-align: center;
  background-color: #fff;
}

.card.more_pro > a > p.core i:nth-of-type(n+1) {
  background: rgba(255, 94, 58, .9);
  transform: rotateX(180deg) translateZ(-40px);
}

.card.more_pro > a > p.core i:nth-of-type(n+2) {
  background: rgba(68, 133, 237, .9);
  transform: rotateX(180deg) translateZ(40px) rotate(180deg) rotateY(180deg);
}

.card.more_pro > a > p.core i:nth-of-type(n+3) {
  background: rgba(255, 153, 0, .9);
  transform: rotateY(90deg) translateZ(40px) rotate(-90deg) rotateX(180deg);
}

.card.more_pro > a > p.core i:nth-of-type(n+4) {
  background: rgba(247, 72, 129, .9);
  transform: rotateY(-90deg) translateZ(40px) rotatex(180deg) rotate(270deg);
}

.card.more_pro > a > p.core i:nth-of-type(n+5) {
  background: rgba(82, 64, 97, .9);
  transform: rotateX(90deg) translateZ(40px) rotate(-90deg) rotateY(180deg);
}

.card.more_pro > a > p.core i:nth-of-type(n+6) {
  background: rgba(156, 39, 176, .9);
  transform: rotateX(90deg) translateZ(-40px);
}

[class^=cube]:nth-of-type(4n-1) > .card > a {
  background-color: #ff5e3a;
}

[class^=cube]:nth-of-type(4n-2) > .card > a {
  background-color: #4485ed;
}

[class^=cube]:nth-of-type(4n-3) > .card > a {
  background-color: #f90;
}

[class^=cube]:nth-of-type(4n-4) > .card > a {
  background-color: #35a541;
}

[class^=cube] > .card > a:hover > p.core {
  text-shadow: none;
  transform: scale(.9);
}

.card.more > a:after {
  content: "\e784";
  font-family: iconfont;
  color: #fff;
  font-size: 36px;
  line-height: 1;
  position: absolute;
  bottom: 20px;
  right: 20px;
  pointer-events: none;
  transform: translate(20px, 0) rotate(45deg);
  transition: .5s;
  opacity: 0;
}

.card.more > a:hover:after {
  transform: translate(0, 0) rotate(-90deg);
  opacity: 1;
}

.card > a > p.core {
  direction: initial;
}

@keyframes cubespin {
  to {
    transform: rotateX(-35deg) rotateY(-315deg) rotate(-360deg);
  }
}

@font-face {
  font-family: iconfont;
  src: url(http://at.alicdn.com/t/font_1699811_130efxhk2gr9.woff2?t=1638341376968) format('woff2'), url(http://at.alicdn.com/t/font_1699811_130efxhk2gr9.woff?t=1638341376968) format('woff'), url(http://at.alicdn.com/t/font_1699811_130efxhk2gr9.ttf?t=1638341376968) format('truetype');
}
</style>
