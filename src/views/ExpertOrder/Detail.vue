<template>
  <ion-custom-header>의뢰 정보</ion-custom-header>
  <ion-custom-body class="justify-center">
    <ion-content :fullscreen="true">
      <ion-list v-if="globalState.isLogined" class="mb-14">                        

        <ion-item color="light">
          <ion-label color="medium">고인 이름</ion-label>
          <ion-label slot="end" color="dark">{{state.order.deceasedName}}</ion-label>
        </ion-item>
              
        <ion-item>
          <ion-label color="medium">상주 이름</ion-label>
          <ion-label slot="end" color="dark">{{state.order.bereavedName}}</ion-label>
        </ion-item>

        <ion-item v-if="globalState.loginedClient.id == state.order.clientId">
            <ion-label color="medium">담당지도사</ion-label>
            <ion-label slot="end" color="dark">{{state.order.extra__expertName}}</ion-label>
        </ion-item>

        <ion-item v-if="globalState.loginedClient.id == state.order.clientId">
          <ion-label slot="" color="medium">연락처</ion-label>
          <ion-label slot="end" color="">
            <ion-button v-if="globalState.loginedClient.id == state.order.clientId" color="" slot="end">
              {{state.order.extra__expertCellphoneNo}}
            </ion-button>
          </ion-label>
        </ion-item>       
        <ion-item>
          <ion-label color="medium">장례식장</ion-label>
          <ion-label slot="end" color="dark">{{state.order.funeralHome}}</ion-label>
        </ion-item>

        <ion-item>
          <ion-label color="medium">종교</ion-label>
          <ion-label slot="end" color="dark">{{state.order.religion}}</ion-label>
        </ion-item>

        <ion-item>
          <ion-label color="medium">시작일</ion-label>
          <ion-label slot="end" color="dark">{{state.order.startDate}}</ion-label>
        </ion-item>

        <ion-item>
          <ion-label color="medium">종료일</ion-label>
          <ion-label slot="end" color="dark">{{state.order.endDate}}</ion-label>
        </ion-item>

        <ion-item>
          <ion-label color="medium">추가 요청 사항</ion-label>
        </ion-item>
        <ion-item-divider>
          <ion-text slot="start" color="dark">{{state.order.body}}</ion-text>
        </ion-item-divider>

        <div class="justify-around flex h-full">
          <div class="items-center flex">
            <form v-on:submit.prevent="acceptOrder">
              <ion-button type="submit">수락</ion-button>
            </form>
              <ion-button>거절</ion-button>
          </div>
        </div>
      </ion-list>
      <div v-else class="py-2 px-4">
        로그인 후 이용가능합니다. <ion-custom-link to="/client/login">로그인</ion-custom-link> 하러 가기
      </div>
    </ion-content>
  </ion-custom-body>
</template>

<style>
.btn-cancel2{
  --background:var(--ion-color-danger-shade)
}
</style>

<script lang="ts">
import { IonCustomBody, IonCustomHeader, IonCustomLink } from '@/components/';
import { 
  //IonPage, 
  //IonHeader,
  //IonListHeader,
  //IonToolbar, 
  //IonTitle, 
  IonContent,
  IonList,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonText,
  //IonButtons,
  IonButton, 
} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services';
import { reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import * as util from '@/utils';
import { Order } from '@/types';

export default  {
  name: 'Detail',

  components: { 
    IonCustomBody, 
    IonCustomHeader, 
    IonCustomLink,
    //IonPage, 
    //IonHeader,
    //IonListHeader,
    //IonToolbar, 
    //IonTitle, 
    IonContent,
    IonList,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonText,
    //IonButtons,  
    IonButton, 
  },
  
  setup() {
    const globalState = useGlobalState();
    const mainService = useMainService();
    const route = useRoute();
    const router = useRouter();
    
    let id = 0;

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

    async function accept(orderId: number, expertId: number){
      const axRes = await mainService.order_accept(orderId, expertId)
      util.showAlert(axRes.data.msg);                    
      if ( axRes.data.fail ) {
        return;
      }
      router.replace('accept?id=' + orderId);        
    }

    onMounted(() => {
      loadOrder(id);
    });
    

    function acceptOrder() {
      const yesOrNo = confirm('요청을 수락 하시겠습니까?').valueOf()

      if(yesOrNo == false){
        return;
      }
      accept(state.order.id, globalState.loginedClient.id);
    }
    

    return {
      globalState,
      state,      
      acceptOrder
    }
  }
}
</script> 