<script setup>
import {defineEmits} from "vue";
import useModel from "ve/hooks/useModel.js";
import {Delete, Position, Sort} from "@element-plus/icons-vue";
import draggable from 'vuedraggable';

defineOptions({
  name: 'Swipe',
  label: '轮播',
  type: 'BasePackages',
  order: 5,
  config: {
    attrs: {
      autoplay: 3000,
      loop: true,
      indicator: true,
      indicatorPosition: 'outside',
      indicatorSize: 'small',
      indicatorColor: '#fff',
      autoplaySpeed: 3000,
      direction: 'horizontal',
      duration: 500,
      interval: 3000,
      list: [
        {
          id: 1,
          src: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
          link: 'https://wwww.baidu.com'
        },
      ]
    },
    styles: {
      width: 375,
      height: 200
    },
    outStyles: {
      // height: 200
      height: '100%'
    },
    events: []
  }
})
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {
    }
  }
})
const emit = defineEmits(['update:modelValue']);
const data = useModel(() => props.modelValue, e => emit('update:modelValue', e))

</script>

<template>
  <SettingLayout>
    <template #attrs>
      <el-form label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="轮播间隔">
              <el-input-number v-model="data.attrs.autoplay" controls-position="right" :min="500"/>
            </el-form-item>

          </el-col>
          <el-col :span="12">
            <el-form-item label="动画时长">
              <el-input-number v-model="data.attrs.duration" controls-position="right" :min="0"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!--        是否显示指示器-->
            <el-form-item label="循环播放">
              <el-switch v-model="data.attrs.loop" active-text="是" inactive-text="否"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!--        轮播方向-->
            <el-form-item label="轮播方向">
              <el-switch active-text="纵向" inactive-text="横向" v-model="data.attrs.vertical"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="指示器">
              <el-switch v-model="data.attrs.showIndicators	" active-text="隐藏" inactive-text="显示"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="指示器颜色">
              <el-color-picker v-model="data.attrs.indicatorColor" show-alpha></el-color-picker>
            </el-form-item>
          </el-col>
        </el-row>



        <el-form-item label="内容列表">
          <el-form label-width="80px" style="width: 100%">

            <draggable v-model="data.attrs.list" class="group_list" item-key="id" handle=".btn_icon_sort">>
              <template #item="{ element }">
                <div class="list_item">
                  <UploadImg :width="100" :height="100" style="display:block" v-model="element.src"></UploadImg>

                  <div class="child_item_right">
                    <el-form-item label="图片地址">
                      <el-input disabled v-model="element.src"></el-input>
                    </el-form-item>
                    <el-form-item label="跳转链接">
                      <el-input v-model="element.link" clearable placeholder="请输入跳转链接"></el-input>
                    </el-form-item>

                  </div>

                  <div class="btn_icon" @click="data.attrs.list.splice(index, 1)">
                    <Delete style="width: 1.2em; height: 1.2em;"/>
                  </div>
                  <div class="btn_icon btn_icon_sort">
                    <Sort style="width: 1.2em; height: 1.2em;"/>
                  </div>
                </div>

              </template>
            </draggable>


            <div style="text-align: right">
              <el-button type="primary" @click="data.attrs.list.push({
             id: (+new Date()).toString(16)
             })">添加内容
              </el-button>
            </div>
          </el-form>
        </el-form-item>
      </el-form>
    </template>
    <template #styles>
      <el-form label-width="100px">
        <el-form-item label="高度">
          <el-input-number v-model="data.styles.height" controls-position="right" :min="10"/>
        </el-form-item>
      </el-form>
    </template>
  </SettingLayout>
</template>

<style scoped lang="scss">
:deep( .el-form-item__content) {
  width: 100%;
}

.list_item {
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #a9a8a8;
  border-radius: 5px;
  display: flex;
  align-items: center;
  user-select: none;
  position: relative;

  &:first-child {
    margin-top: 0;
  }

  .child_item_right {
    flex: 1;
    padding-right: 30px;

    & > div {
      margin-top: 10px;

      &:first-child {
        margin-top: 0;
      }
    }
  }

  .btn_icon {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
      color: red
    }

    &.btn_icon_sort {
      top: calc(100% - 40px);
      cursor: move;
    }
  }
}
</style>
