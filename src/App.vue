<template>
  <div id="app">
    <v-app>
      <v-app-bar
          absolute
          class="indigo lighten-1 white--text text-center svg_bg"
          dark
          prominent>
        <template v-slot:img="{ props }">
          <v-img
              gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
              v-bind="props"
          ></v-img>
        </template>
        <v-app-bar-nav-icon @click="isShowDrawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title>MarkTool</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon @click="isShowGraph = isShowGraph" @click.stop="isShowDialog = true">
          <v-icon>mdi-chart-bar</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>

        <template v-slot:extension>
          <v-tabs v-model="currentDatasetId" :align-with-title="datasetList.length === 1" center-active
                  @change="onTabChange">
            <v-tab v-for="dataset in datasetList" :key="dataset.name">{{ dataset.name }}</v-tab>
          </v-tabs>
        </template>
      </v-app-bar>
      <v-navigation-drawer
          v-model="isShowDrawer"
          absolute
          light
          temporary
      >
    <!--<v-system-bar></v-system-bar>-->
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="https://avatars.githubusercontent.com/u/18194268?v=4"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                Finger Ebichu
              </v-list-item-title>
              <v-list-item-subtitle>Finger@spianmo.com</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-icon>mdi-menu-down</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>
        <v-list
            shaped
        >
          <v-subheader>MENUS</v-subheader>
          <v-list-item-group
              color="primary">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-view-dashboard</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item>
            <v-list-group
                :value="true"
                no-action
                prepend-icon="mdi-folder"
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>My Collections</v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item v-for="item in datasetList" :key="item.name">
                <v-list-item-title>{{ item.name.toUpperCase() }}</v-list-item-title>
                <v-list-item-icon>
                  <v-icon>mdi-github</v-icon>
                </v-list-item-icon>
              </v-list-item>

            </v-list-group>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-account-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Shared with me</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-help-box</v-icon>
              </v-list-item-icon>
              <v-list-item-title>About</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-main style="padding-top: 176px;">
        <v-container  class="overflow-y-auto" v-bind:style="{maxHeight: heightData}">
          <v-card
              :loading="isShowLoading"
              class="mx-auto"
              elevation="5"
              outlined
              rounded="lg"
          >
            <v-progress-linear
                v-show="!isShowLoading"
                :value="progressRate"
                color="red lighten-2"
                striped
            >
            </v-progress-linear>
            <v-carousel :key="`carousel-${currentDatasetId}`" v-touch="carouselTouch" :show-arrows="false"
                        :value="currentCarouselIndex" height="auto" hide-delimiters
                        touchless>
              <v-carousel-item
                  v-for="(labelData,key, index) in configMemory.textLabelData"
                  :key="`card-${currentDatasetId}-${index}`"
                  :style="{visibility: isShowLoading?'hidden':'visible'}"
              >
                <v-card-title style="padding-bottom: 0;">
                  <v-icon
                      large
                      left
                  >
                    mdi-translate
                  </v-icon>
                  <span class="text-h6 font-weight-light">NO.{{ ('0000' + (labelData.labelId)).slice(-5) }}</span>
                  <v-spacer></v-spacer>
                  <FacebookEmoji :type="labelData.emotion"/>
