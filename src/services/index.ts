//service를 통해 mainAPI를 가져오는 방식으로 변경
//MVC패턴 같은 느낌
//import { MainService } from "@/types";
import { Client } from "@/types";
import { inject } from "vue";
import { getMainApi, MainApi } from "@/apis";  //service를 통해 mainAPI를 가져오는 방식으로 변경

  export class MainService {
    private mainApi: MainApi;
  
    constructor() {
      this.mainApi = getMainApi();
    }

    //camelcase??
    //일반적으로 객체 명명은 clientAuthKey 이런식으로 함
    //이런 명명법을 camelcase라고함
    //typescript에선 camelcase방식을 권장하지만 이것을 무시할 수도 있음(큰 문제는 없음)
    //이를 무시하기 위해 아래와 같이 주석을 달아줌

    /* eslint-disable @typescript-eslint/camelcase */
    client_doJoin(loginId: string, loginPw: string, name: string, cellphoneNo: string, email: string, region: string, genFileIdsStr: string){
      return this.mainApi.client_doJoin(loginId, loginPw, name, cellphoneNo, email, region, genFileIdsStr);
    }

    expert_doJoin(loginId: string, loginPw: string, name: string, cellphoneNo: string, email: string, region: string, license: string, genFileIdsStr: string){
      return this.mainApi.expert_doJoin(loginId, loginPw, name, cellphoneNo, email, region, license, genFileIdsStr);
    }

    /* eslint-disable @typescript-eslint/camelcase */
    common_genFile_doUpload(profileImg: File) {
      return this.mainApi.common_genFile_doUpload(profileImg);
    }
  
    /* eslint-disable @typescript-eslint/camelcase */
    client_authKey(loginId: string, loginPw: string) {
      return this.mainApi.client_authKey(loginId, loginPw);
    }

    client_findLoginId(name: string, email: string){
      return this.mainApi.client_findLoginId(name, email)
    }

    client_findLoginPw(loginId: string, email: string){
      return this.mainApi.client_findLoginPw(loginId, email)
    }
    
    /* eslint-disable @typescript-eslint/camelcase */
    client_detail(id: number) {
      return this.mainApi.client_detail(id);
    }

    /* eslint-disable @typescript-eslint/camelcase */
    client_doModify(id: number, loginPw: string, name: string, cellphoneNo: string, email: string, region: string, genFileIdsStr: string){
      return this.mainApi.client_doModify(id, loginPw, name, cellphoneNo, email, region, genFileIdsStr);
    }

    expert_authKey(loginId: string, loginPw: string) {
      return this.mainApi.expert_authKey(loginId, loginPw);
    }

    /* eslint-disable @typescript-eslint/camelcase */
    expert_list() {
      return this.mainApi.expert_list();
    }

    expert_detail(id: number){
      return this.mainApi.expert_detail(id);
    }

    expert_findLoginId(name: string, email: string){
      return this.mainApi.expert_findLoginId(name, email)
    }

    expert_findLoginPw(loginId: string, email: string){
      return this.mainApi.expert_findLoginPw(loginId, email)
    }

    expertOrder_list(memberId: number, memberType: string){
      return this.mainApi.expertOrder_list(memberId, memberType);
    }

    order_list(memberId: number, memberType: string){
      return this.mainApi.order_list(memberId, memberType);
    }

    order_doAdd(deceasedName: string, bereavedName: string, funeralHome: string, region: string, religion: string, startDate: string, endDate: string, body: string, expertId: number, clientId: number){
      return this.mainApi.order_doAdd(deceasedName, bereavedName, funeralHome, region, religion, startDate, endDate, body, expertId, clientId);
    }

    order_detail(id: number){
      return this.mainApi.order_detail(id);
    }

    order_doModify(id: number, deceasedName: string, bereavedName: string, funeralHome: string, region: string, religion: string, startDate: string, endDate: string, body: string, expertId: number, clientId: number){
      return this.mainApi.order_doModify(id, deceasedName, bereavedName, funeralHome, region, religion, startDate, endDate, body, expertId, clientId);
    }

    order_delete(id: number){
      return this.mainApi.order_delete(id);
    }

    order_changeStepLevel(id: number, stepLevel: number){
      return this.mainApi.order_changeStepLevel(id, stepLevel)
    }

    order_accept(orderId: number, expertId: number) {
      return this.mainApi.order_accept(orderId, expertId);
    }

    order_reject(orderId: number, expertId: number) {
      return this.mainApi.order_reject(orderId, expertId);
    }

    rating_doAdd(relTypeCode: string, relId: number, point: number, clientId: number){
      return this.mainApi.rating_doAdd(relTypeCode, relId, point, clientId)
    }

    rating_getRatingRelClient(relTypeCode: string, relId: number, clientId: number){
      return this.mainApi.rating_getRatingRelClient(relTypeCode, relId, clientId)
    }

    rating_doModify(relTypeCode: string, relId: number, point: number, clientId: number){
      return this.mainApi.rating_doModify(relTypeCode, relId, point, clientId)
    }

    review_doAdd(relTypeCode: string, relId: number, body: string, clientId: number){
      return this.mainApi.review_doAdd(relTypeCode, relId, body, clientId)
    }

    review_detail(id: number){
      return this.mainApi.review_detail(id)
    }

    review_doModify(id: number, body: string, clientId: number){
      return this.mainApi.review_doModify(id, body, clientId)
    }
    
    review_doDelete(relTypeCode: string, relId: number, id: number, clientId: number) {
      return this.mainApi.review_doDelete(relTypeCode, relId, id, clientId);
    }


    // //이미지를 리사이징해주는 유틸 적용
    //사용하려면 작동을 시켜야 함..일단은 적용 보류(21.04.01)
    /* eslint-disable @typescript-eslint/no-inferrable-types */
    getClientThumbImgUrlForHeader(id: number, width: number = 40, height: number = 40) {

      const originUrl = 'http://localhost:8090/common/genFile/file/client/' + id + '/common/attachment/1';
      const url = `http://localhost:8085/img?failWidth=${width}&failHeight=${height}&failText=NoImage&width=${width}&height=${height}&url=` + originUrl;
      return url;
    }

    getClientThumbImgUrl(id: number, width: number = 500, height: number = 500) {

      const originUrl = 'http://localhost:8090/common/genFile/file/client/' + id + '/common/attachment/1';
      const url = `http://localhost:8085/img?failWidth=${width}&failHeight=${height}&failText=NoImage&width=${width}&height=${height}&url=` + originUrl;
      return url;
    }

    getExpertThumbImgUrl(id: number, width: number = 500, height: number = 500) {

      const originUrl = 'http://localhost:8090/common/genFile/file/expert/' + id + '/common/attachment/1';
      const url = `http://localhost:8085/img?failWidth=${width}&failHeight=${height}&failText=NoImage&width=${width}&height=${height}&url=` + originUrl;
      return url;
    }

    // /* eslint-disable @typescript-eslint/no-inferrable-types */
    // getArticleThumbImgUrl(id: number, width: number = 100, height: number = 100) {
    //   const originUrl = 'http://localhost:8090/common/genFile/file/article/' + id + '/common/attachment/1';
    //   const url = `http://localhost:8085/img?failWidth=${width}&failHeight=${height}&failText=U.U&width=${width}&height=${height}&url=` + originUrl;
    //   return url;
    //  }
  
    // getClientThumbImgUrl(id: number) {
    //   return "https://i.pravatar.cc/45?img=13&k=" + id
    // }

    // getArticleThumbImgUrl(id: number) {
    //   return "https://i.pravatar.cc/45?img=13&k=" + id
    // }
  }
  
  export const mainServiceSymbol = Symbol('globalState');
  
  class Singleton {
    static mainService: MainService;
  }
  
  export const createMainService = () => {
    if ( Singleton.mainService == null ) {
      Singleton.mainService = new MainService();
    }
  
    return Singleton.mainService;
  };
  
  export const useMainService = (): MainService => inject(mainServiceSymbol) as MainService;