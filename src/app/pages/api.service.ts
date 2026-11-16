import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class ApiService {


  server:any="";
  bd:any="";

  //serverCentral:any='http://127.0.0.1:5555';

  serverCentral:any='https://api-serverpharma.cti-congo.com';

  private urlAPi=this.server+'/Pharma/achat';

  constructor(private http: HttpClient,private storage:Storage) {

    this.create();

  }

  data:any;

  data1:any;

  taux:any=0;

  etatServer:any=false;



  testerServer(serv:any){

    this.http.get<any>(serv+'/Pharma/taux/'+this.bd).subscribe(data=>{
      this.data=data.data;
      this.data1=this.data[0];
      this.data1=this.data1[0];

      this.taux=this.data1.taux;

      })

      if(this.taux>0){

        this.etatServer=true;

        this.server=serv;

      }
      else{

        this.etatServer=false

      }

      return this.etatServer


  }


  testingServer(serv:any,bd:any){

    this.server=serv;

    this.bd=bd;

    return this.http.get<any>(serv+'/Pharma/taux/'+bd);


  }

  async create(){

    await this.storage.create();

  }

  async clearBd(){

    await this.storage.clear();

  }

  async saveAdressServer(key:string,value:any){

    await this.storage.set(key,{key:value});

  }
  async get(key:string){

    let data = await this.storage.get(key);

    return JSON.stringify(data);

  }

  async getTousKey(){

    return await this.storage.keys();

  }

  minorerProduit(idProd:any,qteMin:any,stockVar:any,stockFix:any){

    return this.http.get<any>(this.server+'/Pharma/minorerProd/'+this.bd+'/'+idProd+'/'+qteMin+'/'+stockVar+'/'+stockFix);

  }

  totVenduMin(prod:any){

    return this.http.get<any>(this.server+'/Pharma/totVenduMin/'+this.bd+'/'+prod);

  }

  getInfoImpression():Observable<any>{

    return this.http.get<any>(this.server+'/Pharma/impression/'+this.bd);

  }

  getAchat():Observable<any>{

    return this.http.get<any>(this.urlAPi);

  }

  getProduitLIke(preffix:any):Observable<any>{


    return this.http.get<any>(this.server+'/Pharma/produit/like/'+this.bd+'/'+preffix);

  }


  getServiceLIke():Observable<any>{


    return this.http.get<any>(this.server+'/Pharma/service/'+this.bd);

  }

  getAchatNowDistinctClient():Observable<any>{

    return this.http.get<any>(this.server+'/Pharma/achatNowClientCharger/'+this.bd);

  }

  getAchatNowDistinctClientTravId(travId:any):Observable<any>{

    return this.http.get<any>(this.server+'/Pharma/achatNowClientChargerTravId/'+this.bd+'/'+travId);


  }

  getAchatNowDistinctProduit():Observable<any>{

    return this.http.get<any>(this.server+'/Pharma/achatNowProduitCharger/'+this.bd);

  }

  getAchatNowDistinctProduitIdTrav(idTrav:any):Observable<any>{

    return this.http.get<any>(this.server+'/Pharma/achatNowProduitChargerIdTrav/'+this.bd+'/'+idTrav);

  }

  getAchatDistinctDate():Observable<any>{

    return this.http.get<any>(this.server+'/Pharma/achatNowDateCharger/'+this.bd);

  }

  getAchatDistinctDateTravId(idTrav:any):Observable<any>{

    return this.http.get<any>(this.server+'/Pharma/achatNowDateChargerIdTrav/'+this.bd+'/'+idTrav);


  }

  getAchatDistinctDateService():Observable<any>{

    return this.http.get<any>(this.server+'/Pharma/achatNowDateService/'+this.bd);


  }

  getAchatNowDistinctClientLike(prefix:any):Observable<any>{

    return this.http.get<any>(this.server+'/Pharma/achatNowClientChargerLike/'+this.bd+'/'+prefix);

  }


  getAchatNowDistinctClienService():Observable<any>{

    return this.http.get<any>(this.server+'/Pharma/achatNowClientChargerService/'+this.bd);

  }


  getAchatNowDistinctClientLikeTravId(travId:any,prefix:any):Observable<any>{

    return this.http.get<any>(this.server+'/Pharma/achatNowClientChargerLikeTravId/'+this.bd+'/'+travId+'/'+prefix);

  }

  getAchatNowDistinctProduitLike(prefix:any):Observable<any>{

    return this.http.get<any>(this.server+'/Pharma/achatNowProduitChargerLike/'+this.bd+'/'+prefix);

  }

  getAchatNowDistinctProduitLikeIdTrav(idTrav:any,prefix:any):Observable<any>{

    return this.http.get<any>(this.server+'/Pharma/achatNowProduitChargerLikeIdTrav/'+this.bd+'/'+ idTrav +'/'+prefix);

  }
  afficheGetProduit(produit:any){

    return this.http.get<any>(this.server+'/Pharma/produit/'+this.bd+'/'+ produit);

  }

  getProduitLike(prefix:any){

    return this.http.get<any>(this.server+'/Pharma/produit/like/'+this.bd+'/'+ prefix);

  }

  //AFFICHAGE

  afficheAchatNowIdProduit(produit:any){

    return this.http.get<any>(this.server+'/Pharma/achatNowProduit/'+this.bd+'/'+produit)

  }

  afficheAchatNowIdProduitIdTrav(produit:any,id_trav:any){

    return this.http.get<any>(this.server+'/Pharma/achatNowProduitTravId/'+this.bd+'/'+produit+'/'+id_trav)

  }

  afficheAchatNowTravId(id_trav:any){

    return this.http.get<any>(this.server+'/Pharma/achatNowTravId/'+this.bd+'/'+id_trav)

  }


  afficheAchatDateTravId(id_trav:any,ddate:any){

    return this.http.get<any>(this.server+'/Pharma/achatTravIdDate/'+this.bd+'/'+id_trav+'/'+ddate)

  }

  afficheAchatDateTravIdService(ddate:any){

    return this.http.get<any>(this.server+'/Pharma/achatTravIdDateService/'+this.bd+'/'+ddate)

  }

  afficheAchatNowClient(client:any){

    return this.http.get<any>(this.server+'/Pharma/achatNowClient/'+this.bd+'/'+client)
  }

  afficheAchatNowClientService(client:any){

    return this.http.get<any>(this.server+'/Pharma/achatNowClientService/'+this.bd+'/'+client)
  }

  afficheAchatNowIdTravClient(client:any,idTrav:any){

    return this.http.get<any>(this.server+'/Pharma/achatNowClientTravId/'+this.bd+'/'+client+'/'+idTrav)
  }

  afficheProduitRech(idProd:any){

    return this.http.get<any>(this.server+'/Pharma/produit/'+this.bd+'/'+idProd)

  }


  afficheServicetRech(idProd:any){


    return this.http.get<any>(this.server+'/Pharma/service/'+this.bd+'/'+idProd)

  }

  afficheProduitFantome(produit:any){

    return this.http.get<any>(this.server+'/Pharma/produit/'+this.bd+'/'+produit)

  }

  verifAutorisation(user:any){

    return this.http.get<any>(this.server+'/Pharma/active/testinf/'+this.bd+'/'+user)

  }

  authentification(data:any){

    return this.http.post<any>(this.server+'/Pharma/authentification',data)

  }

  getCommunique(){

    return this.http.get<any>(this.serverCentral+'/Pharma/getInfoPublicite/'+this.bd)

  }

  getServiceID(data:any){

    return this.http.post<any>(this.server+'/Pharma/ServiceSearchPost',data)

  }

  getInfoPromotion(){

    return this.http.get<any>(this.serverCentral+'/Pharma/getInfoPublicite/'+this.bd)

  }

  testingInfoABonnes(tokendId:any){

    return this.http.get<any>(this.serverCentral+'/Pharma/testingTokend/'+tokendId)

  }

  testingTokendValable(data:any){

    return this.http.post<any>(this.serverCentral+'/Pharma/checkingTokendVal',data)

  }

  createMotif(data:any){

    return this.http.post<any>(this.server+'/Pharma/motif/create/',data)

  }

  createCommandeFacture(data:any){

    return this.http.post<any>(this.server+'/Pharma/commandeFacture/createBroadCast',data)

  }

  deconnexion(idTrav:any){

    return this.http.delete<any>(this.server+'/Pharma/deconnexion/'+this.bd+'/'+idTrav)

  }

  closingDay(idTrav:any){

    return this.http.delete<any>(this.server+'/Pharma/sessionClosed/'+this.bd+'/'+idTrav)


  }

  getTaux(){

    return this.http.get<any>(this.server+'/Pharma/taux/'+this.bd);


  }

  getMotif(idTrav:any){

    return this.http.get<any>(this.server+'/Pharma/motif/'+this.bd+'/'+idTrav);

  }

  updateService(data:any){

    return this.http.post<any>(this.server+'/Pharma/service/update',data);

  }


  updateProduit(data:any){

    return this.http.post<any>(this.server+'/Pharma/produitReduction/update/',data);

  }

  createProduit(data:any){

    return this.http.post<any>(this.server+'/Pharma/produitReduction/createBroadCast/',data);


  }

  chargeProforma(prefix:any){

    return this.http.get<any>(this.server+'/Pharma/preforma/like/'+this.bd+'/'+prefix);

  }

  afficheProforma(prefix:any){

    return this.http.get<any>(this.server+'/Pharma/preforma/'+this.bd+'/'+prefix);

  }

  chargerPriseCharge(client:any){

    return this.http.get<any>(this.server+'/Pharma/prisecharge/like/'+this.bd+'/'+client);

  }

  validateCouponSImple(data:any){

    return this.http.post<any>(this.server+'/Pharma/achat/createBroadCast',data);

  }

  validatePrescription(data:any){

    return this.http.post<any>(this.server+'/Pharma/prescription/createBroadCast',data);

  }

  saveProforma(data:any){

    return this.http.post<any>(this.server+'/Pharma/preforma/createBroadCast',data);

  }

  controleurValidationCoupon(data:any){

    return this.http.post<any>(this.server+'/Pharma/controlleurCoupon',data);

  }

  createPriseCharge(data:any){

    return this.http.post<any>(this.server+'/Pharma/priseCharge/create',data);

  }
  updatePriseCharge(data:any){

    return this.http.post<any>(this.server+'/Pharma/priseCharge/update',data);

  }
  getAutorisationService(data:any){

    return this.http.post<any>(this.server+'/Pharma/getAutorisationService',data);

  }

  getLIkePriseChaege(prefix:any){

    return this.http.get<any>(this.server+'/Pharma/priseChargeLIke/'+this.bd+'/'+prefix);

  }

  getPriseChargeAffiche(gmail:any){

    return this.http.get<any>(this.server+'/Pharma/priseChargeAffiche/'+this.bd+'/'+gmail);

  }

  getDistinctPrescr(prefixPrise:any){

    return this.http.get<any>(this.server+'/Pharma/prescriptionDistinct/'+this.bd+'/'+prefixPrise);

  }

  getPrescrPrise(prise:any){

    return this.http.get<any>(this.server+'/Pharma/prescription/'+this.bd+'/'+prise);

  }

  getGenerationExcel(travId:any,datte:any){

    return this.http.get<any>(this.server+'/Pharma/selectDateRapportUser/'+this.bd+'/'+travId+'/'+datte);

  }

  dowlonadFileExcel(){

    return this.http.get<any>(this.server+'/Pharma/getFile/'+this.bd+'rapport.xlsx');

  }

  getAutotorisationGen(){

    return this.http.get<any>(this.server+'/Pharma/autorisationGenerales/'+this.bd);

  }

  getInfoOrgaPrise(){

    return this.http.get<any>(this.server+'/Pharma/orgaTypePrise/'+this.bd);

  }

  getProduit(){

    return this.http.get<any>(this.server+'/Pharma/produit/'+this.bd);

  }

  getUser(){

    return this.http.get<any>(this.server+'/Pharma/user/'+this.bd);

  }

  createService(data:any){

    return this.http.post<any>(this.server+'/Pharma/service/createBroadCast',data);

  }


  createAchatService(data:any){

    return this.http.post<any>(this.server+'/Pharma/achatService/createBroadCast',data);


  }

  pingServeurDirrect(ref:any){

    return this.http.get<any>(this.serverCentral+'/Pharma/pingPharmaDirrect/'+ref);

  }



}
