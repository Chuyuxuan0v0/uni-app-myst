<script setup lang="ts">
import { useMemberStore } from '@/stores';
import '@/utils/http'

const memberStore = useMemberStore();

const getInfo = () => {

  uni.request({
    url: '/home/banner',
    method:'GET',
    success: res => {
      console.log(res);
    },
  });
};
</script>

<template>
  <view class="my">
    <view>会员信息：{{ memberStore.profile }}</view>
    <button
      @tap="
        memberStore.setProfile({
          nickname: 'xts',
        })
      "
      size="mini"
      plain
      type="primary"
    >
      保存用户信息
    </button>
    <button
      @tap="memberStore.clearProfile()"
      size="mini"
      plain
      type="warn"
    >
      清理用户信息
    </button>
    <button  size="mini"
      plain
      type="warn"  @click="getInfo()">get Someting</button>
  </view>
</template> 

<style lang="scss">
//
</style>