<!--                  <v-icon style="font-style: normal; font-size: 32px;">{{
                      getMoodIcon(labelData.emotion)
                    }}
                  </v-icon>-->
                </v-card-title>
                <v-list-item v-show="isShowGraph">
                  <v-list-item-content>
                    <v-row>
                      <v-col cols="8">
                        <div class="text-overline">
                          Process {{ labelData.labelId }}/{{ datasetList[currentDatasetId].count }}
                        </div>
                      </v-col>
                      <v-col cols="4">
                        <div class="text-overline" style="text-align: right">
                          {{ progressRate.toFixed(8) }}%
                        </div>
                      </v-col>
                    </v-row>
                  </v-list-item-content>


                </v-list-item>
                <v-list-item three-line>
                  <v-list-item-content class="text-h6 font-weight-regular">
                    {{ labelData.text }}
                  </v-list-item-content>
                </v-list-item>
                <v-divider style="border-top:1px #cccccc dashed; margin: 0 18px 0 18px;"></v-divider>
                <v-list-item>
                  <v-chip-group
                      v-model="labelData.emotion"
                      active-class="accent-4 white--text"
                      column
                      mandatory
                      @change="markText(labelData.labelId, labelData.emotion, false)">
                    <v-chip v-for="(item, i) in datasetList[currentDatasetId].classification"
                            :id="item.labelEn"
                            :key="item.labelEn"
                            :value="item.labelEn"
                            class="ma-2"
                            text-color="white"
                            v-bind:color="item.color"
                    >
                      <v-icon left style="font-style: normal;font-family: '',serif;">
                        {{ item.icon }}
                      </v-icon>
                      {{ item.label }}
                    </v-chip>
                  </v-chip-group>
                </v-list-item>
              </v-carousel-item>
            </v-carousel>
            <v-card-actions>
              <v-btn
                  :disabled="configMemory.currentLabelId===1"
                  color="indigo"
                  outlined
                  text
                  @click="prev"
              >
                <v-icon
                    dark
                    left
                >
                  arrow_back_ios
                </v-icon>
                Previous
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                  color="indigo"
                  outlined
                  text
                  @click="next"
              >
                Next
                <v-icon
                    dark
                    right
                >
                  arrow_forward_ios
                </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-snackbar
              v-model="isShowMsg"
              timeout="800"
          >{{ callbackMsg }}
          </v-snackbar>
          <v-dialog
              v-model="isShowDialog"
              max-width="290"
          >
            <v-card>
              <v-card-title class="text-h6">
                <v-icon
                    large
                    left
                >
                  mdi-github
                </v-icon>
                {{ datasetList[currentDatasetId] === undefined ? "":datasetList[currentDatasetId].name.toUpperCase() }}
              </v-card-title>
              <EmojiCube :dataset="datasetList[currentDatasetId] === undefined ? {}:datasetList[currentDatasetId]"
                         :progress-rate="progressRate.toFixed(8)"
              />

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="indigo indigo-1"
                    text
                    @click="isShowDialog = false"
                >
                  OK
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-container>
      </v-main>
      <v-btn absolute bottom color="blue-grey darken-1" dark fab large right style="display: none;margin: 0 0 128px 0">
        <v-icon dark>mdi-chart-bar</v-icon>
      </v-btn>
      <v-footer
          dark
          padless
      >
        <v-card
            class="indigo lighten-1 white--text text-center"
            flat
            style="width: 100%"
            tile
        >
          <v-card-text>
            <v-btn
                v-for="icon in icons"
                :key="icon"
                class="mx-4 white--text"
                icon
            >
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </v-btn>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-text class="white--text">
            Copyright © 2020-{{ new Date().getFullYear() }} 自然语言处理-文本标注
          </v-card-text>
        </v-card>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import FacebookEmoji from '@/components/FacebookEmoji'
import EmojiCube from "@/components/EmojiCube"

