<template>
  <ion-page>
    <ion-custom-header>의뢰 수정</ion-custom-header>
    <ion-content :fullscreen="true">
      <ion-custom-body class="justify-center">
        <form v-if="globalState.isLogined" @submit.prevent="checkAndModifyOrder">
          <div>
            <ion-item>
              <ion-label position="stacked">고인 이름</ion-label>
              <ion-input v-model="orderModifyFormState.deceasedName" type="text" :placeholder="state.order.deceasedName"></ion-input>
            </ion-item>
          </div>
          <div>
            <ion-item>
              <ion-label position="stacked">상주 이름</ion-label>
              <ion-input v-model="orderModifyFormState.bereavedName" type="text" :placeholder="state.order.bereavedName"></ion-input>
            </ion-item>
          </div>
          <div>
            <ion-item>
              <ion-label position="floating">지역</ion-label>
              <ion-select v-model="orderModifyFormState.region" :placeholder="state.order.region">
                <ion-select-option value="서울특별시">서울</ion-select-option>
                <ion-select-option value="대전광역시">대전</ion-select-option>
                <ion-select-option value="인천광역시">인천</ion-select-option>
                <ion-select-option value="부산광역시">부산</ion-select-option>
              </ion-select>
            </ion-item>
          </div>
          <div>
            <ion-item>
              <ion-label position="stacked">장례식장</ion-label>
              <ion-input v-model="orderModifyFormState.funeralHome" type="text" :placeholder="state.order.funeralHome"></ion-input>
            </ion-item>
          </div>
          <div>
            <ion-item>
              <ion-label position="stacked">종교</ion-label>
              <ion-select v-model="orderModifyFormState.religion" :placeholder="state.order.religion">
                <ion-select-option value="기독교">기독교</ion-select-option>
                <ion-select-option value="천주교">천주교</ion-select-option>
                <ion-select-option value="불교">불교</ion-select-option>
                <ion-select-option value="기타">기타</ion-select-option>
              </ion-select>
            </ion-item>
          </div>
          <div>
            <ion-item>
              <ion-label position="stacked">시작일</ion-label>
              <ion-input v-model="orderModifyFormState.startDate" type="date" :placeholder="state.order.startDate"></ion-input>
            </ion-item>
          </div>
          <div>
            <ion-item>
              <ion-label position="stacked">종료일</ion-label>
              <ion-input v-model="orderModifyFormState.endDate" type="date" :placeholder="state.order.endDate"></ion-input>
            </ion-item>
          </div>
          <div>
            <ion-item>
              <ion-label position="stacked">추가 요청 사항</ion-label>
              <ion-textarea v-model="orderModifyFormState.body" :placeholder="state.order.body"></ion-textarea>
            </ion-item>
          </div>
          <div class="py-2 px-4">
            <ion-button type="submit" expand="block">수정 완료(의뢰 요청)</ion-button>
          </div>
          <div class="px-4">
            <ion-button color="secondary" type="reset" expand="block">초기화</ion-button>
          </div>
          <div class="px-4">
            <ion-button href="/expert/list" color="secondary" type="button" expand="block">취소</ion-button>
          </div>
        </form>
        <div v-else class="py-2 px-4">
          로그인 후 이용가능합니다. <ion-custom-link to="/client/login">로그인</ion-custom-link> 하러 가기
        </div>
      </ion-custom-body>
    </ion-content>
  </ion-page>
</template>

<style>
</style>

<script lang="ts">
import { IonCustomBody, IonCustomHeader, IonCustomLink } from '@/components/';
import { 
  IonPage, 
  //IonHeader, 
  //IonToolbar, 
  //IonTitle, 
  IonContent,
  IonSelect, 
  IonSelectOption, 
  IonLabel, 
  IonInput,
  IonTextarea, 
  IonItem, 
  IonButton, 
} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services';
import { useRoute, useRouter } from 'vue-router';
import * as util from '@/utils';
import { reactive, onMounted } from 'vue';
import { Order } from '@/types';

const useOrderModifyFormState = () => {
  return reactive({
    deceasedName: '',
    bereavedName: '',
    funeralHome:'',
    region:'',
    religion: '',
    startDate: '',
    endDate: '',
    body: '',
  })
}

