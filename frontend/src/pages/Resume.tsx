import { useLayoutEffect, useState, useEffect, useRef } from "react";
import '@/styles/new.css'
/*
TODO: 
    1.轮播图和页面滚动防抖
*/
export default function Resume(){

    //首屏数字
    let icons = [
        ['TECHNICAL', '技术文档', '74'],
        ['PROJECT', '项目参与', '24'],
        ['TIME' ,'开发时间', '356'],
    ]
    
    //技能
    let skill = {
        '基础':{ 'BASICS':[{ HTML: '77%' }, { CSS: '70%' }, { JavaScript: '90%' }] },
        '拓展':{ 'ESPAND':[{ TypeScript: '90%' }, { SCSS: '88%' }, { NodeJS: '65%' }] },
        '框架':{ 'FRAME':[{ VueJS: '93%' }, { ReactJS: '80%' }, { JQuery: '70%' }] },
        '跨端':{ 'CROSS-PLATFROM':[{ Flutter: '80%' }, { 'React Native': '60%' }, { Electron: '90%' }] },
    };

    //经历
    let historyArr_1 = [
        {
            site: '大学 - 山东英才学院',
            time: 'Sep 2017 - Jun 2020',
            intr: '&emsp;&emsp;在校主修计算机网络技术，期间学习包括计算机组成原理，操作系统，数据结构，计算机网络等课程。和老师及小组参与一些.NET项目并取得上线，通过C语言课程学习使用EasyX制作flappy bird小游戏。<br/>&emsp;&emsp;期间参与学生会宣传部，负责学校公众号，校宣传海报设计和PS教学，组织其他部门参与校内活动。'
        },
        {
            site: '移动端跨平台开发 - 中通服',
            time: 'Oct 2020 - Apr 2021',
            intr: '&emsp;&emsp;在公司负责前端跨平台开发，平台包括IOS和Android两端的UI及原生功能统一，使用到的框架有Uniapp和Flutter，在工作期间掌握了跨平台开发，对原生Android和IOS开发有一定的了解。<br/>&emsp;&emsp;在中通服的时间积极和同事交流，增加技术知识，在此期间从前辈身上学习到很多好的开发习惯，工作中也积极努力独自完成整个项目搭建及开发。'
        },
    ];
    let historyArr_2 = [
        {
            site: '实习 - 在校',
            time: 'Nov 2019 - Sep 2020',
            intr: '&emsp;&emsp;其中参与.NET管理系统使，用winFrom书写Windows页面，SQLServer数据库，socket实现TCP/IP通讯。和老师同学们相处融洽，工作积极认真，帮助同学，得到老师及其同学们的好评。<br/>&emsp;&emsp;初次从事软件开发，了解到行业的竞争，以及各种技术革新的速度使得我们需要不断的学习新技术，作为程序员应时刻保持对探索的兴趣，要有创新精神和探索的勇气。'
        },
        {
            site: '前端组长 - 成都不知其名科技',
            time: 'Apr 2021 - Dec 2021',
            intr: '&emsp;&emsp;担任前端组长，负责组内各个项目的整合及任务分配，帮助同事一起解决项目中遇到的问题。最开始使用JQuery和Webpack开发项目，后期项目改为Vue的服务端渲染框架NuxtJS搭建，其中hls.js 浏览器对流视频的解码播放，EpubJS电子书格式解析，nuxtjs 服务端渲染框架，Cocos Create游戏开发，NodeJS框架Koa等一系列更高级的技术。'
        },
    ]
    
    //作品轮播图
    let swiperArr = [
        {
            img:'',
            mai:'',
            sub:'',
            con:''
        },
        {
            img:'',
            mai:'',
            sub:'',
            con:''
        },
        {
            img:'',
            mai:'',
            sub:'',
            con:''
        },
        {
            img:'',
            mai:'',
            sub:'',
            con:''
        },
        {
            img:'',
            mai:'',
            sub:'',
            con:''
        },
    ];
    let [activeIndex, setactiveIndex] = useState(0)
    function SwiperMove(dir){
        if(dir === true){
            if(activeIndex < swiperArr.length-1) {
                setactiveIndex(activeIndex += 1)
            }
        }else{
            if(activeIndex > 0) {
                setactiveIndex(activeIndex -= 1)
            }
        }
    }

    //服务卡片
    let serverArr = [
        {
            img: '',
            mains: '移动应用',
            intr: '包括移动端跨平台APP应用<br/>和微信小程序开发',
            item: 'APP · 小程序 · H5'
        },
        {
            img: '',
            mains: 'PC应用或网站',
            intr: '包括Web网页搭建<br/>基于Electron框架的桌面应用',
            item: '桌面应用程序 · WebSite'
        },
    ]
    
    return (
      <>
      <div className="banner" id="HOME" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}></div>
      <div className="container">
          <div className="main_box">
              <div className="visitingCard">
                  <div>
                      <div className="card">
                          <div className="mc_header">
                              <img alt="" src="#" />
                              <div className="dot"></div>
                          </div>
                          <p className="mc_name">杨伟-前端开发</p>
                          <p className="mc_intr">A FRONT-END ENGINEER</p>
                          <div className="border"></div>
                          <div className="contact">
                              <div title="QQ:2433255732">
                                  <svg t="1642833578978" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6858" width="24" height="24"><path d="M853.503884 781.390473c2.952238 10.088776 4.604878 20.630876 4.604878 31.616068 0 82.057901-86.046748 141.631718-204.601888 141.631718-56.586786 0-105.609293-13.685697-141.563156-36.796044-35.95284 23.110347-84.978417 36.796044-141.559063 36.796044-118.544907 0-204.593701-59.572794-204.593701-141.631718 0-10.996448 1.658779-21.550829 4.619204-31.649837-69.545936-35.456536-72.727395-144.197146-44.506656-235.158834 12.942777-41.685401 35.015491-75.512834 55.783491-100.461039 0.99056-24.165376 7.063883-47.25014 17.58654-68.833715 4.567016-170.32727 142.987598-307.540352 312.877917-307.540352 169.615049 0 307.8586 136.802736 312.823682 306.769802 10.887978 22.074761 17.165961 45.718251 18.047028 70.501704 20.555152 24.854061 42.268686 58.34585 55.063083 99.54518C926.32747 637.19128 923.146011 745.976916 853.503884 781.390473zM821.007773 570.068534c-13.916964-44.831045-43.220361-77.586053-61.437258-94.791923 1.890047-7.398504 3.174296-14.915711 3.174296-22.629393 0-19.97289-6.690376-38.994106-18.60473-56.411801 0.170892-3.592828 0.618077-7.108908 0.618077-10.743692 0-130.132826-104.230899-235.624439-232.804207-235.624439S279.151791 255.358899 279.151791 385.492748c0 3.809769 0.456395 7.498788 0.645706 11.260461-11.697413 17.280572-18.286482 36.116569-18.286482 55.894008 0 7.541767 1.240247 14.891152 3.045359 22.13309-18.167778 17.062608-47.904033 50.039673-61.951981 95.28925-20.852934 67.168796-14.615882 133.480061 6.605442 140.697439 13.697977 4.66116 32.738635-14.139022 50.146097-45.980217 12.792351 35.031864 33.081443 66.512856 58.779731 92.89369-42.433438 9.715269-72.031547 30.752398-72.031547 55.320956 0 33.763988 55.558363 61.129242 124.091226 61.129242 50.79999 0 94.338598-15.074324 113.536846-36.607756 9.278317 0.949628 18.644639 1.609661 28.184923 1.609661 9.441023 0 18.7132-0.645706 27.898397-1.577938 19.212574 21.515013 62.72867 36.57501 113.50103 36.57501 68.532863 0 124.08918-27.365254 124.08918-61.129242 0-24.517393-29.482475-45.511543-71.773673-55.252395 25.668613-26.330692 45.945425-57.748239 58.754149-92.708472 17.372669 31.694863 36.351929 50.377364 50.015114 45.726437C835.623655 703.548594 841.860706 637.237329 821.007773 570.068534z" p-id="6859" fill="#afb42b"></path></svg>
                              </div>
                              <div title="Email:2433255732@qq.com">
                                  <svg t="1642833442568" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4981" width="26" height="26"><path d="M834.446 213.447H194.105c-50.176 0-91.022 40.846-91.022 91.022v423.026c0 50.176 40.846 91.022 91.022 91.022h640.341c50.176 0 91.022-40.846 91.022-91.022V304.469c0-50.176-40.846-91.022-91.022-91.022z m36.409 514.048c0 20.025-16.384 36.409-36.409 36.409H194.105c-20.025 0-36.409-16.384-36.409-36.409V304.469c0-20.025 16.384-36.409 36.409-36.409h640.341c20.025 0 36.409 16.384 36.409 36.409v423.026z" p-id="4982" fill="#AFB42B"></path><path d="M786.773 358.059L514.275 529.977 241.777 358.059c-12.743-8.078-29.582-4.21-37.661 8.533-8.078 12.743-4.21 29.582 8.533 37.661l286.72 180.907c4.551 2.845 9.557 4.21 14.563 4.21h0.91c5.006 0 10.013-1.365 14.563-4.21l286.72-180.907c12.743-8.078 16.611-24.917 8.533-37.661-8.306-12.857-25.145-16.611-37.888-8.533z" p-id="4983" fill="#AFB42B"></path></svg>
                              </div>
                              <div title="Tel:15770104978">
                                  <svg t="1642833264306" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3974" width="24" height="24"><path d="M371.510163 833.327734l0 1.209474c-6.551319 0-11.355619 0.503948-14.177726 0.503948l-3.326054 0c-69.813539 0-126.05409-55.837393-128.002688-125.550143-1.075088-34.23484 11.288426-67.360994 34.738787-92.256005 23.450361-24.895011 55.165463-39.475895 89.400302-40.450193 0.335965 0 3.762809-0.201579 4.065177-0.201579 26.810012 0 52.511339 8.399126 74.61784 24.491853 31.009575 10.952461 62.355115-4.367546 92.961532-45.422476 30.472031-40.752562 36.888964-73.0724 19.049219-96.018814-6.34974-4.569125-12.464304-10.011759-18.511675-16.462288-1.075088-1.041492-2.049387-2.150176-2.990089-3.326054-20.023518-22.610449-31.513523-51.234672-32.420628-80.732404-1.948597-70.754242 53.821603-129.884092 124.273476-131.866286 0.335965 0 3.628423-0.067193 3.930791-0.067193 59.264237 0 111.674786 41.995632 124.575844 99.916009 10.414917 32.151856 37.02335 159.51621-90.945742 330.589619C530.354443 816.227112 415.454393 833.327734 371.510163 833.327734L371.510163 833.327734zM367.377793 768.721653c19.116412 0.436755 119.569965-2.250966 229.531329-149.672434 112.313119-150.176382 86.746178-255.501428 80.463632-275.121787-7.156056-31.412733-33.058962-52.20897-62.388712-52.20897-37.02335 1.041492-64.639677 30.404838-63.698975 65.546783 0.571141 18.646061 9.407022 32.252646 16.697463 40.315807 0.235176 0.268772 0.470351 0.537544 0.67193 0.806316 4.065177 4.401142 7.861582 7.6936 11.657988 10.146145 2.385352 1.579036 4.602721 3.46044 6.484126 5.610616 19.788342 22.30808 58.088359 84.528809-13.405006 180.110868-46.161599 61.783974-93.499076 74.718629-125.046195 74.752226-16.227112 0-32.353435-3.326054-47.908618-9.81018-2.68772-1.108685-5.241055-2.620527-7.525617-4.434739-8.029565-6.316143-21.266588-13.875357-38.736771-13.875357-19.150008 0.537544-34.839577 7.59281-46.430371 19.889132-11.624391 12.363514-17.738955 28.523434-17.235008 45.489669 0.974299 34.671594 28.892995 61.750378 63.497396 61.750378 0.167983 0 0.201579 0.033597 0.067193 0.067193 1.209474-0.201579 2.519738-0.369562 3.292458-0.436755C360.759281 767.680161 364.152528 767.948933 367.377793 768.721653L367.377793 768.721653zM515.706367 967.478582c-60.708886 0-119.603561-11.859567-175.071393-35.175542-16.428691-6.954477-24.122291-25.835713-17.201411-42.264405 6.92088-16.462288 25.835713-24.088695 42.264405-17.235008 47.471863 19.956325 97.933815 30.136066 150.008399 30.136066 213.539392 0 387.233328-173.693936 387.233328-387.233328 0-213.505795-173.693936-387.233328-387.233328-387.233328S128.473039 302.200571 128.473039 515.739963c0 73.005207 20.426676 144.095414 59.062657 205.610616 9.440618 15.118428 4.90509 35.007559-10.179741 44.481774-15.084831 9.474215-35.007559 4.938686-44.481774-10.179741-45.153704-71.862926-68.973627-154.812699-68.973627-239.912649 0-249.084495 202.654124-451.772216 451.772216-451.772216s451.772216 202.654124 451.772216 451.772216C967.444986 764.824458 764.790862 967.478582 515.706367 967.478582L515.706367 967.478582z" p-id="3975" fill="#AFB42B"></path></svg>
                              </div>
                              <div title="WChat:15770104978">
                                  <svg t="1642833513043" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5919" width="24" height="24"><path d="M903.36 780.8a37.888 37.888 0 0 0 27.632 9.04 43.488 43.488 0 0 0 26.704-12.64A238.112 238.112 0 0 0 1024 618.144c0-133.696-121.6-252.944-277.184-272.816C709.072 200.784 552.512 96 373.872 96 167.6 96 0 238.736 0 413.088a277.648 277.648 0 0 0 81.04 194.224 37.28 37.28 0 0 0 28.544 11.744 37.504 37.504 0 0 0 27.632-63.232 206.4 206.4 0 0 1-60.8-142.736c0-133.696 132.608-242.096 296.512-242.096 131.68 0 253.232 72.272 291.92 172.544-162.064 15.36-288.224 134.608-288.224 274.624a238.736 238.736 0 0 0 2.768 36.128h-6.4a449.824 449.824 0 0 1-90.24-11.744c-6.4-0.896-12.896-2.704-19.344-3.616a34.128 34.128 0 0 0-24.864 3.616L121.6 700.352a37.264 37.264 0 0 0-17.6 50.592 37.952 37.952 0 0 0 34.064 20.8 60.448 60.448 0 0 0 17.504-3.616l104.976-51.488 6.4 0.896a483.792 483.792 0 0 0 105.904 13.552c9.216 0 19.344 0 30.4-0.896a283.536 283.536 0 0 0 69.072 86.72 353.6 353.6 0 0 0 227.456 78.592 399.808 399.808 0 0 0 94.848-14.4l78.272 42.464a42.56 42.56 0 0 0 18.416 4.512 39.248 39.248 0 0 0 34.08-19.872 37.328 37.328 0 0 0-15.648-51.488l-92.08-49.68a41.696 41.696 0 0 0-27.632-3.616 385.472 385.472 0 0 1-91.2 15.36c-133.52-0.896-244.032-90.336-244.032-201.456s110.496-200.544 246.784-200.544c133.52 0 245.872 92.144 245.872 200.544a165.632 165.632 0 0 1-47.888 110.208 37.76 37.76 0 0 0 3.792 53.264z" p-id="5920" fill="#AFB42B"></path><path d="M262.144 315.728m-49.184 0a49.184 49.184 0 1 0 98.368 0 49.184 49.184 0 1 0-98.368 0Z" p-id="5921" fill="#AFB42B"></path><path d="M495.392 315.728m-49.184 0a49.184 49.184 0 1 0 98.368 0 49.184 49.184 0 1 0-98.368 0Z" p-id="5922" fill="#AFB42B"></path><path d="M608.8 549.44m-49.184 0a49.184 49.184 0 1 0 98.368 0 49.184 49.184 0 1 0-98.368 0Z" p-id="5923" fill="#AFB42B"></path><path d="M797.792 549.44m-49.184 0a49.184 49.184 0 1 0 98.368 0 49.184 49.184 0 1 0-98.368 0Z" p-id="5924" fill="#AFB42B"></path></svg>
                              </div>
                          </div>
                          <div className="border"></div>
                          <div className="mc_info">
                              <div><span>CITY:</span><span>成都市武侯区</span></div>
                              <div><span>AGE:</span><span>24</span></div>
                              <div><span>POST:</span><span>WEB</span></div>
                          </div>
                          <div className="border" style={{ marginBottom: '30px' }}></div>
                          <a href="#" className="mc_a_btn" download="yangwei.png">
                              DOWNLOAD PDF
                          </a>
                      </div>
                  </div>
              </div>
              <div className="content_me">
                  <div className="banner_text">
                      <div>
                          <p>HI MY NEW FRIEND!</p>
                          <p className="bigfont">Discover my<br/>skills space!</p>
                          <a href="#!" className="mc_a_btn moreBtn">RESUME</a>
                      </div>
                      <div className="scroll">
                          <div className="hint">
                          </div>
                          <div className="text">
                              SCROLL DOWN
                          </div>
                      </div>
                  </div>
                  <div className="icons">
                      {
                          icons.map((item, index) => (
                              <div className="mc_box_resume" key={ index }>
                                  <div className="num">
                                      <span>{ item[2] }</span><span>+</span>
                                  </div>
                                  <div className="bar"></div>
                                  <div className="font">
                                      { item[1] }<br/>{ item[0] }
                                  </div>
                              </div>
                          ))
                      }
                  </div>
                  <section className="me_home">
                      <div className="mc_intr_t">
                          <h1>关于我</h1>
                          <h4>ABOUT</h4>
                          <div></div>
                          <h6>01</h6>
                      </div>
                      <div className="intr_c mc_box_resume">
                          &emsp;&emsp;2020年毕业于山东英才学院信息工程系，主修课程计算机网络、操作系统、.NET技术。毕业后从事软件开发，主要工作为WEB前端开发，技术栈包括JavaScript、NodeJS、Vue和React框架等，以及跨平台解决方案uniapp、React Native、Flutter。工作期间曾担任前端组长，熟悉Git版本管理。喜欢编程，常做一些算法和数据结构，在个人网站和论坛分享一些学习文档，致力能为开发社区做出贡献。
                      </div>
                  </section>
                  <section className="TECHNOLOGY"  id="TECHNOLOGY">
                      <div className="mc_intr_t">
                          <h1>技术栈</h1>
                          <h4>TECHNOLOGY</h4>
                          <div></div>
                          <h6>02</h6>
                      </div>
                      <div className="mains">
                          {
                              Object.keys(skill).map((item, index) => (
                                      <div className="mc_box_resume" key={ index }>
                                          <span>{ item }<span>{ Object.keys(skill[item]) }</span></span>
                                          <div className="bar"></div>
                                          {
                                              skill[item][Object.keys(skill[item])].map((it, i) => (
                                                  <div className="skill" key={ i }>
                                                      <div className="s_title">
                                                          <span>{ Object.keys(it) }</span><span>{ it[Object.keys(it)] }</span>
                                                      </div>
                                                      <div className="s_ifr">
                                                          <div style={{ width: it[Object.keys(it)] }}></div>
                                                      </div>
                                                  </div>
                                              ))
                                          }
                                      </div>
                                  )
                              )
                          }
                          <div className="bar_line"></div>
                          <div className="mc_box_resume other">
                              <ul>
                                  <li>Unreal</li>
                                  <li>Uniapp</li>
                                  <li>小程序</li>
                                  <li>Nginx</li>
                                  <li>MySQL</li>
                                  <li>Linux</li>
                                  <li>MongoDB</li>
                                  <li>Webpack</li>
                                  <li>Koa</li>
                              </ul>
                              <div className="bar"></div>
                              <p>“ -konwledge- / 我的其他技能 ”:</p>
                          </div>
                      </div>
                  </section>
                  <section className="HISTORY" id="HISTORY">
                      <div className="mc_intr_t">
                          <h1>经历</h1>
                          <h4>HISTORY</h4>
                          <div></div>
                          <h6>03</h6>
                      </div>
                      <div className="his_con">
                          <div className="msg">
                              {
                                  historyArr_1.map((item, index) => (
                                      <div className="mc_box_resume msg_i_l" key={ index }>
                                          <h2>{ item.site }</h2>
                                          <h6>{ item.time }</h6>
                                          <p dangerouslySetInnerHTML={{ __html: item.intr }}></p>
                                          <div className="light"></div>
                                      </div>
                                  ))
                              }
                          </div>
                          <div className="line"></div>
                          <div className="msg" style={{ marginTop:'100px' }}>
                              {
                                  historyArr_2.map((item, index) => (
                                      <div className="mc_box_resume msg_i_r" key={ index }>
                                          <h2>{ item.site }</h2>
                                          <h6>{ item.time }</h6>
                                          <p dangerouslySetInnerHTML={{ __html: item.intr }}></p>
                                          <div className="light"></div>
                                      </div>
                                  ))
                              }
                          </div>
                      </div>
                  </section>
                  <section className="PROTFOLIO" id="PROTFOLIO">
                      <div className="mc_intr_t">
                          <h1>我的作品</h1>
                          <h4>PROTFOLIO</h4>
                          <div></div>
                          <h6>04</h6>
                      </div>
                      <div className="swiper">
                          <div className="imgs" style={{ width: swiperArr.length * 840 + 'px',  left: -( activeIndex * 840 + 40 ) + 'px' }}>
                              {
                                  swiperArr.map((item, index) => (
                                      <div className={["mc_box_resume", index === activeIndex?"active":null].join(' ') } key={ index }>

                                      </div>
                                  ))
                              }
                          </div>
                          <div className="btn">
                              <div className={ activeIndex>0?null:"ban" } onClick={ () => { SwiperMove(false) } }></div>
                              <div className={ activeIndex<swiperArr.length-1?null:"ban" } onClick={ () => { SwiperMove(true) } }></div>
                          </div>
                          <div className="marker_swiper">
                              {
                                  swiperArr.map((item, index) => (
                                      <div className={["icon", index === activeIndex?"active":null].join(' ') } key={ index }>

                                      </div>
                                  ))
                              }
                          </div>
                      </div>
                  </section>
                  <section className="SERVERICES" id="SERVERICES">
                      <div className="mc_intr_t">
                          <h1>服务</h1>
                          <h4>SERVERICES</h4>
                          <div></div>
                          <h6>05</h6>
                      </div>
                      <p>&emsp;&emsp;如果你有网站搭建、桌面应用、Android及IOS跨平台项目的需求。</p>
                      <div className="serverCard">
                          {
                              serverArr.map((item, index) => (
                                  <div className="mc_box_resume" key={ index }>
                                      <div className="icover">
                                          <img alt="" src={ item.img } />
                                      </div>
                                      <p>{ item.mains }</p>
                                      <h1 dangerouslySetInnerHTML={{ __html: item.intr }}></h1>
                                      <div className="bar"></div>
                                      <p>{ item.item }</p>
                                  </div>
                              ))
                          }
                      </div>
                  </section>
                  <section className="CONTACT" id="CONTACT">
                      <div className="mc_intr_t">
                          <h1>联系我</h1>
                          <h4>CONTACT</h4>
                          <div></div>
                          <h6>06</h6>
                      </div>
                      <div className="contaact_card">
                          <div className="mc_box_resume"></div>
                          <div className="mc_box_resume"></div>
                          <div className="mc_box_resume"></div>
                      </div>
                      <div className="text_eare mc_box_resume">
                          <input placeholder="您的称呼" />
                          <input  placeholder="您的联系方式" />
                          <textarea placeholder="要发送的消息..."></textarea>
                          <i className="mc_a_btn">留 言</i>
                          <span>* 我会在看到消息的第一时间联系并回复你。</span>
                      </div>
                  </section>
              </div>
          </div>
      </div>
      </>)
}