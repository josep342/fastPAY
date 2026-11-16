import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Storage } from '@ionic/storage-angular';



@Injectable({
  providedIn: 'root'
})
export class ApiService {


  server:any="";

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

    this.http.get<any>('http://'+serv+'/Pharma/taux').subscribe(data=>{
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

  testingServer(serv:any){

    this.server=serv;

    return this.http.get<any>('http://'+serv+'/Pharma/taux');      

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
    
    return this.http.get<any>('http://'+this.server+'/Pharma/minorerProd/'+idProd+'/'+qteMin+'/'+stockVar+'/'+stockFix);

  }

  totVenduMin(prod:any){
    
    return this.http.get<any>('http://'+this.server+'/Pharma/totVenduMin/'+prod);

  }


  getInfoImpression():Observable<any>{

    return this.http.get<any>('http://'+this.server+'/Pharma/impression');

  }

  getAchat():Observable<any>{

    return this.http.get<any>(this.urlAPi);

  }

  getProduitLIke(preffix:any):Observable<any>{

    return this.http.get<any>('http://'+this.server+'/Pharma/produit/like/'+preffix);

  }
  
  getAchatNowDistinctClient():Observable<any>{

    return this.http.get<any>('http://'+this.server+'/Pharma/achatNowClientCharger');

  }

  getAchatNowDistinctClientTravId(travId:any):Observable<any>{

    return this.http.get<any>('http://'+this.server+'/Pharma/achatNowClientChargerTravId/'+travId);
    

  }

  

  
  getAchatNowDistinctProduit():Observable<any>{

    return this.http.get<any>('http://'+this.server+'/Pharma/achatNowProduitCharger');

  }
  
  getAchatNowDistinctProduitIdTrav(idTrav:any):Observable<any>{

    return this.http.get<any>('http://'+this.server+'/Pharma/achatNowProduitChargerIdTrav/'+idTrav);
    
  }
  
  getAchatDistinctDate():Observable<any>{

    return this.http.get<any>('http://'+this.server+'/Pharma/achatNowDateCharger');

  }
  
  getAchatDistinctDateTravId(idTrav:any):Observable<any>{

    return this.http.get<any>('http://'+this.server+'/Pharma/achatNowDateChargerIdTrav/'+idTrav);
    

  }
  
  getAchatNowDistinctClientLike(prefix:any):Observable<any>{

    return this.http.get<any>('http://'+this.server+'/Pharma/achatNowClientChargerLike/'+prefix);

  }

  getAchatNowDistinctClientLikeTravId(travId:any,prefix:any):Observable<any>{

    return this.http.get<any>('http://'+this.server+'/Pharma/achatNowClientChargerLikeTravId/'+travId+'/'+prefix);
    
  }

  getAchatNowDistinctProduitLike(prefix:any):Observable<any>{

    return this.http.get<any>('http://'+this.server+'/Pharma/achatNowProduitChargerLike/'+prefix);

  }

  getAchatNowDistinctProduitLikeIdTrav(idTrav:any,prefix:any):Observable<any>{

    return this.http.get<any>('http://'+this.server+'/Pharma/achatNowProduitChargerLikeIdTrav/'+ idTrav +'/'+prefix);
    
  }
  afficheGetProduit(produit:any){

    return this.http.get<any>('http://'+this.server+'/Pharma/produit/'+ produit);
  
  }

  getProduitLike(prefix:any){

    return this.http.get<any>('http://'+this.server+'/Pharma/produit/like/'+ prefix);

  }

  //AFFICHAGE
  
  afficheAchatNowIdProduit(produit:any){
  
    return this.http.get<any>('http://'+this.server+'/Pharma/achatNowProduit/'+produit)

  }

  afficheAchatNowIdProduitIdTrav(produit:any,id_trav:any){

    return this.http.get<any>('http://'+this.server+'/Pharma/achatNowProduitTravId/'+produit+'/'+id_trav)

  }

  afficheAchatNowTravId(id_trav:any){
    
    return this.http.get<any>('http://'+this.server+'/Pharma/achatNowTravId/'+id_trav)

  }
  
  
  afficheAchatDateTravId(id_trav:any,ddate:any){
  
    return this.http.get<any>('http://'+this.server+'/Pharma/achatTravIdDate/'+id_trav+'/'+ddate) 
    
  }
  
  afficheAchatNowClient(client:any){

    return this.http.get<any>('http://'+this.server+'/Pharma/achatNowClient/'+client)
  }

  afficheAchatNowIdTravClient(client:any,idTrav:any){

    return this.http.get<any>('http://'+this.server+'/Pharma/achatNowClientTravId/'+client+'/'+idTrav)
  }
  
  afficheProduitRech(produit:any){

    return this.http.get<any>('http://'+this.server+'/Pharma/produit/'+produit)
    
  }

  afficheProduitFantome(produit:any){

    return this.http.get<any>('http://'+this.server+'/Pharma/produitFantome/'+produit)
    
  }

  verifAutorisation(user:any){

    return this.http.get<any>('http://'+this.server+'/Pharma/active/testinf/'+user)

  }

  authentification(data:any){

    return this.http.post<any>('http://'+this.server+'/Pharma/authentification',data)

  }
  getInfoPromotion(){

    return this.http.get<any>('http://'+this.serverCentral+'/Pharma/getInfoPublicite')
  
  }

  createMotif(data:any){

    return this.http.post<any>('http://'+this.server+'/Pharma/motif/create/',data)

  }
  
  createCommandeFacture(data:any){

    return this.http.post<any>('http://'+this.server+'/Pharma/commandeFacture/createBroadCast',data)

  }
  
  deconnexion(idTrav:any){

    return this.http.delete<any>('http://'+this.server+'/Pharma/deconnexion/'+idTrav)

  }
  
  closingDay(idTrav:any){

    return this.http.delete<any>('http://'+this.server+'/Pharma/sessionClosed/'+idTrav)


  }

  getTaux(){

    return this.http.get<any>('http://'+this.server+'/Pharma/taux');


  }

  getMotif(idTrav:any){

    return this.http.get<any>('http://'+this.server+'/Pharma/motif/'+idTrav);

  }

  updateProduit(data:any){

    return this.http.post<any>('http://'+this.server+'/Pharma/produit/update/',data);

  }

  createProduit(data:any){

    return this.http.post<any>('http://'+this.server+'/Pharma/produit/create/',data);

  }

  chargeProforma(prefix:any){

    return this.http.get<any>('http://'+this.server+'/Pharma/preforma/like/'+prefix);

  }

  afficheProforma(prefix:any){

    return this.http.get<any>('http://'+this.server+'/Pharma/preforma/'+prefix);

  }

  chargerPriseCharge(client:any){

    return this.http.get<any>('http://'+this.server+'/Pharma/prisecharge/like/'+client);

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

  
  
  
}
