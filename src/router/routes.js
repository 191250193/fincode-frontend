const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '主页'
    }
  },
  {
    path: '/stock',
    component: () => import('@/views/Stock.vue')
  },
  {
    path: '/riskreport',
    component: () => import('@/views/RiskReport.vue')
  },
  {
    path: '/invest-recommend',
    component: () => import('@/views/InvestRecommend.vue'),
    meta: {
      title: '投资推荐'
    }
  },
  {
    path: '/knowledge-graph',
    component: () => import('@/views/KnowledgeGraph/KnowledgeGraph.vue'),
    meta: {
      title: '知识图谱'
    },
    children: [
      {
        path: 'stock',
        component: () => import('@/views/KnowledgeGraph/SearchMode/StockMode.vue')
      },
      {
        path: 'industry',
        component: () => import('@/views/KnowledgeGraph/SearchMode/IndustryMode.vue')
      },
      {
        path: 'holder',
        component: () => import('@/views/KnowledgeGraph/SearchMode/HolderMode.vue')
      },
      {
        path: 'news',
        component: () => import('@/views/KnowledgeGraph/SearchMode/NewsMode.vue')
      }
    ]
  },
  {
    path: '/stocktip/:stockId',
    component: () => import('@/views/StockTip.vue'),
    meta: {
      title: '股票投资建议'
    }
  },
  {
    path: '/strategy/:strategyId',
    component: () => import('@/views/Strategy.vue'),
    meta: {
      title: '策略详情'
    }
  }
]

export default routes