export default {
  name: 'OrderModify',

  components: { 
    //IonHeader, 
    //IonToolbar,
    IonCustomLink, 
    //IonTitle,
    IonSelect, 
    IonSelectOption, 
    IonLabel, 
    IonInput,
    IonTextarea,
    IonItem, 
    IonButton, 
    IonContent, 
    IonPage, 
    IonCustomBody, 
    IonCustomHeader 
  },

  setup() {
    const globalState = useGlobalState();
    const orderModifyFormState = useOrderModifyFormState();
    const router = useRouter();
    const route = useRoute();
    const mainService = useMainService();

    // function confirmAlert(){
    //   const msg = '해당 내용으로 가입하시겠습니까?'
    //   util.showAlertConfirm(msg)
    // }

    let id = '';

    if ( route.query.id != null ) {
      id = util.toIntOrUnd(route.query.id)
    }

    const state = reactive({
      order: {} as Order
    });

    async function loadOrder(id: number) {
      const axRes = await mainService.order_detail(id)
      state.order = axRes.data.body.order;
    }
    onMounted(() => {
      loadOrder(parseInt(id));
    });

    function checkAndModifyOrder() {
      // 고인 이름 체크
      let deceasedName = orderModifyFormState.deceasedName.trim();
      
      if ( deceasedName.length == 0 ) {
        deceasedName = state.order.deceasedName;
      }
      // 상주 이름 체크
      let bereavedName = orderModifyFormState.bereavedName.trim();
      
      if ( bereavedName.length == 0 ) {
        bereavedName = state.order.bereavedName;
      }

      // 장례식장 체크
      let funeralHome = orderModifyFormState.funeralHome;
      
      if ( funeralHome.length == 0 ) {
        funeralHome = state.order.funeralHome;
      }

      // 지역 체크
      let region = orderModifyFormState.region.trim();
      
      if ( region.length == 0 ) {
        region = state.order.region;
      }
      
      // // 예상 인원 체크
      // let head = parseInt(orderModifyFormState.head);
      
      // //전역 NaN 속성은 Not-A-Number(숫자가 아님)를 나타냄
      // //isNaN() 함수로 NaN 여부를 확인
      // if ( isNaN(head) || head == 0) {
      //   head = state.order.head;
      // }

      // 종교 체크
      let religion = orderModifyFormState.religion.trim();

      if ( religion.length == 0 ) {
        religion = state.order.religion;
      }
      
      // 시작일 체크
      let startDate = orderModifyFormState.startDate.trim();
      
      if ( startDate.length == 0 ) {
        startDate = state.order.startDate;
      }

      // 종료일 체크
      let endDate = orderModifyFormState.endDate.trim();
      
      if ( endDate.length == 0 ) {
        endDate = state.order.endDate;
      }

      // 추가 요청 사항 체크
      let body = orderModifyFormState.body.trim();
      
      if ( body.length == 0 ) {
        body = state.order.body;
      }

      const expertId = state.order.expertId;

      async function modifyOrder(id: number, deceasedName: string, bereavedName: string, funeralHome: string, region: string, religion: string, startDate: string, endDate: string, body: string, expertId: number, clientId: number) {
        const axRes = await mainService.order_doModify(id, deceasedName, bereavedName, funeralHome, region, religion, startDate, endDate, body, expertId, clientId);
  
          if ( axRes.data.fail ) {
            return;
          }
          util.showAlert(axRes.data.msg);
          const newOrderId = axRes.data.body.id;

          router.replace("detail?id=" + newOrderId);
      }

      const msg = '해당 내용으로 수정하시겠습니까?'
      util.showAlertConfirm(msg).then(confirm => {
        if (confirm == false) {
          return
        } else{
          modifyOrder(state.order.id, deceasedName, bereavedName, funeralHome, region, religion, startDate, endDate, body, expertId, globalState.loginedClient.id);
        }
      })

    }

    return {
      globalState,
      state,
      //confirmAlert,
      orderModifyFormState,
      checkAndModifyOrder,
      
    }
  }
}
</script> 