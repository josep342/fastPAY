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

  serverCentral:any='146.19.133.197:1625';

  private urlAPi='http://'+this.server+'/Pharma/achat';
  
  constructor(private http: HttpClient,private storage:Storage) { 
    
    this.create();
  
  }

  data:any;

  data1:any;

  taux:any=0;

  etatServer:any=false;
  
  testerServer(serv:any){

    this.http.get<any>('http://'+serv+'/Pharma/taux/'+this.bd).subscribe(data=>{
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

    return this.http.get<any>('http://'+serv+'/Pharma/taux/'+bd);      

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
    
    return this.http.get<any>('http://'+this.server+'/Pharma/minorerProd/'+this.bd+'/'+idProd+'/'+qteMin+'/'+stockVar+'/'+stockFix);

  }

  totVenduMin(prod:any){
    
    return this.http.get<any>('http://'+this.server+'/Pharma/totVenduMin/'+this.bd+'/'+prod);

  }


  getInfoImpression():Observable<any>{

    return this.http.get<any>('http://'+this.server+'/Pharma/impression/'+this.bd);

  }

  getAchat():Observable<any>{

    return this.http.get<any>(this.urlAPi);

  }

  getProduitLIke(preffix:any):Observable<any>{

    return this.http.get<any>('http://'+this.server+'/Pharma/produit/like/'+this.bd+'/'+preffix);

  }
  
  getAchatNowDistinctClient():Observable<any>{

    return this.http.get<any>('http://'+this.server+'/Pharma/achatNowClientCharger/'+this.bd);

  }

  getAchatNowDistinctClientTravId(travId:any):Observable<any>{

    return this.http.get<any>('http://'+this.server+'/Pharma/achatNowClientChargerTravId/'+this.bd+'/'+travId);
    

  }
  
  getAchatNowDistinctProduit():Observable<any>{

    return this.http.get<any>('http://'+this.server+'/Pharma/achatNowProduitCharger/'+this.bd);

  }
  
  getAchatNowDistinctProduitIdTrav(idTrav:any):Observable<any>{

    return this.http.get<any>('http://'+this.server+'/Pharma/achatNowProduitChargerIdTrav/'+this.bd+'/'+idTrav);
    
  }
  
  getAchatDistinctDate():Observable<any>{

    return this.http.get<any>('http://'+this.server+'/Pharma/achatNowDateCharger/'+this.bd);

  }
  
  getAchatDistinctDateTravId(idTrav:any):Observable<any>{

    return this.http.get<any>('http://'+this.server+'/Pharma/achatNowDateChargerIdTrav/'+this.bd+'/'+idTrav);
    

  }
  
  getAchatNowDistinctClientLike(prefix:any):Observable<any>{

    return this.http.get<any>('http://'+this.server+'/Pharma/achatNowClientChargerLike/'+this.bd+'/'+prefix);

  }

  getAchatNowDistinctClientLikeTravId(travId:any,prefix:any):Observable<any>{

    return this.http.get<any>('http://'+this.server+'/Pharma/achatNowClientChargerLikeTravId/'+this.bd+'/'+travId+'/'+prefix);
    
  }

  getAchatNowDistinctProduitLike(prefix:any):Observable<any>{

    return this.http.get<any>('http://'+this.server+'/Pharma/achatNowProduitChargerLike/'+this.bd+'/'+prefix);

  }

  getAchatNowDistinctProduitLikeIdTrav(idTrav:any,prefix:any):Observable<any>{

    return this.http.get<any>('http://'+this.server+'/Pharma/achatNowProduitChargerLikeIdTrav/'+this.bd+'/'+ idTrav +'/'+prefix);
    
  }
  afficheGetProduit(produit:any){

    return this.http.get<any>('http://'+this.server+'/Pharma/produit/'+this.bd+'/'+ produit);
  
  }

  getProduitLike(prefix:any){

    return this.http.get<any>('http://'+this.server+'/Pharma/produit/like/'+this.bd+'/'+ prefix);

  }

  //AFFICHAGE
  
  afficheAchatNowIdProduit(produit:any){
  
    return this.http.get<any>('http://'+this.server+'/Pharma/achatNowProduit/'+this.bd+'/'+produit)

  }

  afficheAchatNowIdProduitIdTrav(produit:any,id_trav:any){

    return this.http.get<any>('http://'+this.server+'/Pharma/achatNowProduitTravId/'+this.bd+'/'+produit+'/'+id_trav)

  }

  afficheAchatNowTravId(id_trav:any){
    
    return this.http.get<any>('http://'+this.server+'/Pharma/achatNowTravId/'+this.bd+'/'+id_trav)

  }
  
  
  afficheAchatDateTravId(id_trav:any,ddate:any){
  
    return this.http.get<any>('http://'+this.server+'/Pharma/achatTravIdDate/'+this.bd+'/'+id_trav+'/'+ddate) 
    
  }
  
  afficheAchatNowClient(client:any){

    return this.http.get<any>('http://'+this.server+'/Pharma/achatNowClient/'+this.bd+'/'+client)
  }

  afficheAchatNowIdTravClient(client:any,idTrav:any){

    return this.http.get<any>('http://'+this.server+'/Pharma/achatNowClientTravId/'+this.bd+'/'+client+'/'+idTrav)
  }
  
  afficheProduitRech(produit:any){

    return this.http.get<any>('http://'+this.server+'/Pharma/produit/'+this.bd+'/'+produit)
    
  }

  afficheProduitFantome(produit:any){

    return this.http.get<any>('http://'+this.server+'/Pharma/produit/'+this.bd+'/'+produit)
    
  }

  verifAutorisation(user:any){

    return this.http.get<any>('http://'+this.server+'/Pharma/active/testinf/'+this.bd+'/'+user)

  }

  authentification(data:any){

    return this.http.post<any>('http://'+this.server+'/Pharma/authentification',data)

  }
  getInfoPromotion(){

    return this.http.get<any>('http://'+this.serverCentral+'/Pharma/getInfoPublicite/'+this.bd)
  
  }

  createMotif(data:any){

    return this.http.post<any>('http://'+this.server+'/Pharma/motif/create/',data)

  }
  
  createCommandeFacture(data:any){

    return this.http.post<any>('http://'+this.server+'/Pharma/commandeFacture/createBroadCast',data)

  }
  
  deconnexion(idTrav:any){

    return this.http.delete<any>('http://'+this.server+'/Pharma/deconnexion/'+this.bd+'/'+idTrav)

  }
  
  closingDay(idTrav:any){

    return this.http.delete<any>('http://'+this.server+'/Pharma/sessionClosed/'+this.bd+'/'+idTrav)


  }

  getTaux(){

    return this.http.get<any>('http://'+this.server+'/Pharma/taux/'+this.bd);


  }

  getMotif(idTrav:any){

    return this.http.get<any>('http://'+this.server+'/Pharma/motif/'+this.bd+'/'+idTrav);

  }

  updateProduit(data:any){

    return this.http.post<any>('http://'+this.server+'/Pharma/produit/update/',data);

  }

  createProduit(data:any){

    return this.http.post<any>('http://'+this.server+'/Pharma/produit/createBroadCast/',data);


  }

  chargeProforma(prefix:any){

    return this.http.get<any>('http://'+this.server+'/Pharma/preforma/like/'+this.bd+'/'+prefix);

  }

  afficheProforma(prefix:any){

    return this.http.get<any>('http://'+this.server+'/Pharma/preforma/'+this.bd+'/'+prefix);

  }

  chargerPriseCharge(client:any){

    return this.http.get<any>('http://'+this.server+'/Pharma/prisecharge/like/'+this.bd+'/'+client);

  }

  validateCouponSImple(data:any){

    return this.http.post<any>('http://'+this.server+'/Pharma/achat/createBroadCast',data);

  }

  validatePrescription(data:any){

    return this.http.post<any>('http://'+this.server+'/Pharma/prescription/createBroadCast',data);

  }

  saveProforma(data:any){

    return this.http.post<any>('http://'+this.server+'/Pharma/preforma/createBroadCast',data);

  }

  controleurValidationCoupon(data:any){

    return this.http.post<any>('http://'+this.server+'/Pharma/controlleurCoupon',data);

  }

  createPriseCharge(data:any){

    return this.http.post<any>('http://'+this.server+'/Pharma/priseCharge/create',data);

  }
  updatePriseCharge(data:any){

    return this.http.post<any>('http://'+this.server+'/Pharma/priseCharge/update',data);

  }

  getLIkePriseChaege(prefix:any){

    return this.http.get<any>('http://'+this.server+'/Pharma/priseChargeLIke/'+this.bd+'/'+prefix);

  }

  getPriseChargeAffiche(gmail:any){

    return this.http.get<any>('http://'+this.server+'/Pharma/priseChargeAffiche/'+this.bd+'/'+gmail);

  }

  getDistinctPrescr(prefixPrise:any){

    return this.http.get<any>('http://'+this.server+'/Pharma/prescriptionDistinct/'+this.bd+'/'+prefixPrise);

  }

  getPrescrPrise(prise:any){

    return this.http.get<any>('http://'+this.server+'/Pharma/prescription/'+this.bd+'/'+prise);

  }

  
}
