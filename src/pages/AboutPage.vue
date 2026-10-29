<script setup lang="ts">
import { APP } from '../config'
import { catalogStats } from '../data/catalog'
import { usePageTitle } from '../composables/usePageTitle'
import AppIcon from '../components/AppIcon.vue'

usePageTitle(() => '关于')

const stats = [
  { label: '食堂', value: catalogStats.canteens },
  { label: '窗口', value: catalogStats.windows },
  { label: '菜品', value: catalogStats.dishes },
  { label: '口碑', value: catalogStats.quotes },
]
</script>

<template>
  <div class="about-page">
    <header class="about-hero">
      <div class="eyebrow">ABOUT</div>
      <h1>关于崴食家</h1>
      <p class="about-lead">
        一个由山威学生维护的食堂窗口目录。它不评分，也不替你做决定，只把窗口、楼层、价目和真实提到过的话放在一起。
      </p>

      <div class="about-stats">
        <div v-for="stat in stats" :key="stat.label" class="about-stat">
          <b class="num">{{ stat.value }}</b>
          <span>{{ stat.label }}</span>
        </div>
      </div>
    </header>

    <div class="about-warning">
      <AppIcon name="alert" :size="16" />
      <p>
        当前是前端预览版：目录骨架与频道引文来自已整理的公开资料，部分菜品价格为界面演示用的参考值，均带「参考」标记。正式上线前会逐项实地核实。
      </p>
    </div>

    <section class="about-block">
      <h2><span class="about-no">01</span>为什么做</h2>
      <p>
        刚来学校时，食堂名字、楼层和窗口号很难对上；官方榜单有参考价值，但不一定覆盖全部窗口，也不一定及时。于是把公开榜单、校园频道里的帖子和实地补录整理成一份能查的目录。
      </p>
    </section>

    <section class="about-block">
      <h2><span class="about-no">02</span>数据来源</h2>
      <p>目前使用四类来源，并优先保留原始链接：</p>
      <div class="about-links">
        <a class="about-link" :href="APP.official.url" target="_blank" rel="noopener noreferrer">
          <span class="k">{{ APP.official.name }} · {{ APP.official.edition }}</span>
          <span class="v">{{ APP.official.org }} <AppIcon name="external" :size="11" /></span>
        </a>
        <a class="about-link" :href="APP.channel.url" target="_blank" rel="noopener noreferrer">
          <span class="k">{{ APP.channel.name }}</span>
          <span class="v">原帖 <AppIcon name="external" :size="11" /></span>
        </a>
        <a class="about-link" :href="APP.amap.url" target="_blank" rel="noopener noreferrer">
          <span class="k">{{ APP.amap.name }}</span>
          <span class="v">{{ APP.amap.org }} <AppIcon name="external" :size="11" /></span>
        </a>
        <a class="about-link" :href="APP.mapSource.url" target="_blank" rel="noopener noreferrer">
          <span class="k">{{ APP.mapSource.name }}</span>
          <span class="v">{{ APP.mapSource.org }} <AppIcon name="external" :size="11" /></span>
        </a>
      </div>
      <p>
        实地补录仍在进行：位置、窗口号与价目会逐步补齐。官方榜单是阶段性评选，只代表当时的结果，我们会把它当作线索而不是结论。
      </p>
    </section>

    <section class="about-block">
      <h2><span class="about-no">03</span>价格与时效</h2>
      <p>
        带「参考」标记的价格是尚未核实的估算，其余价格多来自频道帖子或公开资料。食堂调价、换窗口、临时歇业都很常见，所有信息以现场为准。
      </p>
      <p>“在营”只表示整理时有近期营业记录，不代表你到店时一定开。</p>
    </section>

    <section class="about-block">
      <h2><span class="about-no">04</span>为什么没有评分</h2>
      <p>
        频道内容是零散评论，样本少且集中在少数窗口。把几条评论折算成星级会造成虚假的精确感，所以我们只展示原文、日期和来源，让你自己判断。
      </p>
      <p>校外店铺不在这个范围内：那里的评分直接引用高德地图公开数据，按原样展示，仅供参考。</p>
    </section>

    <section class="about-block">
      <h2><span class="about-no">05</span>图片、引文与隐私</h2>
      <ul>
        <li>首页照片来自腾讯频道、小红书等公开帖，只选用不含人物的菜品照；出现同学肖像的图片一律不用。</li>
        <li>照片版权归原作者，保留原帖链接，仅作非商业展示；原作者可要求随时撤下。</li>
        <li>不展示昵称、头像、学号等身份信息，引文统一按匿名处理。</li>
        <li>每条引文保留来源平台与原帖链接，方便核对。</li>
        <li>引文可能过时，也可能只代表个人口味，不构成推荐或评价结论。</li>
      </ul>
    </section>

    <section class="about-block">
      <h2><span class="about-no">06</span>怎么纠错</h2>
      <p>
        在任意窗口页点“报错 / 补充”，选择问题类型，填写价格或备注，再点“复制反馈”。内容只会写入剪贴板，不会自动提交，也不收集账号、位置或任何个人信息。
      </p>
      <p>当前是本地演示版，把复制出的文本发给维护者即可；正式发布时会补充固定反馈入口。</p>
    </section>

    <section class="about-block">
      <h2><span class="about-no">07</span>免责声明</h2>
      <p>
        崴食家是学生自发项目，与山东大学（威海）及校内食堂无隶属关系。目录中的窗口、价格、位置与营业状态可能变化，请以现场为准。频道引文与照片版权归原作者，已匿名化并保留来源链接；如不希望被引用，可通过反馈联系删除。本项目不用于商业用途。
      </p>
    </section>

    <section class="about-block about-version">
      <h2><span class="about-no">08</span>版本</h2>
      <div class="about-kv">
        <span>版本</span><b>v{{ APP.version }}</b>
        <span>更新</span><b>{{ APP.updatedAt }}</b>
        <span>技术</span><b>Vue 3 + Vite · 纯静态 · 无后端</b>
      </div>
      <p>如果你也在整理山威的食堂信息，欢迎一起补录。</p>
    </section>

    <footer class="foot">崴食家 · {{ APP.latin }} · 非官方项目</footer>
  </div>
</template>
