<template>
  <ion-page>
    <ion-custom-header>PW 찾기</ion-custom-header>
    <ion-content :fullscreen="true">
      <ion-custom-body class="justify-center">
        <div class="logo-box text-center flex justify-center items-center mb-3">
            <div class="w-32 text-2xl border-b">
              PW 찾기
            </div>
        </div>
        <form @submit.prevent="checkAndFindLoginId" class="mx-3">
          <div class="bg-white pb-3 pt-2 rounded-lg">
            <ion-item class="f_item">
              <ion-label position="floating">ID</ion-label>
              <ion-input v-model="findLoginPwFormState.loginId" maxlength="20" placeholder="이름을 입력해주세요."></ion-input>
            </ion-item>
            <ion-item class="s_item">
              <ion-label position="floating">이메일</ion-label>
              <ion-input v-model="findLoginPwFormState.email" maxlength="20" type="email" placeholder="email을 입력해주세요."></ion-input>
            </ion-item>
          </div>
          <div class="py-2 px-4">
            <ion-button type="submit" expand="block">찾기</ion-button>
          </div>
        </form>
      </ion-custom-body>
    </ion-content>
  </ion-page>
</template>

<style>


</style>

<script lang="ts">
import { IonCustomHeader, IonCustomBody} from '@/components/';
import { 
  IonPage, 
  //IonHeader, 
  //IonToolbar, 
  //IonTitle, 
  IonContent, 
  IonLabel, 
  IonInput, 
  IonItem, 
  IonButton 
} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { reactive } from 'vue';
//import { useMainApi } from '@/apis';  //mainService를 통해 mainAPI를 가져오는 방식으로 변경
import { useMainService } from '@/services';
import { useRouter } from 'vue-router';
import * as util from '@/utils';

const useFindLoginPwFormState = () => {
  return reactive({
    loginId: '',
    email: '',
  })
}

export default  {
  name: 'FindLoginId',
  components: { 
    //IonHeader, 
    //IonToolbar, 
    //IonTitle, 
    IonLabel, 
    IonInput, 
    IonItem, 
    IonButton, 
    IonContent, 
    IonPage, 
    IonCustomHeader, 
    IonCustomBody, 

},
  
  
  setup() {
    const globalState = useGlobalState();
    const findLoginPwFormState = useFindLoginPwFormState();
    const router = useRouter();
    const mainService = useMainService();
    
    async function findLoginPw(loginId: string, email: string) {
      
      const axRes = await mainService.client_findLoginPw(loginId, email)

      util.showAlert(axRes.data.msg);
      if ( axRes.data.fail ) {
        return;
      }

      router.replace('/client/login')
    }

    function checkAndFindLoginId() {
      if ( findLoginPwFormState.loginId.trim().length == 0 ) {
        util.showAlert('ID를 입력해주세요.');
        return;
      }
      if ( findLoginPwFormState.email.trim().length == 0 ) {
        util.showAlert('이메일을 입력해주세요.');
        return;
      }
      findLoginPw(findLoginPwFormState.loginId, findLoginPwFormState.email);
    }

    return {
      globalState,
      findLoginPwFormState,
      checkAndFindLoginId
    }
  }
}
</script> 