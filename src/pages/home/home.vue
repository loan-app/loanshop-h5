<style lang="less" scoped>
  html, body, p, ul, li, h2, h3, div {
    margin: 0;
    padding: 0;
    -webkit-user-select: text
  }

  #home-container {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  ul, li {
    list-style: none;
  }

  section {
    overflow: hidden;
  }

  nav {
    list-style: none;
    position: absolute;
    top: 12px;
    left: 0;
    right: 0;
    z-index: 999;
  }

  body {
    min-width: 1000px;
  }

  nav ul {
    width: 1000px;
    margin: auto;
  }

  nav li {
    float: left;
    font-size: 20px;
    padding: 0 20px;
  }

  nav li a {
    color: #c2c2c2;
    text-decoration: none;
  }

  nav .active a {
    color: #fe5850;
  }

  .banner {
    position: relative;
    height: 240px;
    margin: auto;
    background: url(images/banner.png);
    background-size: cover;
    background-position: 50% 50%;
  }
  .download-btn{
    background: url(images/btn_bg.png);
    background-size: cover;
    width: 126px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    margin-top: 13px;
    margin-left: -25px;
  }

  .banner > img {
    width: 100%;
  }

  .banner > div {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 23px;
    text-align: center;
  }

  .banner > div img {
    width: 84px;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
  }

  .banner p {
    font-size: 22px;
    color: #ffffff;
    padding: 33px;
  }

  .banner div a {
    color: #fff;
    font-size: 21px;
    text-decoration: none;

    padding: 8px 62px;
    border-radius: 8px;
  }

  .advantage {
    margin: 33px auto 0px;
    width: 600px;
  }

  .advantage-bg {
    margin-top: 33px;
    background: url(images/company_bg.png);
    background-size: cover;
    height: 175px;
  }

  .about-bg {
    margin-top: 33px;
    background: url(images/about_bg.png);
    background-size: cover;
    height: 175px;
  }

  .info-bg {
    margin-top: 33px;
    background: url(images/info_bg.png);
    background-size: cover;
    height: 175px;
  }

  .advantage ul {
    display: inline-block;
    vertical-align: middle;
  }


  .advantage img {
    display: inline-block;
    vertical-align: middle;
  }

  .advantage li {
    margin: 73px 0;
  }

  .advantage ul h3 {
    font-weight: normal;
    font-size: 28px;
    color: #474747;
    margin: 15px 0;
  }

  .advantage ul p {
    font-size: 20px;
    color: #999;
    line-height: 1.5;
  }

  .advantage > h2 {
    font-size: 28px;
    color: #474747;
    text-align: center;
    font-weight: normal;
    margin: 48px auto 28px;
  }

  .advantage > p {
    text-indent: 2em;
    color: #030303;
    font-size: 20px;
    line-height: 34px;
    margin: 28px 0 53px;
  }

  .service {
    background: #f9f9fa;
    padding: 28px 0 57px;
  }

  .service h2 {
    font-size: 28px;
    color: #474747;
    text-align: center;
    margin-bottom: 60px;
    font-weight: normal;
  }

  .service ul {
    overflow: hidden;
    width: 1200px;
    margin: auto;
  }

  .service li {
    float: left;
    width: 50%;
    text-align: center;
    font-size: 24px;
    color: #999;
  }

  .service img {
    margin-bottom: 26px;
    width: 66px;
  }

  .about {
    min-width: 1200px;
    background: #F9F9FA;
    padding: 0px 0 37px;
    text-align: center;
    margin: auto;
    margin-top: 30px;
  }

  .about h2 {
    font-size: 28px;
    color: #474747;
    text-align: center;
    margin: 40px 0;
    font-weight: normal;
  }

  .about ul {
    font-size: 0;
    margin-bottom: 36px;
    min-width: 1200px;
  }

  .about li {
    display: inline-block;
    width: 400px;
  }

  .about img {
    width: 95%;
  }

  .about p {
    text-align: left;
    text-indent: 2em;
    font-size: 20px;
    color: #030303;
    line-height: 34px;
    margin: 27px auto 0;
    max-width: 1200px;
    font-weight: normal;
  }

  .download {
    padding: 80px 0 82px;
    text-align: center;
  }

  .download img {
    width: 280px;
  }

  .download p {
    font-size: 22px;
    color: #474747;
    margin-top: 14px;
  }

  footer {
    background: url(images/footer_bg.png);
    font-size: 12px;
    color: #fff;
    padding: 22px 0 50px;
    height: 250px;
    margin-top: 33px;
  }

  footer .copyright {
    border-top: 1px solid #a2a2a2;
    margin: 8px 0 0;
    font-size: 16px;
    padding-top: 16px;
  }

  @media screen and (max-width: 1300px) {
    .advantage {
      width: 1000px;
    }

    .advantage img {
      margin-right: 150px;
    }

    .advantage-bg {
      margin-top: 33px;
      background: url(images/company_bg.png);
      background-size: cover;
    }

    .about, .about ul {
      min-width: 1000px;
    }

    .about li {
      width: 333px;
    }

    .about p {
      max-width: 1000px;
    }
  }
</style>
<template>

  <div id="home-container">
    <section class="banner">
      <div>
        <img src="./images/logo3.png"/>
        <p>借钱就找融花花</p>
      </div>
    </section>

    <section style="text-align: center;width: 100%;background: #fff;height: 156px;line-height: 156px;">
      <img src="./images/add_1.png" style="width:105px;height: 84px;margin-right: 70px;margin-top: 30px">

      <img src="./images/add_2.png" style="width:100px;height: 88px;">
      <img src="./images/add_3.png" style="width:136px;height: 82px;margin-left: 70px;">
    </section>

    <section class="advantage" style="text-align: center;">
      <img src="./images/company_title.png" style="width:80px;height: 25px;">
      <div class="advantage-bg">
        <div style="width:40%;word-wrap:break-word;">
        </div>
      </div>
    </section>

    <section class="advantage" style="text-align: center;">
      <img src="./images/about_title.png" style="height: 25px;">
      <div class="about-bg">
        <div style="width:40%;word-wrap:break-word;">
        </div>
      </div>
    </section>

    

  </div>

</template>
<script>
  import {mapState} from 'vuex'

  export default {
    name: 'home',
    created() {
      document.title = '融花花';
    }
  }
</script>
