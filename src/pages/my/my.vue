<script setup lang="ts">
import { useMemberStore } from '@/stores';
import { http } from '@/utils/http';

const memberStore = useMemberStore();

const getInfo = async () => {
  const data = await http<String[]>({
    // 这个data的值决定了接受到的数组类型
    url: '/member/pile',
    method: 'GET',
  });
  console.log('success', data);
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
    <button
      size="mini"
      plain
      type="warn"
      @click="getInfo()"
    >
      get Someting
    </button>
  </view>
</template>

<style lang="scss">
//
</style>
