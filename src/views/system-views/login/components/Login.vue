<script lang="ts">
export default {
  name: "",
};
</script>
<script setup lang="ts">
import { ref } from "vue";
import {
  FormInst,
  NForm,
  NFormItem,
  NButton,
  NInput,
  useMessage,
  NSpace
} from "naive-ui";
import { getImgCodeRule } from '@/utils';
import {ImageVerify} from "@/components";
import router from "@/router";
import {loginApi} from '@/api'
const message = useMessage();
const emit = defineEmits(["onGo"]);
const loading = ref(false)
const formRef = ref<FormInst | null>(null);
const formValue = ref({
  userName: "",
  password: "",
  verifyCode:''
});
const verifyCode = ref()
const formRules = {
  userName: { required: true, message: "请输入用户名", trigger: ["blur"] },
  password: { required: true, message: "请输入密码", trigger: ["blur"] },
  verifyCode:getImgCodeRule(verifyCode)
};
const onSubmit = function (e: MouseEvent) {
  e.preventDefault();
  formRef.value?.validate((err) => {
    if (err) {
      return message.error("请输入内容");
    }
    loading.value = true
    loginApi.login(formValue.value).then((res:any)=>{
      message.success('登录成功')
      router.push('/')
    }).catch(()=>{
      message.error('用户名或密码错误')
      loading.value = false
    });
  });
};

function onKeyup(e){
  if(e.key==='Enter'){
    onSubmit(e)
  }
}
</script>
<template>
  <div>
    <h1 class="text-gray-600 font-thin">登录</h1>
    <div class="mt-2">
      <n-form
        :model="formValue"
        ref="formRef"
        :rules="formRules"
        :show-label="false"
        size="large"
      >
        <n-form-item label="用户名" path="userName">
          <n-input v-model:value="formValue.userName" placeholder="用户名" @keyup="onKeyup" />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input
            v-model:value="formValue.password"
            type="password"
            placeholder="密码"
            @keyup="onKeyup"
          />
        </n-form-item>
        <n-form-item label="密码" path="verifyCode">
          <n-space :wrap="false">
          <n-input
            v-model:value="formValue.verifyCode"
            type="text"
            placeholder="验证码"
            @keyup="onKeyup"
          />
          <image-verify v-model:code="verifyCode"></image-verify>
          </n-space>
        </n-form-item>
        <n-form-item>
          <n-button type="primary" :loading="loading" block @click="onSubmit">登录</n-button>
        </n-form-item>
      </n-form>
    </div>
    <div class="flex items-center justify-center gap-3">
      <div class="flex-1">
        <n-button size="medium" block @click="emit('onGo', 'verification')"
          >手机验证码登录</n-button
        >
      </div>
      <div class="flex-1">
        <n-button size="medium" block @click="emit('onGo', 'register')"
          >注册</n-button
        >
      </div>
    </div>
  </div>
</template>
<style scoped lang="less"></style>