export default {
  name: 'App',
  components: {FacebookEmoji, EmojiCube},
  data() {
    let self = this
    return {
      datasetList: [],
      currentDatasetId: null,
      preTabId: null,
      isShowMsg: false,
      isShowDialog: false,
      callbackMsg: "",
      configMemory: {
        //LabelData，Size默认为carouselCacheSize = 6
        textLabelData: {},
        //当前LabelData页ID
        currentTextDataPageId: 1,
        //当前真实的LabelId
        currentLabelId: 1,
      },
      configMemoryList: {},
      isShowDrawer: false,
      isShowLoading: false,
      isShowGraph: false,
      screenHeight: 0,
      //左右缓存的LabelData数量
      carouselCacheSize: 6,
      icons: [
        'mdi-github',
        'mdi-translate',
        'mdi-web-check',
        'mdi-code-tags',
      ],
      carouselTouch: {
        left: function () {
          self.next()
        },
        right: function () {
          self.prev()
        }
      }
    }
  },
  methods: {
    getMoodIcon(emotion) {
      for (const index in this.datasetList[this.currentDatasetId].classification) {
        if (this.datasetList[this.currentDatasetId].classification[index].labelEn === emotion) {
          return this.datasetList[this.currentDatasetId].classification[index].icon
        }
      }
    },
    async markText(textId, markTag, supplement) {
      if (markTag !== undefined) {
        const _vm = this
        const resp = await this.$http.mark(this.datasetList[this.currentDatasetId].name, textId, markTag).catch(
            error => {
              _vm.callbackMsg = error.toString()
              _vm.isShowMsg = true
              console.log(error);
              return false
            }
        )
        console.log(resp)
        this.callbackMsg = supplement ? "补录：" + resp.data : resp.data
        this.isShowMsg = true
        console.log(this.datasetList[this.currentDatasetId].name + textId + markTag)
      }
    },
    async onTabChange(tabId) {
      if (this.preTabId === null) {
        console.log("首次初始化配置")
        this.configMemoryList[0] = this.configMemory;
      } else {
        if (tabId !== this.preTabId) {
          if (this.configMemoryList[tabId] !== undefined) {
            console.log("已经存在配置了，取缓存")
            this.configMemory = this.configMemoryList[tabId]
          } else {
            console.log("没有存在配置了，重新缓存")
            this.configMemory = {
              //LabelData，Size默认为carouselCacheSize = 6
              textLabelData: {},
              //当前LabelData页ID
              currentTextDataPageId: 1,
              //当前真实的LabelId
              currentLabelId: 1,
            }
            this.configMemoryList[tabId] = this.configMemory;
            this.isShowLoading = true
            this.restoreProgress()
            let resp = await this.fetchTextPageData()
            this.configMemory.textLabelData = resp.data.dataMap
            this.isShowLoading = false
          }
        }
      }
      this.preTabId = tabId;
    },
    async next() {
      const _index = this.configMemory.currentLabelId - (this.configMemory.currentTextDataPageId - 1) * this.carouselCacheSize - 1
      if (this.configMemory.textLabelData[_index].isMarked === false) {
        await this.markText(this.configMemory.currentLabelId, this.configMemory.textLabelData[_index].emotion, true)
      }
      if (this.configMemory.currentLabelId - (this.configMemory.currentTextDataPageId - 1) * this.carouselCacheSize === this.carouselCacheSize) {
        this.configMemory.currentTextDataPageId++
        this.isShowLoading = true
        let response = await this.fetchTextPageData()
        this.configMemory.textLabelData = response.data.dataMap
        this.isShowLoading = false
      }
      this.configMemory.currentLabelId++
      this.storeProgress()
    },
    async prev() {
      if (this.configMemory.currentTextDataPageId !== 1 && this.configMemory.currentLabelId - (this.configMemory.currentTextDataPageId - 1) * this.carouselCacheSize === 1) {
        this.configMemory.currentTextDataPageId--
        this.isShowLoading = true
        let response = await this.fetchTextPageData()
        this.configMemory.textLabelData = response.data.dataMap
        this.isShowLoading = false
      }
      this.configMemory.currentLabelId = this.configMemory.currentLabelId <= 1
          ? 1
          : this.configMemory.currentLabelId - 1
      this.storeProgress()
    },
    async fetchTextPageData() {
      return this.$http.text(this.datasetList[this.currentDatasetId === null ? 0 : this.currentDatasetId].name, this.configMemory.currentTextDataPageId, this.carouselCacheSize).catch(
          error => {
            console.log(error);
            return false
          }
      )
    },
    async fetchDataset() {
      return this.$http.dataset().catch(
          error => {
            console.log(error);
            return false
          }
      );
    },
    restoreProgress() {
      const config = JSON.parse(localStorage.getItem(this.datasetList[this.currentDatasetId == null ? 0 : this.currentDatasetId].name))
      if (config !== null) {
        console.log("restoreProgress")
        console.log(config)
        this.configMemory.currentLabelId = config.currentLabelId
        this.configMemory.currentTextDataPageId = config.currentTextDataPageId
      }
    },
    storeProgress() {
      const config = {}
      config.currentLabelId = this.configMemory.currentLabelId
      config.currentTextDataPageId = this.configMemory.currentTextDataPageId
      console.log("storeProgress")
      console.log(config)
      localStorage.setItem(this.datasetList[this.currentDatasetId].name, JSON.stringify(config))

    }
  },
  computed: {
    heightData: function () {
      return (this.screenHeight - 176 - 123) + 'px'
    },
    currentCarouselIndex: {
      get: function () {
        if (this.configMemory.currentLabelId % this.carouselCacheSize === 0) {
          console.log("this.configMemory.currentLabelId" + this.configMemory.currentLabelId)
          //console.log("此时为最后一个"+(this.carouselCacheSize - 1))
        } else {
          console.log("this.configMemory.currentLabelId" + this.configMemory.currentLabelId)
          //console.log("此时为其他情况"+((this.configMemory.currentLabelId % this.carouselCacheSize) - 1))
        }
        return this.configMemory.currentLabelId % this.carouselCacheSize === 0 ?
            this.carouselCacheSize - 1 : (this.configMemory.currentLabelId % this.carouselCacheSize) - 1;
      },
      set: function (val) {
        console.log("set" + val)
      }
    },
    progressRate: function () {
      if (this.datasetList[this.currentDatasetId] === undefined) {
        return 0
      }
      return (this.configMemory.currentLabelId) / this.datasetList[this.currentDatasetId].count
    },

  },
  async mounted() {
    this.screenHeight = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
    window.onresize = () => {
      this.screenHeight = window.innerHeight
          || document.documentElement.clientHeight
          || document.body.clientHeight;
    };
    this.isShowLoading = true
    let resp1 = await this.fetchDataset()
    this.datasetList = resp1.data
    if (this.datasetList.length !== 0) {
      this.restoreProgress()
      let resp2 = await this.fetchTextPageData()
      this.configMemory.textLabelData = resp2.data.dataMap
    }
    this.isShowLoading = false
  },

};
</script>
<style>
.svg_bg {
  background: url(./assets/login-bg.svg) center/cover no-repeat;
}
@media(max-width: 1025px){
  .svg_bg {
    background-size: 1200px;
    background-position: -190px -120px;
  }
}

</style>
