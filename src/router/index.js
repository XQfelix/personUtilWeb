import Vue from 'vue'
import Router from 'vue-router'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import mylayout from '@/components/mylayout';
import postchild from '@/components/postchild';
import file from '@/components/file';
import dblist from '@/components/dblist';
import dbselect from '@/components/dbselect';
import httpserver from '@/components/httpserver';
import socketserver from '@/components/socketserver';
import websocketserver from '@/components/websocketserver';
import webservice from '@/components/webservice';
import javascript from '@/components/javascript';
import encryptutil from '@/components/encryptutil';
import monitor from '@/components/monitor';
import out from '@/components/out';


Vue.use(Router)
Vue.use(ViewUI);


export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'mylayout',
      component: mylayout,
      redirect: '/monitor',
      children: [
        {
          path: '/postchild',
          name: 'postchild',
          component: postchild
        },
        {
          path: '/filelist',
          name: 'filelist',
          component: file,
        },
        {
          path: '/dblist',
          name: 'dblist',
          component: dblist,
        },
        {
          path: '/dbselect',
          name: 'dbselect',
          component: dbselect,
        },
        {
          path: '/httpserver',
          name: 'httpserver',
          component: httpserver,
        },
        {
          path: '/socketserver',
          name: 'socketserver',
          component: socketserver,
        },
        {
          path: '/websocketserver',
          name: 'websocketserver',
          component: websocketserver,
        },
        {
          path: '/webservice',
          name: 'webservice',
          component: webservice,
        },
        {
          path: '/javascript',
          name: 'javascript',
          component: javascript,
        },
        {
          path: '/encryptutil',
          name: 'encryptutil',
          component: encryptutil,
        },
        {
          path: '/monitor',
          name: 'monitor',
          component: monitor,
        },
        {
          path: '/out',
          name: 'out',
          component: out,
        }
      ]
    }
  ]
})
